import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HelperService } from '../../../../service/helper.service';
import { SearchFormParam } from '../../models/search.models';
import { SearchFormComponent } from '../../views/search-form/search-form.component';

@Component({
  selector: 'app-search-form-container',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SearchFormComponent],
  templateUrl: './search-form-container.component.html',
  styleUrls: ['./search-form-container.component.css'],
})
export class SearchFormContainerComponent implements OnInit {
  @Output() closeModalEmiter = new EventEmitter();
  @Output() searchParamEmiter = new EventEmitter();
  public searchForm!: FormGroup;
  public tabType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.tabType = this.helperService.getTabItem();
  }

  searchHandler(searchParam: SearchFormParam) {
    console.log('this.tabType', this.tabType);
    console.log('searchParam', searchParam);
    if (searchParam) {
      this.searchParamEmiter.emit(searchParam);
      this.helperService.setTabItem(this.tabType || 'demographic');
      // Add your search logic here
    }
  }

  closeModal(): void {
    this.closeModalEmiter.emit();
  }
}
