/*
Main Purpose of this Component:
- This is like a control center for a map that shows business data for Bangladesh
- It shows different areas (divisions and districts) on a map
- Users can search for specific information and see results
- It can show information about:
  1. Different areas (demographic data)
  2. Popular brands
  3. Market share (how much of the market different companies control)
*/

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// Importing helper tools and services we need
import { HelperService } from '../../../../service/helper.service';
import { MapService } from '../../../../service/map.service';
import { DistrictCoordinateResponse } from '../../models/demographic.model';
import { DivisionListView, DivisionView } from '../../models/division.models';
import { MarketShareResponse } from '../../models/market-share.model';
import { SearchFormParam, SearchParam } from '../../models/search.models';
import { TopBrandResponse } from '../../models/top-brands.model';
import { MapComponent } from '../../views/map/map.component';
import { SearchFormContainerComponent } from '../search-form-container/search-form-container.component';
import { ShowResultsContainerComponent } from '../show-results-container/show-results-container.component';

@Component({
  selector: 'app-leaflet-map-container',
  standalone: true,
  imports: [
    MapComponent,
    SearchFormContainerComponent,
    ShowResultsContainerComponent,
  ],
  templateUrl: './leaflet-map-container.component.html',
  styleUrls: ['./leaflet-map-container.component.css'],
})
export class LeafletMapContainerComponent implements OnInit {
  // Switches to control what's visible on screen
  public isOpenSearchForm: boolean = false;        // Shows/hides the search form
  public isShowDivisionDetails: boolean = false;   // Shows/hides details about a division
  public isShowResults: boolean = false;           // Shows/hides the results section

  // Lists to store different types of data
  public divisionsDataList: DivisionView[] = [];   // Current division data being shown
  public topBrandList: TopBrandResponse[] = [];    // List of top selling brands
  public marketShareList: MarketShareResponse[] = []; // Market share information
  public storeDivisionsList: DivisionView[] = [];  // Backup copy of division data
  public districtDataList: DistrictCoordinateResponse[] = []; // Information about districts

  // Other important information we need to keep track of
  public totalBdSales: number = 0;     // Total sales across Bangladesh
  public divisionName: string = '';     // Name of the currently selected division
  public searchParamData: any;          // What the user searched for
  public divisionId: any;               // ID number of selected division

  // Setting up the component with services it needs
  constructor(
    private mapService: MapService,           // Service for getting map data
    private cdr: ChangeDetectorRef,           // Helps update the screen
    private helperService: HelperService      // General helper functions
  ) {}

  // When the component first starts
  ngOnInit() {
    this.helperService.removeTabItem();  // Clear any previously selected tabs
  }

  // Functions to show/hide the search form
  openModal() {
    this.isOpenSearchForm = true;    // Show the search form
  }

  closeModal() {
    this.isOpenSearchForm = false;   // Hide the search form
  }

  // What happens when user searches for something
  searchHandler(searchData: SearchFormParam) {
    // Save the search information
    this.searchParamData = {
      genericId: Number(searchData.genericId),
      vendorId: Number(searchData.vendorId),
      startDate: searchData.startDate,
      endDate: searchData.endDate,
    };
    
    // Get which tab is selected (demographic, brands, etc.)
    const tabType = this.helperService.getTabItem() || 'demographic';
    // Get the right data based on the tab
    this.getTabWiseData(tabType);
  }

  // Gets different data depending on which tab is selected
  getTabWiseData(tabType: string) {
    // Prepare the search settings
    const paramObj = {
      ...this.searchParamData,
      divId: this.divisionId || localStorage.getItem('divisionId'),
      limit: 10,
    };

    // Choose what data to get based on the tab
    if (tabType === 'brands') {
      this.getBrandsData(paramObj);                // Get brands data
    } else if (
      tabType === 'demographic' &&
      this.divisionId &&
      this.divisionsDataList
    ) {
      this.isShowDivisionDetails = false;
      this.getDistrictwiseSearch(paramObj);        // Get district data
    } else if (tabType === 'demographic') {
      this.isShowDivisionDetails = false;
      this.getDivisionWiseData(this.searchParamData);  // Get division data
    } else {
      this.getMarketShareData(paramObj);           // Get market share data
    }
  }

  // Gets sales data for all divisions
  public getDivisionWiseData(searchParamData: SearchParam) {
    this.mapService.getDivisionWiseData(searchParamData).subscribe({
      next: (response: any) => {
        // Save the data we got
        this.storeDivisionsList = response?.divisionSales;
        this.divisionsDataList = response?.divisionSales;
        this.totalBdSales = response?.totalBDSales;
        
        // Clear other lists since we're showing division data
        this.districtDataList = [];
        this.topBrandList = [];
        this.marketShareList = [];
        
        this.isShowResults = true;  // Show the results
      },
      error: (error) => {
        console.error(error);  // Show error if something goes wrong
      },
    });
  }

  // Gets information about districts in a division
  public getDistrictCoordinates(division: DivisionListView) {
    this.divisionId = division?.id || 2;  // Use division ID (or 2 as backup)
    this.mapService.getDistrictCoordinates(Number(this.divisionId)).subscribe({
      next: (response) => {
        if (response) {
          // Save and show the district data
          this.isShowDivisionDetails = true;
          this.districtDataList = response;
          this.topBrandList = [];
          this.marketShareList = [];
          this.divisionName = division.divisionName;
          
          // Get sales data for these districts
          this.getDistrictwiseSearch(this.searchParamData);
          this.cdr.detectChanges();  // Update the screen
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Gets sales data for districts
  public getDistrictwiseSearch(paramObj: SearchParam) {
    this.mapService.getDistrictwiseSearch(paramObj).subscribe({
      next: (response) => {
        if (response) {
          this.isShowDivisionDetails = true;
          // Add sales data to each district's information
          this.districtDataList = this.districtDataList.map((district) => {
            return {
              ...district,
              districtSales: response.find(
                (dist: any) => dist.districtName === district?.districtName
              )?.districtSales,
            };
          });
          
          // Clear other lists
          this.divisionsDataList = [];
          this.topBrandList = [];
          this.marketShareList = [];
          
          this.cdr.detectChanges();  // Update the screen
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Goes back to showing division data
  showPreviousData(data: any) {
    if (data === 'back') {
      this.helperService.setTabItem('demographic');
      this.divisionsDataList = this.storeDivisionsList;
      this.isShowDivisionDetails = false;
      this.divisionName = '';
    }
  }

  // Gets data about top selling brands
  getBrandsData(topBrandSearchParam: SearchParam) {
    this.mapService.getTopBrandsSearch(topBrandSearchParam).subscribe({
      next: (response) => {
        this.topBrandList = response;
        // Clear other lists
        this.districtDataList = [];
        this.marketShareList = [];
        this.divisionId = '';
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Gets market share information
  getMarketShareData(marketShareSearchParam: SearchParam) {
    this.mapService.getMarketShareSearch(marketShareSearchParam).subscribe({
      next: (response) => {
        this.marketShareList = response;
        this.divisionId = '';
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
