const projects = [
  {
    name: "AgentBox",
    description: "Multi-tenant SaaS for AI agents. 50+ templates, pipelines, WhatsApp/SMS channels, social media posting, internal chat, document generation, and integrations with HubSpot, Slack, Notion, Bitrix24.",
    stack: ["Next.js", "Supabase", "Gemini", "Tailwind", "Vercel"],
    url: "https://agentbox.com.br",
    stats: "144 API routes / 62 DB migrations / 14 cron jobs",
  },
  {
    name: "CreevoHub",
    description: "Hiring platform for the construction industry with NR/medical compliance, multi-tenant company dashboards, and AI-powered candidate screening.",
    stack: ["Next.js", "Supabase", "Tailwind", "Vercel"],
    url: null,
    stats: "Multi-tenant / RBAC / Compliance engine",
  },
  {
    name: "ToxBets",
    description: "Online casino platform with Texas Hold'em poker (AI bots, tournaments, chip economy), Mines, Blackjack, Double, and 7+ more games. Real-time sync via SSE.",
    stack: ["Next.js", "Redis", "SSE", "Tailwind"],
    url: null,
    stats: "10+ games / Elo ranking / Real-time multiplayer",
  },
  {
    name: "Tox Spy",
    description: "Local OSINT investigation tool combining HIBP breach lookups, Maltego-style entity mapping, and Gemini AI analysis. Built for law enforcement use cases.",
    stack: ["Next.js", "Gemini AI", "HIBP API", "Maltego"],
    url: null,
    stats: "OSINT / Breach detection / Entity mapping",
  },
  {
    name: "AppForm",
    description: "SaaS for clinic management with AI-powered WhatsApp bot for appointment scheduling, Google Calendar sync, and patient management.",
    stack: ["Next.js", "Supabase", "Twilio", "Google Calendar"],
    url: null,
    stats: "WhatsApp bot / Calendar sync / Multi-clinic",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 sm:px-10 pt-12 sm:pt-16 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 font-mono text-accent text-sm mb-6">
            <span className="inline-block w-2 h-4 bg-accent" style={{ animation: "blink 1s step-end infinite" }} />
            <span>~/tox</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-sans font-semibold tracking-tight mb-3">
            Tox
          </h1>
          <p className="text-muted font-mono text-sm sm:text-base leading-relaxed max-w-xl">
            Full-stack developer. I build SaaS platforms, AI systems, and real-time applications from scratch — architecture, database, API, frontend, deploy.
          </p>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-3xl mx-auto w-full px-6 sm:px-10">
        <div className="h-px bg-border" />
      </div>

      {/* Projects */}
      <main className="flex-1 px-6 sm:px-10 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-8">
            Projects
          </h2>

          <div className="flex flex-col gap-10">
            {projects.map((project) => (
              <article
                key={project.name}
                className="group"
                style={{ animation: "fadeIn 0.4s ease-out both" }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-lg sm:text-xl font-sans font-medium">
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent transition-colors"
                      >
                        {project.name}
                        <span className="text-muted text-sm ml-1.5 font-mono">&nearr;</span>
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <span className="font-mono text-[11px] text-muted hidden sm:inline">
                    {project.stats}
                  </span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-3 max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] font-mono text-neutral-400 border border-border rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Divider */}
      <div className="max-w-3xl mx-auto w-full px-6 sm:px-10">
        <div className="h-px bg-border" />
      </div>

      {/* Footer */}
      <footer className="px-6 sm:px-10 py-8 sm:py-10">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Tox1469"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted hover:text-foreground transition-colors"
            >
              github
            </a>
          </div>
          <p className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
            built by tox
          </p>
        </div>
      </footer>
    </div>
  );
}
