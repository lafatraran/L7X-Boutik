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
          <Lock size={48} className="mx-auto text-zinc-800" />
          <h1 className="font-display font-black text-3xl text-white">Connexion requise</h1>
          <p className="text-zinc-500 font-sans">Vous devez être connecté pour passer commande.</p>
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
          <ShoppingBag size={48} className="mx-auto text-zinc-800" />
          <h1 className="font-display font-black text-3xl text-white">Panier vide</h1>
          <p className="text-zinc-500 font-sans">Ajoutez des produits avant de commander.</p>
          <Link href="/mobile">
            <Button variant="primary" size="lg">Explorer la boutique</Button>
          </Link>
        </div>
      </div>
    );
  }

  const total = getTotalPrice();
  const shipping = total >= 99 ? 0 : 9.99;
  const grandTotal = total + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.uid,
          total_amount: grandTotal,
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
      <h1 className="font-display font-black text-4xl tracking-tightest text-white mb-12">
        Finaliser la commande
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm font-sans px-4 py-3">{error}</div>
          )}

          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-white">Coordonnées</h2>
            <div className="grid grid-cols-2 gap-4">
              {(["firstName", "lastName"] as const).map((field) => (
                <div key={field} className="space-y-1">
                  <label className="font-display text-xs font-bold uppercase tracking-tight text-zinc-500">
                    {field === "firstName" ? "Prénom" : "Nom"}
                  </label>
                  <input
                    required
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full py-3 border-b border-zinc-800 bg-transparent font-sans text-sm text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <label className="font-display text-xs font-bold uppercase tracking-tight text-zinc-500">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full py-3 border-b border-zinc-800 bg-transparent font-sans text-sm text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl text-white">Adresse de livraison</h2>
            {[
              { key: "street", label: "Adresse" },
              { key: "city", label: "Ville" },
              { key: "postalCode", label: "Code postal" },
              { key: "country", label: "Pays" },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-1">
                <label className="font-display text-xs font-bold uppercase tracking-tight text-zinc-500">{label}</label>
                <input
                  required
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full py-3 border-b border-zinc-800 bg-transparent font-sans text-sm text-white focus:outline-none focus:border-purple-500 transition-colors duration-200"
                />
              </div>
            ))}
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Confirmer la commande
            <ArrowRight size={20} />
          </Button>

          <p className="text-xs text-zinc-600 font-sans text-center flex items-center justify-center gap-1">
            <Lock size={12} />
            Paiement simulé — aucune transaction réelle
          </p>
        </form>

        <div className="space-y-6">
          <h2 className="font-display font-bold text-xl text-white">Récapitulatif</h2>
          <div className="border border-white/5 divide-y divide-white/5">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center gap-4 p-4">
                <div className="relative w-16 h-16 shrink-0 bg-zinc-900 overflow-hidden">
                  <Image src={product.image_url || ""} alt={product.name} fill className="object-cover" unoptimized />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 text-black text-xs font-bold flex items-center justify-center">
                    {quantity}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-white truncate">{product.name}</p>
                  <p className="text-xs text-zinc-500 font-sans">{product.brand}</p>
                </div>
                <p className="font-display font-bold text-white shrink-0">
                  {(product.price * quantity).toLocaleString("fr-FR")} €
                </p>
              </div>
            ))}
          </div>

          <div className="border border-white/5 p-6 space-y-3">
            <div className="flex justify-between text-sm font-sans text-zinc-500">
              <span>Sous-total</span>
              <span className="text-white">{total.toLocaleString("fr-FR")} €</span>
            </div>
            <div className="flex justify-between text-sm font-sans text-zinc-500">
              <span>Livraison</span>
              <span className={shipping === 0 ? "text-green-500 font-medium" : "text-white"}>
                {shipping === 0 ? "Gratuite" : `${shipping.toFixed(2)} €`}
              </span>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex justify-between font-display font-black text-xl text-white">
              <span>Total</span>
              <span>{grandTotal.toLocaleString("fr-FR")} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
