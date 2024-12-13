// Purpose: This is a Sign-In component for a web application
// Why: We need this to let users log into our app

// Import necessary tools from Angular
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidateFieldDirective } from '../../../../shared/directive/validate-field.directive';

// @Component tells Angular this is a component
// Think of it like a building block of our app
@Component({
  // This is how we'll use this component in our HTML: <app-signin>
  selector: 'app-signin',
  // standalone: true means this component can work by itself
  standalone: true,
  // These are other pieces we need for this component to work
  imports: [CommonModule, ReactiveFormsModule, ValidateFieldDirective],
  // Points to the HTML file that shows how this looks
  templateUrl: './signin.component.html',
  // Points to the CSS file that makes it look pretty
  styleUrls: ['./signin.component.css'],
})
export class SignInComponent {
  // @Input means we'll receive a form from the parent component
  // The '!' means we promise this will be filled in later
  @Input() regForm!: FormGroup;

  // @Output creates a special signal we can send to the parent
  // Like raising your hand in class to get attention
  @Output() signIn = new EventEmitter<void>();

  // This function runs when someone clicks the sign-in button
  // It sends a signal to the parent component saying "Hey, someone clicked sign in!"
  onSignIn() {
    this.signIn.emit();
  }
}
