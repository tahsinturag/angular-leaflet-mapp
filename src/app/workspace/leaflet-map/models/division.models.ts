export interface DivisionListView {
  id?: string;
  divisionName: string;
  bn_name?: string;
  latitude: string;
  longitude: string;
  amount?: number;
}

export interface DistrictListView {
  id: string;
  division_id: string;
  districtName: string;
  bn_name: string;
  latitude: string;
  longitude: string;
  amount: number;
}

export interface BrandListView {
  id: string;
  name: string;
  amount: number;
}
export interface DivisionView {
  divisionName?: string;
  totalSales?: number;
  latitude?: string;
  longitude?: string;
}
export interface DivisionWiseView {
  totalBDSales: number;
  divisionSales: DivisionView[];
}
