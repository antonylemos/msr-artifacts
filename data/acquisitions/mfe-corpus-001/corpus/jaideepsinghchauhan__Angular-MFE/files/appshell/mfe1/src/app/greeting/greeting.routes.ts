import { Route } from '@angular/router';

export const greetingRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./greeting.component').then((m) => m.GreetingComponent),
  },
];
