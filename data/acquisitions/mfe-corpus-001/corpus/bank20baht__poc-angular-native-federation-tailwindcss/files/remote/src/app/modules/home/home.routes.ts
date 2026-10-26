import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/staff/staff').then((m) => m.Staff),
  },
  {
    path: 'staff-info',
    loadComponent: () =>
      import('./components/staff-info/staff-info').then((m) => m.StaffInfo),
  },
];
