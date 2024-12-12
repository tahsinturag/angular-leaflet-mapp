import { Routes } from '@angular/router';
import { LeafletMapContainerComponent } from './containers/leaflet-map-container/leaflet-map-container.component';
// import { LeafletMapComponent } from './containers/leaflet-map-container/leaflet-map-container.component';

export const mapRoutes: Routes = [
  {
    path: '',
    component: LeafletMapContainerComponent,
  },
];
