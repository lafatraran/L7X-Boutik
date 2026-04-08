import { supabase, Product } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductAddToCart } from "@/components/product/ProductAddToCart";
import { ArrowLeft, CheckCircle, Package, Star } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product | null> {
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.description,
  };
}

const categoryLabels: Record<string, string> = {
  mobile: "Téléphones",
  setup: "Setups Gaming",
  accessory: "Accessoires",
};
const categoryHrefs: Record<string, string> = {
  mobile: "/mobile",
  setup: "/setups",
  accessory: "/accessories",
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const specs = Object.entries(product.specs || {});

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="flex items-center gap-2 mb-12 text-sm font-sans text-zinc-500">
        <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
        <span>/</span>
        <Link href={categoryHrefs[product.category] || "/"} className="hover:text-white transition-colors">
          {categoryLabels[product.category] || product.category}
        </Link>
        <span>/</span>
        <span className="text-white font-medium truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-4">
          <div className="relative aspect-square bg-zinc-900 overflow-hidden group">
            <Image
              src={product.image_url || ""}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              unoptimized
            />
            {product.is_featured && (
              <div className="absolute top-4 left-4 bg-purple-500 text-black px-3 py-1 text-xs font-display font-bold tracking-tight">
                BEST SELLER
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-xs font-bold tracking-tight uppercase text-purple-400">
                {product.brand}
              </span>
              <span className="text-zinc-800">·</span>
              <span className="text-xs font-sans text-zinc-500 capitalize">
                {categoryLabels[product.category]}
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl tracking-tightest text-white leading-none">
              {product.name}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-purple-400 fill-purple-400" />
            ))}
            <span className="text-sm font-sans text-zinc-500 ml-1">(4.9 · 127 avis)</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display font-black text-5xl tracking-tightest text-white">
              {product.price.toLocaleString("fr-FR")} €
            </span>
          </div>

          {product.description && (
            <p className="font-sans text-zinc-400 leading-relaxed text-base border-l-2 border-purple-500 pl-4">
              {product.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-sm font-sans">
            {product.stock > 0 ? (
              <>
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-green-500 font-medium">
                  En stock — {product.stock} unité{product.stock > 1 ? "s" : ""} disponible{product.stock > 1 ? "s" : ""}
                </span>
              </>
            ) : (
              <>
                <Package size={16} className="text-red-500" />
                <span className="text-red-500 font-medium">Rupture de stock</span>
              </>
            )}
          </div>

          <ProductAddToCart product={product} />

          <div className="border-t border-white/5 pt-6 space-y-3">
            {[
              "Livraison offerte dès 99€",
              "Retours gratuits sous 30 jours",
              "Garantie constructeur 2 ans",
              "Paiement sécurisé",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-sans text-zinc-500">
                <CheckCircle size={14} className="text-purple-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {specs.length > 0 && (
        <div className="mt-20">
          <div className="h-px bg-white/5 mb-12" />
          <h2 className="font-display font-black text-3xl tracking-tightest text-white mb-8">
            Caractéristiques techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/5">
            {specs.map(([key, value], index) => (
              <div
                key={key}
                className={`flex items-center justify-between px-6 py-4 ${
                  index % 2 === 0 ? "bg-zinc-950" : "bg-black"
                } border-b border-white/5 last:border-0`}
              >
                <span className="font-display text-xs font-bold uppercase tracking-tight text-zinc-500">
                  {key}
                </span>
                <span className="font-sans text-sm font-medium text-white text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12">
        <Link
          href={categoryHrefs[product.category] || "/"}
          className="inline-flex items-center gap-2 text-sm font-display font-medium text-zinc-500 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Retour à {categoryLabels[product.category]}
        </Link>
      </div>
    </div>
  );
}
