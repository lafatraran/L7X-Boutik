import { Metadata } from "next";
import { Zap, Shield, Zap as ZapIcon, Globe, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "À Propos | L7X BOUTIK",
  description: "L'histoire derrière L7X Boutik, votre destination d'élite pour le hardware et le mobile.",
};

export default function AboutPage() {
  return (
    <div className="bg-surface text-on-surface font-body px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <section className="reveal active text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest">
            <ZapIcon size={14} />
            Notre Vision
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold headline-anchor uppercase tracking-tighter">
            L'Élite du <span className="text-primary">Hardware</span>
          </h1>
          <p className="text-on-surface-variant text-xl font-light leading-relaxed max-w-2xl mx-auto italic">
            "Redéfinir la relation entre l'homme et la machine par le design et la performance brute."
          </p>
        </section>

        <div className="h-px bg-white/5 w-full"></div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="reveal active space-y-4">
            <h2 className="text-2xl font-bold headline-anchor uppercase tracking-tight">Curateurs de Futur</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              L7X Boutik n'est pas qu'une simple boutique. C'est un laboratoire de sélection où chaque composant, chaque smartphone et chaque accessoire est testé pour répondre aux standards les plus extrêmes de l'industrie.
            </p>
          </div>
          <div className="reveal active space-y-4">
            <h2 className="text-2xl font-bold headline-anchor uppercase tracking-tight">Innovation Brutale</h2>
            <p className="text-on-surface-variant font-light leading-relaxed">
              Nous croyons que le hardware est une forme d'art. Notre mission est de vous apporter les prototypes d'aujourd'hui qui deviendront les standards de demain.
            </p>
          </div>
        </div>

        {/* Stats/Values */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <ValueCard icon={Shield} title="Sécurité" desc="Protection maximale" />
          <ValueCard icon={Zap} title="Vitesse" desc="Performance ultime" />
          <ValueCard icon={Globe} title="Global" desc="L'élite mondiale" />
          <ValueCard icon={Users} title="Club" desc="Accès prioritaire" />
        </div>

      </div>
    </div>
  );
}

function ValueCard({ icon: Icon, title, desc }: { icon: any; title: string, desc: string }) {
  return (
    <div className="p-6 bg-surface-container border border-white/5 rounded-2xl flex flex-col items-center text-center gap-3">
      <Icon size={32} strokeWidth={1} className="text-primary mb-2" />
      <h3 className="font-bold headline-anchor text-sm uppercase">{title}</h3>
      <p className="text-xs text-on-surface-variant font-light">{desc}</p>
    </div>
  );
}
