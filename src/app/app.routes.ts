import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LayoutComponent } from './core/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path:'',
    component: LayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path:'inicio',
        component: HomeComponent,
      }
    ]
  },
];
