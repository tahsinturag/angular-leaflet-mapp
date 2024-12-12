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
  public regForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signIn() {
    if (this.regForm.valid) {
      console.log(this.regForm.value);
      this.authService.login(this.regForm.value).subscribe({
        next: (response) => {
          if (response?.success) {
            this.router.navigate(['/leaflet-map']);
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.markFormGroupTouched(this.regForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
