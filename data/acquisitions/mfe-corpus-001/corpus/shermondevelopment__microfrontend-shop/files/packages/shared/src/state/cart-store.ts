import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartProduct } from "@microfrontend/types";

interface CartStore {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: number) => void;
  removeAllProduct: (productId: number) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      products: [],

      addProduct: (product) =>
        set((state) => {
          const existing = state.products.find(
            (item) => item.id === product.id
          );

          if (existing) {
            return {
              products: state.products.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            products: [...state.products, { ...product, quantity: 1 }],
          };
        }),

      removeProduct: (productId) =>
        set((state) => {
          const product = state.products.find(
            (item) => item.id === productId
          );

          if (!product) return state;

          if (product.quantity > 1) {
            return {
              products: state.products.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }

          return {
            products: state.products.filter(
              (item) => item.id !== productId
            ),
          };
        }),

      removeAllProduct: (productId) =>
        set((state) => ({
          products: state.products.filter(
            (item) => item.id !== productId
          ),
        })),
    }),
    {
      name: "cart-storage",
    }
  )
);