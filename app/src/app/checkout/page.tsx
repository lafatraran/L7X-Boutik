"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Lock } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    street: "",
    city: "",
    postalCode: "",
    country: "France",
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <Lock size={48} className="mx-auto text-outlineVariant" />
          <h1 className="font-display font-black text-3xl text-onSurface">Connexion requise</h1>
          <p className="text-onSurfaceVariant font-sans">Vous devez être connecté pour passer commande.</p>
          <Link href="/login">
            <Button variant="primary" size="lg">Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <ShoppingBag size={48} className="mx-auto text-outlineVariant" />
          <h1 className="font-display font-black text-3xl text-onSurface">Panier vide</h1>
          <p className="text-onSurfaceVariant font-sans">Ajoutez des produits avant de commander.</p>
          <Link href="/mobile">
            <Button variant="primary" size="lg">Explorer la boutique</Button>
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();
  const shippingThreshold = 100; // ~500.000 Ar
  const shippingPrice = 10; // ~50.000 Ar
  
  const totalAr = total * 5000;
  const shippingAr = total >= shippingThreshold ? 0 : shippingPrice * 5000;
  const grandTotalAr = totalAr + shippingAr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.uid,
          total_amount: grandTotalAr / 5000, // Keep logical value in DB or send converted? Let's keep logical EUR in DB for consistency if needed, but display Ar.
          status: "pending",
          shipping_address: {
            street: form.street,
            city: form.city,
            postal_code: form.postalCode,
            country: form.country,
          },
        })
        .select()
        .single();

      if (orderError || !order) throw new Error("Erreur lors de la création de la commande");

      // 2. Create order items
      const orderItems = items.map(({ product, quantity }) => ({
        order_id: order.id,
        product_id: product.id,
        quantity,
        unit_price: product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw new Error("Erreur lors de l'enregistrement des articles");

      // 3. Clear cart and redirect
      clearCart();
      router.push(`/order-confirmation?id=${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <h1 className="font-display font-black text-4xl tracking-tightest text-onSurface mb-12">
        Finaliser la commande
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-sans px-4 py-3">{error}</div>
          )}

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-onSurface">Coordonnées</h2>
            <div className="grid grid-cols-2 gap-4">
              {(["firstName", "lastName"] as const).map((field) => (
                <div key={field} className="space-y-1">
                  <label className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">
                    {field === "firstName" ? "Prénom" : "Nom"}
                  </label>
                  <input
                    required
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full py-3 border-b border-outlineVariant bg-transparent font-sans text-sm text-onSurface focus:outline-none focus:border-primary transition-colors duration-200"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <label className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full py-3 border-b border-outlineVariant bg-transparent font-sans text-sm text-onSurface focus:outline-none focus:border-primary transition-colors duration-200"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-onSurface">Adresse de livraison</h2>
            {[
              { key: "street", label: "Adresse" },
              { key: "city", label: "Ville" },
              { key: "postalCode", label: "Code postal" },
              { key: "country", label: "Pays" },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-1">
                <label className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">{label}</label>
                <input
                  required
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full py-3 border-b border-outlineVariant bg-transparent font-sans text-sm text-onSurface focus:outline-none focus:border-primary transition-colors duration-200"
                />
              </div>
            ))}
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Confirmer la commande
            <ArrowRight size={20} />
          </Button>

          <p className="text-xs text-onSurfaceVariant font-sans text-center flex items-center justify-center gap-1">
            <Lock size={12} />
            Paiement simulé — aucune transaction réelle
          </p>
        </form>

        {/* Order Summary */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-xl text-onSurface">Récapitulatif</h2>
          <div className="border border-outlineVariant/30 divide-y divide-outlineVariant/20">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 p-4">
                <div className="relative w-16 h-16 shrink-0 bg-surface-low overflow-hidden">
                  <Image src={product.image_url || ""} alt={product.name} fill className="object-cover" unoptimized />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-onSurface text-surface-lowest text-xs font-bold flex items-center justify-center">
                    {quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-onSurface truncate">{product.name}</p>
                  <p className="text-xs text-onSurfaceVariant font-sans">{product.brand}</p>
                </div>
                <p className="font-display font-bold text-onSurface shrink-0">
                  {new Intl.NumberFormat("fr-FR").format(product.price * quantity * 5000)} Ar
                </p>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border border-outlineVariant/30 p-6 space-y-3">
            <div className="flex justify-between text-sm font-sans text-onSurfaceVariant">
              <span>Sous-total</span>
              <span className="text-onSurface">{new Intl.NumberFormat("fr-FR").format(totalAr)} Ar</span>
            </div>
            <div className="flex justify-between text-sm font-sans text-onSurfaceVariant">
              <span>Livraison</span>
              <span className={shippingAr === 0 ? "text-green-600 font-medium" : "text-onSurface"}>
                {shippingAr === 0 ? "Gratuite" : `${new Intl.NumberFormat("fr-FR").format(shippingAr)} Ar`}
              </span>
            </div>
            <div className="h-px bg-outlineVariant/30" />
            <div className="flex justify-between font-display font-black text-xl text-onSurface">
              <span>Total</span>
              <span>{new Intl.NumberFormat("fr-FR").format(grandTotalAr)} Ar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
