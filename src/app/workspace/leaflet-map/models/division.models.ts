/*
Purpose of this file:
This file defines the structure of data for a map application that shows different
regions (divisions) of Bangladesh and their sales information.

Why we need this:
- To make sure our data is organized properly
- To show sales information on a map
- To handle both Bengali and English names
- To track locations using latitude and longitude
*/

// This describes what information we need for a Division (like Dhaka Division, Chittagong Division)
export interface DivisionListView {
  id?: string;                // A unique code for each division (optional)
  divisionName: string;       // Name in English (like "Dhaka")
  bn_name?: string;          // Name in Bangla (optional)
  latitude: string;          // Location on map (north-south position)
  longitude: string;         // Location on map (east-west position)
  amount?: number;           // How much money was made in sales (optional)
}

// This describes what information we need for a District (like Dhaka District, Cox's Bazar District)
export interface DistrictListView {
  id: string;                // A unique code for each district
  division_id: string;       // Which division this district belongs to
  districtName: string;      // Name in English 
  bn_name: string;           // Name in Bangla
  latitude: string;          // Location on map (north-south position)
  longitude: string;         // Location on map (east-west position)
  amount: number;            // How much money was made in sales
}

// This describes information about different brands or products
export interface BrandListView {
  id: string;                // A unique code for each brand
  name: string;              // Name of the brand
  amount: number;            // How much money this brand made in sales
}

// A simpler view of division information, mainly for showing on the map
export interface DivisionView {
  divisionName?: string;     // Name of the division (optional)
  totalSales?: number;       // Total money made in this division (optional)
  latitude?: string;         // Location on map (north-south position)
  longitude?: string;        // Location on map (east-west position)
}

// This shows sales information for all of Bangladesh and its divisions
export interface DivisionWiseView {
  totalBDSales: number;      // Total sales for all of Bangladesh
  divisionSales: DivisionView[];  // List of sales for each division
}
