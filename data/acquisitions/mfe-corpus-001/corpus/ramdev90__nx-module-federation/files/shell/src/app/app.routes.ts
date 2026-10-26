import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'customer',
    loadChildren: () => import('customer/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'orders',
    loadChildren: () => import('orders/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'products',
    loadChildren: () => import('products/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
