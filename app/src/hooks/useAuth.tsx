"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { supabase } from "@/lib/supabase";
import { getFirebaseErrorMessage } from "@/lib/firebase-errors";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

async function syncProfileToSupabase(firebaseUser: User) {
  try {
    await supabase.from("profiles").upsert(
      {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        display_name: firebaseUser.displayName,
        avatar_url: firebaseUser.photoURL,
      },
      { onConflict: "id" }
    );
  } catch {
    // Silently fail — Supabase sync is non-critical
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await syncProfileToSupabase(firebaseUser);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (err?.code) {
        throw new Error(getFirebaseErrorMessage(err.code));
      }
      throw err;
    }
  };

  const signup = async (email: string, password: string, displayName: string) => {
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(newUser, { displayName });
      await supabase.from("profiles").upsert(
        { id: newUser.uid, email: newUser.email!, display_name: displayName },
        { onConflict: "id" }
      );
    } catch (err: any) {
      if (err?.code) {
        throw new Error(getFirebaseErrorMessage(err.code));
      }
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      await syncProfileToSupabase(result.user);
    } catch (err: any) {
      if (err?.code) {
        // Don't throw on user-cancelled popup
        if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
          return;
        }
        throw new Error(getFirebaseErrorMessage(err.code));
      }
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      if (err?.code) {
        throw new Error(getFirebaseErrorMessage(err.code));
      }
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
