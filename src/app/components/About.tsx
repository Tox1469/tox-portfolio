"use client";

import { useLang } from "@/contexts/LangContext";

export default function About() {
  const { t } = useLang();

  return (
    <div>
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs text-accent glow">$</span>
        <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
          {t.about.section_title}
        </h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="border border-border rounded-lg p-6 sm:p-8 bg-surface">
        <h3 className="text-lg font-sans font-semibold text-foreground mb-4">
          # {t.about.title}
        </h3>

        <div className="space-y-3 mb-8">
          {t.about.bio.map((paragraph, i) => (
            <p key={i} className="text-sm text-muted leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <h4 className="text-sm font-sans font-semibold text-foreground mb-3">
          ## {t.about.how_i_work_title}
        </h4>
        <ul className="space-y-2 mb-8">
          {t.about.how_i_work.map((item, i) => (
            <li key={i} className="text-sm text-muted flex items-start gap-2">
              <span className="text-accent mt-0.5 shrink-0">-</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h4 className="text-sm font-sans font-semibold text-foreground mb-3">
          ## {t.about.currently_title}
        </h4>
        <p className="text-sm text-muted leading-relaxed">
          {t.about.currently}
        </p>
      </div>
    </div>
  );
}
