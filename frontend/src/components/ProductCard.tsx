"use client";

import { ShoppingCart, Zap, Check } from "lucide-react";
import { Product } from "@/types";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product);
    router.push("/cart");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48 bg-gray-50">
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-medium text-gray-500 bg-white/80 px-2 py-0.5 rounded-full z-10">
            {product.badge}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-black truncate pr-2">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-black whitespace-nowrap">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-200"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-gray-400">
            ({product.reviewCount} Reviews)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-black hover:bg-gray-50 transition-colors"
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-600">Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Chart
              </>
            )}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-black text-white rounded-xl text-xs font-medium hover:bg-gray-800 transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
