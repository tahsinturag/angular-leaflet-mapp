import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HelperService } from '../../../../service/helper.service';
import { MapService } from '../../../../service/map.service';
import { DistrictCoordinateResponse } from '../../models/demographic.model';
import { DivisionListView, DivisionView } from '../../models/division.models';
import { MarketShareResponse } from '../../models/market-share.model';
import { SearchParam } from '../../models/search.models';
import {
  DrugReportResponse,
  TopBrandResponse,
} from '../../models/top-brands.model';
import { ShowResultsComponent } from '../../views/show-results/show-results.component';

@Component({
  selector: 'app-show-results-container',
  standalone: true,
  imports: [ShowResultsComponent],
  templateUrl: './show-results-container.component.html',
  styleUrls: ['./show-results-container.component.css'],
})
export class ShowResultsContainerComponent implements OnInit, OnChanges {
  @Input() divisionName: string = '';
  @Input() isShowDivisionDetails: boolean = false;
  @Input() divisionsDataList: DivisionView[] = [];
  @Input() districtDataList: DistrictCoordinateResponse[] = [];
  @Input() topBrandList: TopBrandResponse[] = [];
  @Input() marketShareList: MarketShareResponse[] = [];
  @Input() searchParamData: SearchParam | undefined;
  @Input() totalBdSales: number = 0;
  @Output() showDistrictsEvent = new EventEmitter();
  @Output() goBackEvent = new EventEmitter();
  @Output() tabClickEvent = new EventEmitter();
  @Output() brandDetailsEvent = new EventEmitter();

  public showBrandDetails: boolean = false;
  public tableTabType: string = 'demographic';
  public totalAmount: number = 0;
  public brandDetailData!: DrugReportResponse;
  constructor(
    private helperService: HelperService,
    private mapService: MapService
  ) {}

  ngOnInit(): void {
    // this.calculateTotalAmount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['divisionsDataList'] &&
        !changes['divisionsDataList'].isFirstChange()) ||
      (changes['districtDataList'] &&
        !changes['districtDataList'].isFirstChange())
    ) {
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    this.totalAmount = this.districtDataList.reduce(
      (acc, district) => acc + (district?.districtSales ?? 0),
      0
    );
    if (!this.totalBdSales) {
      this.totalBdSales = this.totalAmount;
    }
  }

  tabHandler(tabType: string) {
    this.tableTabType = tabType;
    this.tabClickEvent.emit(tabType);
  }

  showDistrictsHandler(division: DivisionListView) {
    console.log('showDistrictsHandler', division);
    this.divisionName = division.divisionName;
    this.showDistrictsEvent.emit(division);
  }

  showBrandDetailsHandler(drugId: number) {
    console.log('showBrandDetailsHandler', drugId);
    this.showBrandDetails = true;
    this.getBrandDetails(drugId);
    // this.brandDetailsEvent.emit(drugId);
  }

  goBack() {
    console.log('goBack');
    this.showBrandDetails = false;
    this.goBackEvent.emit('back');
  }

  formatNumber(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }
  getBrandDetails(drugId: number) {
    const searchData = {
      drugId: drugId,
      startDate: this.searchParamData?.startDate ?? '',
      endDate: this.searchParamData?.endDate ?? '',
    };
    this.mapService.getDrugReport(searchData).subscribe({
      next: (response) => {
        console.log('res', response);
        this.brandDetailData = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
