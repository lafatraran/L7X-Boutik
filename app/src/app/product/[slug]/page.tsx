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
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 text-sm font-sans text-onSurfaceVariant">
        <Link href="/" className="hover:text-onSurface transition-colors">Accueil</Link>
        <span>/</span>
        <Link href={categoryHrefs[product.category] || "/"} className="hover:text-onSurface transition-colors">
          {categoryLabels[product.category] || product.category}
        </Link>
        <span>/</span>
        <span className="text-onSurface font-medium truncate">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Panel */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-surface-low overflow-hidden group">
            <Image
              src={product.image_url || ""}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              unoptimized
            />
            {product.is_featured && (
              <div className="absolute top-4 left-4 bg-cyber-gradient text-deep-900 px-3 py-1 text-xs font-display font-bold tracking-tight">
                BEST SELLER
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {/* Brand + Name */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-xs font-bold tracking-tight uppercase text-primary">
                {product.brand}
              </span>
              <span className="text-outlineVariant">·</span>
              <span className="text-xs font-sans text-onSurfaceVariant capitalize">
                {categoryLabels[product.category]}
              </span>
            </div>
            <h1 className="font-display font-black text-4xl md:text-5xl tracking-tightest text-onSurface leading-none">
              {product.name}
            </h1>
          </div>

          {/* Rating placeholder */}
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-cyber-cyan fill-cyber-cyan" />
            ))}
            <span className="text-sm font-sans text-onSurfaceVariant ml-1">(4.9 · 127 avis)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display font-black text-5xl tracking-tightest text-onSurface">
              {new Intl.NumberFormat("fr-FR").format(product.price * 5000)} Ar
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <p className="font-sans text-onSurfaceVariant leading-relaxed text-base border-l-2 border-primary pl-4">
              {product.description}
            </p>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2 text-sm font-sans">
            {product.stock > 0 ? (
              <>
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-green-600 font-medium">
                  En stock — {product.stock} unité{product.stock > 1 ? "s" : ""} disponible{product.stock > 1 ? "s" : ""}
                </span>
              </>
            ) : (
              <>
                <Package size={16} className="text-red-400" />
                <span className="text-red-400 font-medium">Rupture de stock</span>
              </>
            )}
          </div>

          {/* Add to Cart */}
          <ProductAddToCart product={product} />

          {/* Guarantees */}
          <div className="border-t border-outlineVariant/30 pt-6 space-y-3">
            {[
              "Livraison offerte dès 99€",
              "Retours gratuits sous 30 jours",
              "Garantie constructeur 2 ans",
              "Paiement sécurisé",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-sans text-onSurfaceVariant">
                <CheckCircle size={14} className="text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      {specs.length > 0 && (
        <div className="mt-20">
          <div className="h-px bg-outlineVariant/30 mb-12" />
          <h2 className="font-display font-black text-3xl tracking-tightest text-onSurface mb-8">
            Caractéristiques techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-outlineVariant/30">
            {specs.map(([key, value], index) => (
              <div
                key={key}
                className={`flex items-center justify-between px-6 py-4 ${
                  index % 2 === 0 ? "bg-surface-lowest" : "bg-surface-low"
                } border-b border-outlineVariant/20 last:border-0`}
              >
                <span className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">
                  {key}
                </span>
                <span className="font-sans text-sm font-medium text-onSurface text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-12">
        <Link
          href={categoryHrefs[product.category] || "/"}
          className="inline-flex items-center gap-2 text-sm font-display font-medium text-onSurfaceVariant hover:text-onSurface transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Retour à {categoryLabels[product.category]}
        </Link>
      </div>
    </div>
  );
}
