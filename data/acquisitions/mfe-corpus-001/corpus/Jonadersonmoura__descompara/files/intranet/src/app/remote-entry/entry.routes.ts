import { Route } from '@angular/router';
import { roleGuard } from '@descompara/shared-guards';
import { RemoteEntry } from './entry';
import { Home } from '../home/home';
import { Login } from '../login/login';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
      { path: '', component: Home, canActivate: [roleGuard('gerente', 'admin')] },
      { path: 'login', component: Login },
    ],
  },
];
