/**
 * Purpose:
 * Automatically adds the base URL (e.g., 'https://api.example.com') to all HTTP requests
 * 
 * Why:
 * - Avoids repeating base URLs in every API call
 * - Makes environment switching easier (dev/staging/prod)
 * - Keeps all URL management in one place
 */

import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// Define our interceptor as a function that takes a request and handler
export const BaseUrlInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,    // Original request
  next: HttpHandlerFn       // Next handler in the chain
): Observable<HttpEvent<any>> => {
  // Get base URL from environment (e.g., 'https://api.example.com')
  const url = environment.BASE_URL;
  
  // Add base URL to request
  // Before: '/users'
  // After: 'https://api.example.com/users'
  const apiReq = req.clone({ url: url + req.url });

  // Continue with the modified request
  return next(apiReq);
};