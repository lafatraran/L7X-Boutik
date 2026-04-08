import { supabase, Product } from "@/lib/supabase";
import { ProductCard } from "@/components/product/ProductCard";
import { Smartphone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smartphones & Mobile Tech",
  description: "Découvrez notre sélection de smartphones ultra-premium, gaming phones et téléphones flagship.",
};

async function getMobileProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", "mobile")
    .order("price", { ascending: false });
  return data || [];
}

export default async function MobilePage() {
  const products = await getMobileProducts();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="mb-16 flex items-end gap-6">
        <div className="p-4 bg-purple-500">
          <Smartphone size={28} className="text-black" />
        </div>
        <div>
          <span className="font-display text-xs font-bold tracking-tight uppercase text-purple-400">
            Catégorie
          </span>
          <h1 className="font-display font-black text-5xl tracking-tightest text-white mt-1">
            Téléphones
          </h1>
          <p className="text-zinc-500 font-sans mt-2">
            {products.length} produit{products.length !== 1 ? "s" : ""} disponible{products.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="h-px bg-white/5 mb-12" />

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <Smartphone size={48} className="text-zinc-800 mx-auto mb-4" />
          <p className="font-display text-xl font-bold text-white">
            Aucun produit pour l'instant
          </p>
          <p className="text-zinc-500 font-sans mt-2">
            Revenez bientôt pour découvrir nos nouveautés.
          </p>
        </div>
      )}
    </div>
  );
}
