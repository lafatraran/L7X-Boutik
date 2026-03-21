import { supabase, Product } from "@/lib/supabase";
import { ProductCard } from "@/components/product/ProductCard";
import { Headphones } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessoires High-Tech",
  description: "Découvrez notre sélection d'accessoires premium : écouteurs intelligents, chargeurs rapides, claviers, etc.",
};

async function getAccessoriesProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", "accessory")
    .order("price", { ascending: false });
  return data || [];
}

export default async function AccessoriesPage() {
  const products = await getAccessoriesProducts();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="mb-16 flex items-end gap-6">
        <div className="p-4 bg-cyber-gradient">
          <Headphones size={28} className="text-deep-900" />
        </div>
        <div>
          <span className="font-display text-xs font-bold tracking-tight uppercase text-primary">
            Catégorie
          </span>
          <h1 className="font-display font-black text-5xl tracking-tightest text-onSurface mt-1">
            Accessoires
          </h1>
          <p className="text-onSurfaceVariant font-sans mt-2">
            {products.length} accessoire{products.length !== 1 ? "s" : ""} disponible{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="h-px bg-outlineVariant/30 mb-12" />

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Headphones size={48} className="text-outlineVariant mx-auto mb-4" />
          <p className="font-display text-xl font-bold text-onSurface">Aucun accessoire disponible</p>
        </div>
      )}
    </div>
  );
}
