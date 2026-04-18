"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "@/contexts/LangContext";

type Lang = "en" | "pt";

const COMMANDS: Record<Lang, Record<string, string[]>> = {
  en: {
    help: [
      "Available commands:",
      "",
      "  whoami      — about me",
      "  skills      — tech stack",
      "  projects    — my work",
      "  security    — security experience",
      "  clients     — companies I've worked with",
      "  contact     — get in touch",
      "  stats       — numbers",
      "  clear       — clear terminal",
    ],
    whoami: [
      "Tox — Full-Stack Developer",
      "",
      "7 years building production systems from scratch.",
      "Architecture, database, API, frontend, deploy.",
      "",
      "I build SaaS platforms, AI agents, real-time apps,",
      "and provide security consulting for banks and enterprises.",
      "",
      "Everything you see on this portfolio — I designed,",
      "developed, and deployed. Alone.",
    ],
    skills: [
      "// Languages",
      "TypeScript, JavaScript, Python, SQL, Lua",
      "",
      "// Frontend",
      "Next.js, React, Tailwind CSS, Framer Motion",
      "",
      "// Backend",
      "Node.js, Express, REST APIs, SSE, WebSockets",
      "",
      "// Database",
      "Supabase (PostgreSQL), Redis, Prisma",
      "",
      "// AI & ML",
      "Gemini, Claude API, OpenAI, RAG, Embeddings",
      "",
      "// Infrastructure",
      "Vercel, Docker, CI/CD, Cloudflare",
      "",
      "// Security",
      "Pentesting, OWASP, RLS, RBAC, MFA, Encryption",
      "",
      "// Integrations",
      "Twilio, HubSpot, Slack, Notion, Google APIs, Mercado Pago",
    ],
    security: [
      "// Security Consulting & Implementation",
      "",
      "Professional security engineer providing technical",
      "security for financial institutions and enterprises.",
      "",
      "  Sicredi         — Banking security infrastructure",
      "  Tozetto         — Retail chain security systems",
      "  + other clients",
      "",
      "Expertise:",
      "  - Penetration testing & vulnerability assessment",
      "  - Authentication systems (MFA, OAuth2, JWT)",
      "  - Row Level Security & multi-tenant isolation",
      "  - OWASP compliance & security auditing",
      "  - Rate limiting & DDoS mitigation",
      "  - Data encryption & LGPD compliance",
      "  - Prompt injection prevention (AI systems)",
    ],
    clients: [
      "// Companies & Clients",
      "",
      "  Sicredi              Financial / Banking",
      "  Tozetto Mercados     Retail / Supermarkets",
      "  Creevo               Construction / HR Tech",
      "  TAS Ocupacional      Occupational Health",
      "",
      "Providing full-stack development and",
      "security consulting across industries.",
    ],
    projects: ["Scrolling to projects section..."],
    stats: [
      "  7+    years of development",
      "  8     production apps deployed",
      "  200+  API endpoints built",
      "  100+  database migrations",
      "  50+   AI agent templates",
      "  0     templates used — all from scratch",
    ],
    contact: [
      "// Get in touch",
      "",
      "  GitHub    github.com/Tox1469",
      "  Email     tox@toxia.com.br",
      "",
      "Open to freelance, consulting, and security work.",
    ],
  },
  pt: {
    help: [
      "Comandos disponíveis:",
      "",
      "  whoami      — sobre mim",
      "  skills      — stack técnica",
      "  projects    — meus projetos",
      "  security    — experiência em segurança",
      "  clients     — empresas que trabalhei",
      "  contact     — contato",
      "  stats       — números",
      "  clear       — limpar terminal",
    ],
    whoami: [
      "Tox — Desenvolvedor Full-Stack",
      "",
      "7 anos construindo sistemas em produção do zero.",
      "Arquitetura, banco de dados, API, frontend, deploy.",
      "",
      "Construí plataformas SaaS, agentes de IA, apps real-time,",
      "e presto consultoria de segurança para bancos e empresas.",
      "",
      "Tudo que você vê nesse portfólio — eu projetei,",
      "desenvolvi e fiz deploy. Sozinho.",
    ],
    skills: [
      "// Linguagens",
      "TypeScript, JavaScript, Python, SQL, Lua",
      "",
      "// Frontend",
      "Next.js, React, Tailwind CSS, Framer Motion",
      "",
      "// Backend",
      "Node.js, Express, REST APIs, SSE, WebSockets",
      "",
      "// Banco de Dados",
      "Supabase (PostgreSQL), Redis, Prisma",
      "",
      "// IA & ML",
      "Gemini, Claude API, OpenAI, RAG, Embeddings",
      "",
      "// Infraestrutura",
      "Vercel, Docker, CI/CD, Cloudflare",
      "",
      "// Segurança",
      "Pentesting, OWASP, RLS, RBAC, MFA, Criptografia",
      "",
      "// Integrações",
      "Twilio, HubSpot, Slack, Notion, Google APIs, Mercado Pago",
    ],
    security: [
      "// Consultoria & Implementação de Segurança",
      "",
      "Engenheiro de segurança fornecendo proteção técnica",
      "para instituições financeiras e empresas.",
      "",
      "  Sicredi         — Infraestrutura de segurança bancária",
      "  Tozetto         — Sistemas de segurança varejo",
      "  + outros clientes",
      "",
      "Especialidades:",
      "  - Teste de penetração & análise de vulnerabilidade",
      "  - Sistemas de autenticação (MFA, OAuth2, JWT)",
      "  - Row Level Security & isolamento multi-tenant",
      "  - Conformidade OWASP & auditoria de segurança",
      "  - Rate limiting & mitigação DDoS",
      "  - Criptografia de dados & conformidade LGPD",
      "  - Prevenção de prompt injection (sistemas IA)",
    ],
    clients: [
      "// Empresas & Clientes",
      "",
      "  Sicredi              Financeiro / Bancário",
      "  Tozetto Mercados     Varejo / Supermercados",
      "  Creevo               Construção / RH Tech",
      "  TAS Ocupacional      Saúde Ocupacional",
      "",
      "Desenvolvimento full-stack e consultoria",
      "de segurança em diversas indústrias.",
    ],
    projects: ["Rolando até a seção de projetos..."],
    stats: [
      "  7+    anos de desenvolvimento",
      "  8     apps em produção",
      "  200+  endpoints de API construídos",
      "  100+  migrações de banco",
      "  50+   templates de agentes IA",
      "  0     templates usados — tudo do zero",
    ],
    contact: [
      "// Entre em contato",
      "",
      "  GitHub    github.com/Tox1469",
      "  Email     tox@toxia.com.br",
      "",
      "Disponível para freelance, consultoria e segurança.",
    ],
  },
};

const BOOT_LINES = [
  { text: "initializing tox.dev ...", delay: 0 },
  { text: "loading modules ......... done", delay: 400 },
  { text: "verifying credentials ... authorized", delay: 800 },
  { text: "establishing connection . secure", delay: 1100 },
  { text: "", delay: 1400 },
];

type Line = {
  text: string;
  type: "input" | "output" | "system" | "accent" | "comment";
};

export default function Terminal({ onProjectsCommand }: { onProjectsCommand: () => void }) {
  const { lang } = useLang();
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bootIndex >= BOOT_LINES.length) {
      const welcomeMsg = lang === "en"
        ? 'Welcome. Type "help" for commands.'
        : 'Bem-vindo. Digite "help" para ver comandos.';
      setLines((prev) => [
        ...prev,
        { text: welcomeMsg, type: "accent" },
        { text: "", type: "system" },
      ]);
      setBooted(true);
      return;
    }

    const currentDelay = BOOT_LINES[bootIndex].delay - (bootIndex > 0 ? BOOT_LINES[bootIndex - 1].delay : 0);

    const timer = setTimeout(() => {
      const boot = BOOT_LINES[bootIndex];
      setLines((prev) => [...prev, { text: boot.text, type: "system" }]);
      setBootIndex((i) => i + 1);
    }, currentDelay);

    return () => clearTimeout(timer);
  }, [bootIndex, lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      setLines((prev) => [...prev, { text: `tox@dev:~$ ${cmd}`, type: "input" }]);

      if (trimmed === "clear") {
        setLines([]);
        return;
      }

      if (trimmed === "projects") {
        setLines((prev) => [
          ...prev,
          ...COMMANDS[lang].projects.map((t) => ({ text: t, type: "output" as const })),
        ]);
        setTimeout(() => onProjectsCommand(), 400);
        return;
      }

      const output = COMMANDS[lang][trimmed];
      if (output) {
        setLines((prev) => [
          ...prev,
          ...output.map((t) => ({
            text: t,
            type: (t.startsWith("//") ? "comment" : "output") as Line["type"],
          })),
          { text: "", type: "output" },
        ]);
      } else {
        const errMsg = lang === "en"
          ? `command not found: ${trimmed}. Type "help" for commands.`
          : `comando nao encontrado: ${trimmed}. Digite "help" para ver comandos.`;
        setLines((prev) => [
          ...prev,
          { text: errMsg, type: "system" },
        ]);
      }
    },
    [onProjectsCommand, lang]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      handleCommand(input);
      setInput("");
    }
  };

  const focusInput = () => {
    if (booted) inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusInput}
      className="bg-surface border border-border rounded-lg overflow-hidden cursor-text"
    >
      <div className="flex items-center px-4 py-2.5 border-b border-border bg-[#0a0a0e]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] font-mono text-muted ml-2">tox@dev — bash</span>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="p-4 sm:p-5 font-mono text-xs sm:text-sm max-h-[420px] overflow-y-auto"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed ${
              line.type === "input"
                ? "text-foreground"
                : line.type === "accent"
                  ? "text-accent glow"
                  : line.type === "comment"
                    ? "text-accent/60"
                    : line.type === "system"
                      ? "text-muted"
                      : "text-foreground/80"
            }`}
            style={{
              animation: "fadeInUp 0.15s ease-out both",
              minHeight: line.text === "" ? "12px" : undefined,
            }}
          >
            {line.text}
          </div>
        ))}

        {booted && (
          <div className="flex items-center gap-0 mt-0.5">
            <span className="text-muted shrink-0">tox@dev:~$&nbsp;</span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-foreground w-full font-mono text-xs sm:text-sm caret-accent"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              {input === "" && (
                <span
                  className="absolute left-0 top-0 w-2 h-4 bg-accent pointer-events-none"
                  style={{ animation: "blink 0.8s step-end infinite" }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
