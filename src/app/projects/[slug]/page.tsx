"use client";

import { use } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { useLang } from "@/contexts/LangContext";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang, t } = useLang();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="scanlines min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-sm text-muted mb-4">404 — project not found</p>
          <Link href="/" className="font-mono text-xs text-accent hover:underline">
            {t.projects.back}
          </Link>
        </div>
      </div>
    );
  }

  const prev = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <div className="scanlines min-h-screen">
      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8 py-12 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors mb-12"
        >
          <span>&larr;</span> {t.projects.back}
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-3 h-3 rounded-full shrink-0"
              style={{ background: project.color }}
            />
            <h1 className="text-3xl sm:text-4xl font-sans font-bold">
              {project.name}
            </h1>
          </div>
          <p
            className="font-mono text-sm uppercase tracking-wider mb-4"
            style={{ color: project.color }}
          >
            {project.tagline[lang]}
          </p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent border border-accent/30 rounded px-3 py-1.5 hover:bg-accent/10 transition-colors"
            >
              {t.projects.visit_site} <span>&nearr;</span>
            </a>
          )}
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-accent glow">$</span>
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
              {t.projects.the_problem}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {project.problem[lang]}
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-accent glow">$</span>
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
              {t.projects.the_solution}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {project.solution[lang]}
          </p>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-accent glow">$</span>
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
              {t.projects.technical_decisions}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-4">
            {project.decisions[lang].map((decision, i) => (
              <div key={i} className="border border-border rounded-lg p-4 bg-surface">
                <p className="text-sm text-muted leading-relaxed">
                  <span className="text-accent font-mono">&gt;</span> {decision}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-accent glow">$</span>
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
              {t.projects.stack_breakdown}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.stack.map((layer) => (
              <div key={layer.category} className="border border-border rounded-lg p-4 bg-surface">
                <h3 className="font-mono text-[10px] text-accent uppercase tracking-widest mb-2">
                  {layer.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {layer.items.map((tech) => (
                    <span
                      key={tech}
                      className="tag px-2 py-0.5 text-[10px] font-mono text-neutral-500 border border-border rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-muted">{layer.context[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        {(project.stats.routes !== "\u2014" || project.stats.migrations !== "\u2014" || project.stats.crons !== "\u2014") && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs text-accent glow">$</span>
              <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
                {t.projects.numbers}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex gap-6">
              {project.stats.routes !== "\u2014" && (
                <div className="border border-border rounded-lg p-4 bg-surface text-center flex-1">
                  <p className="stat-number text-2xl font-sans font-bold">{project.stats.routes}</p>
                  <p className="text-[10px] font-mono text-muted mt-1 uppercase tracking-wider">{t.projects.routes}</p>
                </div>
              )}
              {project.stats.migrations !== "\u2014" && (
                <div className="border border-border rounded-lg p-4 bg-surface text-center flex-1">
                  <p className="stat-number text-2xl font-sans font-bold">{project.stats.migrations}</p>
                  <p className="text-[10px] font-mono text-muted mt-1 uppercase tracking-wider">{t.projects.migrations}</p>
                </div>
              )}
              {project.stats.crons !== "\u2014" && (
                <div className="border border-border rounded-lg p-4 bg-surface text-center flex-1">
                  <p className="stat-number text-2xl font-sans font-bold">{project.stats.crons}</p>
                  <p className="text-[10px] font-mono text-muted mt-1 uppercase tracking-wider">{t.projects.crons}</p>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="mb-16">
          <div className="border border-dashed border-border rounded-lg p-8 flex items-center justify-center">
            <p className="font-mono text-xs text-muted/50 uppercase tracking-widest">
              {t.projects.visual_placeholder}
            </p>
          </div>
        </section>

        <div className="flex items-center justify-between border-t border-border pt-8">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors"
            >
              <span>&larr;</span>
              <div>
                <p className="text-[10px] uppercase tracking-wider mb-0.5">{t.projects.prev}</p>
                <p className="text-sm text-foreground group-hover:text-accent transition-colors">{prev.name}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors text-right"
            >
              <div>
                <p className="text-[10px] uppercase tracking-wider mb-0.5">{t.projects.next}</p>
                <p className="text-sm text-foreground group-hover:text-accent transition-colors">{next.name}</p>
              </div>
              <span>&rarr;</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
