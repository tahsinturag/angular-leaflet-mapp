// ===================================================
// PURPOSE: This file defines what login information looks like
// WHY: We need to make sure users provide both username and password
//      when they try to sign in to the application
// ===================================================

// SigninInfo is like a form that contains:
// 1. userName - where users type their username
// 2. password - where users type their password
export interface SigninInfo {
  userName: string;   // stores the username as text
  password: string;   // stores the password as text
}
