"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase, Order } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { User, Package, LogOut, ChevronRight, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import Link from "next/link";

const ORDER_STATUS_CONFIG: Record<string, { label: string; icon: typeof Clock; color: string }> = {
  pending:    { label: "En attente",    icon: Clock,        color: "text-yellow-500" },
  paid:       { label: "Payée",         icon: CheckCircle,  color: "text-blue-500"   },
  processing: { label: "En préparation",icon: Package,      color: "text-blue-500"   },
  shipped:    { label: "Expédiée",      icon: Truck,        color: "text-purple-500" },
  delivered:  { label: "Livrée",        icon: CheckCircle,  color: "text-green-500"  },
  cancelled:  { label: "Annulée",       icon: XCircle,      color: "text-red-400"    },
};

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch orders for this user
  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setOrdersLoading(true);
      const { data } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", user.uid)
        .order("created_at", { ascending: false });
      setOrders(data || []);
      setOrdersLoading(false);
    };
    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Loading skeleton
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-onSurfaceVariant font-sans text-sm">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const avatarInitials = user.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : (user.email?.[0] ?? "U").toUpperCase();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <h1 className="font-display font-black text-4xl tracking-tightest text-onSurface mb-12">
        Mon compte
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ──── LEFT: Profile Card ──── */}
        <div className="space-y-4">
          <div className="bg-surface-low border border-outlineVariant/30 p-6 space-y-5">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt={user.displayName || "Avatar"}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <div className="w-14 h-14 bg-cyber-gradient flex items-center justify-center text-deep-900 font-display font-black text-xl">
                  {avatarInitials}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-display font-bold text-onSurface truncate">
                  {user.displayName || "Utilisateur"}
                </p>
                <p className="text-onSurfaceVariant text-sm font-sans truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Auth method badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans text-onSurfaceVariant">Connexion via</span>
              <span className="bg-surface-highest px-2 py-0.5 text-xs font-display font-bold text-onSurface">
                {user.providerData[0]?.providerId === "google.com" ? "Google" : "Email"}
              </span>
            </div>

            {/* Info rows */}
            <div className="space-y-3 border-t border-outlineVariant/30 pt-4">
              <InfoRow label="UID Firebase" value={user.uid.slice(0, 12) + "..."} />
              <InfoRow label="Email vérifié" value={user.emailVerified ? "✓ Oui" : "✗ Non"} />
              <InfoRow
                label="Membre depuis"
                value={user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
                  : "—"}
              />
            </div>
          </div>

          {/* Navigation links */}
          <div className="bg-surface-low border border-outlineVariant/30 divide-y divide-outlineVariant/20">
            {[
              { icon: User,    label: "Modifier le profil",  href: "/account/edit" },
              { icon: Package, label: "Mes commandes",        href: "#orders" },
            ].map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-display text-onSurface hover:bg-surface-high transition-colors duration-200"
              >
                <Icon size={16} className="text-primary shrink-0" />
                <span>{label}</span>
                <ChevronRight size={14} className="ml-auto text-outlineVariant" />
              </Link>
            ))}
          </div>

          {/* Logout */}
          <Button variant="danger" size="md" fullWidth onClick={handleLogout}>
            <LogOut size={16} />
            Se déconnecter
          </Button>
        </div>

        {/* ──── RIGHT: Orders ──── */}
        <div className="lg:col-span-2 space-y-6" id="orders">
          <h2 className="font-display font-black text-2xl tracking-tightest text-onSurface">
            Mes commandes
          </h2>

          {ordersLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-24 bg-surface-low animate-pulse border border-outlineVariant/20" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="border border-outlineVariant/30 p-12 text-center space-y-4">
              <Package size={40} className="text-outlineVariant mx-auto" />
              <p className="font-display font-bold text-onSurface text-lg">Aucune commande</p>
              <p className="text-onSurfaceVariant font-sans text-sm">
                Vos commandes apparaîtront ici après votre premier achat.
              </p>
              <Link href="/mobile">
                <Button variant="ghost" size="sm">Parcourir la boutique</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const statusConfig = ORDER_STATUS_CONFIG[order.status] ?? ORDER_STATUS_CONFIG.pending;
                const StatusIcon = statusConfig.icon;
                const itemCount = order.order_items?.length ?? 0;

                return (
                  <div
                    key={order.id}
                    className="bg-surface-low border border-outlineVariant/30 p-5 hover:border-outlineVariant transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="font-display font-bold text-onSurface text-sm">
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                          <div className={`flex items-center gap-1.5 text-xs font-display font-bold ${statusConfig.color}`}>
                            <StatusIcon size={12} />
                            {statusConfig.label}
                          </div>
                        </div>
                        <p className="text-onSurfaceVariant text-xs font-sans">
                          {new Date(order.created_at).toLocaleDateString("fr-FR", {
                            day: "numeric", month: "long", year: "numeric"
                          })}
                          {" · "}
                          {itemCount} article{itemCount > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-display font-black text-lg text-onSurface">
                          {order.total_amount.toLocaleString("fr-FR")} €
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-onSurfaceVariant font-sans">{label}</span>
      <span className="font-display font-medium text-onSurface text-right">{value}</span>
    </div>
  );
}
