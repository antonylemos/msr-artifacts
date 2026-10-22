import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'cart',
        loadChildren: () =>
            import('./features/cart/cart.routes').then(m => m.cartRoutes)
    },
    {
        path: 'onpush',
        loadChildren: () =>
            import('./features/onpush/onpush.routes').then(m => m.onPushRoutes),
    },
    {
        path: 'products',
        loadChildren: () =>
            import('./features/product/product.routes').then(m => m.productRoutes),
    },
    {
        path: '**',
        component: HomePageComponent
    }
];
