"use client";

import { useRef } from "react";
import { useLang } from "@/contexts/LangContext";
import { projects } from "@/data/projects";
import Hero from "./components/Hero";
import Terminal from "./components/Terminal";
import About from "./components/About";
import Stats from "./components/Stats";
import ProjectCard from "./components/ProjectCard";
import ScrollReveal from "./components/ScrollReveal";

const techStack = [
  { key: "languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "Lua"] },
  { key: "frontend", items: ["Next.js", "React", "Tailwind", "Framer Motion"] },
  { key: "backend", items: ["Node.js", "REST APIs", "SSE", "WebSockets"] },
  { key: "database", items: ["PostgreSQL", "Supabase", "Redis", "Prisma"] },
  { key: "ai", items: ["Gemini", "Claude", "OpenAI", "RAG", "Embeddings"] },
  { key: "security", items: ["Pentesting", "OWASP", "RBAC", "MFA", "RLS"] },
  { key: "infra", items: ["Vercel", "Docker", "CI/CD", "Cloudflare"] },
  { key: "integrations", items: ["Twilio", "HubSpot", "Slack", "Notion", "Google APIs"] },
];

const securitySkills = ["Pentesting", "OWASP", "MFA/OAuth2", "RLS", "RBAC", "Criptografia", "LGPD", "DDoS Mitigation", "Prompt Injection Prevention"];

export default function Home() {
  const projectsRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { t } = useLang();

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="scanlines flex flex-col min-h-screen">
      <Hero onProjectsClick={scrollToProjects} onContactClick={scrollToContact} />

      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8">
        <ScrollReveal>
          <section className="py-16 sm:py-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs text-accent glow">$</span>
              <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
                {t.terminal.section_title}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Terminal onProjectsCommand={scrollToProjects} />

            <p className="font-mono text-[10px] text-muted/50 mt-3 text-center">
              {t.terminal.hint}
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="pb-16 sm:pb-20">
            <About />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <div className="divider-glow mb-12" />
          <Stats />
          <div className="divider-glow mt-12" />
        </ScrollReveal>

        <section ref={projectsRef} className="py-16 sm:py-20">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-xs text-accent glow">$</span>
              <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
                {t.projects.section_title}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            {projects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <ScrollReveal>
          <section className="pb-16 sm:pb-20">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-xs text-accent glow">$</span>
              <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
                {t.skills.section_title}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {techStack.map((group) => (
                <div key={group.key}>
                  <h3 className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">
                    {t.skills.categories[group.key as keyof typeof t.skills.categories]}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {group.items.map((item) => (
                      <span key={item} className="font-mono text-xs text-muted hover:text-foreground transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section className="pb-16 sm:pb-20">
            <div className="flex items-center gap-3 mb-10">
              <span className="font-mono text-xs text-accent glow">$</span>
              <h2 className="font-mono text-xs text-muted uppercase tracking-widest">
                {t.security.section_title}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="border border-border rounded-lg p-5 sm:p-6 bg-surface">
              <p className="text-sm text-foreground leading-relaxed mb-4">
                {t.security.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="border border-border rounded-md p-3">
                  <p className="font-mono text-xs text-accent mb-1">Sicredi</p>
                  <p className="text-[11px] text-muted">{t.security.sicredi}</p>
                </div>
                <div className="border border-border rounded-md p-3">
                  <p className="font-mono text-xs text-accent mb-1">Tozetto Mercados</p>
                  <p className="text-[11px] text-muted">{t.security.tozetto}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {securitySkills.map((skill) => (
                  <span
                    key={skill}
                    className="tag px-2 py-0.5 text-[10px] font-mono text-accent-dim border border-accent-dim/30 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        <footer ref={footerRef} className="pb-10 sm:pb-14 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-5 text-xs font-mono">
              <a
                href="https://github.com/Tox1469"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
              >
                github
              </a>
              <a
                href="mailto:tox@toxia.com.br"
                className="text-muted hover:text-accent transition-colors"
              >
                tox@toxia.com.br
              </a>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-700 uppercase tracking-widest">
              <span>built by tox</span>
              <span
                className="inline-block w-1.5 h-3 bg-accent/60"
                style={{ animation: "blink 0.8s step-end infinite" }}
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
