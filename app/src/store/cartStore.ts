import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/supabase';

export type CartEntry = { product: Product; quantity: number; };

type CartState = {
  items: CartEntry[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartState>()(persist(
  (set, get) => ({
    items: [],
    isOpen: false,
    addItem: (product, quantity = 1) => set((state) => {
      const idx = state.items.findIndex(i => i.product.id === product.id);
      if (idx >= 0) { const u = [...state.items]; u[idx].quantity += quantity; return { items: u, isOpen: true }; }
      return { items: [...state.items, { product, quantity }], isOpen: true };
    }),
    removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.product.id !== id) })),
    updateQuantity: (id, qty) => { if (qty <= 0) { get().removeItem(id); return; } set((s) => ({ items: s.items.map(i => i.product.id === id ? { ...i, quantity: qty } : i) })); },
    clearCart: () => set({ items: [] }),
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    getTotalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
    getTotalPrice: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
  }),
  { name: 'l7x-cart' }
));
