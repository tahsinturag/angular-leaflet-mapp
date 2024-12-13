/*
PURPOSE OF THIS FILE:
This is the main setup file for our Angular app. Think of it like setting up a new phone:
- We need to install basic apps (providers)
- Set up internet connection (HTTP)
- Set up navigation (router)
*/

// Import necessary tools from Angular
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { BaseUrlInterceptor } from './core/interceptors/base-url.interceptor';

// This is our main app configuration (like a settings menu)
export const appConfig: ApplicationConfig = {
  providers: [
    // Makes our app faster by grouping similar changes together
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Sets up navigation in our app (like a map for different pages)
    provideRouter(routes),

    // Sets up internet communication with a special helper (interceptor)
    // that adds the base URL to all our requests
    provideHttpClient(withInterceptors([BaseUrlInterceptor])),
  ],
};
