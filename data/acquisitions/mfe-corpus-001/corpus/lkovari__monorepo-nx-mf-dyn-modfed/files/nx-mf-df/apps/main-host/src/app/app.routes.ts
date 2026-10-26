import { Route } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

import { Home } from './home/home';

export const appRoutes: Route[] = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'mf_remote_a',
        loadComponent: () =>
            loadRemoteModule('mf_remote_a', './Component').then((m) => m.App),
    },
    {
        path: 'mf_remote_b',
        loadComponent: () =>
            loadRemoteModule('mf_remote_b', './Component').then((m) => m.App),
    },
    {
        path: 'mf_remote_c',
        loadComponent: () =>
            loadRemoteModule('mf_remote_c', './Component').then((m) => m.App),
    },
];
