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
  @Input() tableTabType: string = '';
  @Input() divisionsDataList: any[] = [];
  @Input() districtDataList: DistrictCoordinateResponse[] = [];
  @Input() topBrandList: TopBrandResponse[] = [];
  @Input() marketShareList: MarketShareResponse[] = [];
  @Output() showDistrictsEvent = new EventEmitter();
  @Output() showBrandDetailsEvent = new EventEmitter();
  public data: any[] = [];
  public divisionName: string = '';
  divisionId: string | null = null;
  constructor() {}

  ngOnInit(): void {
    this.data = this.divisionsDataList;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['divisionsDataList'] &&
        !changes['divisionsDataList'].isFirstChange()) ||
      (changes['districtDataList'] &&
        !changes['districtDataList'].isFirstChange()) ||
      (changes['tableTabType'] && !changes['tableTabType'].isFirstChange())
    ) {
      if (this.tableTabType === 'brands') {
        this.data = this.topBrandList;
      } else if (this.tableTabType === 'demographic') {
        this.divisionId = localStorage.getItem('divisionId');
        if (this.divisionId && this.districtDataList.length > 0) {
          this.data = this.districtDataList;
        } else {
          this.data = this.divisionsDataList;
        }
      } else {
        this.data = this.marketShareList;
      }
      // this.divisionsDataList = this.districtDataList;
    }
    console.log('object data', this.data);
  }
  showDistrictsHandler(division: DivisionListView) {
    if (division) {
      localStorage.setItem('divisionId', '2');
    }
    this.showDistrictsEvent.emit(division);
  }
  showBrandDetails(drugId: number) {
    console.log('drugId: ' + drugId);
    this.showBrandDetailsEvent.emit(Number(drugId));
  }
  formatNumber(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }
}
