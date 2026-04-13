'use client';

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/supabase";

type StaticProduct = Product & {
  img: string;
  alt: string;
  rating: string;
  reviews: string;
  priceLabel: string;
  options: string[];
  selected: string;
  optionLabel: string;
};

const ACCESSORIES_PRODUCTS: StaticProduct[] = [
  {
    id: "acc-1",
    slug: "orico-hub-usb",
    name: "Orico Hub USB",
    brand: "ORICO",
    description: "High-speed USB extension hub for your workstation.",
    category: "accessory",
    price: 45,
    priceLabel: "225.000 Ar",
    img: "/accessories_product_image/Orico%20Hub%20USB.png",
    image_url: "/accessories_product_image/Orico%20Hub%20USB.png",
    alt: "Orico Hub USB",
    rating: "4.8",
    reviews: "1.2k",
    options: ["7-PORT", "10-PORT"],
    selected: "7-PORT",
    optionLabel: "PORTS",
    images: [],
    specs: {},
    stock: 50,
    is_featured: true,
    created_at: "",
  },
  {
    id: "acc-2",
    slug: "audio-players",
    name: "Audio Players",
    brand: "AUDIO",
    description: "Premium digital audio player for audiophiles.",
    category: "accessory",
    price: 129,
    priceLabel: "645.000 Ar",
    img: "/accessories_product_image/Audio%20Players.png",
    image_url: "/accessories_product_image/Audio%20Players.png",
    alt: "Audio Players",
    rating: "4.7",
    reviews: "856",
    options: ["BLACK", "SILVER"],
    selected: "BLACK",
    optionLabel: "FINISH",
    images: [],
    specs: {},
    stock: 30,
    is_featured: true,
    created_at: "",
  },
  {
    id: "acc-3",
    slug: "power-bank",
    name: "Power Bank",
    brand: "POWER",
    description: "Ultra-fast charging power bank for on-the-go energy.",
    category: "accessory",
    price: 69,
    priceLabel: "345.000 Ar",
    img: "/accessories_product_image/Power%20Bank.png",
    image_url: "/accessories_product_image/Power%20Bank.png",
    alt: "Power Bank",
    rating: "4.9",
    reviews: "2.1k",
    options: ["20K mAh", "30K mAh"],
    selected: "20K mAh",
    optionLabel: "CAPACITY",
    images: [],
    specs: {},
    stock: 100,
    is_featured: false,
    created_at: "",
  },
  {
    id: "acc-4",
    slug: "airpods-max",
    name: "Apple AirPods Max",
    brand: "APPLE",
    description: "Reimagined over-ear headphones with high-fidelity audio.",
    category: "accessory",
    price: 549,
    priceLabel: "2.745.000 Ar",
    img: "/accessories_product_image/Apple%20AirPods%20Max.png",
    image_url: "/accessories_product_image/Apple%20AirPods%20Max.png",
    alt: "Apple AirPods Max",
    rating: "4.8",
    reviews: "3.4k",
    options: ["SPACE GRAY", "SILVER", "SKY BLUE"],
    selected: "SPACE GRAY",
    optionLabel: "COLOR",
    images: [],
    specs: {},
    stock: 15,
    is_featured: true,
    created_at: "",
  },
  {
    id: "acc-5",
    slug: "fast-charger",
    name: "Fast Charger",
    brand: "POWER",
    description: "High-wattage wall adapter for fast charging.",
    category: "accessory",
    price: 35,
    priceLabel: "175.000 Ar",
    img: "/accessories_product_image/Fast%20Charger.png",
    image_url: "/accessories_product_image/Fast%20Charger.png",
    alt: "Fast Charger",
    rating: "5.0",
    reviews: "1.8k",
    options: ["20W", "35W", "65W"],
    selected: "35W",
    optionLabel: "WATTAGE",
    images: [],
    specs: {},
    stock: 200,
    is_featured: false,
    created_at: "",
  },
  {
    id: "acc-6",
    slug: "airpods-pro-3",
    name: "Apple AirPods Pro 3",
    brand: "APPLE",
    description: "Next-gen noise cancellation and spatial audio.",
    category: "accessory",
    price: 279,
    priceLabel: "1.395.000 Ar",
    img: "/accessories_product_image/Apple%20AirPods%20Pro%203.png",
    image_url: "/accessories_product_image/Apple%20AirPods%20Pro%203.png",
    alt: "Apple AirPods Pro 3",
    rating: "4.9",
    reviews: "5.2k",
    options: ["MAGSAFE", "USB-C"],
    selected: "USB-C",
    optionLabel: "VERSION",
    images: [],
    specs: {},
    stock: 45,
    is_featured: false,
    created_at: "",
  },
  {
    id: "acc-7",
    slug: "usb-drive",
    name: "USB",
    brand: "STORAGE",
    description: "Compact and fast flash drive for safe data transfers.",
    category: "accessory",
    price: 29,
    priceLabel: "145.000 Ar",
    img: "/accessories_product_image/USB.png",
    image_url: "/accessories_product_image/USB.png",
    alt: "USB Flash Drive",
    rating: "4.6",
    reviews: "945",
    options: ["32G", "64G", "128G"],
    selected: "64G",
    optionLabel: "SIZE",
    images: [],
    specs: {},
    stock: 300,
    is_featured: false,
    created_at: "",
  },
  {
    id: "acc-8",
    slug: "sony-srs-xb10",
    name: "Sony SRS-XB10",
    brand: "SONY",
    description: "Portable wireless speaker with big bass sound.",
    category: "accessory",
    price: 59,
    priceLabel: "295.000 Ar",
    img: "/accessories_product_image/Sony%20SRS-XB10.png",
    image_url: "/accessories_product_image/Sony%20SRS-XB10.png",
    alt: "Sony SRS-XB10",
    rating: "4.7",
    reviews: "1.1k",
    options: ["BLUE", "BLACK", "RED"],
    selected: "BLUE",
    optionLabel: "COLOR",
    images: [],
    specs: {},
    stock: 40,
    is_featured: false,
    created_at: "",
  },
];

export default function AccessoriesPage() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <main className="pt-24 min-h-screen" style={{ backgroundColor: "#000000", color: "#ffffff", fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── HERO ──────────────────────────────────── */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10" />
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),_transparent_70%)]" />
        </div>
        <div className="relative z-20 text-center max-w-4xl">
          <h1 className="font-black text-6xl md:text-7xl tracking-tighter text-white mb-6 leading-none">
            Performance <span style={{ color: "#A855F7" }}>Accessories & Gear</span>
          </h1>
          <p className="font-light text-gray-400 text-xl max-w-2xl mx-auto">
            Discover the latest high-performance peripherals. Engineered for the digital vanguard.
          </p>
        </div>
      </section>

      {/* ── CATEGORY FILTERS ─────────────────────── */}
      <section className="px-8 mb-12">
        <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar pb-4 max-w-7xl mx-auto">
          <Link href="/mobile" className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap uppercase">All Devices</Link>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap uppercase">IOS</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap uppercase">ANDROID</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap uppercase">FOLDABLES</button>
          <button className="px-8 py-3 rounded-full font-bold text-xs tracking-widest whitespace-nowrap text-black uppercase" style={{ backgroundColor: "#A855F7" }}>ACCESSORIES</button>
        </div>
      </section>

      {/* ── PRODUCT GRID ─────── */}
      <section className="px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {ACCESSORIES_PRODUCTS.map((p) => (
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
                {/* Variant selector */}
                <div className="mb-8">
                  <p className="text-[9px] text-gray-500 uppercase font-black tracking-[0.15em] mb-3">{p.optionLabel}</p>
                  <div className="flex gap-2 h-10 overflow-x-auto hide-scrollbar">
                    {p.options.map((opt) => (
                      <button
                        key={opt}
                        className={
                          opt === p.selected
                            ? "px-4 h-10 rounded-lg bg-white text-[10px] text-black flex items-center justify-center font-black whitespace-nowrap"
                            : "px-4 h-10 rounded-lg border border-white/10 text-[10px] text-white flex items-center justify-center hover:border-[#A855F7] hover:text-[#A855F7] transition-all font-bold whitespace-nowrap"
                        }
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                {/* BUY NOW + Cart */}
                <div className="flex gap-3 mt-auto">
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

        {/* ── PAGINATION ─────────────────────────── */}
        <div className="flex items-center justify-center space-x-2 mt-16">
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300">
            <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center space-x-1">
            <button className="w-10 h-10 flex items-center justify-center text-xs font-black text-white rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]" style={{ backgroundColor: "#A855F7" }}>1</button>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors">2</button>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors">3</button>
            <span className="w-10 h-10 flex items-center justify-center text-xs text-gray-700 font-bold uppercase tracking-widest px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-colors">12</button>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 text-gray-500 hover:text-white hover:border-white/20 transition-all duration-300">
            <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────── */}
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
