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
