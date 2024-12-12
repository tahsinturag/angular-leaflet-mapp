import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  public isOpenSearchForm: boolean = false;
  public isShowDivisionDetails: boolean = false;
  public isShowResults: boolean = false;
  public divisionsDataList: DivisionView[] = [];
  public topBrandList: TopBrandResponse[] = [];
  public marketShareList: MarketShareResponse[] = [];
  public storeDivisionsList: DivisionView[] = [];
  public districtDataList: DistrictCoordinateResponse[] = [];
  public totalBdSales: number = 0;
  public divisionName: string = '';
  public searchParamData: any;
  public divisionId: any;
  constructor(
    private mapService: MapService,
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.helperService.removeTabItem();
    // this.getDivisionWiseData();
  }

  openModal() {
    this.isOpenSearchForm = true;
  }

  closeModal() {
    this.isOpenSearchForm = false;
  }

  searchHandler(searchData: SearchFormParam) {
    this.searchParamData = {
      genericId: Number(searchData.genericId),
      vendorId: Number(searchData.vendorId),
      startDate: searchData.startDate,
      endDate: searchData.endDate,
    };
    const tabType = this.helperService.getTabItem() || 'demographic';
    this.getTabWiseData(tabType);
    // this.getDivisionWiseData(this.searchParamData);
  }
  getTabWiseData(tabType: string) {
    const paramObj = {
      ...this.searchParamData,
      divId: this.divisionId || localStorage.getItem('divisionId'),
      limit: 10,
    };
    if (tabType === 'brands') {
      this.getBrandsData(paramObj);
    } else if (
      tabType === 'demographic' &&
      this.divisionId &&
      this.divisionsDataList
    ) {
      this.isShowDivisionDetails = false;
      this.getDistrictwiseSearch(paramObj);
    } else if (tabType === 'demographic') {
      this.isShowDivisionDetails = false;
      this.getDivisionWiseData(this.searchParamData);
    } else {
      this.getMarketShareData(paramObj);
    }
  }

  public getDivisionWiseData(searchParamData: SearchParam) {
    this.mapService.getDivisionWiseData(searchParamData).subscribe({
      next: (response: any) => {
        this.storeDivisionsList = response?.divisionSales;
        this.divisionsDataList = response?.divisionSales;
        this.totalBdSales = response?.totalBDSales;
        this.districtDataList = [];
        this.topBrandList = [];
        this.marketShareList = [];
        this.isShowResults = true;
        console.log('res', response);
        console.log('res divisionsList', this.divisionsDataList);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public getDistrictCoordinates(division: DivisionListView) {
    this.divisionId = division?.id || 2; // divisionId is not available in the API so i put 2 as default
    this.mapService.getDistrictCoordinates(Number(this.divisionId)).subscribe({
      next: (response) => {
        if (response) {
          this.isShowDivisionDetails = true;
          this.districtDataList = response;
          this.topBrandList = [];
          this.marketShareList = [];
          this.divisionName = division.divisionName;
          this.getDistrictwiseSearch(this.searchParamData);
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  public getDistrictwiseSearch(paramObj: SearchParam) {
    this.mapService.getDistrictwiseSearch(paramObj).subscribe({
      next: (response) => {
        if (response) {
          this.isShowDivisionDetails = true;
          this.districtDataList = this.districtDataList.map((district) => {
            return {
              ...district,
              districtSales: response.find(
                (dist: any) => dist.districtName === district?.districtName
              )?.districtSales,
            };
          });
          this.divisionsDataList = [];
          this.topBrandList = [];
          this.marketShareList = [];
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  showPreviousData(data: any) {
    if (data === 'back') {
      this.helperService.setTabItem('demographic');
      this.divisionsDataList = this.storeDivisionsList;
      this.isShowDivisionDetails = false;
      this.divisionName = '';
    }
  }

  getBrandsData(topBrandSearchParam: SearchParam) {
    this.mapService.getTopBrandsSearch(topBrandSearchParam).subscribe({
      next: (response) => {
        this.topBrandList = response;
        this.districtDataList = [];
        this.marketShareList = [];
        this.divisionId = '';
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getMarketShareData(marketShareSearchParam: SearchParam) {
    this.mapService.getMarketShareSearch(marketShareSearchParam).subscribe({
      next: (response) => {
        console.log('res', response);
        this.marketShareList = response;
        this.divisionId = '';
        // this.districtDataList = [];
        // this.topBrandList = [];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
