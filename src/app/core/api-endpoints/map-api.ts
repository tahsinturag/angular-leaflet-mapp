/**
 * Map API Endpoint Configurations
 * 
 * Purpose: This file defines all API endpoints related to map functionality and sales data visualization.
 * It provides endpoints for:
 * - Geographic data (district coordinates)
 * - Sales demographics
 * - Market analysis (top brands, market share)
 * - Drug-specific reports
 */

import {
  SearchParam,
  SearchParamForDrugReport,
} from '../../workspace/leaflet-map/models/search.models';

export const LEAFLET_MAP_API = {
  /**
   * Fetches geographic coordinates for all districts within a division
   * Used for: Drawing district boundaries on the map
   */
  getDistrictCoordinates: (divisionId: number) =>
    `division/district-coordinates?divisionId=${divisionId}`,

  /**
   * GET district-wise sales demographic data
   * Filters by:
   * - Division
   * - Generic drug type
   * - Vendor/Manufacturer
   * - Date range (start and end dates)
   */
  getDistrictwiseSearch: (searchParam: SearchParam) =>
    `sales-info/demographic-districts?divId=${searchParam.divId}&genericId=${searchParam.genericId}&vendorId=${searchParam.vendorId}&startDate=${searchParam.startDate}&endDate=${searchParam.endDate}`,

  /**
   * Gets list of top-performing drug brands
   * Filters by:
   * - Generic drug type
   * - Vendor/Manufacturer
   * - Date range
   * - Division
   * Returns: Limited number of results based on 'limit' parameter
   */
  getTopBrandsSearch: (searchParam: SearchParam) =>
    `sales-info/top-brands?genericId=${searchParam.genericId}&vendorId=${searchParam.vendorId}&startDate=${searchParam.startDate}&endDate=${searchParam.endDate}&divisionId=${searchParam.divId}&limit=${searchParam.limit}`,

  /**
   * Retrieves market share data for each district
   * Used for: Visualizing market penetration and competition analysis
   * Filters similar to district-wise search
   */
  getMarketShareSearch: (searchParam: SearchParam) =>
    `sales-info/district-market-share?genericId=${searchParam.genericId}&vendorId=${searchParam.vendorId}&startDate=${searchParam.startDate}&endDate=${searchParam.endDate}&divisionId=${searchParam.divId}`,

  /**
   * Generates detailed report for a specific drug
   * Used in: Borrower dashboard
   * Filters by:
   * - Specific drug ID (not generic)
   * - Date range
   */
  getDrugReport: (drugReportSearchParam: SearchParamForDrugReport) =>
    `sales-info/Drug-report?drugId=${drugReportSearchParam.drugId}&startDate=${drugReportSearchParam.startDate}&endDate=${drugReportSearchParam.endDate}`,
};
