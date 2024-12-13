/**
 * Purpose: This component shows different types of results on the map like:
 * - Division details
 * - District information
 * - Top selling brands
 * - Market share data
 * - Brand specific details
 * 
 * Why this component exists:
 * - It acts as a container to display various data in table format
 * - Helps users navigate between different views (divisions, districts, brands)
 * - Manages the display of statistics and market data
 */

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HelperService } from '../../../../service/helper.service';
import { DistrictCoordinateResponse } from '../../models/demographic.model';
import { DivisionListView, DivisionView } from '../../models/division.models';
import { MarketShareResponse } from '../../models/market-share.model';
import {
  DrugReportResponse,
  TopBrandResponse,
} from '../../models/top-brands.model';
import { BrandDetailsComponent } from '../brand-details/brand-details.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-show-results',
  standalone: true,
  imports: [TableComponent, BrandDetailsComponent, CommonModule],
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css'],
})
export class ShowResultsComponent {
  /* 
    Input properties:
    - divisionName: Name of selected division
    - isShowDivisionDetails: Controls if division details should be shown
    - divisionsDataList: List of all divisions
    - districtDataList: List of districts with their coordinates
    - topBrandList: List of best performing brands
    - marketShareList: Data about market distribution
    - showBrandDetails: Controls if brand details should be shown
    - brandDetailData: Detailed information about a specific drug
    - tableTabType: Current active tab (demographic/other)
    - totalBdSales: Total sales figure for Bangladesh
  */
  @Input() divisionName: string = '';
  @Input() isShowDivisionDetails: boolean = false;
  @Input() divisionsDataList: DivisionView[] = [];
  @Input() districtDataList: DistrictCoordinateResponse[] = [];
  @Input() topBrandList: TopBrandResponse[] = [];
  @Input() marketShareList: MarketShareResponse[] = [];
  @Input() showBrandDetails: boolean = false;
  @Input() brandDetailData!: DrugReportResponse;
  @Input() tableTabType: string = 'demographic';
  @Input() totalBdSales: number = 0;

  /* 
    Output events:
    - showDistrictsEvent: Triggered when user wants to see district details
    - goBackEvent: Triggered when user wants to go back to previous view
    - tabClickEvent: Triggered when user switches tabs
    - showBrandDetailsEvent: Triggered when user wants to see brand details
  */
  @Output() showDistrictsEvent = new EventEmitter<DivisionListView>();
  @Output() goBackEvent = new EventEmitter<void>();
  @Output() tabClickEvent = new EventEmitter<string>();
  @Output() showBrandDetailsEvent = new EventEmitter<number>();

  divisionId: string | null = null;

  constructor(public helperService: HelperService) {}

  /* 
    Lifecycle hooks and methods:
    - Gets division ID when component starts
    - Handles tab switching
    - Manages navigation between different views
  */
  ngOnInit() {
    this.divisionId = localStorage.getItem('divisionId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('marketShareList', this.marketShareList);
    this.divisionId = localStorage.getItem('divisionId');
  }

  onTabClick(tabType: string) {
    this.helperService.setTabItem(tabType);
    this.tabClickEvent.emit(tabType);
  }

  onShowDistricts(division: DivisionListView) {
    this.showDistrictsEvent.emit(division);
  }

  onShowBrandDetails(drugId: number) {
    this.showBrandDetailsEvent.emit(drugId);
  }

  onGoBack() {
    this.goBackEvent.emit();
  }
}