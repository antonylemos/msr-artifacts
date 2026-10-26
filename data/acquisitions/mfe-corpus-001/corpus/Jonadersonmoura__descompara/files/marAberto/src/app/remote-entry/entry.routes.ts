import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { Home } from '../home/home';
import { Login } from '../login/login';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
    ],
  },
];
