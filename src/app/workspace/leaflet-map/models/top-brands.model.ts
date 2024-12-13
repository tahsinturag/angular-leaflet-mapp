/*
Purpose: This file defines two data structures (interfaces) that help organize 
information about medicine sales and reports.

Why we need this: 
- When we get data about medicine sales from a database or server, 
  we need to make sure the data is in the correct format
- These structures help us keep track of important details about medicines 
  like their names, strength, sales amounts, and where they sell the most
*/

// This structure holds information about top-selling medicine brands
export interface TopBrandResponse {
  drugName: string;        // Name of the medicine
  strengthName: string;    // How strong the medicine is (like 500mg)
  formationName: string;   // What form it comes in (like tablet, syrup)
  totalAmount: number;     // How many units were sold in total
}

// This structure holds detailed sales report information for each medicine
export interface DrugReportResponse {
  drugName: string;              // Name of the medicine
  formation: string;             // What form it comes in
  highestSalesMonth: string;     // Month when the medicine sold the most
  lowestSalesMonth: string;      // Month when the medicine sold the least
  highestSalesLocation: string;  // Place where the medicine sells best
  lowestSalesLocation: string;   // Place where the medicine sells least
  totalSales: number;            // Total number of sales
}