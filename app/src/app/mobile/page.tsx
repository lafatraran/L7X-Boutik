'use client';

import Image from "next/image";

// ── Les 8 produits EXACTS de code.html ────────────────────────────────────────
const CODE_HTML_PRODUCTS = [
  {
    id: 1,
    img: "https://lh3.googleusercontent.com/aida/ADBb0ujEZyqF1syur9oGPFPiiNbOmUpwGlV0A3iM5FPmBYv4xCV0g5pwiLw8z7Y2QFBktQgnOXwvgbbW0ITrs-t0oZE4fMpjq9jz2IvuTDbanfyfCt0kE4y88-SZGdzm4VUjmh4XcQWH65TGMpz-eJpsenDWc-dj2AcZtRz6hO0jZn0nxH8YXqSIwIKBZx2rx0vBsN39TZsTbSU5__2VEvqkoBskUSLBnys6K3XqPNSOWTXUefUexg51bN6j6LGnXdG0EM_2kzuRsSG1skU",
    alt: "iPhone 17 Pro",
    brand: "L7X",
    rating: "4.9",
    reviews: "2.4k",
    name: "iPhone 17 Pro",
    price: "7.000.000 Ar",
    storage: ["128", "256", "512"],
    selected: "256",
  },
  {
    id: 2,
    img: "https://lh3.googleusercontent.com/aida/ADBb0uhZSssQd348gc-f2_T1p76N-t1-S1BY0uMfqOptr3uruLHzGLngTcj6gscyd2_WNFlpoO-6y7HDeJbtc1yAGC7rMgEQgzixyUxjwgo08ZmQQVNlp9_FqoPY__OQ-EAAGeBEDTBKAUAuN4ZNioadmUaQb7B9AXRY8w5k5wAcRv2U9R20jXFjtA-LrFQQow7yH0uTjF6DajZFLRqc_iCYo-Uz7cEIZSoUcAi0cIWaq8CtZTl-8hlttK-wpbE_7g8lP_5C0X-Lm3OXFEg",
    alt: "Galaxy S25 Ultra",
    brand: "SAMSUNG",
    rating: "4.8",
    reviews: "1.8k",
    name: "Galaxy S25 Ultra",
    price: "4.400.000 Ar",
    storage: ["256", "512", "1TB"],
    selected: "512",
  },
  {
    id: 3,
    img: "https://lh3.googleusercontent.com/aida/ADBb0ughUF0QzSzFNuqaAdURPO4YoDgjR9LVRRh7GSfg8ia2HSjHfIK2a9DE-B2_oJc2kDEJ82_4kLFVGDDO1LEthVr3XFxWyZeqPYVv0b_15lFJHfvC3zb9hiGhaQnNRnfyXOumIeqQfLtvM4Wa6akMahxDHkVH2PpEvRuz0ckgTDXv_QpJnJV5Wy-dL00PwNUxK9tyz3G4Nc_TZHmEaUKQvxuHCnmj-hUqecg6v7OlBBRDGIFq1pPj0xlxujawrjaKMfj2x6qeEkekDu4",
    alt: "Pixel 9 Pro",
    brand: "GOOGLE",
    rating: "4.7",
    reviews: "945",
    name: "Pixel 9 Pro",
    price: "6.500.000 Ar",
    storage: ["128", "256", "512"],
    selected: "128",
  },
  {
    id: 4,
    img: "https://lh3.googleusercontent.com/aida/ADBb0uh3xt0235jX_8iMX-iX8eunO1LORUqFLC_-d5p7A4xX1Dl6aT4csaDhywd95BKBhYkoA7G4O6hfW59fPZ-6i3E0VNrBgm5rUS4gHwJnsuZQC_K0p6_Okl2W6_vTGNFGbq_odlwp5Gn-Xif364iHsBSf4PlO3sgHw3nvrMds5LmaM4MukK09UG1i5Cadwv0WzrXpekCfdZFbZs5Gs1iZfQakW0DU4A-9vRUPV_3z9H0JwE3rpinQU04OsTLv6Mj8OtNmbKyomttkfB4",
    alt: "Nothing Phone (3)",
    brand: "NOTHING",
    rating: "4.6",
    reviews: "1.2k",
    name: "Nothing Phone (3)",
    price: "2.900.000 Ar",
    storage: ["128", "256", "512"],
    selected: "256",
  },
  {
    id: 5,
    img: "https://lh3.googleusercontent.com/aida/ADBb0ujNQ3Vx-9EN4YQ_XyGRr15_5dAJc_mKhQxODAuRyr7epxPSpCHz8FHgD07X7AZzUMoq3Xx6xhA8mq0u7yX1N7SzDz5bcz1mW0U4bn-tRy0rBQhtYvyRs5-TgS66oeec56u2uTmdiRgJHKBsOhIbnKHV1e3v4sK4NVymIzuoch0bwYtqihaBue1PfGx2baiProAamYC-Ye32lBQlxCkpc8dk1NliFiPqwxJmAdG92ghALxQzSEHOYjYYvExp5ktmD8LmH9-DgwXucAM",
    alt: "Xperia 1 Mark 4",
    brand: "SONY",
    rating: "4.9",
    reviews: "412",
    name: "Xperia 1 Mark 4",
    price: "1.500.000 Ar",
    storage: ["256", "512", "1TB"],
    selected: "512",
  },
  {
    id: 6,
    img: "https://lh3.googleusercontent.com/aida/ADBb0ug2Kbp4tUVrqZLfD5D94NYRkblKDzbyhiKiHP8_AXLaA120wciuVhxLS1bppet8E0D7C3zuIUY2Ne5pjjLVHQR3BqDj2l9OlniPttX9ocN2BNBLTWnPTwhFSfKlsskbJF_ipVMhbyVlw8jCFXm0mDj6wih9ku3ZwDX3sWLeeYXoWOoKL-ET0FE5zFz90xxdn28CDPonRdJR3oWw_8vQV_ZCleEVkVYnw3zzWJm1kl7Co2FEBHt4HBlY-Rpk-wjVKvWzjooJ2MdVUcY",
    alt: "Galaxy Z Flip 6",
    brand: "SAMSUNG",
    rating: "4.5",
    reviews: "2.1k",
    name: "Galaxy Z Flip 6",
    price: "2.350.000 Ar",
    storage: ["256", "512"],
    selected: "256",
  },
  {
    id: 7,
    img: "https://lh3.googleusercontent.com/aida/ADBb0ugjd64T9tGasF9CYk_9b6yzU1-XzH5HJpjGTLF3k7dyxGQBx7WncMtSzU9fgw5Z9vsK2oIu-eW2GfEm1sDZfTvJFD7UtLkSvrb_1_IB4cZeKQvHbEF8SCAFO-ImVw7GA7mPGXX6pi-YyhpUY6M4i1EtJnmroO7hb8fpsITppBqdt59T8h8Rw_6vas_2bk8_94bVF5n6Re2BgTva39IVjATuED1vq7IoCGIAMSL7u4E_D7TeFC2yMHquBJqB07W6rFDygN8CXyIunQ",
    alt: "Redmi k70 Ultra",
    brand: "SAMSUNG",
    rating: "4.9",
    reviews: "1.1k",
    name: "Redmi k70 Ultra",
    price: "1.150.000 Ar",
    storage: ["256", "512", "1TB"],
    selected: "512",
  },
  {
    id: 8,
    img: "https://lh3.googleusercontent.com/aida/ADBb0ujooKGhjMfXJmj6Ff-1WV3xNMHMVkSekCJg3dbaV8-A1_bhxbZ3iJLa9FMzMLIWs2BxQhzmiAN2pA4UikVq7jPOGZkgzOvNj3ViukJKZwSc83ANNAg4vKMvNMUkPV82jaMgtBMwZd_VQNdV5k0D-pMmpO7yQEGZt0_3ttwO7gG_nqU4SXOh6snBMIJJRwKC0Tcc6RY5Chs7_y71uJL596S-IHue_QOsooFfFxESPEyAE2qXZKPO2ihUpjQRb2qwMYneiQkhOe7TYpk",
    alt: "Vivo x300 Pro",
    brand: "GOOGLE",
    rating: "4.8",
    reviews: "856",
    name: "Vivo x300 Pro",
    price: "4.500.000 Ar",
    storage: ["128", "256", "512"],
    selected: "128",
  },
];

export default function MobilePage() {
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
                  <p className="text-2xl font-black text-white">{p.price}</p>
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
                  >
                    BUY NOW
                  </button>
                  <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-gray-200 transition-all active:scale-[0.98]">
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
