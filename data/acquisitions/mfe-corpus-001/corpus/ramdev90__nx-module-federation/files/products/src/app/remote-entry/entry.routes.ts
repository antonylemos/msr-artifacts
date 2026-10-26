import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { ProductList } from '../product-list';

export const remoteRoutes: Route[] = [
    { path: '', component: RemoteEntry },
    { path: 'list', component: ProductList },
];
