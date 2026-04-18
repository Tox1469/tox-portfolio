"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { lang, t } = useLang();
  const cardRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -6;
    const rotateY = (x - 0.5) * 6;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlowPos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
    setGlowPos({ x: 50, y: 50 });
  }, []);

  return (
    <Link href={`/projects/${project.slug}`}>
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative border border-border rounded-lg p-5 sm:p-6 transition-all duration-300 cursor-pointer hover:border-transparent"
        style={{
          transform,
          transition: transform ? "none" : "transform 0.4s ease",
          borderColor: transform ? project.color + "40" : undefined,
        }}
      >
        <div
          className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.color}10, transparent 50%)`,
          }}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: project.color }}
                />
                <h3 className="text-base sm:text-lg font-sans font-semibold text-foreground">
                  {project.name}
                </h3>
              </div>
              <p
                className="font-mono text-[11px] uppercase tracking-wider"
                style={{ color: project.color }}
              >
                {project.tagline[lang]}
              </p>
            </div>

            <div className="hidden sm:flex gap-4 text-[10px] font-mono text-muted shrink-0">
              {project.stats.routes !== "\u2014" && (
                <span>{project.stats.routes} {t.projects.routes}</span>
              )}
              {project.stats.migrations !== "\u2014" && (
                <span>{project.stats.migrations} {t.projects.migrations}</span>
              )}
              {project.stats.crons !== "\u2014" && (
                <span>{project.stats.crons} {t.projects.crons}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.flatMap((s) => s.items).filter((v, i, a) => a.indexOf(v) === i).map((tech) => (
              <span
                key={tech}
                className="tag px-2 py-0.5 text-[10px] font-mono text-neutral-500 border border-border rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
