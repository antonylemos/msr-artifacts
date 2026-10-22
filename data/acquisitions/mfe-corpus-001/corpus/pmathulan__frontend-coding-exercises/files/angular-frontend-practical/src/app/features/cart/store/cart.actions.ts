import { createAction, props } from '@ngrx/store';
import { CartItem } from '../models/cart-item.model';

// Add a new item to the cart
export const addItemAction = createAction(
    '[Cart] Add Item',
    props<{ item: CartItem }>()
);

// Remove item by ID
export const removeItemAction = createAction(
    '[Cart] Remove Item',
    props<{ id: string }>()
);

// Update item quantity
export const updateQuantityAction = createAction(
    '[Cart] Update Quantity',
    props<{ id: string; quantity: number }>()
);

// Load items from storage (or API in future)
export const loadFromStorageAction = createAction(
    '[Cart] Load From Storage',
);

// load success action
export const loadFromStorageSuccessAction = createAction(
    '[Cart] Load From Storage Success',
    props<{ items: CartItem[] }>()
);
