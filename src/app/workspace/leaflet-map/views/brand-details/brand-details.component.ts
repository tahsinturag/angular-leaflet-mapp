/*
Purpose of this Component:
-------------------------
This is a display component that shows details about a specific drug brand.
It receives drug information from its parent component and displays it.

Why we need this:
----------------
- We need to show detailed information about different drug brands
- This component makes it easy to reuse the same layout for different brands
- It's a standalone component, which means it can work independently
*/

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DrugReportResponse } from '../../models/top-brands.model';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css',
})
export class BrandDetailsComponent {
  // This component expects to receive drug brand data from its parent
  // The '!' means this data must be provided when using this component
  @Input() brandDetailData!: DrugReportResponse;
}
