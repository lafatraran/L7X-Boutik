"use client";

import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalItems, getTotalPrice } =
    useCartStore();

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={clsx(
          "fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 z-50",
          "flex flex-col transition-transform duration-400 ease-in-out",
          "border-l border-white/5",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-purple-400" />
            <span className="font-display font-bold text-white text-lg">
              Panier
            </span>
            {getTotalItems() > 0 && (
              <span className="bg-purple-500 text-black text-xs font-display font-bold px-2 py-0.5">
                {getTotalItems()}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-white/5 transition-colors duration-200 text-zinc-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-zinc-800" />
              <p className="font-display font-bold text-white text-xl">Panier vide</p>
              <p className="text-zinc-500 text-sm font-sans">
                Ajoutez des produits pour commencer votre commande.
              </p>
              <Button variant="ghost" size="sm" onClick={closeCart}>
                Continuer les achats
              </Button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 pb-4 border-b border-white/5 last:border-0"
              >
                <div className="relative w-20 h-20 shrink-0 bg-zinc-900 overflow-hidden">
                  <Image
                    src={product.image_url || ""}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-zinc-500 font-sans mt-0.5">{product.brand}</p>
                  <p className="font-display font-bold text-purple-400 mt-1">
                    {(product.price * quantity).toLocaleString("fr-FR")} €
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 border border-white/10 hover:border-purple-500 text-zinc-500 hover:text-purple-400 transition-colors duration-200"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-display font-bold text-white w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 border border-white/10 hover:border-purple-500 text-zinc-500 hover:text-purple-400 transition-colors duration-200"
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="ml-auto p-1 text-zinc-700 hover:text-red-400 transition-colors duration-200"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 font-sans">Sous-total</span>
              <span className="font-display font-bold text-xl text-white">
                {getTotalPrice().toLocaleString("fr-FR")} €
              </span>
            </div>
            <Link href="/checkout" onClick={closeCart}>
              <Button variant="primary" size="lg" fullWidth>
                Commander
                <ArrowRight size={18} />
              </Button>
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-zinc-500 hover:text-white font-sans transition-colors duration-200"
            >
              Continuer les achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}
