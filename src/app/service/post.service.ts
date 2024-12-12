/**
 * Post Service
 * 
 * Purpose:
 * This service handles all API communications related to:
 * - Geographic boundary data
 * - Generic medicine suggestions
 * - Vendor suggestions
 * - Demographic sales information
 * 
 * Why:
 * Centralizes all HTTP requests to maintain a single source of truth for API calls
 * and provides type-safe methods for data fetching across the application.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Interface defining the structure of vendor suggestion responses */
interface VendorSuggestion {
  id: number;
  vendorName: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  /** Base API endpoints for different data services */
  private apiUrl = 'http://192.168.0.172:8083/api/division/boundary?name=';
  private genericUrl = 'http://192.168.0.172:8083/api/generic/search?prefix=';
  private vendorUrl = 'http://192.168.0.172:8083/api/vendor/search?prefix=';
  private demographicUrl = 'http://192.168.0.172:8083/api/sales-info/demographic';

  constructor(private http: HttpClient) {}

  /**
   * Fetches boundary region data based on provided name
   * param name - The region name to search for
   * returns Observable of boundary data
   */
  getPosts(name: string): Observable<any> {
    const apiUrl = `${this.apiUrl}${name}`;
    return this.http.get(apiUrl);
  }

  /**
   * Retrieves generic medicine suggestions based on search query
   * param query - Search term for generic medicines
   * returns Observable of generic medicine suggestions (limited to 10 results)
   */
  getGenericSuggestions(query: string): Observable<any> {
    const url = `${this.genericUrl}${query}&limit=10`;
    return this.http.get(url);
  }

  /**
   * Fetches/Get vendor suggestions based on search query
   * param query - Search term for vendors
   * returns Observable of VendorSuggestion array (limited to 10 results)
   */
  getVendorSuggestions(query: string): Observable<VendorSuggestion[]> {
    const url = `${this.vendorUrl}${query}&limit=10`;
    return this.http.get<VendorSuggestion[]>(url);
  }

  /**
   * Retrieves demographic sales data based on provided parameters
   * @param genericId - ID of the generic medicine
   * @param vendorId - ID of the vendor
   * @param startDate - Start date for the data range
   * @param endDate - End date for the data range
   * @returns Observable of demographic data
   */
  getDemographicData(
    genericId: number,
    vendorId: number,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const params = {
      genericId: genericId.toString(),
      vendorId: vendorId.toString(),
      startDate,
      endDate,
    };

    return this.http.get(this.demographicUrl, { params });
  }
}
