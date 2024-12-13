// Purpose: This component handles the sign-in form and its logic
// Why: We need this to let users log into our application securely

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth.service';
import { SignInComponent } from '../../views/signin/signin.component';

@Component({
  selector: 'app-signin-container',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignInComponent],
  templateUrl: './signin-container.component.html',
  styleUrls: ['./signin-container.component.css'],
})
export class SignInContainerComponent implements OnInit {
  // This will store our sign-in form
  public regForm!: FormGroup;

  // These are the tools we need to make our sign-in work
  constructor(
    private fb: FormBuilder,    // Helps create forms
    private router: Router,     // Helps navigate between pages
    private authService: AuthService  // Handles login/logout
  ) {}

  // This runs when the component starts
  ngOnInit(): void {
    // Create a form with username and password fields
    this.regForm = this.fb.group({
      // Username must be at least 4 characters
      userName: ['', [Validators.required, Validators.minLength(4)]],
      // Password must be at least 6 characters
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // This function runs when user clicks sign in button
  signIn() {
    // Check if the form is filled correctly
    if (this.regForm.valid) {
      // Show form data in console (for debugging)
      console.log(this.regForm.value);
      
      // Try to log in the user
      this.authService.login(this.regForm.value).subscribe({
        // If login is successful
        next: (response) => {
          if (response?.success) {
            // Go to the map page wooooooooooooooow
            this.router.navigate(['/leaflet-map']);
          }
        },
        // If there's an error
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      // If form is not valid, show errors
      this.markFormGroupTouched(this.regForm);
    }
  }

  // This function shows errors for unfilled required fields
  markFormGroupTouched(formGroup: FormGroup) {
    // Look at each field in the form
    Object.values(formGroup.controls).forEach((control) => {
      // Mark it as touched to show error messages
      control.markAsTouched();

      // If it's a group of fields, check those too
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}