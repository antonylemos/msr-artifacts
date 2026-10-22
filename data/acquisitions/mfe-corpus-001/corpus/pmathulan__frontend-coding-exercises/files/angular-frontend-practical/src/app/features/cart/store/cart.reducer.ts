import { createReducer, on } from '@ngrx/store';
import { initialCartState } from './cart.state';
import { addItemAction, loadFromStorageAction, loadFromStorageSuccessAction, removeItemAction, updateQuantityAction } from './cart.actions';

export const cartReducer = createReducer(
    initialCartState,

    // Add item
    on(addItemAction, (state, { item }) => {
        const existing = state.items.find(i => i.id === item.id);
        if (existing) {
            // Update quantity
            return {
                ...state,
                items: state.items.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                )
            };
        }
        return {
            ...state,
            items: [...state.items, item]
        };
    }),

    // Remove item
    on(removeItemAction, (state, { id }) => ({
        ...state,
        items: state.items.filter(i => i.id !== id)
    })),

    // Update quantity
    on(updateQuantityAction, (state, { id, quantity }) => ({
        ...state,
        items: state.items.map(i =>
            i.id === id ? { ...i, quantity } : i
        )
    })),

    // Load from local storage
    on(loadFromStorageAction, (state) => ({
        ...state,
        isLoading: true,
    })),

    on(loadFromStorageSuccessAction, (state, { items }) => ({
        ...state,
        items,
        isLoading: false
    }))
);
