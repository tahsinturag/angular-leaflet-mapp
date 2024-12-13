/*
Purpose of this Component:
- This is a container component that handles the search form functionality
- It manages the search form and communicates between the parent component and search form view
- It helps organize and process search parameters before sending them to other parts of the app

Why this Component exists:
- To separate the logic of handling search from the visual part (SearchFormComponent)
- To manage communication between different parts of the application
- To handle form data and user interactions in an organized way
*/

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HelperService } from '../../../../service/helper.service';
import { SearchFormParam } from '../../models/search.models';
import { SearchFormComponent } from '../../views/search-form/search-form.component';

@Component({
  selector: 'app-search-form-container', // HTML tag name to use this component
  standalone: true, // This component can work independently
  imports: [ReactiveFormsModule, CommonModule, SearchFormComponent], // Required modules and components
  templateUrl: './search-form-container.component.html', // Link to HTML file
  styleUrls: ['./search-form-container.component.css'], // Link to CSS file
})
export class SearchFormContainerComponent implements OnInit {
  // Send signals to parent component
  @Output() closeModalEmiter = new EventEmitter(); // For closing the modal
  @Output() searchParamEmiter = new EventEmitter(); // For sending search parameters

  // Important variables used in this component
  public searchForm!: FormGroup; // Stores the form data
  public tabType: string = ''; // Keeps track of which tab is selected

  // Constructor: sets up the component with needed services
  constructor(
    private formBuilder: FormBuilder, // Helps create forms
    private helperService: HelperService // Helps with utility functions
  ) {}

  // Runs when component starts
  ngOnInit() {
    this.tabType = this.helperService.getTabItem(); // Get the current tab type
  }

  // Handles what happens when user searches
  searchHandler(searchParam: SearchFormParam) {
    console.log('this.tabType', this.tabType);
    console.log('searchParam', searchParam);
    if (searchParam) {
      this.searchParamEmiter.emit(searchParam); // Send search parameters to parent
      this.helperService.setTabItem(this.tabType || 'demographic'); // Save the tab type
    }
  }

  // Function to close the modal window
  closeModal(): void {
    this.closeModalEmiter.emit(); // Tell parent component to close modal
  }
}