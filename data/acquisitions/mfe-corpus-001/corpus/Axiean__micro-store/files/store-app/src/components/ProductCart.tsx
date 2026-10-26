"use client"; // This component is now interactive, so it must be a client component

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({ id, name, price, imageUrl });
    alert(`${name} added to cart!`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col">
      <div className="relative w-full h-60">
        <Image
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "contain" }}
          className="p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 border-t flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>

        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
