"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { CartItemCard } from "./CartItemCard";
import { OrderSummary } from "./OrderSummary";

/**
 * The main component for displaying the cart. It handles client-side state and hydration.
 * The cart data is persisted in localStorage, which is only accessible in the browser.
 * This component ensures a smooth user experience by handling the difference between
 * the server-rendered state (always empty) and the client-rendered state.
 */
export function CartDisplay() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  // This effect runs once after the component mounts on the client.
  // By setting `isClient` to true, we trigger a re-render and can safely
  // access localStorage data without causing a hydration mismatch error.
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <p className="text-center py-10 text-lg text-slate-500">
        Loading Your Cart...
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-slate-700">
          Your Cart is Empty
        </h2>
        <p className="mt-2 text-slate-500">
          Looks like you haven`&apos;` t added anything yet.
        </p>
      </div>
    );
  }

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold border-b pb-4 mb-6 text-gray-800">
          Your Items ({items.length})
        </h2>
        <ul>
          {items.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          ))}
        </ul>
      </div>
      <OrderSummary totalPrice={totalPrice} />
    </div>
  );
}
