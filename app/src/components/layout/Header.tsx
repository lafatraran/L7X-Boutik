"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/hooks/useAuth";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

export function Header() {
  const { getTotalItems, openCart } = useCartStore();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Hardware" },
    { href: "/mobile", label: "Mobile" },
    { href: "/setups", label: "Setups" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 py-4",
        isScrolled 
          ? "bg-surface/80 backdrop-blur-xl border-b border-white/5 py-3" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <span className="text-black font-black text-xs">L7</span>
          </div>
          <span className="font-display font-black text-xl tracking-tighter text-on-surface uppercase italic">
            Boutik
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary",
                pathname === link.href ? "text-primary" : "text-on-surface-variant"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button
            onClick={openCart}
            className="relative p-2 text-on-surface hover:text-primary transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                {getTotalItems()}
              </span>
            )}
          </button>

          <Link
            href={user ? "/account" : "/login"}
            className="p-2 text-on-surface hover:text-primary transition-colors"
          >
            <User size={20} strokeWidth={1.5} />
          </Link>

          <button
            className="md:hidden p-2 text-on-surface"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          "fixed inset-0 top-[60px] bg-surface z-50 md:hidden transition-all duration-500 flex flex-col items-center justify-center gap-8",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "text-2xl font-black uppercase tracking-tighter italic",
              pathname === link.href ? "text-primary" : "text-on-surface"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
