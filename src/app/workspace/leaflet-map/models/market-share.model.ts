/*
Purpose: This file defines what data we expect to receive about market sales in different districts
Why: We need this to organize sales information on our map in a consistent way

*/

export interface MarketShareResponse {
  districtName: string;

  // What percentage of all sales came from this district
  // (example: 25.5 means 25.5% of all sales)
  salesPercentage: number;

  // The total number of sales made in this district
  totalSales: number;
}
