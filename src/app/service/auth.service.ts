/**
 * Purpose: Authentication Service
 * This service handles all authentication-related operations like login, logout, 
 * and session management. Currently implements a basic structure with mock data,
 * intended to be replaced with real authentication logic.
 * 
 * Why: Centralizes all authentication logic in one service, following Angular's
 * best practices for separation of concerns. Makes authentication reusable
 * across the application.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SigninInfo } from '../workspace/auth/models/auth.models';

// Injectable decorator to make this service available for dependency injection
@Injectable({
  // 'root' means this service is a singleton and shared across the entire app
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  /**
   * Authenticates a user with their login credentials
   * @param loginInfo - Contains user credentials (username/password)
   * @returns Observable that emits authentication result
   * 
   * Note: Currently returns mock success response.
   * TODO: Replace with real authentication logic that:
   * - Validates credentials against backend
   * - Handles error cases
   * - Stores authentication tokens
   */
  login(loginInfo: SigninInfo): Observable<any> {
    return of({
      success: true,
    });
  }
}
