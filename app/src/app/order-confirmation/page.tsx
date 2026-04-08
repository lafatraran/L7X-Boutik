import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="flex justify-center">
          <div className="p-6 bg-purple-500">
            <CheckCircle size={48} className="text-black" />
          </div>
        </div>
        <h1 className="font-display font-black text-4xl tracking-tightest text-white">
          Commande confirmée !
        </h1>
        <p className="text-zinc-500 font-sans leading-relaxed">
          Merci pour votre achat. Votre commande a été enregistrée et sera traitée dans les plus brefs délais.
          Vous recevrez un email de confirmation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/">
            <Button variant="primary" size="lg">Retour à l'accueil</Button>
          </Link>
          <Link href="/account">
            <Button variant="outline" size="lg">Mes commandes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
