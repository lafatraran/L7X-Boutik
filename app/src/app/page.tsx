"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, ChevronDown } from "lucide-react";

export default function HomePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body overflow-x-hidden" ref={scrollRef}>
      
      {/* ──── HERO SECTION ──── */}
      <section className="reveal relative w-full h-[85vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-10"></div>
          <img 
            alt="High-end gaming PC" 
            className="w-full h-full object-cover opacity-60 scale-105" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqWZTxyCayGIiCx6qjyJaG9L_PIIS4Mc7sqXBkfMNWAYuCJsAloSpfgrk2GZ0QKfs8xWIhh8wDDOQGVf-UDISALpOU9s9SvMprHbKeTAqqw8FOL9n1uKMETYFxuK5Jem152pWFwyvIW9Rcw-IWAyPyrwLrVdRl7tHA8VC3TOc_c4fpyJ1shfiCcRa8ZUnYbocfU0cu5egKcWPSpNXraIJhuBruTh69zWPa_oPMclp8rRNU5QpFBX0g9o6q3tAXCF9toto2JnrLTWSM" 
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Future Artifact 01</span>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter headline-anchor mb-8">
            SILICON <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">MONOLITH</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Une fusion brutale entre design industriel et technologie quantique. Redéfinissez votre espace avec l'objet le plus pur jamais conçu.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/setups" className="px-12 py-4 bg-gradient-to-r from-primary to-primary-dim text-black font-bold rounded-full aura-shadow transition-all duration-500 active:scale-95 group flex items-center gap-2">
              Découvrir
            </Link>
            <Link href="/mobile" className="px-12 py-4 border border-outline-variant/20 hover:border-primary/40 text-on-surface font-medium rounded-full transition-all duration-300">
              Explorer la Vault
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <ChevronDown size={32} strokeWidth={1.5} />
        </div>
      </section>

      {/* ──── BENTO GRID: FEATURED BUILDS ──── */}
      <section className="reveal max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold headline-anchor text-primary neon-glow mb-3 uppercase tracking-tighter">FEATURED BUILDS</h2>
          <p className="text-gray-400/70 text-sm md:text-base font-light tracking-wide uppercase">Elite configurations engineered for ultimate performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
          <div className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-xl bg-surface-container shadow-xl border border-white/5">
            <img 
              alt="High-end Gaming Desktop" 
              className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110 opacity-80" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ujanIXfGwd_I4k68abOTpM-xV66GYdPqV5B6UbA8niQoWSb_3isB1SsT7ZQQgZxTvlLjLNzdYh44I-gN7gGLHQG9EIeKHpoEvyvCNTt_m8yuz8h70CZjtfb1y8du9ZKDc6-OSA01-ze8k4xIRaooxyZ2CwNoY-jJkqRnBSLQTQp3_OstWRJJUW9-OvdAQOcckeskHNNvQjY26raFgtQ5mbTVns36LUYaD-SzfVyMEXshWL8u05uh1UFxFd9wC1EZUbXJ61Kfm4Ix-Q" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10 z-10 w-full">
              <h3 className="text-4xl font-extrabold headline-anchor mb-4 uppercase">DESKTOP SERIES 03</h3>
              <p className="text-on-surface-variant max-w-sm mb-6 font-light">Des performances sans compromis pour les créateurs et les joueurs d'élite.</p>
              <Link href="/setups" className="inline-flex items-center gap-2 text-primary font-bold group">
                Explorer les builds <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-xl bg-surface-container-high border border-white/5 flex flex-col justify-end">
            <img 
              alt="Limited Edition Bundle" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5reeGhqDVOHsAVOhhu1YO1QQDMgMCtiiyN1M6Xfh-XojUjk4i5pwxjOmYJuM6h6GqQZTuy8V8iCLbsMhkbFfDx8MlJbTvuQqWpXlya8jC_yV6oGWqSSGdW9rHPGddjbfMt1YCTHcL2JoezyW4ps5t9KymSX0lWKk5HytKQWIBV0n8WRyDvAEcG5oXXlyAX5tXSXNmCYf7SR8E7vtsO-pYGzaGWdyep7efnR4kMNNZ-mN8DK5FI93RCvMimxJs4FOzg7g3UTpHM-rA" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute top-0 right-0 p-6 z-10"><span className="bg-primary/20 text-primary border border-primary/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">Limited</span></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <h4 className="text-xl font-bold headline-anchor mb-2 text-white leading-tight">LIMITED EDITION KIT</h4>
              <p className="text-on-surface-variant text-[11px] mb-4 font-light leading-relaxed">Le kit ultime pour dominer. Conçu pour la performance et le style.</p>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-primary font-bold text-lg">349€</p>
                <button className="px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 text-white">Add to cart</button>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-xl bg-gradient-to-br from-surface-container to-surface-container-low border border-white/5 flex flex-col justify-end">
             <img alt="Extreme Hardware Lab" className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAknfmq3AJN4Q_2AGcEzSsIvqYgz83y1Uu1OPG7QxXt5mBza6WNb_BSvUTNhTxg64TNUJm7M7zQOP4H-WI1-UWuarUe6W9BFvp9sFCG0HtIILOVagryGYR27ktjXQTL1ehwc-KbhV10HljRP5ghhdORRxzYweesMllfkrIvODCgmdKqP8_UGQ14M7tJSDqN3Trc5N4NhanPajp5P0FunAP1K8ssaF1XPwHAKUKq0uQ8RSLJPjuNNnUvnAR7IhgpKSJlK0qpkhgRE-kD"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <h4 className="text-xl font-bold headline-anchor mb-2 text-white leading-tight uppercase">The Lab: Prototypes</h4>
              <p className="text-on-surface-variant text-[11px] mb-4 font-light leading-relaxed">Advanced liquid cooling and custom BIOS tuning for extreme performance.</p>
              <div className="flex items-center justify-between mt-auto">
                <p className="text-primary font-bold text-lg">640€</p>
                <button className="px-4 py-2 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 active:scale-95 text-white">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 reveal">
        <div className="h-px w-full max-w-4xl mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.2)] my-16 neon-divider-animated cursor-pointer"></div>
      </div>

      <section className="reveal bg-surface-container-lowest py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Curated</span>
              <h2 className="text-5xl font-extrabold headline-anchor uppercase tracking-tighter">Derniers Drops</h2>
            </div>
            <Link href="/mobile" className="text-on-surface-variant hover:text-white transition-colors border-b border-outline-variant pb-1 text-sm font-light">Tout parcourir</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: 1, name: "IPHONE 15 PRO", color: "Titanium Black", price: "1,229€", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaT4rxTzpQfuON4PWb6T2Xd6doioUycKX9tLIPvgodNPH0MZwfce-gwSRMp3fzZrH296fOBD15a6q0sSyN_t6amgKZfEZTX-zvHlVzKb4cRnR5TRIZUvs5v_7zRN23J4KT1j9LaNuriNvHxhhFQ7G9i-M_err_IaGiS4-HzGVq1B_PeiAYUsUxNJyzE3-XmLhj2DXlRacNn1Li_dVNzOLw75ZsjdKFbUU_SQWJ75w-nG1ADWfC4P1fyquUvUQ7uRbYCWJgER_ezjF8" },
              { id: 2, name: "GALAXY S24 ULTRA", color: "Titanium Violet", price: "1,469€", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6FU17vtK5lrWrZvm0GFP37t6WN-adt2MEUi8rFTkyZ7Cgnz2tTV3HR51G1o4kKBSmiohJIb8_6X9UFHSvtPKmyYsnn2pYxdEjyFlXjAPZjdD7dHuY6SQItx56YqE82Ips36hWP9C8dBXsNqO0VJ31ZA-w-6daZrUDT3WCdZF1il-vZ2Ay8GbXNIGQkYEt3lntR2l7DLX7bs0J5HCJuCa2og_53DuSaovRC7BbJJHgPegbvLUBZrmJy_eytoz7VPEEMC_PHyqXCd_x" },
              { id: 3, name: "HEX MECHANICAL", color: "Neon Switch Edition", price: "249€", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6EiZ6dPQdfPiM8sSVqskByFGq-VUrgwQNTHcbh6Kbxlxul6ue7BJ--I07WaWqrAhibA6vEL5sajsuz559I6KdybAKs2WCU58-hCmul7pAaYsSFPuvAc_P0N-ebYvzyRldD-jY9TJDw03CdSkU2NKU1a0MxkckjbuD95oyUTKGyRLXfR4RkijIAidARVF8CmOYGesLlW_2WTtHBbJtLaKrYnIppaQSV9quALufgeax22yHq3FD-yXR6Yor-n6QKQfTe3-itRdFXaFp" },
              { id: 4, name: "VOID CURVE 49\"", color: "240Hz OLED", price: "1,599€", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn8o8FAVUugmAoK4mlzGcgCWdKbi3Ir6akzwp4Nqrehe4sL_j8C6n5Z5x64oNjdabRFs7WLpAUfRRMZCIfKNmgoAhK7Wef_w4_lRRa5s0EhCVfkdCxZ9EIpjsSOMhc9E96yB4Ay1WbTkqhwfvi_p1iLqV2tEaUWwF7aROkzBxzEEg8qDjqzL3MrviNmL6nrnv5K7DLlGBql1UHmw1FM9LFQ8niJb-Phn1-Ar69AcCSt7gcBEsHATes_UDW9zHOhNICV_ACQ_40b42C" }
            ].map((p) => (
              <div key={p.id} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden rounded-full bg-surface-container relative mb-6">
                  <img alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={p.img} />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="text-center">
                  <h3 className="font-bold headline-anchor text-lg group-hover:text-primary transition-colors text-white uppercase">{p.name}</h3>
                  <p className="text-on-surface-variant text-[11px] font-light uppercase tracking-widest mt-1 opacity-70">{p.color}</p>
                  <p className="mt-3 font-bold text-white text-lg">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="reveal py-40 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 flex justify-center"><Cpu size={64} strokeWidth={1} className="text-primary opacity-50" /></div>
          <h2 className="text-4xl md:text-6xl font-extrabold headline-anchor mb-8 leading-[1.1] uppercase tracking-tighter">Le Hardware est une <br/> <span className="italic text-primary">forme d'art.</span></h2>
          <p className="text-xl md:text-2xl text-on-surface-variant font-light mb-12 leading-relaxed italic opacity-80">"Chez L7X Boutik, nous sélectionnons l'élite technologique. Chaque circuit, chaque panneau OLED est une pièce du futur que nous vous livrons aujourd'hui."</p>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        </div>
      </section>

      <section className="reveal max-w-7xl mx-auto px-6 mb-32">
        <div className="glass-card p-12 md:p-24 rounded-3xl border border-white/5 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold headline-anchor mb-6 uppercase tracking-tighter">Accès Prioritaire</h2>
            <p className="text-on-surface-variant mb-10 max-w-lg mx-auto font-light">Inscrivez-vous pour recevoir les alertes sur les prochains GPU et flagship mobiles avant tout le monde.</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input className="flex-grow bg-surface-container-low border border-outline-variant/20 rounded-full px-8 py-4 focus:ring-1 focus:ring-primary focus:border-primary text-white outline-none font-light placeholder:opacity-30" placeholder="Votre email" type="email"/>
              <button className="bg-white text-black font-bold px-10 py-4 rounded-full hover:bg-primary hover:text-black transition-colors active:scale-95 uppercase tracking-widest text-[10px]">Rejoindre</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
