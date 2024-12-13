/*
PURPOSE OF THIS FILE:
This file is like a map for our website! It tells the website which pages to show
when users click different links or type different URLs.

HOW IT WORKS:
- Think of it like giving directions to different rooms in a big building
- Each 'path' is like a different room's address
- When someone tries to go to an address, this map tells them where to go
*/

import { Routes } from '@angular/router';

export const routes: Routes = [
  // When someone comes to the website with no specific page (just the main URL),
  // automatically send them to the sign-in page
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/signin',
  },

  // This is for all pages related to logging in and signing up
  // The code for these pages is kept in a separate file to keep things organized
  {
    path: 'auth',
    loadChildren: () =>
      import('./workspace/auth/auth.routes').then(
        (routes) => routes.authRoutes
      ),
  },

  // This is for the map feature of our website
  // Like the auth pages, we keep this code separate to stay organized
  {
    path: 'leaflet-map',
    loadChildren: () =>
      import('./workspace/leaflet-map/map.routes').then(
        (routes) => routes.mapRoutes
      ),
  },

  // If someone tries to go to a page that doesn't exist (like typing the wrong URL),
  // send them back to the main page instead of showing an error
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
