"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import i18n, { type Lang } from "@/data/i18n";

type LangContextType = {
  lang: Lang;
  t: typeof i18n[Lang];
  toggleLang: () => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "pt") setLang(saved);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === "en" ? "pt" : "en";
      localStorage.setItem("lang", next);
      return next;
    });
  };

  return (
    <LangContext value={{ lang, t: i18n[lang], toggleLang }}>
      {children}
    </LangContext>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
