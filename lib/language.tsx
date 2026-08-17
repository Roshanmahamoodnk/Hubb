"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "ar" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (ar: string, en: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const storageKey = "hubb-language";

export function LanguageProvider({ children, initialLanguage = "ar" }: { children: ReactNode; initialLanguage?: Language }) {
  const pathname = usePathname();
  const router = useRouter();
  const pathLanguage: Language = pathname === "/en" || pathname.startsWith("/en/") ? "en" : initialLanguage;
  const [language, setLanguageState] = useState<Language>(pathLanguage);

  useEffect(() => {
    if (pathname === "/en" || pathname.startsWith("/en/")) {
      setLanguageState("en");
      return;
    }
    if (pathname === "/") {
      setLanguageState("ar");
      return;
    }
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === "ar" || saved === "en") setLanguageState(saved);
    } catch {
      // Language still works from the route default.
    }
  }, [pathname]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(storageKey, next);
    } catch {
      // Preference is optional.
    }
    if (pathname === "/" && next === "en") router.push("/en");
    if (pathname === "/en" && next === "ar") router.push("/");
  }, [pathname, router]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage(language === "ar" ? "en" : "ar"),
    t: (ar: string, en: string) => (language === "ar" ? ar : en),
  }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
