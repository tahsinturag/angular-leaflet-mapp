/**
 * Purpose: This component creates an interactive map using Leaflet library
 * Why: To show different divisions/districts of Bangladesh with their sales data or demographic information
 * 
 * Main Features:
 * 1. Shows markers on the map for each division/district
 * 2. Displays popups with information when clicking markers
 * 3. Can switch between division view and district view
 * 4. Shows different types of data (sales, market share, demographic) based on selected tab
 */

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
  /**
   * Input/Output Properties:
   * - divisionsDataList: Data for divisions/districts to show on map
   * - districtDataList: List of districts when viewing district details
   * - isShowDivisionDetails: Controls if showing division or district view
   * - showDistrictsEvent: Event emitted when user wants to see district details
   */
  @Input() divisionsDataList: DivisionView[] | DistrictCoordinateResponse[] = [];
  @Input() districtDataList: DistrictCoordinateResponse[] = [];
  @Input() isShowDivisionDetails: boolean = false;
  @Output() showDistrictsEvent = new EventEmitter();

  /**
   * Important Class Properties:
   * - map: The main Leaflet map object
   * - cityMarkers: Stores all markers shown on map
   * - tabType: Current selected tab (sales/market share/demographic)
   */
  private map: L.Map | undefined;
  private cityMarkers: L.Marker[] = [];
  public tabType: string = '';

  /**
   * Fixed Data:
   * List of all divisions in Bangladesh with their coordinates
   */
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

  /**
   * Lifecycle Methods:
   * 
   * 1. ngOnInit: Called when component starts
   *    - Sets up initial data
   *    - Gets current tab type
   */
  ngOnInit(): void {
    if (this.divisionsDataList.length === 0) {
      this.divisionsDataList = this.divisions;
    }
    this.tabType = this.helperService.getTabItem();
  }

  /**
   * 2. ngAfterViewInit: Called after component's view is ready
   *    - Creates the initial map
   */
  ngAfterViewInit(): void {
    this.initMap();
  }

  /**
   * 3. ngOnChanges: Called when input data changes
   *    - Updates map when new data arrives
   *    - Handles switching between division and district views
   */
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
      this.tabType = this.helperService.getTabItem();

      if (this.tabType !== 'brands') {
        this.reinitializeMap();
      }
    }
  }

  /**
   * Map Creation and Update Methods:
   * 
   * 1. initMap: Creates the basic map
   *    - Sets initial view to Bangladesh
   *    - Adds map tiles (the actual map images)
   */
  private initMap(): void {
    this.map = L.map('map').setView([23.8103, 90.4125], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
    if (this.tabType !== 'brands' || !this.isShowDivisionDetails) {
      this.updateMarkers();
    }
  }

  /**
   * 2. reinitializeMap: Recreates the map from scratch
   *    - Removes old map
   *    - Creates new map
   */
  private reinitializeMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.initMap();
  }

  /**
   * 3. updateMarkers: Adds or updates all markers on the map
   *    - Removes old markers
   *    - Creates new markers for each division/district
   *    - Sets up click handlers and popups
   */
  private updateMarkers(): void {
    if (!this.map) return;

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

      this.createCustomPopup(division, marker);
    });
  }

  /**
   * Map Interaction Methods:
   * 
   * 1. flyToCity: Animates map to zoom into a location
   */
  flyToCity(lat: number, lng: number, zoom: number): void {
    this.map?.flyTo([lat, lng], zoom, {
      duration: 1.5,
    });
  }

  /**
   * 2. createCustomPopup: Creates the popup shown when clicking a marker
   *    - Shows division/district name
   *    - Shows sales or market share data
   *    - Adds click handler for demographic view
   */
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

    if (this.tabType === 'demographic') {
      popupDiv.querySelector('div')?.addEventListener('click', () => {
        this.showDistrictsHandler(division);
      });
    }
  }

  /**
   * 3. createPopupContent: Creates the HTML content for popups
   *    - Shows different format based on tab type
   *    - Formats sales with ৳ symbol
   *    - Formats market share with % symbol
   */
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

  /**
   * Event Handlers:
   * 
   * showDistrictsHandler: Called when user clicks to see district details
   * - Emits event to parent component
   */
  showDistrictsHandler(division: DivisionListView) {
    console.log('In popup', division);
    this.showDistrictsEvent.emit(division);
  }
}
