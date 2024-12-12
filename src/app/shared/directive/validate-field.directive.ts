import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appValidateField]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidateFieldDirective,
      multi: true,
    },
  ],
})
export class ValidateFieldDirective implements Validator {
  // Regular expressions for email and username
  private emailRegex: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email regex
  private usernameRegex: RegExp = /^[a-zA-Z0-9_]{3,20}$/; // Username: alphanumeric and underscores, 3-20 chars

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // If the field is empty, return null (no error). Optional validation can be handled separately.
    if (!value) {
      return null;
    }

    // Validate if it matches either email or username
    const isValidEmail = this.emailRegex.test(value);
    const isValidUsername = this.usernameRegex.test(value);

    if (!isValidEmail && !isValidUsername) {
      return { validateField: 'The value must be a valid email or username.' };
    }

    return null; // No errors
  }
}
