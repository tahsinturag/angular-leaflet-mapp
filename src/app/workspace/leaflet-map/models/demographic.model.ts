/*
Purpose: This file defines two data structures (interfaces) that help us work with 
district-related information on a map.

Why we need this:
1. To show district locations and sales data on maps
2. To organize district information in a consistent way
3. To make sure our data follows a specific structure when working with maps

Think of these as forms that must be filled out in a specific way:
- DistrictCoordinateResponse: Like a detailed form with location and sales info
- DistrictWiseResponse: Like a simple form with just district name and sales
*/

export interface DistrictCoordinateResponse {
  districtName: string;     
  totalSales?: number;       
  districtSales?: number;    
  latitude?: number;         
  longitude?: number;        
}

export interface DistrictWiseResponse {
  districtName: string;      
  districtSales: number;     
}