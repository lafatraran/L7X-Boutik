import { supabase, Product } from "@/lib/supabase";
import { ProductCard } from "@/components/product/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile Tech",
  description: "Découvrez notre sélection exclusive de smartphones haute performance. Engineered for the digital vanguard.",
};

async function getMobileProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", "mobile")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching mobile products:", error);
    return [];
  }

  return data as Product[];
}

export default async function MobilePage() {
  const products = await getMobileProducts();

  return (
    <main className="pt-24 bg-black min-h-screen selection:bg-primary selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10"></div>
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(168,85,247,0.1),_transparent_70%)]"></div>
        </div>
        <div className="relative z-20 text-center max-w-4xl">
          <h1 className="font-headline font-black text-6xl md:text-7xl tracking-tighter text-white mb-6 leading-none">
            Smartphones & <span className="text-primary">Mobile Tech</span>
          </h1>
          <p className="font-light text-zinc-400 text-xl max-w-2xl mx-auto">
            Discover the latest high-performance devices. Engineered for the digital vanguard.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="px-8 mb-12">
        <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar pb-4 max-w-7xl mx-auto">
          <button className="px-8 py-3 bg-primary text-black rounded-full font-bold text-xs tracking-widest whitespace-nowrap">ALL DEVICES</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">IOS</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">ANDROID</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">FOLDABLES</button>
          <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold text-xs tracking-widest transition-all whitespace-nowrap">ACCESSORIES</button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination simulated from design */}
        <div className="flex items-center justify-center space-x-2 mt-16 font-display">
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all duration-300">
            <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
          </button>
          <div className="flex items-center space-x-1">
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-zinc-500 hover:text-white transition-colors">1</button>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-black bg-primary text-white rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]">2</button>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-zinc-500 hover:text-white transition-colors">3</button>
            <span className="w-10 h-10 flex items-center justify-center text-xs text-zinc-700 font-bold uppercase tracking-widest px-2">...</span>
            <button className="w-10 h-10 flex items-center justify-center text-xs font-bold text-zinc-500 hover:text-white transition-colors">20</button>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full border border-white/5 text-zinc-500 hover:text-white hover:border-white/20 transition-all duration-300">
            <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-8 mb-32">
        <div className="bg-[#080808] p-12 md:p-24 rounded-[48px] relative overflow-hidden max-w-7xl mx-auto border border-white/5">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,_var(--color-primary),_transparent_70%)]"></div>
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="font-headline font-black text-5xl md:text-7xl text-white mb-6 tracking-tighter uppercase leading-none">JOIN THE <br/>L7X VAULT.</h2>
            <p className="text-zinc-400 font-light text-xl mb-8">Early access to mobile drops, hardware leaks, and exclusive member pricing.</p>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                className="flex-grow bg-black border-none outline outline-1 outline-white/10 rounded-full px-8 py-5 text-zinc-500 font-bold tracking-widest text-xs focus:ring-1 focus:ring-primary transition-all" 
                placeholder="ENTER YOUR EMAIL" 
                type="email"
              />
              <button className="bg-white text-black px-12 py-5 rounded-full font-black text-xs tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
