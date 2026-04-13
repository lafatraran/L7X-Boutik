"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navLinks = [
  { href: "/", label: "Hardware" },
  { href: "/mobile", label: "Mobile" },
  { href: "/accessories", label: "Accessories" },
  { href: "/setups", label: "Setups" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { user } = useAuth();
  const { getTotalItems, openCart } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={clsx(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-[0_0_20px_rgba(168,85,247,0.05)]" 
        : "bg-transparent"
    )}>
      <div className="flex justify-between items-center w-full px-6 py-4 mx-auto max-w-7xl">
        {/* Brand */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase headline-anchor hover:text-primary transition-colors">
          L7X BOUTIK
        </Link>

        {/* Navigation Links — Desktop */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-xs font-light Inter uppercase tracking-widest transition-all duration-300 relative pb-1",
                  isActive 
                    ? "text-primary font-bold border-b-2 border-primary" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <button 
            onClick={openCart}
            className="text-gray-400 hover:text-primary transition-all duration-300 active:scale-95 relative"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[9px] font-black flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Account */}
          <Link 
            href={user ? "/account" : "/login"}
            className="text-gray-400 hover:text-primary transition-all duration-300 active:scale-95"
          >
            <User size={22} strokeWidth={1.5} />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        "md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/5 transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="flex flex-col p-8 gap-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline font-bold text-lg text-white hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          {!user && (
            <Link
              href="/login"
              className="font-headline font-bold text-lg text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONNEXION
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
