"use client";

import { useLang } from "@/contexts/LangContext";
import HeroBg from "./HeroBg";

export default function Hero({
  onProjectsClick,
  onContactClick,
}: {
  onProjectsClick: () => void;
  onContactClick: () => void;
}) {
  const { t } = useLang();

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-5">
      <HeroBg />

      <div className="relative z-10 text-center">
        <h1 className="text-6xl sm:text-8xl font-sans font-bold tracking-tight mb-4">
          <span className="text-accent glow-strong">Tox</span>
        </h1>

        <div className="mb-6">
          <p className="typing-container font-mono text-sm sm:text-base text-foreground/80">
            {t.hero.subtitle}
          </p>
        </div>

        <p className="font-mono text-[11px] text-muted mb-10 tracking-wider">
          {t.hero.stats}
        </p>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={onProjectsClick}
            className="font-mono text-xs text-accent border border-accent/30 rounded px-5 py-2.5 hover:bg-accent/10 transition-colors"
          >
            {t.hero.cta_projects}
          </button>
          <button
            onClick={onContactClick}
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            {t.hero.cta_contact}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
