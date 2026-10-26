"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Header() {
  const items = useCartStore((state) => state.items);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm ">
      <nav className="container mx-auto px-6  flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-slate-800 hover:text-slate-600 transition-colors"
          >
            NextJS Store
          </Link>
        </div>
        <div>
          <a href="/cart" className="relative p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-slate-600 hover:text-slate-800 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {isClient && totalItems > 0 && (
              <span className="absolute top-2 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                {totalItems}
              </span>
            )}
          </a>
        </div>
      </nav>
    </header>
  );
}
