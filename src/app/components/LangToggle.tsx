"use client";

import { useLang } from "@/contexts/LangContext";

export default function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 z-50 px-3 py-1.5 text-[10px] font-mono text-muted hover:text-accent border border-border hover:border-accent/30 rounded bg-surface/80 backdrop-blur-sm transition-colors uppercase tracking-widest"
    >
      {lang === "en" ? "PT" : "EN"}
    </button>
  );
}
