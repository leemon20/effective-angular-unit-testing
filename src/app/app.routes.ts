import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./parent-component/parent.component').then((m) => m.ParentComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
