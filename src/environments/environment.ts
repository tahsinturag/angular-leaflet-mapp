/*
PURPOSE OF THIS FILE:
This is like a settings file for our website/app. 
It stores important information that we use throughout our application.

WHY WE NEED THIS:
- We need to tell our app where to find our server (API)
- Different settings are needed when we're developing vs when the app is live
- It's easier to change settings in one place than everywhere in our code
*/

// This is the address where our server (API) lives
// Like a home address, it tells our app where to send/receive data
// Format: http://computer-address:port-number/api/
const API_BASE_URL = 'http://192.168.0.109:8083/api/';

// These are our app's settings that we can use anywhere in our code
export const environment = {
  // This tells us if we're in development mode (false) or live mode (true)
  production: false,
  
  // This is the same server address we defined above
  // We use this when we need to talk to our server
  BASE_URL: API_BASE_URL,
};
