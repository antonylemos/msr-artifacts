import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';
import { Fallback } from './components/fallback/fallback';

export const fallbackRoutes: Routes = [{ path: '', component: Fallback }];

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      loadRemoteModule('remote', './Component')
        .then((m) => m.App)
        .catch((error) => {
          console.error('Error loading remote component', error);
          return Fallback;
        }),
  },
  {
    path: 'flights',
    // loadChildreas instead of loadComponent !!!
    loadChildren: () =>
      loadRemoteModule('remote', './routes')
        .then((m) => m.APP_ROUTES)
        .catch((error) => {
          console.error('Error loading remote component', error);
          return fallbackRoutes;
        }),
  },
];
