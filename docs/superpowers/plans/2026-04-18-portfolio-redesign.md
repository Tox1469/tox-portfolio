# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign tox-portfolio from single-page curriculum to professional multi-page portfolio with hero, i18n, micro-interactions, case study pages, and About section.

**Architecture:** Client-side React app with Next.js 16 App Router. i18n via React Context (no external lib). Project data hardcoded in data files. Dynamic routes for `/projects/[slug]`. All interactive components are Client Components.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, CSS-only animations (no external libs).

**Important Next.js 16 notes:**
- `params` in dynamic routes is a `Promise` -- must use `await` in Server Components or `use()` in Client Components
- File conventions: `page.tsx`, `layout.tsx`, `not-found.tsx` in `app/` directory

---

## File Structure

```
src/
  data/
    i18n.ts           — all translatable strings (en/pt)
    projects.ts       — project data with bilingual content
  contexts/
    LangContext.tsx    — language context provider + hook
  app/
    globals.css        — updated with new styles (grid, hero)
    layout.tsx         — updated: wraps children in LangProvider, adds lang toggle
    page.tsx           — rewritten: hero + sections
    components/
      HeroBg.tsx       — perspective grid background (new)
      Hero.tsx         — hero section with typing animation (new)
      LangToggle.tsx   — fixed PT/EN toggle button (new)
      Terminal.tsx     — updated: syncs with global i18n
      About.tsx        — README.md styled section (new)
      Stats.tsx        — updated: i18n support
      ProjectCard.tsx  — new: card with tilt + glow interactions
      ScrollReveal.tsx — unchanged
    projects/
      [slug]/
        page.tsx       — project detail page (new)
```

---

### Task 1: Create i18n data and context

**Files:**
- Create: `src/data/i18n.ts`
- Create: `src/contexts/LangContext.tsx`

- [ ] **Step 1: Create `src/data/i18n.ts` with all translatable strings**

```ts
const i18n = {
  en: {
    hero: {
      subtitle: "Full-Stack Developer & Security Engineer",
      stats: "7+ years / 8 apps / 200+ endpoints",
      cta_projects: "View Projects",
      cta_contact: "Get in Touch",
    },
    terminal: {
      section_title: "./terminal",
      hint: "type: help, whoami, skills, security, clients, stats, contact",
    },
    about: {
      section_title: "cat README.md",
      title: "About",
      bio: [
        "7 years building production systems from scratch. Architecture, database, API, frontend, deploy — I handle the full stack alone.",
        "I build SaaS platforms, AI agents, and real-time applications. I also provide security consulting for banks and enterprises.",
        "Everything in this portfolio — I designed, developed, and deployed. Solo.",
      ],
      how_i_work_title: "How I Work",
      how_i_work: [
        "I architect and code solo — from database schema to deploy pipeline",
        "Everything from scratch, no templates, no boilerplate",
        "Security-first: RLS, RBAC, encryption, OWASP from day one",
        "Ship fast, iterate faster — production is the real test",
      ],
      currently_title: "Currently",
      currently: "Building AI agent platforms and security consulting for financial institutions.",
    },
    stats_section: {
      years: "years dev",
      apps: "apps in production",
      routes: "API routes",
      migrations: "migrations",
      templates: "AI templates",
    },
    projects: {
      section_title: "ls ./projects",
      back: "Back",
      prev: "Previous",
      next: "Next",
      the_problem: "The Problem",
      the_solution: "The Solution",
      technical_decisions: "Technical Decisions",
      stack_breakdown: "Stack Breakdown",
      numbers: "Numbers",
      visual_placeholder: "Visual coming soon",
      routes: "routes",
      migrations: "migrations",
      crons: "crons",
      visit_site: "Visit site",
    },
    skills: {
      section_title: "cat skills.json",
      categories: {
        languages: "Languages",
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        ai: "AI",
        security: "Security",
        infra: "Infrastructure",
        integrations: "Integrations",
      },
    },
    security: {
      section_title: "cat security.log",
      description: "Security engineer providing technical security consulting for financial institutions and enterprises. Specialized in infrastructure protection, vulnerability analysis, and compliance implementation.",
      sicredi: "Banking security infrastructure",
      tozetto: "Retail chain security systems",
    },
  },
  pt: {
    hero: {
      subtitle: "Desenvolvedor Full-Stack & Engenheiro de Seguran\u00e7a",
      stats: "7+ anos / 8 apps / 200+ endpoints",
      cta_projects: "Ver Projetos",
      cta_contact: "Contato",
    },
    terminal: {
      section_title: "./terminal",
      hint: "digite: help, whoami, skills, security, clients, stats, contact",
    },
    about: {
      section_title: "cat README.md",
      title: "Sobre",
      bio: [
        "7 anos construindo sistemas em produ\u00e7\u00e3o do zero. Arquitetura, banco de dados, API, frontend, deploy \u2014 cuido de todo o stack sozinho.",
        "Constru\u00ed plataformas SaaS, agentes de IA e aplica\u00e7\u00f5es em tempo real. Tamb\u00e9m presto consultoria de seguran\u00e7a para bancos e empresas.",
        "Tudo nesse portf\u00f3lio \u2014 eu projetei, desenvolvi e fiz deploy. Sozinho.",
      ],
      how_i_work_title: "Como Trabalho",
      how_i_work: [
        "Arquiteto e codifico sozinho \u2014 do schema do banco ao pipeline de deploy",
        "Tudo do zero, sem templates, sem boilerplate",
        "Seguran\u00e7a desde o dia 1: RLS, RBAC, criptografia, OWASP",
        "Entrego r\u00e1pido, itero mais r\u00e1pido \u2014 produ\u00e7\u00e3o \u00e9 o teste real",
      ],
      currently_title: "Atualmente",
      currently: "Construindo plataformas de agentes IA e consultoria de seguran\u00e7a para institui\u00e7\u00f5es financeiras.",
    },
    stats_section: {
      years: "anos dev",
      apps: "apps em produ\u00e7\u00e3o",
      routes: "rotas de API",
      migrations: "migra\u00e7\u00f5es",
      templates: "templates IA",
    },
    projects: {
      section_title: "ls ./projetos",
      back: "Voltar",
      prev: "Anterior",
      next: "Pr\u00f3ximo",
      the_problem: "O Problema",
      the_solution: "A Solu\u00e7\u00e3o",
      technical_decisions: "Decis\u00f5es T\u00e9cnicas",
      stack_breakdown: "Stack",
      numbers: "N\u00fameros",
      visual_placeholder: "Visual em breve",
      routes: "rotas",
      migrations: "migra\u00e7\u00f5es",
      crons: "crons",
      visit_site: "Visitar site",
    },
    skills: {
      section_title: "cat habilidades.json",
      categories: {
        languages: "Linguagens",
        frontend: "Frontend",
        backend: "Backend",
        database: "Banco de Dados",
        ai: "IA",
        security: "Seguran\u00e7a",
        infra: "Infraestrutura",
        integrations: "Integra\u00e7\u00f5es",
      },
    },
    security: {
      section_title: "cat seguranca.log",
      description: "Engenheiro de seguran\u00e7a fornecendo consultoria t\u00e9cnica de seguran\u00e7a para institui\u00e7\u00f5es financeiras e empresas. Especializado em prote\u00e7\u00e3o de infraestrutura, an\u00e1lise de vulnerabilidades e implementa\u00e7\u00e3o de conformidade.",
      sicredi: "Infraestrutura de seguran\u00e7a banc\u00e1ria",
      tozetto: "Sistemas de seguran\u00e7a para varejo",
    },
  },
} as const;

export type Lang = "en" | "pt";
export type I18nStrings = typeof i18n.en;
export default i18n;
```

- [ ] **Step 2: Create `src/contexts/LangContext.tsx`**

```tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import i18n, { type Lang, type I18nStrings } from "@/data/i18n";

type LangContextType = {
  lang: Lang;
  t: I18nStrings;
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
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `cd "C:/Users/Toxjo/Desktop/sites proprios/tox-portfolio" && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: no errors related to i18n or LangContext files

- [ ] **Step 4: Commit**

```bash
git add src/data/i18n.ts src/contexts/LangContext.tsx
git commit -m "feat: add i18n data and language context"
```

---

### Task 2: Create project data file

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create `src/data/projects.ts` with all project data**

```ts
export type Project = {
  slug: string;
  name: string;
  tagline: { en: string; pt: string };
  description: { en: string; pt: string };
  problem: { en: string; pt: string };
  solution: { en: string; pt: string };
  decisions: { en: string[]; pt: string[] };
  stack: { category: string; items: string[]; context: { en: string; pt: string } }[];
  url: string | null;
  stats: { routes: string; migrations: string; crons: string };
  color: string;
};

export const projects: Project[] = [
  {
    slug: "agentbox",
    name: "AgentBox",
    tagline: {
      en: "AI Agent Platform",
      pt: "Plataforma de Agentes IA",
    },
    description: {
      en: "Multi-tenant SaaS for AI agents. 50+ agent templates, multi-step pipelines, WhatsApp/SMS channels via Twilio, social media posting, internal chat with audio and reply, document generation (Word/PDF/Excel), integrations with HubSpot, Slack, Notion, Bitrix24, RD Station, ContaAzul. Full RBAC with admin, company owner, and employee roles. Prompt injection protection, rate limiting, MFA authentication.",
      pt: "SaaS multi-tenant para agentes de IA. 50+ templates de agentes, pipelines multi-etapa, canais WhatsApp/SMS via Twilio, posting em redes sociais, chat interno com \u00e1udio e reply, gera\u00e7\u00e3o de documentos (Word/PDF/Excel), integra\u00e7\u00f5es com HubSpot, Slack, Notion, Bitrix24, RD Station, ContaAzul. RBAC completo com admin, dono de empresa e funcion\u00e1rio. Prote\u00e7\u00e3o contra prompt injection, rate limiting, autentica\u00e7\u00e3o MFA.",
    },
    problem: {
      en: "Companies need AI agents but building them requires deep technical knowledge. Existing platforms are either too simple (no multi-step pipelines, no integrations) or too complex (require ML engineers). There was no middle ground for business users who need production-grade AI agents with proper security and multi-tenant isolation.",
      pt: "Empresas precisam de agentes IA mas constru\u00ed-los exige conhecimento t\u00e9cnico profundo. Plataformas existentes s\u00e3o ou simples demais (sem pipelines, sem integra\u00e7\u00f5es) ou complexas demais (exigem engenheiros de ML). N\u00e3o havia meio-termo para usu\u00e1rios de neg\u00f3cio que precisam de agentes IA em produ\u00e7\u00e3o com seguran\u00e7a e isolamento multi-tenant.",
    },
    solution: {
      en: "Built a full SaaS platform where companies can create, configure, and deploy AI agents without writing code. Each company gets isolated data, their own agent library, and can connect channels like WhatsApp and Slack. The platform handles prompt injection prevention, rate limiting, and document generation automatically.",
      pt: "Constru\u00ed uma plataforma SaaS completa onde empresas podem criar, configurar e fazer deploy de agentes IA sem escrever c\u00f3digo. Cada empresa tem dados isolados, sua pr\u00f3pria biblioteca de agentes, e pode conectar canais como WhatsApp e Slack. A plataforma cuida de preven\u00e7\u00e3o de prompt injection, rate limiting e gera\u00e7\u00e3o de documentos automaticamente.",
    },
    decisions: {
      en: [
        "Supabase over Firebase \u2014 needed Row Level Security for true multi-tenant isolation at the database level, not just application-level checks",
        "Gemini as primary LLM \u2014 best cost-to-quality ratio for high-volume agent workloads, with Claude and OpenAI as fallbacks",
        "Server-side document generation \u2014 Word/PDF/Excel generated on the server to avoid exposing templates and business logic to the client",
        "Twilio for messaging \u2014 single provider for WhatsApp, SMS, and voice with reliable webhook delivery and global coverage",
      ],
      pt: [
        "Supabase em vez de Firebase \u2014 precisava de Row Level Security para isolamento multi-tenant real no n\u00edvel do banco, n\u00e3o apenas verifica\u00e7\u00f5es no n\u00edvel da aplica\u00e7\u00e3o",
        "Gemini como LLM principal \u2014 melhor rela\u00e7\u00e3o custo-qualidade para workloads de agentes em alto volume, com Claude e OpenAI como fallback",
        "Gera\u00e7\u00e3o de documentos server-side \u2014 Word/PDF/Excel gerados no servidor para n\u00e3o expor templates e l\u00f3gica de neg\u00f3cio ao cliente",
        "Twilio para mensageria \u2014 provedor \u00fanico para WhatsApp, SMS e voz com entrega confi\u00e1vel de webhooks e cobertura global",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS"], context: { en: "App Router with SSR, shadcn/ui components", pt: "App Router com SSR, componentes shadcn/ui" } },
      { category: "Backend", items: ["Next.js API Routes", "Supabase Edge Functions"], context: { en: "144 routes handling agents, pipelines, integrations", pt: "144 rotas gerenciando agentes, pipelines, integra\u00e7\u00f5es" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "62 migrations, RLS policies on every table", pt: "62 migra\u00e7\u00f5es, pol\u00edticas RLS em toda tabela" } },
      { category: "AI", items: ["Gemini", "Claude", "OpenAI"], context: { en: "Multi-provider with automatic fallback", pt: "Multi-provedor com fallback autom\u00e1tico" } },
      { category: "Infra", items: ["Vercel", "Cloudflare"], context: { en: "14 cron jobs, edge caching, DDoS protection", pt: "14 cron jobs, cache na edge, prote\u00e7\u00e3o DDoS" } },
    ],
    url: "https://agentbox.com.br",
    stats: { routes: "144", migrations: "62", crons: "14" },
    color: "#22c55e",
  },
  {
    slug: "creevohub",
    name: "CreevoHub",
    tagline: {
      en: "Construction HR Platform",
      pt: "Plataforma de RH para Constru\u00e7\u00e3o Civil",
    },
    description: {
      en: "Hiring platform for the construction industry. Multi-tenant dashboards per company, NR and medical exam compliance, AI candidate screening, document management, financial module with billing and invoicing. Full RBAC with multi-level access control.",
      pt: "Plataforma de contrata\u00e7\u00e3o para a ind\u00fastria da constru\u00e7\u00e3o civil. Dashboards multi-tenant por empresa, conformidade com NRs e exames m\u00e9dicos, triagem de candidatos com IA, gest\u00e3o de documentos, m\u00f3dulo financeiro com faturamento e cobran\u00e7a. RBAC completo com controle de acesso multi-n\u00edvel.",
    },
    problem: {
      en: "Construction companies manage hiring with spreadsheets and paper. NR compliance tracking is manual and error-prone. No centralized system connects candidate screening, medical exams, document management, and billing.",
      pt: "Construtoras gerenciam contrata\u00e7\u00e3o com planilhas e papel. Acompanhamento de conformidade NR \u00e9 manual e propenso a erros. Nenhum sistema centralizado conecta triagem de candidatos, exames m\u00e9dicos, gest\u00e3o de documentos e faturamento.",
    },
    solution: {
      en: "Built an all-in-one platform where construction companies manage the entire hiring lifecycle. AI screens candidates against NR requirements, tracks medical exam expiry dates, manages documents, and handles billing \u2014 all in one place with proper multi-tenant isolation.",
      pt: "Constru\u00ed uma plataforma completa onde construtoras gerenciam todo o ciclo de contrata\u00e7\u00e3o. IA faz triagem de candidatos contra requisitos de NRs, rastreia validade de exames m\u00e9dicos, gerencia documentos e cuida do faturamento \u2014 tudo em um lugar com isolamento multi-tenant.",
    },
    decisions: {
      en: [
        "Multi-tenant with shared database \u2014 RLS policies isolate company data without the overhead of separate databases",
        "AI screening as a feature, not the product \u2014 the platform solves hiring workflow first, AI enhances it",
        "Financial module built manual-first \u2014 invoice generation before payment gateway, validating the flow with real users",
      ],
      pt: [
        "Multi-tenant com banco compartilhado \u2014 pol\u00edticas RLS isolam dados da empresa sem o overhead de bancos separados",
        "Triagem IA como feature, n\u00e3o como produto \u2014 a plataforma resolve o fluxo de contrata\u00e7\u00e3o primeiro, IA aprimora",
        "M\u00f3dulo financeiro constru\u00eddo manual-first \u2014 gera\u00e7\u00e3o de faturas antes de gateway de pagamento, validando o fluxo com usu\u00e1rios reais",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Multi-role dashboards with dynamic permissions", pt: "Dashboards multi-role com permiss\u00f5es din\u00e2micas" } },
      { category: "Backend", items: ["Next.js API Routes"], context: { en: "80+ routes for hiring, compliance, billing", pt: "80+ rotas para contrata\u00e7\u00e3o, conformidade, faturamento" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "40+ migrations with RLS per company", pt: "40+ migra\u00e7\u00f5es com RLS por empresa" } },
      { category: "Infra", items: ["Vercel"], context: { en: "Automated deployments with preview branches", pt: "Deploys automatizados com branches de preview" } },
    ],
    url: "https://creevo.com.br",
    stats: { routes: "80+", migrations: "40+", crons: "\u2014" },
    color: "#f97316",
  },
  {
    slug: "creevo-academy",
    name: "Creevo Academy",
    tagline: {
      en: "Workplace Safety LMS",
      pt: "LMS de Seguran\u00e7a do Trabalho",
    },
    description: {
      en: "Training platform specialized in Regulatory Standards (NRs). Course management with video lessons, certificate generation, progress tracking, dashboards for companies to manage employee training compliance.",
      pt: "Plataforma de treinamento especializada em Normas Regulamentadoras. Gest\u00e3o de cursos com videoaulas, gera\u00e7\u00e3o de certificados, acompanhamento de progresso, dashboards para empresas gerenciarem a conformidade de treinamento dos funcion\u00e1rios.",
    },
    problem: {
      en: "NR training compliance is tracked manually. Companies don\u2019t know which employees need recertification. Training platforms are generic and don\u2019t understand NR-specific requirements.",
      pt: "Conformidade de treinamento NR \u00e9 rastreada manualmente. Empresas n\u00e3o sabem quais funcion\u00e1rios precisam de recertifica\u00e7\u00e3o. Plataformas de treinamento s\u00e3o gen\u00e9ricas e n\u00e3o entendem requisitos espec\u00edficos de NRs.",
    },
    solution: {
      en: "Built a focused LMS that maps courses to specific NRs, auto-generates certificates on completion, and gives companies a dashboard showing exactly who is compliant and who needs retraining.",
      pt: "Constru\u00ed um LMS focado que mapeia cursos a NRs espec\u00edficas, gera certificados automaticamente ao completar, e d\u00e1 \u00e0s empresas um dashboard mostrando exatamente quem est\u00e1 em conformidade e quem precisa de retreinamento.",
    },
    decisions: {
      en: [
        "NR-first data model \u2014 courses link to specific NR requirements, not generic categories",
        "Auto-certification \u2014 certificates generated server-side with tamper-proof metadata",
      ],
      pt: [
        "Modelo de dados NR-first \u2014 cursos vinculados a requisitos de NRs espec\u00edficas, n\u00e3o categorias gen\u00e9ricas",
        "Auto-certifica\u00e7\u00e3o \u2014 certificados gerados server-side com metadados \u00e0 prova de adultera\u00e7\u00e3o",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Video player, progress tracking UI", pt: "Player de v\u00eddeo, UI de progresso" } },
      { category: "Backend", items: ["Next.js API Routes"], context: { en: "30+ routes for courses, certificates, compliance", pt: "30+ rotas para cursos, certificados, conformidade" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "20+ migrations", pt: "20+ migra\u00e7\u00f5es" } },
      { category: "Infra", items: ["Vercel"], context: { en: "CDN-optimized video delivery", pt: "Entrega de v\u00eddeo otimizada por CDN" } },
    ],
    url: "https://creevoacademy.com.br",
    stats: { routes: "30+", migrations: "20+", crons: "\u2014" },
    color: "#eab308",
  },
  {
    slug: "tas-ocupacional",
    name: "TAS Ocupacional",
    tagline: {
      en: "Occupational Health",
      pt: "Sa\u00fade Ocupacional",
    },
    description: {
      en: "Corporate website for occupational health company. Premium design with scroll animations, service showcase, WhatsApp integration for lead capture, mobile-first responsive layout.",
      pt: "Site corporativo para empresa de sa\u00fade ocupacional. Design premium com anima\u00e7\u00f5es ao scroll, vitrine de servi\u00e7os, integra\u00e7\u00e3o WhatsApp para capta\u00e7\u00e3o de leads, layout responsivo mobile-first.",
    },
    problem: {
      en: "The company had no online presence and was losing leads to competitors with modern websites. Their services were hard to communicate without a visual showcase.",
      pt: "A empresa n\u00e3o tinha presen\u00e7a online e estava perdendo leads para concorrentes com sites modernos. Seus servi\u00e7os eram dif\u00edceis de comunicar sem uma vitrine visual.",
    },
    solution: {
      en: "Built a premium corporate site with scroll-triggered animations, clear service presentation, and WhatsApp CTA buttons throughout. Mobile-first design ensures the site works perfectly on the devices their target audience uses most.",
      pt: "Constru\u00ed um site corporativo premium com anima\u00e7\u00f5es ativadas por scroll, apresenta\u00e7\u00e3o clara de servi\u00e7os e bot\u00f5es CTA de WhatsApp em todo o site. Design mobile-first garante que funciona perfeitamente nos dispositivos que o p\u00fablico-alvo mais usa.",
    },
    decisions: {
      en: [
        "Vite + React over Next.js \u2014 static site with no server-side needs, faster build and simpler deploy",
        "Framer Motion for animations \u2014 client wanted smooth, premium scroll animations that CSS alone couldn\u2019t achieve cleanly",
        "WhatsApp as primary CTA \u2014 the target audience prefers WhatsApp over forms or email",
      ],
      pt: [
        "Vite + React em vez de Next.js \u2014 site est\u00e1tico sem necessidades server-side, build mais r\u00e1pido e deploy mais simples",
        "Framer Motion para anima\u00e7\u00f5es \u2014 cliente queria anima\u00e7\u00f5es suaves e premium de scroll que CSS sozinho n\u00e3o conseguia de forma limpa",
        "WhatsApp como CTA principal \u2014 o p\u00fablico-alvo prefere WhatsApp a formul\u00e1rios ou email",
      ],
    },
    stack: [
      { category: "Frontend", items: ["React", "Vite", "Framer Motion"], context: { en: "Scroll-driven animations, responsive design", pt: "Anima\u00e7\u00f5es por scroll, design responsivo" } },
      { category: "Infra", items: ["Vercel"], context: { en: "Static deploy with edge caching", pt: "Deploy est\u00e1tico com cache na edge" } },
    ],
    url: "https://tasocupacional.com.br",
    stats: { routes: "\u2014", migrations: "\u2014", crons: "\u2014" },
    color: "#06b6d4",
  },
  {
    slug: "toxbets",
    name: "ToxBets",
    tagline: {
      en: "Casino Platform",
      pt: "Plataforma de Casino",
    },
    description: {
      en: "Full casino platform with Texas Hold\u2019em poker (AI bots, tournaments, Elo ranking, chip economy), Mines, Blackjack, Double, and 7 more games. Real-time multiplayer via Server-Sent Events, emote system, animations, Redis state management.",
      pt: "Plataforma de casino completa com Texas Hold\u2019em poker (bots IA, torneios, ranking Elo, economia de fichas), Mines, Blackjack, Double e mais 7 jogos. Multiplayer em tempo real via Server-Sent Events, sistema de emotes, anima\u00e7\u00f5es, gerenciamento de estado com Redis.",
    },
    problem: {
      en: "Wanted to build a technically challenging real-time multiplayer system as a learning project. Casino games require complex state machines, real-time sync, and AI opponents \u2014 a perfect stress test for full-stack skills.",
      pt: "Queria construir um sistema multiplayer em tempo real tecnicamente desafiador como projeto de aprendizado. Jogos de casino exigem m\u00e1quinas de estado complexas, sincroniza\u00e7\u00e3o em tempo real e oponentes IA \u2014 um teste de estresse perfeito para habilidades full-stack.",
    },
    solution: {
      en: "Built a complete casino with 10 games, each with its own state machine. Poker has full Texas Hold\u2019em rules, AI bots with different play styles, tournaments, and an Elo-based ranking system. All real-time sync uses SSE instead of WebSockets for simpler server architecture.",
      pt: "Constru\u00ed um casino completo com 10 jogos, cada um com sua m\u00e1quina de estados. Poker tem regras completas de Texas Hold\u2019em, bots IA com diferentes estilos de jogo, torneios e sistema de ranking baseado em Elo. Toda sincroniza\u00e7\u00e3o em tempo real usa SSE em vez de WebSockets para arquitetura de servidor mais simples.",
    },
    decisions: {
      en: [
        "SSE over WebSockets \u2014 server-to-client streaming is sufficient for game state updates, avoids bidirectional connection complexity",
        "Redis for game state \u2014 in-memory state machine with pub/sub for multi-player sync, no database writes during gameplay",
        "Elo rating system \u2014 well-understood algorithm that naturally creates skill-based matchmaking",
      ],
      pt: [
        "SSE em vez de WebSockets \u2014 streaming server-to-client \u00e9 suficiente para atualiza\u00e7\u00f5es de estado do jogo, evita complexidade de conex\u00e3o bidirecional",
        "Redis para estado do jogo \u2014 m\u00e1quina de estados in-memory com pub/sub para sync multiplayer, sem escrita no banco durante gameplay",
        "Sistema de rating Elo \u2014 algoritmo bem compreendido que cria matchmaking baseado em habilidade naturalmente",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Game UIs with canvas animations", pt: "UIs de jogos com anima\u00e7\u00f5es canvas" } },
      { category: "Backend", items: ["Next.js API Routes", "SSE"], context: { en: "60+ routes, real-time game state streaming", pt: "60+ rotas, streaming de estado do jogo em tempo real" } },
      { category: "Database", items: ["PostgreSQL", "Redis"], context: { en: "Redis for live state, Postgres for persistence", pt: "Redis para estado ao vivo, Postgres para persist\u00eancia" } },
    ],
    url: null,
    stats: { routes: "60+", migrations: "30+", crons: "\u2014" },
    color: "#a855f7",
  },
  {
    slug: "appform",
    name: "AppForm",
    tagline: {
      en: "Clinic Management SaaS",
      pt: "SaaS para Cl\u00ednicas",
    },
    description: {
      en: "SaaS for clinic management with AI-powered WhatsApp bot for automatic appointment scheduling. Bidirectional Google Calendar sync, patient management, multi-clinic support, automatic reminders via SMS and WhatsApp.",
      pt: "SaaS para gest\u00e3o de cl\u00ednicas com bot de WhatsApp com IA para agendamento autom\u00e1tico de consultas. Sincroniza\u00e7\u00e3o bidirecional com Google Calendar, gest\u00e3o de pacientes, suporte multi-cl\u00ednica, lembretes autom\u00e1ticos via SMS e WhatsApp.",
    },
    problem: {
      en: "Small clinics lose patients to no-shows and manual scheduling inefficiency. Receptionists spend hours on the phone booking appointments. Patients want to book anytime, not just during business hours.",
      pt: "Cl\u00ednicas pequenas perdem pacientes por no-shows e inefici\u00eancia de agendamento manual. Recepcionistas gastam horas ao telefone marcando consultas. Pacientes querem agendar a qualquer hora, n\u00e3o s\u00f3 em hor\u00e1rio comercial.",
    },
    solution: {
      en: "Built a WhatsApp bot powered by AI that handles appointment scheduling 24/7. Patients text the clinic\u2019s WhatsApp, the bot checks available slots via Google Calendar, books the appointment, and sends reminders. The clinic gets a dashboard to manage everything.",
      pt: "Constru\u00ed um bot de WhatsApp com IA que faz agendamento 24/7. Pacientes mandam mensagem no WhatsApp da cl\u00ednica, o bot verifica hor\u00e1rios dispon\u00edveis via Google Calendar, marca a consulta e envia lembretes. A cl\u00ednica tem um dashboard pra gerenciar tudo.",
    },
    decisions: {
      en: [
        "WhatsApp over custom app \u2014 patients already use WhatsApp, zero adoption friction",
        "Google Calendar as source of truth \u2014 doctors already manage their schedules there, bidirectional sync avoids double-booking",
        "Twilio for WhatsApp API \u2014 official Business API provider with reliable message delivery and webhook support",
      ],
      pt: [
        "WhatsApp em vez de app pr\u00f3prio \u2014 pacientes j\u00e1 usam WhatsApp, zero fric\u00e7\u00e3o de ado\u00e7\u00e3o",
        "Google Calendar como fonte de verdade \u2014 m\u00e9dicos j\u00e1 gerenciam suas agendas l\u00e1, sincroniza\u00e7\u00e3o bidirecional evita agendamento duplo",
        "Twilio para API WhatsApp \u2014 provedor oficial da Business API com entrega confi\u00e1vel de mensagens e suporte a webhooks",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Clinic dashboard with calendar UI", pt: "Dashboard da cl\u00ednica com UI de calend\u00e1rio" } },
      { category: "Backend", items: ["Next.js API Routes", "Twilio"], context: { en: "40+ routes, WhatsApp webhook handlers", pt: "40+ rotas, handlers de webhook WhatsApp" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "25+ migrations, multi-clinic RLS", pt: "25+ migra\u00e7\u00f5es, RLS multi-cl\u00ednica" } },
      { category: "Integrations", items: ["Google Calendar", "Twilio"], context: { en: "Bidirectional calendar sync, SMS + WhatsApp", pt: "Sincroniza\u00e7\u00e3o bidirecional de calend\u00e1rio, SMS + WhatsApp" } },
    ],
    url: null,
    stats: { routes: "40+", migrations: "25+", crons: "\u2014" },
    color: "#ec4899",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add project data with bilingual content and case study fields"
```

---

### Task 3: Add LangToggle and update layout

**Files:**
- Create: `src/app/components/LangToggle.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/app/components/LangToggle.tsx`**

```tsx
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
```

- [ ] **Step 2: Update `src/app/layout.tsx` to wrap with LangProvider and add LangToggle**

Replace the entire file content with:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/contexts/LangContext";
import LangToggle from "./components/LangToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tox \u2014 Full-Stack Developer & Security Engineer",
  description:
    "7 years building SaaS platforms, AI agents, and real-time systems from scratch. Security consulting for banks and enterprises.",
  keywords: [
    "full-stack developer",
    "security engineer",
    "SaaS",
    "AI agents",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Tox" }],
  openGraph: {
    title: "Tox \u2014 Full-Stack Developer & Security Engineer",
    description:
      "7 years building production systems. Security consulting for Sicredi, Tozetto, and more.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tox \u2014 Full-Stack Developer & Security Engineer",
    description:
      "7 years building production systems. Security consulting for banks and enterprises.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' fill='%2322c55e'>%3E_</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LangProvider>
          <LangToggle />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify no TypeScript errors**

Run: `cd "C:/Users/Toxjo/Desktop/sites proprios/tox-portfolio" && npx tsc --noEmit --pretty 2>&1 | head -20`

- [ ] **Step 4: Commit**

```bash
git add src/app/components/LangToggle.tsx src/app/layout.tsx
git commit -m "feat: add global lang toggle and wrap app in LangProvider"
```

---

### Task 4: Create Hero section with perspective grid background

**Files:**
- Create: `src/app/components/HeroBg.tsx`
- Create: `src/app/components/Hero.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add hero and grid CSS to `globals.css`**

Append to the end of `src/app/globals.css`:

```css
/* Perspective grid background */
.perspective-grid {
  position: absolute;
  inset: 0;
  overflow: hidden;
  perspective: 400px;
}

.perspective-grid::before {
  content: '';
  position: absolute;
  inset: -50%;
  transform: rotateX(60deg);
  background:
    repeating-linear-gradient(
      90deg,
      rgba(34,197,94,0.07) 0px,
      rgba(34,197,94,0.07) 1px,
      transparent 1px,
      transparent 80px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(34,197,94,0.05) 0px,
      rgba(34,197,94,0.05) 1px,
      transparent 1px,
      transparent 80px
    );
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  from { transform: rotateX(60deg) translateY(0); }
  to { transform: rotateX(60deg) translateY(80px); }
}

.perspective-grid-fade {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, var(--background) 70%);
  pointer-events: none;
}

/* Typing animation */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

.typing-container {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(40) 1s both;
  border-right: 2px solid var(--accent);
}

/* Scroll indicator bounce */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 0.4; }
  50% { transform: translateY(6px); opacity: 0.8; }
}

.scroll-indicator {
  animation: scrollBounce 2s ease-in-out infinite;
}
```

- [ ] **Step 2: Create `src/app/components/HeroBg.tsx`**

```tsx
export default function HeroBg() {
  return (
    <div className="perspective-grid" aria-hidden="true">
      <div className="perspective-grid-fade" />
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/components/Hero.tsx`**

```tsx
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
```

- [ ] **Step 4: Verify no TypeScript errors**

Run: `cd "C:/Users/Toxjo/Desktop/sites proprios/tox-portfolio" && npx tsc --noEmit --pretty 2>&1 | head -20`

- [ ] **Step 5: Commit**

```bash
git add src/app/components/HeroBg.tsx src/app/components/Hero.tsx src/app/globals.css
git commit -m "feat: add hero section with perspective grid background"
```

---

### Task 5: Create About (README.md) section

**Files:**
- Create: `src/app/components/About.tsx`

- [ ] **Step 1: Create `src/app/components/About.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/About.tsx
git commit -m "feat: add About section styled as README.md"
```

---

### Task 6: Create ProjectCard with tilt and cursor glow

**Files:**
- Create: `src/app/components/ProjectCard.tsx`

- [ ] **Step 1: Create `src/app/components/ProjectCard.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard with 3D tilt and cursor glow"
```

---

### Task 7: Update Terminal to sync with global i18n

**Files:**
- Modify: `src/app/components/Terminal.tsx`

- [ ] **Step 1: Update Terminal.tsx**

The Terminal component needs two changes:
1. Import and use `useLang()` for initial language state
2. Remove the PT/EN toggle button from the title bar
3. Sync `lang` state with the global context

Replace the entire `src/app/components/Terminal.tsx` with:

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLang } from "@/contexts/LangContext";

type Lang = "en" | "pt";

const COMMANDS: Record<Lang, Record<string, string[]>> = {
  en: {
    help: [
      "Available commands:",
      "",
      "  whoami      \u2014 about me",
      "  skills      \u2014 tech stack",
      "  projects    \u2014 my work",
      "  security    \u2014 security experience",
      "  clients     \u2014 companies I've worked with",
      "  contact     \u2014 get in touch",
      "  stats       \u2014 numbers",
      "  clear       \u2014 clear terminal",
    ],
    whoami: [
      "Tox \u2014 Full-Stack Developer",
      "",
      "7 years building production systems from scratch.",
      "Architecture, database, API, frontend, deploy.",
      "",
      "I build SaaS platforms, AI agents, real-time apps,",
      "and provide security consulting for banks and enterprises.",
      "",
      "Everything you see on this portfolio \u2014 I designed,",
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
      "  Sicredi         \u2014 Banking security infrastructure",
      "  Tozetto         \u2014 Retail chain security systems",
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
    projects: [
      "Scrolling to projects section...",
    ],
    stats: [
      "  7+    years of development",
      "  8     production apps deployed",
      "  200+  API endpoints built",
      "  100+  database migrations",
      "  50+   AI agent templates",
      "  0     templates used \u2014 all from scratch",
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
      "Comandos dispon\u00edveis:",
      "",
      "  whoami      \u2014 sobre mim",
      "  skills      \u2014 stack t\u00e9cnica",
      "  projects    \u2014 meus projetos",
      "  security    \u2014 experi\u00eancia em seguran\u00e7a",
      "  clients     \u2014 empresas que trabalhei",
      "  contact     \u2014 contato",
      "  stats       \u2014 n\u00fameros",
      "  clear       \u2014 limpar terminal",
    ],
    whoami: [
      "Tox \u2014 Desenvolvedor Full-Stack",
      "",
      "7 anos construindo sistemas em produ\u00e7\u00e3o do zero.",
      "Arquitetura, banco de dados, API, frontend, deploy.",
      "",
      "Constru\u00ed plataformas SaaS, agentes de IA, apps real-time,",
      "e presto consultoria de seguran\u00e7a para bancos e empresas.",
      "",
      "Tudo que voc\u00ea v\u00ea nesse portf\u00f3lio \u2014 eu projetei,",
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
      "// Seguran\u00e7a",
      "Pentesting, OWASP, RLS, RBAC, MFA, Criptografia",
      "",
      "// Integra\u00e7\u00f5es",
      "Twilio, HubSpot, Slack, Notion, Google APIs, Mercado Pago",
    ],
    security: [
      "// Consultoria & Implementa\u00e7\u00e3o de Seguran\u00e7a",
      "",
      "Engenheiro de seguran\u00e7a fornecendo prote\u00e7\u00e3o t\u00e9cnica",
      "para institui\u00e7\u00f5es financeiras e empresas.",
      "",
      "  Sicredi         \u2014 Infraestrutura de seguran\u00e7a banc\u00e1ria",
      "  Tozetto         \u2014 Sistemas de seguran\u00e7a varejo",
      "  + outros clientes",
      "",
      "Especialidades:",
      "  - Teste de penetra\u00e7\u00e3o & an\u00e1lise de vulnerabilidade",
      "  - Sistemas de autentica\u00e7\u00e3o (MFA, OAuth2, JWT)",
      "  - Row Level Security & isolamento multi-tenant",
      "  - Conformidade OWASP & auditoria de seguran\u00e7a",
      "  - Rate limiting & mitiga\u00e7\u00e3o DDoS",
      "  - Criptografia de dados & conformidade LGPD",
      "  - Preven\u00e7\u00e3o de prompt injection (sistemas IA)",
    ],
    clients: [
      "// Empresas & Clientes",
      "",
      "  Sicredi              Financeiro / Banc\u00e1rio",
      "  Tozetto Mercados     Varejo / Supermercados",
      "  Creevo               Constru\u00e7\u00e3o / RH Tech",
      "  TAS Ocupacional      Sa\u00fade Ocupacional",
      "",
      "Desenvolvimento full-stack e consultoria",
      "de seguran\u00e7a em diversas ind\u00fastrias.",
    ],
    projects: [
      "Rolando at\u00e9 a se\u00e7\u00e3o de projetos...",
    ],
    stats: [
      "  7+    anos de desenvolvimento",
      "  8     apps em produ\u00e7\u00e3o",
      "  200+  endpoints de API constru\u00eddos",
      "  100+  migra\u00e7\u00f5es de banco",
      "  50+   templates de agentes IA",
      "  0     templates usados \u2014 tudo do zero",
    ],
    contact: [
      "// Entre em contato",
      "",
      "  GitHub    github.com/Tox1469",
      "  Email     tox@toxia.com.br",
      "",
      "Dispon\u00edvel para freelance, consultoria e seguran\u00e7a.",
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
          <span className="text-[10px] font-mono text-muted ml-2">tox@dev \u2014 bash</span>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/Terminal.tsx
git commit -m "feat: sync terminal with global i18n, remove local lang toggle"
```

---

### Task 8: Update Stats component with i18n

**Files:**
- Modify: `src/app/components/Stats.tsx`

- [ ] **Step 1: Update Stats.tsx to use i18n**

Replace the entire `src/app/components/Stats.tsx` with:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LangContext";

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 30;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-number text-2xl sm:text-3xl font-sans font-bold">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useLang();

  const stats = [
    { value: 7, suffix: "+", label: t.stats_section.years },
    { value: 8, suffix: "", label: t.stats_section.apps },
    { value: 200, suffix: "+", label: t.stats_section.routes },
    { value: 100, suffix: "+", label: t.stats_section.migrations },
    { value: 50, suffix: "+", label: t.stats_section.templates },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <Counter target={stat.value} suffix={stat.suffix} />
          <p className="text-[10px] sm:text-xs font-mono text-muted mt-1 uppercase tracking-wider">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/components/Stats.tsx
git commit -m "feat: update stats component with i18n support"
```

---

### Task 9: Rewrite main page with new section order

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite `src/app/page.tsx` with new structure**

Replace the entire `src/app/page.tsx` with:

```tsx
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
      {/* Hero - fullscreen */}
      <Hero onProjectsClick={scrollToProjects} onContactClick={scrollToContact} />

      {/* Content */}
      <div className="max-w-3xl mx-auto w-full px-5 sm:px-8">
        {/* Terminal */}
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

        {/* About */}
        <ScrollReveal>
          <section className="pb-16 sm:pb-20">
            <About />
          </section>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <div className="divider-glow mb-12" />
          <Stats />
          <div className="divider-glow mt-12" />
        </ScrollReveal>

        {/* Projects */}
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

        {/* Skills */}
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

        {/* Security */}
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

        {/* Footer */}
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
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cd "C:/Users/Toxjo/Desktop/sites proprios/tox-portfolio" && npx tsc --noEmit --pretty 2>&1 | head -30`

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: rewrite main page with hero, about, new section order"
```

---

### Task 10: Create project detail pages

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/projects/[slug]/page.tsx`**

```tsx
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
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors mb-12"
        >
          <span>&larr;</span> {t.projects.back}
        </Link>

        {/* Header */}
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

        {/* The Problem */}
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

        {/* The Solution */}
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

        {/* Technical Decisions */}
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

        {/* Stack Breakdown */}
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

        {/* Numbers */}
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

        {/* Visual Placeholder */}
        <section className="mb-16">
          <div className="border border-dashed border-border rounded-lg p-8 flex items-center justify-center">
            <p className="font-mono text-xs text-muted/50 uppercase tracking-widest">
              {t.projects.visual_placeholder}
            </p>
          </div>
        </section>

        {/* Prev / Next Navigation */}
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
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `cd "C:/Users/Toxjo/Desktop/sites proprios/tox-portfolio" && npx tsc --noEmit --pretty 2>&1 | head -30`

- [ ] **Step 3: Commit**

```bash
git add src/app/projects/[slug]/page.tsx
git commit -m "feat: add project detail pages with case study layout"
```

---

### Task 11: Final build verification

- [ ] **Step 1: Run dev server and check for errors**

Run: `cd "C:/Users/Toxjo/Desktop/sites proprios/tox-portfolio" && npm run build 2>&1 | tail -30`
Expected: Build succeeds with no errors

- [ ] **Step 2: Test in browser**

Start dev server: `cd "C:/Users/Toxjo/Desktop/sites proprios/tox-portfolio" && npm run dev`

Test checklist:
- Hero: grid background visible, typing animation plays, CTAs scroll correctly
- Lang toggle: clicking PT/EN switches all text globally
- Terminal: syncs with global language, commands work
- About: README.md section displays correctly
- Stats: counters animate on scroll
- Project cards: 3D tilt on hover, cursor glow follows mouse, clicking goes to `/projects/[slug]`
- Project pages: all 6 projects load, prev/next navigation works, back button works
- Mobile: responsive at 375px width

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address build and visual issues from final review"
```
