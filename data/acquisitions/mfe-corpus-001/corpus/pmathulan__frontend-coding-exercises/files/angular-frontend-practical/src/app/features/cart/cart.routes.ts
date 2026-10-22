import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';
import { CartListPageComponent } from './pages/cart-list-page/cart-list-page.component';

export const cartRoutes: Routes = [
    {
        path: '',
        component: CartListPageComponent
    },
];
