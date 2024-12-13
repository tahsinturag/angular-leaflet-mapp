/**
 * Purpose of this Component:
 * This is a smart table component that shows different types of business data.
 * Think of it like a magic spreadsheet that can change what it shows!
 * 
 * What can it show?
 * 1. Divisions 
 * 2. Districts 
 * 3. Top Medicine Brands 
 * 4. Market Share 
 * 
 * Cool Features:
 * - Can switch between different views automatically
 * - Shows more details when you click on items
 * - Makes big numbers easier to read (like 1000000 → 1,000,000)
 */

import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DistrictCoordinateResponse } from '../../models/demographic.model';
import { DivisionListView } from '../../models/division.models';
import { MarketShareResponse } from '../../models/market-share.model';
import { TopBrandResponse } from '../../models/top-brands.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  // === INPUT DATA ===
  // This tells the table what kind of data to show ('brands', 'demographic', etc.)
  @Input() tableTabType: string = '';
  
  // These are different lists of data the table can display
  @Input() divisionsDataList: any[] = [];          // List of divisions/regions
  @Input() districtDataList: DistrictCoordinateResponse[] = []; // List of districts
  @Input() topBrandList: TopBrandResponse[] = [];  // List of popular medicine brands
  @Input() marketShareList: MarketShareResponse[] = []; // Market performance data

  // === OUTPUT EVENTS ===
  // These help tell the parent component when something is clicked
  @Output() showDistrictsEvent = new EventEmitter();     // When a division is clicked
  @Output() showBrandDetailsEvent = new EventEmitter();  // When a brand is clicked

  // === LOCAL VARIABLES ===
  // These help manage the component's internal state
  public data: any[] = [];           // Currently displayed data
  public divisionName: string = '';  // Name of selected division
  divisionId: string | null = null;  // ID of selected division

  constructor() {}

  // When the component first loads
  ngOnInit(): void {
    this.data = this.divisionsDataList;  // Start by showing divisions
  }

  // This runs whenever the input data changes
  ngOnChanges(changes: SimpleChanges): void {
    // Only update if it's not the first time data is loaded
    if (
      (changes['divisionsDataList'] &&
        !changes['divisionsDataList'].isFirstChange()) ||
      (changes['districtDataList'] &&
        !changes['districtDataList'].isFirstChange()) ||
      (changes['tableTabType'] && !changes['tableTabType'].isFirstChange())
    ) {
      // Decide what data to show based on the tableTabType
      if (this.tableTabType === 'brands') {
        this.data = this.topBrandList;  // Show medicine brands
      } else if (this.tableTabType === 'demographic') {
        this.divisionId = localStorage.getItem('divisionId');
        if (this.divisionId && this.districtDataList.length > 0) {
          this.data = this.districtDataList;  // Show districts within a division
        } else {
          this.data = this.divisionsDataList; // Show all divisions
        }
      } else {
        this.data = this.marketShareList;  // Show market share data
      }
    }
    console.log('object data', this.data);
  }

  // When someone clicks on a division
  showDistrictsHandler(division: DivisionListView) {
    if (division) {
      localStorage.setItem('divisionId', '2');  // Remember which division was clicked
    }
    this.showDistrictsEvent.emit(division);  // Tell parent component about the click
  }

  // When someone clicks on a brand
  showBrandDetails(drugId: number) {
    console.log('drugId: ' + drugId);
    this.showBrandDetailsEvent.emit(Number(drugId));  // Tell parent about the click
  }

  // Makes big numbers easier to read (adds commas)
  // Example: 1000000 becomes 1,000,000
  formatNumber(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }
}
