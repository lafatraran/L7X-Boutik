/**
 * Maps Firebase Auth error codes to user-friendly French error messages.
 */
export function getFirebaseErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    // Login errors
    "auth/invalid-credential":      "Email ou mot de passe incorrect.",
    "auth/user-not-found":          "Aucun compte trouvé avec cet email.",
    "auth/wrong-password":          "Mot de passe incorrect.",
    "auth/invalid-email":           "Adresse email invalide.",
    "auth/user-disabled":           "Ce compte a été désactivé.",
    "auth/too-many-requests":       "Trop de tentatives. Réessayez dans quelques minutes.",
    // Signup errors
    "auth/email-already-in-use":    "Un compte existe déjà avec cet email.",
    "auth/weak-password":           "Le mot de passe doit contenir au moins 6 caractères.",
    "auth/operation-not-allowed":   "Cette méthode de connexion n'est pas activée.",
    // Google errors
    "auth/popup-closed-by-user":    "La fenêtre de connexion a été fermée.",
    "auth/popup-blocked":           "Le navigateur a bloqué la fenêtre. Autorisez les popups pour ce site.",
    "auth/cancelled-popup-request": "Connexion Google annulée.",
    "auth/account-exists-with-different-credential":
      "Un compte existe déjà avec cet email via une autre méthode de connexion.",
    // Network
    "auth/network-request-failed":  "Erreur réseau. Vérifiez votre connexion internet.",
    "auth/internal-error":          "Erreur interne Firebase. Vérifiez votre configuration.",
  };

  return messages[code] ?? `Erreur inattendue (${code}). Réessayez.`;
}
