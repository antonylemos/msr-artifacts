import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      loadRemoteModule('marAberto', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'intranet',
    loadChildren: () =>
      loadRemoteModule('intranet', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'admin',
    loadChildren: () =>
      loadRemoteModule('admin', './Routes').then((m) => m.remoteRoutes),
  },
];
