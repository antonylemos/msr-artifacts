import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCartState,
    state => state.items
);

export const selectCartItemCount = createSelector(
    selectCartItems,
    items => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartTotal = createSelector(
    selectCartItems,
    items => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectCartIsLoading = createSelector(
    selectCartState,
    (state: CartState) => state.isLoading
);
