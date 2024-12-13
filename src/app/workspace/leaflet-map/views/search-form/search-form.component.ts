/**
 * Purpose of this Component:
 * This is a search form that helps users find medicines by:
 * 1. Medicine name (generic name like Paracetamol)
 * 2. Company name (vendor name like Company X)
 * 3. Time period (start date and end date)
 * 
 * Why this Component is Important:
 * - Makes searching for medicines easy
 * - Shows suggestions while typing to help users
 * - Makes sure all required information is filled correctly
 */

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../../../../service/post.service';

/**
 * These are like containers that define what information we need:
 * - For medicine names (like Paracetamol)
 */
interface GenericSuggestion {
  id: number;
  genericName: string;
}

/**
 * - For company names (like Company X)
 */
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
  /**
   * These are like messengers that send information to other parts of the app
   * - search: Tells when to start searching
   * - close: Tells when to close something
   * - closeModalEmitter: Tells when to close the popup window
   * - searchParamEmitter: Sends the search information
   */
  @Output() search = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() closeModalEmitter = new EventEmitter<void>();
  @Output() searchParamEmitter = new EventEmitter<any>();
  
  // This is our main search form
  public searchForm!: FormGroup;

  /**
   * Lists to store suggestions that appear while typing:
   
   */
  public suggestions: GenericSuggestion[] = [];
  public vendorSuggestions: VendorSuggestion[] = [];
  showSuggestion: boolean = false;
  showVendorSuggestion: boolean = false;

  /**
   * Constructor: Sets up the basic things we need
   * Like getting ready before starting homework
   */
  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  /**
   * This runs when the component starts
   * Sets up the form and watches for what user types
   */
  ngOnInit() {
    // Create the search form
    this.initializeSearchForm();

    /**
     * Watches what user types for medicine name
     * Shows suggestions as they type
     */
    this.searchForm.get('genericId')?.valueChanges.subscribe((input) => {
      if (input && input.length > 0) {
        this.getSuggestions(input);
      } else {
        this.suggestions = [];
        this.showSuggestion = false;
      }
    });

    /**
     * Watches what user types for vendor name
     * Shows suggestions as they type
     */
    this.searchForm.get('vendorId')?.valueChanges.subscribe((input) => {
      if (input && input.length > 0) {
        this.getVendorSuggestions(input);
      } else {
        this.vendorSuggestions = [];
        this.showVendorSuggestion = false;
      }
    });
  }

  /**
   * Creates our search form with all required fields:
  
   */
  initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      genericId: ['', Validators.required],
      vendorId: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  /**
   * Gets medicine name suggestions from the server
   */
  getSuggestions(query: string) {
    this.postService
      .getGenericSuggestions(query)
      .subscribe((response: GenericSuggestion[]) => {
        this.suggestions = response;
        this.showSuggestion = true;
      });
  }

  /**
   * Gets company name suggestions from the server
   * Similar to medicine name suggestions
   */
  getVendorSuggestions(query: string) {
    this.postService
      .getVendorSuggestions(query)
      .subscribe((response: VendorSuggestion[]) => {
        this.vendorSuggestions = response;
        this.showVendorSuggestion = true;
      });
  }

  /**
   * What happens when user clicks on a medicine name suggestion
   */
  selectSuggestion(suggestion: GenericSuggestion) {
    this.searchForm.get('brandId')?.setValue(suggestion.genericName);
    this.suggestions = [];
    this.showSuggestion = false;
  }

  /**
   * What happens when user clicks on a company name suggestion
   */
  selectVendorSuggestion(suggestion: VendorSuggestion) {
    this.searchForm.get('vendorId')?.setValue(suggestion.vendorName);
    this.vendorSuggestions = [];
    this.showVendorSuggestion = false;
  }

  /**
   * Hides suggestions when user clicks away
   * Gives a tiny delay to make sure user can click on suggestions
   */
  onBlur(type: 'generic' | 'vendor') {
    setTimeout(() => {
      if (type === 'generic') {
        this.showSuggestion = false;
      } else {
        this.showVendorSuggestion = false;
      }
    }, 200);
  }

  /**
   * What happens when user clicks the search button
   * Checks if all required fields are filled
   */
  searchHandler() {
    console.log('this.searchForm', this.searchForm);
    if (this.searchForm.valid) {
      this.searchParamEmitter.emit(this.searchForm.value);
    }
  }

  /**
   * Closes the search form popup window
   */
  closeModal(): void {
    this.closeModalEmitter.emit();
  }
}