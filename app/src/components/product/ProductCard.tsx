"use client";

import { Product } from "@/lib/supabase";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  // Conversion logic (1 EUR = 5000 Ar)
  const priceInAriary = product.price * 5000;
  
  // Format Ariary: 7.000.000
  const formattedPrice = new Intl.NumberFormat("fr-FR").format(priceInAriary);

  return (
    <div className={clsx(
      "product-card rounded-[32px] overflow-hidden flex flex-col p-8 group h-full",
      className
    )}>
      {/* Product Image Wrapper */}
      <div className="relative h-64 flex items-center justify-center mb-8 shrink-0">
        <Link href={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
            <Image
            src={product.image_url || "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"}
            alt={product.name}
            width={400}
            height={400}
            className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
            unoptimized
            />
        </Link>
        {product.is_featured && (
          <div className="absolute top-0 left-0 bg-white text-black text-[9px] font-black px-3 py-1 rounded-full tracking-[0.1em] uppercase">
            FEATS
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="flex flex-col flex-grow">
        {/* Brand and Rating */}
        <div className="flex justify-between items-center mb-4 h-6">
          <span className="bg-white text-black text-[9px] font-black px-3 py-1 rounded-full tracking-[0.1em] uppercase">
            {product.brand}
          </span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-[11px] text-zinc-400 font-medium">4.9 <span className="opacity-30 ml-1 text-[10px]">(1.2k)</span></span>
          </div>
        </div>

        {/* Title and Price */}
        <div className="mb-6 flex-grow">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-xl text-white tracking-tight mb-2 font-normal hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <p className="text-2xl font-black text-white">{formattedPrice} Ar</p>
        </div>

        {/* Storage Selector (Simulated) */}
        <div className="mb-8">
          <p className="text-[9px] text-zinc-500 uppercase font-black tracking-[0.15em] mb-3">SELECT STORAGE</p>
          <div className="flex gap-2 h-10">
            {["128", "256", "512"].map((size) => {
              const isActive = product.specs?.storage?.includes(size) || (size === "256" && !product.specs?.storage);
              return (
                <button
                  key={size}
                  className={clsx(
                    "w-10 h-10 rounded-lg text-[10px] flex items-center justify-center transition-all",
                    isActive
                      ? "bg-white text-black font-black"
                      : "border border-white/10 text-white hover:border-primary hover:text-primary font-bold"
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => addItem(product)}
            className="flex-grow bg-primary text-black font-black py-4 rounded-full text-[10px] uppercase tracking-[0.2em] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-[0.98]"
          >
            BUY NOW
          </button>
          <button
            onClick={() => addItem(product)}
            className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-zinc-200 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
