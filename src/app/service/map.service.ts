/*
 * MapService: Handles all map-related API calls for the application
 * 
 * Purpose:
 * - Manages API interactions for map data including divisions, districts, market share, and drug reports
 * - Provides data for visualization on leaflet maps
 * 
 * Current Implementation:
 * - Using mock data from demoAPI.json for development/testing
 * - All actual API endpoints are commented out but ready for production use
 * - To switch to real API: 
 *   1. Uncomment the API call lines
 *   2. Comment out the mock data return lines
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import divisions from '../shared/utils/bd-divisions.json';
import demoAPI from '../shared/utils/demo-api.json';
import {
  DistrictCoordinateResponse,
  DistrictWiseResponse,
} from '../workspace/leaflet-map/models/demographic.model';
import { DivisionListView } from '../workspace/leaflet-map/models/division.models';
import { MarketShareResponse } from '../workspace/leaflet-map/models/market-share.model';
import {
  SearchFormParam,
  SearchParam,
  SearchParamForDrugReport,
} from '../workspace/leaflet-map/models/search.models';
import {
  DrugReportResponse,
  TopBrandResponse,
} from '../workspace/leaflet-map/models/top-brands.model';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  search(searchParam: SearchFormParam): Observable<DivisionListView[]> {
    // TODO: Replace mock data with real API
    // Production API call:
    // return this.http.post('/api/division-wise-data', data);

    // Mock data return:
    return of(divisions.divisions);
  }

  getDivisionWiseData(searchParam: SearchFormParam): Observable<any> {
    // TODO: Replace mock data with real API
    // Production API call:
    // return this.http.get('/api/division-wise-data');

    // Mock data return:
    return of(demoAPI.division_list);
  }

  getDistrictCoordinates(divisionId: number): Observable<DistrictCoordinateResponse[]> {
    // TODO: Replace mock data with real API
    // Production API call:
    // const url = LEAFLET_MAP_API.getDistrictCoordinates(divisionId);
    // return this.http.get<DistrictCoordinateResponse[]>(url);

    // Mock data return:
    return of(demoAPI.districts_coordinates);
  }

  getDistrictwiseSearch(districtWiseSearchParam: SearchParam): Observable<DistrictWiseResponse[]> {
    // TODO: Replace mock data with real API
    // Production API call:
    // const url = LEAFLET_MAP_API.getDistrictwiseSearch(districtWiseSearchParam);
    // return this.http.get<DistrictWiseResponse[]>(url);

    console.log('districtWiseSearchParam', districtWiseSearchParam);
    
    // Mock data return:
    return of(demoAPI.districtwise_search);
  }

  getTopBrandsSearch(topBrandSearchParam: SearchParam): Observable<TopBrandResponse[]> {
    // TODO: Replace mock data with real API
    // Production API call:
    // const url = LEAFLET_MAP_API.getTopBrandsSearch(topBrandSearchParam);
    // return this.http.get<TopBrandResponse[]>(url);

    // Mock data return:
    return of(demoAPI.top_brands);
  }

  getMarketShareSearch(marketShareSearchParam: SearchParam): Observable<MarketShareResponse[]> {
    // TODO: Replace mock data with real API
    // Production API call:
    // const url = LEAFLET_MAP_API.getMarketShareSearch(marketShareSearchParam);
    // return this.http.get<MarketShareResponse[]>(url);

    // Mock data return:
    return of(demoAPI.market_share);
  }

  getDrugReport(drugReportSearchParam: SearchParamForDrugReport): Observable<DrugReportResponse> {
    // TODO: Replace mock data with real API
    // Production API call:
    // const url = LEAFLET_MAP_API.getDrugReport(drugReportSearchParam);
    // return this.http.get<DrugReportResponse>(url);

    console.log('drugReportSearchParam', drugReportSearchParam);
    
    // Mock data return:
    return of(demoAPI.drug_report);
  }
}

