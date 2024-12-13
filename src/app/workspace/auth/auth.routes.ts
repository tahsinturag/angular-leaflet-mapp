// ===== What is this file for? =====
// This file sets up the website's navigation paths for the authentication (login) pages
// Think of it like a map that tells the website where to go when users click different links

// Import the necessary tools from Angular
// (Angular is like a toolbox we use to build websites)
import { Routes } from '@angular/router';

// Import the sign-in page component that we want to show to users
import { SignInContainerComponent } from './containers/signin-container/signin-container.component';

// Create a list of routes (paths) that tell Angular:
// "When a user goes to this URL, show them this page"
export const authRoutes: Routes = [
  {
    // When someone goes to '/signin' in the website
    // (like www.ourwebsite.com/signin)
    path: 'signin',
    
    // Show them the sign-in page we imported above
    component: SignInContainerComponent,
  },
];
