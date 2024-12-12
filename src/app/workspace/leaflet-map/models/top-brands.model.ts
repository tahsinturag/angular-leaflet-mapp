export interface TopBrandResponse {
  drugName: string;
  strengthName: string;
  formationName: string;
  totalAmount: number;
}
export interface DrugReportResponse {
  drugName: string;
  formation: string;
  highestSalesMonth: string;
  lowestSalesMonth: string;
  highestSalesLocation: string;
  lowestSalesLocation: string;
  totalSales: number;
}
