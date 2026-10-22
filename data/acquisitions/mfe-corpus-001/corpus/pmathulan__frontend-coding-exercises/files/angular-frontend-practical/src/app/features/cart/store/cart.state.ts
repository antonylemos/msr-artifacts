import { CartItem } from "../models/cart-item.model";

export interface CartState {
    items: CartItem[];
    isLoading: boolean;
}

export const initialCartState: CartState = {
    items: [],
    isLoading: false,
};
