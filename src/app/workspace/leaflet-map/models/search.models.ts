/*
Purpose: This file defines the structure of search parameters used in the application
Why: We need these structures to make sure our search features work correctly and consistently

These interfaces help us:
1. Search for drug reports
2. Handle search form data
3. Process general search parameters

Think of these like forms where you need to fill in specific information:
- Dates (when something happened)
- IDs (to identify specific drugs, vendors, etc.)
- Limits (how many results to show)
*/

export interface SearchParamForDrugReport {
  startDate: string | null;    // When to start looking for drug reports
  endDate: string | null;      // When to stop looking for drug reports
  drugId: number | null;       // Which specific drug to search for
}

export interface SearchFormParam {
  genericId: number;           // ID for the general type of drug
  vendorId: number;           // ID for the company selling the drug
  startDate: string | null;    // When to start searching
  endDate: string | null;      // When to stop searching
}

export interface SearchParam {
  genericId: number;           // ID for the general type of drug
  vendorId: number;           // ID for the company selling the drug
  startDate: string | null;    // When to start searching
  endDate: string | null;      // When to stop searching
  divId: number | null;        // ID for the division/department
  limit: number | null;        // How many results to show
}