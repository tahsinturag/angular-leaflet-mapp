export interface SearchParamForDrugReport {
  startDate: string | null;
  endDate: string | null;
  drugId: number | null;
}
export interface SearchFormParam {
  genericId: number;
  vendorId: number;
  startDate: string | null;
  endDate: string | null;
}
export interface SearchParam {
  genericId: number;
  vendorId: number;
  startDate: string | null;
  endDate: string | null;
  divId: number | null;
  limit: number | null;
}
