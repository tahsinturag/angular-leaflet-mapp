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
  @Input() brandDetailData!: DrugReportResponse;
}
