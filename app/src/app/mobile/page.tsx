'use client';

import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/supabase";

// ── Les 8 produits EXACTS de code.html ──────────────────────
// price = Ariary / 5000 (CartDrawer multiplie par 5000 pour afficher)
type StaticProduct = Product & {
  img: string;          // alias visuel (= image_url)
  alt: string;
  rating: string;
  reviews: string;
  priceLabel: string;   // affichage Ariary formaté
  storage: string[];
  selected: string;
};

// ── Les 8 produits EXACTS de code.html ────────────────────────────────────────
const CODE_HTML_PRODUCTS: StaticProduct[] = [
  {
    id: "mobile-1",
    slug: "iphone-17-pro",
    description: "Le dernier iPhone Pro d'Apple",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: true,
    created_at: "",
    img: "/mobile_product_image/iphone%2017%20pro.png",
    image_url: "/mobile_product_image/iphone%2017%20pro.png",
    alt: "iPhone 17 Pro",
    brand: "L7X",
    rating: "4.9",
    reviews: "2.4k",
    name: "iPhone 17 Pro",
    price: 1400,        // 7 000 000 Ar ÷ 5000
    priceLabel: "7.000.000 Ar",
    storage: ["128", "256", "512"],
    selected: "256",
  },
  {
    id: "mobile-2",
    slug: "galaxy-s25-ultra",
    description: "Le Samsung Galaxy S25 Ultra",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: true,
    created_at: "",
    img: "/mobile_product_image/Samsung%20S25%20Ultra.png",
    image_url: "/mobile_product_image/Samsung%20S25%20Ultra.png",
    alt: "Galaxy S25 Ultra",
    brand: "SAMSUNG",
    rating: "4.8",
    reviews: "1.8k",
    name: "Galaxy S25 Ultra",
    price: 880,         // 4 400 000 Ar ÷ 5000
    priceLabel: "4.400.000 Ar",
    storage: ["256", "512", "1TB"],
    selected: "512",
  },
  {
    id: "mobile-3",
    slug: "pixel-9-pro",
    description: "Le Google Pixel 9 Pro",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: true,
    created_at: "",
    img: "/mobile_product_image/google%20pixel%209%20pro.png",
    image_url: "/mobile_product_image/google%20pixel%209%20pro.png",
    alt: "Pixel 9 Pro",
    brand: "GOOGLE",
    rating: "4.7",
    reviews: "945",
    name: "Pixel 9 Pro",
    price: 1300,        // 6 500 000 Ar ÷ 5000
    priceLabel: "6.500.000 Ar",
    storage: ["128", "256", "512"],
    selected: "128",
  },
  {
    id: "mobile-4",
    slug: "nothing-phone-3",
    description: "Le Nothing Phone (3)",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: false,
    created_at: "",
    img: "/mobile_product_image/nothing%20phone%203.png",
    image_url: "/mobile_product_image/nothing%20phone%203.png",
    alt: "Nothing Phone (3)",
    brand: "NOTHING",
    rating: "4.6",
    reviews: "1.2k",
    name: "Nothing Phone (3)",
    price: 580,         // 2 900 000 Ar ÷ 5000
    priceLabel: "2.900.000 Ar",
    storage: ["128", "256", "512"],
    selected: "256",
  },
  {
    id: "mobile-5",
    slug: "xperia-1-mark-4",
    description: "Le Sony Xperia 1 Mark 4",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: false,
    created_at: "",
    img: "/mobile_product_image/xperia%201%20mark%204.png",
    image_url: "/mobile_product_image/xperia%201%20mark%204.png",
    alt: "Xperia 1 Mark 4",
    brand: "SONY",
    rating: "4.9",
    reviews: "412",
    name: "Xperia 1 Mark 4",
    price: 300,         // 1 500 000 Ar ÷ 5000
    priceLabel: "1.500.000 Ar",
    storage: ["256", "512", "1TB"],
    selected: "512",
  },
  {
    id: "mobile-6",
    slug: "galaxy-z-flip-6",
    description: "Le Samsung Galaxy Z Flip 6",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: false,
    created_at: "",
    img: "/mobile_product_image/Galaxy%20Z%20%20Flip%206.png",
    image_url: "/mobile_product_image/Galaxy%20Z%20%20Flip%206.png",
    alt: "Galaxy Z Flip 6",
    brand: "SAMSUNG",
    rating: "4.5",
    reviews: "2.1k",
    name: "Galaxy Z Flip 6",
    price: 470,         // 2 350 000 Ar ÷ 5000
    priceLabel: "2.350.000 Ar",
    storage: ["256", "512"],
    selected: "256",
  },
  {
    id: "mobile-7",
    slug: "redmi-k70-ultra",
    description: "Le Redmi K70 Ultra",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: false,
    created_at: "",
    img: "/mobile_product_image/Xiaomi%20Redmi%20K70%20Ultra.png",
    image_url: "/mobile_product_image/Xiaomi%20Redmi%20K70%20Ultra.png",
    alt: "Redmi k70 Ultra",
    brand: "XIAOMI",
    rating: "4.9",
    reviews: "1.1k",
    name: "Redmi k70 Ultra",
    price: 230,         // 1 150 000 Ar ÷ 5000
    priceLabel: "1.150.000 Ar",
    storage: ["256", "512", "1TB"],
    selected: "512",
  },
  {
    id: "mobile-8",
    slug: "vivo-x300-pro",
    description: "Le Vivo x300 Pro",
    category: "mobile",
    images: [],
    specs: {},
    stock: 10,
    is_featured: false,
    created_at: "",
    img: "/mobile_product_image/VIVO%20X300.png",
    image_url: "/mobile_product_image/VIVO%20X300.png",
    alt: "Vivo x300 Pro",
    brand: "VIVO",
    rating: "4.8",
    reviews: "856",
    name: "Vivo x300 Pro",
    price: 900,         // 4 500 000 Ar ÷ 5000
    priceLabel: "4.500.000 Ar",
    storage: ["128", "256", "512"],
    selected: "128",
  },
];

export default function MobilePage() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <main className="pt-24" style={{ backgroundColor: "#000000", color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── HERO (exact code.html) ──────────────────────────────────── */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),_transparent_70%)]" />
        </div>
        <div className="relative z-20 text-center max-w-4xl">
          <h1 className="font-black text-6xl md:text-7xl tracking-tighter text-white mb-6 leading-none">
            Smartphones &amp; <span style={{ color: "#A855F7" }}>Mobile Tech</span>
          </h1>
          <p className="font-light text-gray-400 text-xl max-w-2xl mx-auto">
            Discover the latest high-performance devices. Engineered for the digital vanguard.
          </p>
        </div>
      </section>

      {/* ── CATEGORY FILTERS (exact code.html) ─────────────────────── */}
      <section className="px-8 mb-12">
        <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar pb-4 max-w-7xl mx-auto">
          <button className="px-8 py-3 rounded-full font-bold text-xs tracking-widest whitespace-nowrap text-black" style={{ backgroundColor: "#A855F7" }}>ALL DEVICES</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">IOS</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">ANDROID</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">FOLDABLES</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">ACCESSORIES</button>
        </div>
      </section>

      {/* ── PRODUCT GRID : les 8 produits EXACTS de code.html ─────── */}
      <section className="px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {CODE_HTML_PRODUCTS.map((p) => (
            <div key={p.id} className="product-card rounded-[32px] overflow-hidden flex flex-col p-8 group h-full">
              {/* Image */}
              <div className="relative h-64 flex items-center justify-center mb-8 shrink-0">
                <Image
                  alt={p.alt}
                  src={p.img}
                  width={256}
                  height={256}
                  className="max-w-full max-h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                  style={{ width: "auto", height: "auto", maxHeight: "256px" }}
                  unoptimized
                />
              </div>
              <div className="flex flex-col flex-grow">
                {/* Brand + Rating */}
                <div className="flex justify-between items-center mb-4 h-6">
                  <span className="bg-white text-black text-[9px] font-black px-3 py-1 rounded-full tracking-[0.1em] uppercase">
                    {p.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ color: "#A855F7", fontVariationSettings: '"FILL" 1' }}
                    >star</span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {p.rating} <span className="opacity-30 ml-1 text-[10px]">({p.reviews})</span>
                    </span>
                  </div>
                </div>
                {/* Name + Price */}
                <div className="mb-6 flex-grow">
                  <h3 className="text-xl text-white tracking-tight mb-2 font-normal">{p.name}</h3>
                  <p className="text-2xl font-black text-white">{p.priceLabel}</p>
                </div>
                {/* Storage selector */}
                <div className="mb-8">
                  <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.15em] mb-3">SELECT STORAGE</p>
                  <div className="flex gap-2 h-10">
                    {p.storage.map((s) => (
                      <button
                        key={s}
                        className={
                          s === p.selected
                            ? "w-10 h-10 rounded-lg bg-white text-[10px] text-black flex items-center justify-center font-black"
                            : "w-10 h-10 rounded-lg border border-white/10 text-[10px] text-white flex items-center justify-center hover:border-[#A855F7] hover:text-[#A855F7] transition-all font-bold"
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                {/* BUY NOW + Cart */}
                <div className="flex gap-3">
                  <button
                    className="flex-grow text-white font-black py-4 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all active:scale-[0.98] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    style={{ backgroundColor: "#A855F7" }}
                    onClick={() => addItem(p)}
                  >
                    BUY NOW
                  </button>
                  <button
                    className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all active:scale-[0.98]"
                    onClick={() => addItem(p)}
                  >
                    <span className="material-symbols-outlined text-xl">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── PAGINATION (exact code.html) ─────────────────────────── */}
        <div className="flex items-center justify-center space-x-2 mt-16">
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300">
            <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center space-x-1">
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors">1</button>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-black text-white rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]" style={{ backgroundColor: "#A855F7" }}>2</button>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors">3</button>
            <span className="w-10 h-10 flex items-center justify-center text-xs text-gray-700 font-bold uppercase tracking-widest px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors">20</button>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300">
            <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>
      </section>

      {/* ── NEWSLETTER (exact code.html) ───────────────────────────── */}
      <section className="px-8 mb-32">
        <div className="p-12 md:p-24 rounded-[48px] relative overflow-hidden max-w-7xl mx-auto border border-white/5" style={{ backgroundColor: "#080808" }}>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#A855F7,_transparent_70%)]" />
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="font-black text-5xl md:text-7xl text-white mb-6 tracking-tighter uppercase leading-none">
              JOIN THE <br />L7X VAULT.
            </h2>
            <p className="text-gray-400 font-light text-xl mb-8">
              Early access to mobile drops, hardware leaks, and exclusive member pricing.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="flex-grow bg-black border-none outline outline-1 outline-white/10 rounded-full px-8 py-5 text-white font-bold tracking-widest text-xs focus:ring-1 focus:outline-none transition-all"
                placeholder="ENTER YOUR EMAIL"
                type="email"
              />
              <button className="bg-white text-black px-12 py-5 rounded-full font-black text-xs tracking-[0.2em] uppercase hover:bg-[#A855F7] hover:text-white transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
