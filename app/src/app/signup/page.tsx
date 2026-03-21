"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
  const strength = [
    { test: password.length >= 8, label: "8+ caractères" },
    { test: /[A-Z]/.test(password), label: "Majuscule" },
    { test: /[0-9]/.test(password), label: "Chiffre" },
    { test: /[^A-Za-z0-9]/.test(password), label: "Symbole" },
  ];
  const score = strength.filter((s) => s.test).length;

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 transition-all duration-300 ${
              i < score
                ? score <= 1 ? "bg-red-400"
                : score === 2 ? "bg-yellow-400"
                : score === 3 ? "bg-blue-400"
                : "bg-green-400"
                : "bg-outlineVariant/30"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {strength.map(({ test, label }) => (
          <span
            key={label}
            className={`text-xs font-sans flex items-center gap-1 transition-colors duration-200 ${
              test ? "text-green-600" : "text-outlineVariant"
            }`}
          >
            <CheckCircle size={10} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// Google SVG logo
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function SignupPage() {
  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, displayName);
      setSuccess(true);
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur Google Sign-In.");
    } finally {
      setGoogleLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-surface-low flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-up">
          <div className="flex justify-center">
            <div className="p-5 bg-cyber-gradient">
              <CheckCircle size={40} className="text-deep-900" />
            </div>
          </div>
          <h2 className="font-display font-black text-3xl text-onSurface">Compte créé !</h2>
          <p className="text-onSurfaceVariant font-sans">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-low flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <Zap size={32} className="text-cyber-cyan" fill="currentColor" />
            <span className="font-display font-black text-3xl tracking-tightest text-onSurface">
              L7X<span className="text-cyber-cyan">.</span>
            </span>
          </div>
          <h1 className="font-display font-black text-4xl tracking-tightest text-onSurface">
            Créer un compte
          </h1>
          <p className="text-onSurfaceVariant font-sans mt-2">
            Rejoignez L7X et accédez à des produits exclusifs.
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-lowest border border-outlineVariant/30 p-8 space-y-6">

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-outlineVariant/50 hover:border-primary font-display font-medium text-onSurface transition-all duration-300 hover:bg-surface-low disabled:opacity-50"
          >
            {googleLoading ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : <GoogleIcon />}
            Continuer avec Google
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outlineVariant/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-surface-lowest px-4 text-xs text-onSurfaceVariant font-sans">
                ou créer un compte email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-sans px-4 py-3 flex items-start gap-2">
                <span className="mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Display Name */}
            <div className="space-y-1">
              <label className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">
                Nom complet
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outlineVariant" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  minLength={2}
                  className="w-full pl-10 pr-4 py-3 border-b border-outlineVariant bg-transparent font-sans text-sm text-onSurface placeholder-outlineVariant focus:outline-none focus:border-primary transition-colors duration-200"
                  placeholder="Jean Dupont"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outlineVariant" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border-b border-outlineVariant bg-transparent font-sans text-sm text-onSurface placeholder-outlineVariant focus:outline-none focus:border-primary transition-colors duration-200"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">
                Mot de passe
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outlineVariant" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border-b border-outlineVariant bg-transparent font-sans text-sm text-onSurface placeholder-outlineVariant focus:outline-none focus:border-primary transition-colors duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outlineVariant hover:text-onSurface"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="font-display text-xs font-bold uppercase tracking-tight text-onSurfaceVariant">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-outlineVariant" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full pl-10 pr-4 py-3 border-b bg-transparent font-sans text-sm text-onSurface placeholder-outlineVariant focus:outline-none transition-colors duration-200 ${
                    confirmPassword && confirmPassword !== password
                      ? "border-red-400 focus:border-red-400"
                      : "border-outlineVariant focus:border-primary"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {confirmPassword && confirmPassword !== password && (
                <p className="text-xs text-red-400 font-sans">Les mots de passe ne correspondent pas.</p>
              )}
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                Créer mon compte
              </Button>
            </div>

            <p className="text-xs text-onSurfaceVariant font-sans text-center">
              En créant un compte, vous acceptez nos{" "}
              <Link href="/terms" className="text-primary hover:underline">CGV</Link> et notre{" "}
              <Link href="/privacy" className="text-primary hover:underline">politique de confidentialité</Link>.
            </p>
          </form>
        </div>

        <p className="text-center mt-6 text-sm font-sans text-onSurfaceVariant">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-primary font-medium hover:text-onSurface transition-colors">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
