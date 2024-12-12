import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/signin',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./workspace/auth/auth.routes').then(
        (routes) => routes.authRoutes
      ),
  },
  {
    path: 'leaflet-map',
    loadChildren: () =>
      import('./workspace/leaflet-map/map.routes').then(
        (routes) => routes.mapRoutes
      ),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
