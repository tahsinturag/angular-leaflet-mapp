/**
 * Purpose: This service manages tab state persistence in the browser's localStorage
 * 
 * Why: We need this service to:
 * 1. Remember which tab was last selected even after page refresh
 * 2. Provide a centralized way to handle tab-related storage operations
 * 3. Ensure consistent tab state management across the application
 */

import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'  // Makes this a singleton service available everywhere
})
export class HelperService {
  // The key used to store/retrieve-get tab data in localStorage
  private tabType: string = 'tabType';

  constructor() {}

  // Method to save tab information to localStorage// param tabType - The string value to be stored
  setTabItem(tabType: string) {
    // Store the tabType in localStorage after converting it to JSON string
    localStorage.setItem(this.tabType, JSON.stringify(tabType));
  }

  /**
   * Gets the last selected tab from localStorage
   * return the stored tab name/identifier, or empty string if nothing stored
   */
  getTabItem() {

    const data: any = localStorage.getItem(this.tabType);
    // Parse the JSON string and return it, or return empty string if null
    return JSON.parse(data) || '';
  }

  /**
   * Clears the stored tab selection from localStorage
   * Used when we need to reset the tab state
   */
  removeTabItem() {
    localStorage.removeItem(this.tabType);
  }
}