const projects = [
  {
    name: "AgentBox",
    description: "Multi-tenant SaaS for AI agents. 50+ templates, pipelines, WhatsApp/SMS, social media, internal chat, document generation, integrations.",
    stack: ["Next.js", "Supabase", "Gemini", "Tailwind", "Vercel"],
    url: "https://agentbox.com.br",
    stats: "144 endpoints / 62 migrations",
  },
  {
    name: "CreevoHub",
    description: "Hiring platform for construction industry. NR/medical compliance, multi-tenant dashboards, AI candidate screening.",
    stack: ["Next.js", "Supabase", "Tailwind", "Vercel"],
    url: "https://creevo.com.br",
    stats: "Multi-tenant / RBAC",
  },
  {
    name: "Creevo Academy",
    description: "Training platform specialized in Normas Regulamentadoras. Course management, certifications, company dashboards.",
    stack: ["Next.js", "Supabase", "Tailwind", "Vercel"],
    url: "https://creevoacademy.com.br",
    stats: "LMS / Certifications",
  },
  {
    name: "TAS Ocupacional",
    description: "Occupational health company website. Service showcase, contact integration, premium design.",
    stack: ["React", "Vite", "Framer Motion", "Vercel"],
    url: "https://tasocupacional.com.br",
    stats: "Landing / WhatsApp integration",
  },
  {
    name: "ToxBets",
    description: "Casino platform with Texas Hold'em poker (AI bots, tournaments, chip economy), Mines, Blackjack, Double, and 7+ more games. Real-time multiplayer via SSE.",
    stack: ["Next.js", "Redis", "SSE", "Tailwind"],
    url: null,
    stats: "10+ games / Elo ranking",
  },
  {
    name: "AppForm",
    description: "SaaS for clinic management. AI-powered WhatsApp bot for appointment scheduling, Google Calendar sync, patient management.",
    stack: ["Next.js", "Supabase", "Twilio", "Google Calendar"],
    url: null,
    stats: "WhatsApp bot / Multi-clinic",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-mono">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8 py-10 sm:py-16">
        {/* Boot sequence */}
        <div className="mb-10 sm:mb-14 flex flex-col gap-1.5 text-sm">
          <p className="terminal-line boot-0 text-muted text-xs">
            tox@dev:~$ <span className="text-foreground">whoami</span>
          </p>
          <p className="terminal-line boot-1 text-accent text-xs">
            &gt; Tox — Full-Stack Developer
          </p>
          <p className="terminal-line boot-2 text-muted text-xs">
            tox@dev:~$ <span className="text-foreground">cat about.txt</span>
          </p>
          <div className="terminal-line boot-3 mt-1">
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              I build SaaS platforms, AI systems, and real-time
            </p>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              applications from scratch — architecture, database,
            </p>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              API, frontend, deploy.
            </p>
          </div>
          <p className="terminal-line boot-4 text-muted text-xs mt-3">
            tox@dev:~$ <span className="text-foreground">ls ./projects</span>
          </p>
          <p className="terminal-line boot-5 text-accent text-xs">
            &gt; {projects.length} entries found
          </p>
          <div className="terminal-line boot-6 mt-1 h-px bg-border" />
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className={`terminal-line proj-${i} group relative pl-4 border-l border-border hover:border-accent transition-colors duration-300`}
            >
              <div className="flex items-baseline gap-3 mb-1.5">
                <h2 className="text-base sm:text-lg font-sans font-medium tracking-tight">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {project.name}
                      <span className="text-muted text-xs ml-1.5">&nearr;</span>
                    </a>
                  ) : (
                    <span className="text-foreground/70">{project.name}</span>
                  )}
                </h2>
                <span className="text-[10px] text-muted hidden sm:inline">
                  {project.stats}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-muted leading-relaxed mb-2.5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-1.5 py-0.5 text-[10px] text-neutral-500 border border-border rounded group-hover:border-accent/20 group-hover:text-neutral-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <footer className="terminal-line footer-in mt-14 sm:mt-20 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs">
              <a
                href="https://github.com/Tox1469"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors"
              >
                github
              </a>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-neutral-700 uppercase tracking-widest">
              <span>built by tox</span>
              <span
                className="inline-block w-1.5 h-3 bg-accent/60"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
