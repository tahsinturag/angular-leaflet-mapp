import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidateFieldDirective } from '../../../../shared/directive/validate-field.directive';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidateFieldDirective],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SignInComponent {
  @Input() regForm!: FormGroup;
  @Output() signIn = new EventEmitter<void>();

  onSignIn() {
    this.signIn.emit();
  }
}
