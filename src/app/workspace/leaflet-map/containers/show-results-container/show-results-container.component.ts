// This component is responsible for showing results on a map and managing different views
// It handles division details, district data, top brands, and market share information
// Think of it like a control center for displaying data on a map!

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
  // Input properties - these are like settings that can be passed to this component
  // Think of them as information that comes from outside this component
  @Input() divisionName: string = '';                                    // Name of the selected division
  @Input() isShowDivisionDetails: boolean = false;                      // Should we show division details?
  @Input() divisionsDataList: DivisionView[] = [];                      // List of all divisions
  @Input() districtDataList: DistrictCoordinateResponse[] = [];         // List of districts and their data
  @Input() topBrandList: TopBrandResponse[] = [];                       // List of top performing brands
  @Input() marketShareList: MarketShareResponse[] = [];                 // Market share information
  @Input() searchParamData: SearchParam | undefined;                    // Search parameters
  @Input() totalBdSales: number = 0;                                    // Total sales for Bangladesh

  // Output properties - these are like signals that this component can send to others
  // Think of them as ways to communicate with other parts of the application
  @Output() showDistrictsEvent = new EventEmitter();                    // Signal to show districts
  @Output() goBackEvent = new EventEmitter();                          // Signal to go back
  @Output() tabClickEvent = new EventEmitter();                        // Signal when a tab is clicked
  @Output() brandDetailsEvent = new EventEmitter();                    // Signal to show brand details

  // Local properties - these are used only within this component
  public showBrandDetails: boolean = false;                            // Should we show brand details?
  public tableTabType: string = 'demographic';                         // Which tab is selected
  public totalAmount: number = 0;                                      // Total amount calculated
  public brandDetailData!: DrugReportResponse;                         // Data about a specific brand

  constructor(
    private helperService: HelperService,
    private mapService: MapService
  ) {}

  // This runs when the component starts
  ngOnInit(): void {
    // Currently empty, but ready for future use
  }

  // This runs whenever the input properties change
  ngOnChanges(changes: SimpleChanges): void {
    // If either divisions or districts data changes (and it's not the first time)
    // then recalculate the total amount
    if (
      (changes['divisionsDataList'] &&
        !changes['divisionsDataList'].isFirstChange()) ||
      (changes['districtDataList'] &&
        !changes['districtDataList'].isFirstChange())
    ) {
      this.calculateTotalAmount();
    }
  }

  // Calculates the total amount from district sales
  calculateTotalAmount() {
    // Add up all district sales (if a district has no sales, use 0)
    this.totalAmount = this.districtDataList.reduce(
      (acc, district) => acc + (district?.districtSales ?? 0),
      0
    );
    // If total BD sales isn't set, use the calculated total
    if (!this.totalBdSales) {
      this.totalBdSales = this.totalAmount;
    }
  }

  // Handles tab clicks
  tabHandler(tabType: string) {
    this.tableTabType = tabType;
    this.tabClickEvent.emit(tabType);
  }

  // Shows districts for a selected division
  showDistrictsHandler(division: DivisionListView) {
    console.log('showDistrictsHandler', division);
    this.divisionName = division.divisionName;
    this.showDistrictsEvent.emit(division);
  }

  // Shows details for a specific brand
  showBrandDetailsHandler(drugId: number) {
    console.log('showBrandDetailsHandler', drugId);
    this.showBrandDetails = true;
    this.getBrandDetails(drugId);
  }

  // Handles going back to previous view
  goBack() {
    console.log('goBack');
    this.showBrandDetails = false;
    this.goBackEvent.emit('back');
  }

  // Formats numbers to be more readable (adds commas)
  formatNumber(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }

  // Gets detailed information about a specific brand/drug
  getBrandDetails(drugId: number) {
    // Prepare search data with drug ID and dates
    const searchData = {
      drugId: drugId,
      startDate: this.searchParamData?.startDate ?? '',
      endDate: this.searchParamData?.endDate ?? '',
    };
    // Call the service to get drug report
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
