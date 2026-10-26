import Image from "next/image";
import type { CartItem, CartState } from "@/store/cartStore";

type CartItemProps = {
  item: CartItem;
  updateQuantity: CartState["updateQuantity"];
  removeItem: CartState["removeItem"];
};

/**
 * Renders a single item in the shopping cart, including controls
 * for quantity and removal.
 */
export function CartItemCard({
  item,
  updateQuantity,
  removeItem,
}: CartItemProps) {
  return (
    <li className="flex flex-col sm:flex-row items-center gap-4 py-6 border-b">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          style={{ objectFit: "contain" }}
          className="rounded-md"
        />
      </div>
      <div className="flex-grow text-center sm:text-left">
        <h3 className="font-semibold text-lg text-slate-800">{item.name}</h3>
        <p className="text-sm text-slate-500">${item.price.toFixed(2)} each</p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 text-sm hover:underline mt-2 font-medium hover:cursor-pointer"
        >
          Remove
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateQuantity(item.id, "decrease")}
          className="px-3 py-1 border rounded-md hover:bg-slate-100 transition text-black hover:cursor-pointer"
        >
          -
        </button>
        <span className="font-semibold w-8 text-center text-black">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, "increase")}
          className="px-3 py-1 border rounded-md hover:bg-slate-100 transition text-black hover:cursor-pointer"
        >
          +
        </button>
      </div>
      <p className="font-bold text-lg w-24 text-right text-slate-900">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </li>
  );
}
