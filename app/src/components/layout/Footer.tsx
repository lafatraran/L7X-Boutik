import Link from "next/link";
import { Terminal, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 w-full py-24 px-6 mt-32">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full text-center md:text-left">
          
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-6 h-6 bg-primary rounded-full" />
              <span className="font-display font-black text-lg tracking-tighter uppercase italic">L7X Boutik</span>
            </Link>
            <p className="text-on-surface-variant text-xs leading-relaxed max-w-xs mx-auto md:mx-0 font-light italic">
              "L'élite technologique pour ceux qui refusent le compromis. Design brutal, performance absolue."
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-xs text-on-surface-variant hover:text-white transition-colors">Hardware</Link>
              <Link href="/mobile" className="text-xs text-on-surface-variant hover:text-white transition-colors">Mobile</Link>
              <Link href="/setups" className="text-xs text-on-surface-variant hover:text-white transition-colors">Setups</Link>
              <Link href="/about" className="text-xs text-on-surface-variant hover:text-white transition-colors">About</Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Connect</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-xs text-on-surface-variant hover:text-white transition-colors">Twitter (X)</a>
              <a href="#" className="text-xs text-on-surface-variant hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-xs text-on-surface-variant hover:text-white transition-colors">Discord</a>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Status</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-on-surface-variant uppercase font-mono tracking-tighter">System: Optimal</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Globe size={12} className="text-on-surface-variant" />
                <span className="text-[10px] text-on-surface-variant uppercase font-mono tracking-tighter">Nodes: 14 Global</span>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full h-px bg-white/5" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest opacity-30">
            © 2026 L7X BOUTIK. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-[9px] text-on-surface-variant hover:text-white transition-colors uppercase tracking-widest">Terms</Link>
            <Link href="/privacy" className="text-[9px] text-on-surface-variant hover:text-white transition-colors uppercase tracking-widest">Privacy</Link>
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-primary" />
              <span className="text-[9px] text-on-surface-variant uppercase font-mono">v1.0.4-stable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
