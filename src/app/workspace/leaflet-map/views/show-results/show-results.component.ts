import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HelperService } from '../../../../service/helper.service';
import { DistrictCoordinateResponse } from '../../models/demographic.model';
import { DivisionListView, DivisionView } from '../../models/division.models';
import { MarketShareResponse } from '../../models/market-share.model';
import {
  DrugReportResponse,
  TopBrandResponse,
} from '../../models/top-brands.model';
import { BrandDetailsComponent } from '../brand-details/brand-details.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-show-results',
  standalone: true,
  imports: [TableComponent, BrandDetailsComponent, CommonModule],
  templateUrl: './show-results.component.html',
  styleUrls: ['./show-results.component.css'],
})
export class ShowResultsComponent {
  @Input() divisionName: string = '';
  @Input() isShowDivisionDetails: boolean = false;
  @Input() divisionsDataList: DivisionView[] = [];
  @Input() districtDataList: DistrictCoordinateResponse[] = [];
  @Input() topBrandList: TopBrandResponse[] = [];
  @Input() marketShareList: MarketShareResponse[] = [];
  @Input() showBrandDetails: boolean = false;
  @Input() brandDetailData!: DrugReportResponse;
  @Input() tableTabType: string = 'demographic';
  @Input() totalBdSales: number = 0;
  @Output() showDistrictsEvent = new EventEmitter<DivisionListView>();
  @Output() goBackEvent = new EventEmitter<void>();
  @Output() tabClickEvent = new EventEmitter<string>();
  @Output() showBrandDetailsEvent = new EventEmitter<number>();

  divisionId: string | null = null;

  constructor(public helperService: HelperService) {}
  ngOnInit() {
    this.divisionId = localStorage.getItem('divisionId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('marketShareList', this.marketShareList);
    this.divisionId = localStorage.getItem('divisionId');
  }
  onTabClick(tabType: string) {
    this.helperService.setTabItem(tabType);
    this.tabClickEvent.emit(tabType);
  }

  onShowDistricts(division: DivisionListView) {
    this.showDistrictsEvent.emit(division);
  }

  onShowBrandDetails(drugId: number) {
    this.showBrandDetailsEvent.emit(drugId);
  }

  onGoBack() {
    this.goBackEvent.emit();
  }
}
