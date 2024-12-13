/*
PURPOSE OF THIS FILE:
This is a settings file for when our app is running in production mode (the real, live version).
Think of it like telling our app where to find its backend server (like giving it an address).

WHY WE NEED THIS:
- Just like you need your friend's address to visit them
- Our app needs to know where to send/receive data
- This file helps our app know exactly where to find that information
*/

// This is the main address (URL) where our app's backend server lives
const API_BASE_URL = 'http://192.168.0.109:8083/api/';

// These are the settings our app will use when it's running for real users
export const environment = {
  // This tells our app it's running in production mode (the real, live version)
  production: true,
  
  // This is where we store the server address so our app can use it
  // whenever it needs to talk to the backend
  BASE_URL: API_BASE_URL,
};
