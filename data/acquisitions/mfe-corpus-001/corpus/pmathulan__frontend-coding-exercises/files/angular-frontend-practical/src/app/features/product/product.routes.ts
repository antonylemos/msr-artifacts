import { Routes } from '@angular/router';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';

export const productRoutes: Routes = [
    {
        path: '',
        component: ProductListPageComponent,
    },
];
