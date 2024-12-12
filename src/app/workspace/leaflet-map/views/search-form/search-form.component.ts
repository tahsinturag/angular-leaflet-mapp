import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../../service/post.service';

// GenericSuggestion interface
interface GenericSuggestion {
  id: number;
  genericName: string;
}

// VendorSuggestion interface
interface VendorSuggestion {
  id: number;
  vendorName: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class SearchFormComponent implements OnInit {
  // @Input() searchForm!: FormGroup;
  @Output() search = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() searchParamEmitter = new EventEmitter<any>();
  public searchForm!: FormGroup;

  // vendor and generic suggestions property
  public suggestions: GenericSuggestion[] = [];
  public vendorSuggestions: VendorSuggestion[] = [];
  showSuggestion: boolean = false;
  showVendorSuggestion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.initializeSearchForm();

    // generic suggestions logic
    this.searchForm.get('genericId')?.valueChanges.subscribe((input) => {
      if (input && input.length > 0) {
        this.getSuggestions(input);
      } else {
        this.suggestions = [];
        this.showSuggestion = false;
      }
    });

    // vendor suggestions logic
    this.searchForm.get('vendorId')?.valueChanges.subscribe((input) => {
      if (input && input.length > 0) {
        this.getVendorSuggestions(input);
      } else {
        this.vendorSuggestions = [];
        this.showVendorSuggestion = false;
      }
    });
  }

  initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      genericId: ['', Validators.required],
      vendorId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  // get generic suggestions method
  getSuggestions(query: string) {
    this.postService
      .getGenericSuggestions(query)
      .subscribe((response: GenericSuggestion[]) => {
        this.suggestions = response;
        this.showSuggestion = true;
      });
  }

  // get vendor suggestions method
  getVendorSuggestions(query: string) {
    this.postService
      .getVendorSuggestions(query)
      .subscribe((response: VendorSuggestion[]) => {
        this.vendorSuggestions = response;
        this.showVendorSuggestion = true;
      });
  }

  // generic suggestion selection method
  selectSuggestion(suggestion: GenericSuggestion) {
    this.searchForm.get('brandId')?.setValue(suggestion.genericName);
    this.suggestions = [];
    this.showSuggestion = false;
  }

  // vendor suggestion selection method
  selectVendorSuggestion(suggestion: VendorSuggestion) {
    this.searchForm.get('vendorId')?.setValue(suggestion.vendorName);
    this.vendorSuggestions = [];
    this.showVendorSuggestion = false;
  }

  onBlur(type: 'generic' | 'vendor') {
    setTimeout(() => {
      if (type === 'generic') {
        this.showSuggestion = false;
      } else {
        this.showVendorSuggestion = false;
      }
    }, 200);
  }

  searchHandler() {
    console.log('this.searchForm', this.searchForm);
    if (this.searchForm.valid) {
      this.searchParamEmitter.emit(this.searchForm.value);
    }
  }

  closeModal(): void {
    this.closeModalEmitter.emit();
  }
}
