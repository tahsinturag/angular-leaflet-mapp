import { Routes } from '@angular/router';
import { SignInContainerComponent } from './containers/signin-container/signin-container.component';

export const authRoutes: Routes = [
  {
    path: 'signin',
    component: SignInContainerComponent,
  },
];
