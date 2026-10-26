import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'mfe2',
    loadChildren: () => import('mfe2/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'mfe1',
    loadChildren: () => import('mfe1/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'greeting',
    loadChildren: () =>
      import('mfe1/GreetingRoutes').then((m) => m.greetingRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
