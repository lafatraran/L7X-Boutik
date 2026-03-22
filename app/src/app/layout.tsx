import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AuthProvider } from "@/hooks/useAuth";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "L7X BOUTIK | Ultra-Dark Tech Editorial",
    template: "%s | L7X BOUTIK",
  },
  description: "Dernière technologie premium : smartphones, setups gaming et matériel d'élite.",
  keywords: ["hardware", "gaming", "setup", "L7X", "boutik"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable} dark`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <body className="font-body bg-surface text-on-surface antialiased selection:bg-primary selection:text-black">
        <AuthProvider>
          <Header />
          <div className="min-h-screen">
            {children}
          </div>
          <Footer />
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}
