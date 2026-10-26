import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'greeting',
    loadChildren: () =>
      import('./greeting/greeting.routes').then((m) => m.greetingRoutes),
  },
];
