import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import L from 'leaflet';
import { HelperService } from '../../../../service/helper.service';
import { DistrictCoordinateResponse } from '../../models/demographic.model';
import { DivisionListView, DivisionView } from '../../models/division.models';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @Input() divisionsDataList: DivisionView[] | DistrictCoordinateResponse[] =
    [];
  @Input() districtDataList: DistrictCoordinateResponse[] = [];
  @Input() isShowDivisionDetails: boolean = false;
  @Output() showDistrictsEvent = new EventEmitter();

  private map: L.Map | undefined;
  private cityMarkers: L.Marker[] = [];
  public tabType: string = '';
  private divisions = [
    { divisionName: 'Dhaka', latitude: '23.8103', longitude: '90.4125' },
    { divisionName: 'Chattogram', latitude: '22.3569', longitude: '91.7832' },
    { divisionName: 'Khulna', latitude: '22.8456', longitude: '89.5403' },
    { divisionName: 'Rajshahi', latitude: '24.3636', longitude: '88.6241' },
    { divisionName: 'Sylhet', latitude: '24.9045', longitude: '91.8611' },
    { divisionName: 'Barishal', latitude: '22.701', longitude: '90.3535' },
    { divisionName: 'Rangpur', latitude: '25.7439', longitude: '89.2752' },
    { divisionName: 'Mymensingh', latitude: '24.7471', longitude: '90.4203' },
  ];

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    if (this.divisionsDataList.length === 0) {
      this.divisionsDataList = this.divisions;
    }

    this.tabType = this.helperService.getTabItem();
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['divisionsDataList'] &&
        !changes['divisionsDataList'].isFirstChange()) ||
      (changes['districtDataList'] &&
        !changes['districtDataList'].isFirstChange())
    ) {
      const divId = localStorage.getItem('divisionId');
      if (this.districtDataList.length > 0 && divId) {
        this.divisionsDataList = this.districtDataList;
      } else if (this.divisionsDataList.length > 0) {
        this.divisionsDataList = this.divisions.map((division) => {
          return {
            ...division,
            totalSales: this.divisionsDataList.find(
              (div: any) => div.divisionName === division.divisionName
            )?.totalSales,
          };
        });
      }
      // Get the tab type from local storage
      this.tabType = this.helperService.getTabItem();

      // Reinitialize the map
      if (this.tabType !== 'brands') {
        this.reinitializeMap();
      }
    }
  }
  private initMap(): void {
    this.map = L.map('map').setView([23.8103, 90.4125], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
    if (this.tabType !== 'brands' || !this.isShowDivisionDetails) {
      this.updateMarkers();
    }
  }
  private reinitializeMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.initMap();
  }
  private updateMarkers(): void {
    if (!this.map) return;

    // Clear existing markers
    this.cityMarkers.forEach((marker) => this.map?.removeLayer(marker));
    this.cityMarkers = [];

    this.divisionsDataList.forEach((division) => {
      let marker = L.marker([
        Number(division.latitude),
        Number(division.longitude),
      ])?.addTo(this.map as L.Map);

      this.cityMarkers.push(marker);

      marker.on('click', () => {
        this.flyToCity(
          Number(division.latitude),
          Number(division.longitude),
          10
        );
      });

      // Create and add custom popup
      this.createCustomPopup(division, marker);
    });
  }
  flyToCity(lat: number, lng: number, zoom: number): void {
    this.map?.flyTo([lat, lng], zoom, {
      duration: 1.5,
    });
  }

  private createCustomPopup(division: any, marker: any): void {
    const popupContent = this.createPopupContent(division);
    const popupDiv = L.DomUtil.create('div', 'custom-popup');
    popupDiv.innerHTML = popupContent;

    const popup = L.popup({
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      className: 'custom-popup',
    })
      .setLatLng([division.latitude, division.longitude])
      .setContent(popupDiv)
      .openOn(this.map as L.Map);

    // Add event listener to the button in the popup
    if (this.tabType === 'demographic') {
      popupDiv.querySelector('div')?.addEventListener('click', () => {
        this.showDistrictsHandler(division);
      });
    }
  }

  private createPopupContent(division: any): string {
    let mergeAmount = '';
    if (this.tabType !== 'market_share') {
      mergeAmount = `৳${division.totalSales || division.districtSales}`;
    } else {
      mergeAmount = `${division.totalSales}%`;
    }

    return `
      <div class="popover bs-popover-top" style="width: 100px;">
        <div class="popover-body" style="padding: 5px;">
          <p>${division.districtName || division.divisionName}</p>
          <p>${
            division.totalSales || division.districtSales ? mergeAmount : ''
          }</p>
        </div>
      </div>
    `;
  }
  showDistrictsHandler(division: DivisionListView) {
    console.log('In popup', division);
    this.showDistrictsEvent.emit(division);
  }
}
