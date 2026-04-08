"use client";

import { Product } from "@/lib/supabase";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useState } from "react";

export function ProductAddToCart({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="space-y-4">
      {/* Quantity selector */}
      <div className="flex items-center gap-4">
        <span className="font-display text-sm font-bold text-zinc-500 uppercase tracking-tight">
          Quantité
        </span>
        <div className="flex items-center border border-white/10">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-3 hover:bg-white/5 transition-colors duration-200 text-zinc-500 hover:text-white"
          >
            <Minus size={14} />
          </button>
          <span className="px-6 py-3 font-display font-bold text-white border-x border-white/10">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="p-3 hover:bg-white/5 transition-colors duration-200 text-zinc-500 hover:text-white"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      <Button
        variant={added ? "outline" : "primary"}
        size="lg"
        fullWidth
        onClick={handleAdd}
        disabled={isOutOfStock}
      >
        <ShoppingCart size={20} />
        {isOutOfStock
          ? "Rupture de stock"
          : added
          ? "✓ Ajouté au panier !"
          : "Ajouter au panier"}
      </Button>
    </div>
  );
}
