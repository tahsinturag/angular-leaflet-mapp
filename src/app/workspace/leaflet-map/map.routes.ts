/*
=== What this file does? ===
This file is like a road map for our web app! 
It tells the app where to go when someone visits different pages.

Right now, it has just one route:
- When someone visits the main map page (empty path ''),
  it shows them the LeafletMapContainerComponent
  (which is our interactive map screen)
"
*/

import { Routes } from '@angular/router';
import { LeafletMapContainerComponent } from './containers/leaflet-map-container/leaflet-map-container.component';
// import { LeafletMapComponent } from './containers/leaflet-map-container/leaflet-map-container.component';

export const mapRoutes: Routes = [
  {
    path: '',
    component: LeafletMapContainerComponent,
  },
];
