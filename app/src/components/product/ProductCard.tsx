"use client";

import { Product } from "@/lib/supabase";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";
import { clsx } from "clsx";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div
      className={clsx(
        "group relative bg-zinc-950 flex flex-col",
        "transition-all duration-500 hover:bg-zinc-900/50",
        "border border-white/5",
        className
      )}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900">
        <Image
          src={product.image_url || "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        {/* Featured badge */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 bg-purple-500 px-2 py-0.5 text-black text-xs font-display font-bold tracking-tight">
            FEATURED
          </div>
        )}
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => addItem(product)}
            className="p-3 bg-purple-400 text-black hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-200 hover:scale-110"
            title="Ajouter au panier"
          >
            <ShoppingCart size={18} />
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="p-3 bg-zinc-950 text-white hover:bg-zinc-900 transition-all duration-200 hover:scale-110"
            title="Voir le produit"
          >
            <Eye size={18} />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-display text-purple-400 tracking-tight uppercase">
              {product.brand}
            </p>
            <h3 className="font-display font-bold text-white text-base leading-tight mt-0.5 group-hover:text-purple-400 transition-colors duration-300">
              {product.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="font-display font-bold text-lg text-white">
              {product.price.toLocaleString("fr-FR")} €
            </p>
          </div>
        </div>

        {product.description && (
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 font-sans">
            {product.description}
          </p>
        )}

        {/* Specs chips */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {Object.entries(product.specs).slice(0, 2).map(([key, value]) => (
              <span
                key={key}
                className="bg-white/5 text-zinc-400 text-xs px-2 py-0.5 font-display font-medium tracking-tight"
              >
                {value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3">
          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={() => addItem(product)}
          >
            <ShoppingCart size={16} />
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
}
