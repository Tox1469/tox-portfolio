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
    tagline: { en: "AI Agent Platform", pt: "Plataforma de Agentes IA" },
    description: {
      en: "Multi-tenant SaaS for AI agents. 50+ agent templates, multi-step pipelines, WhatsApp/SMS channels via Twilio, social media posting, internal chat with audio and reply, document generation (Word/PDF/Excel), integrations with HubSpot, Slack, Notion, Bitrix24, RD Station, ContaAzul. Full RBAC with admin, company owner, and employee roles. Prompt injection protection, rate limiting, MFA authentication.",
      pt: "SaaS multi-tenant para agentes de IA. 50+ templates de agentes, pipelines multi-etapa, canais WhatsApp/SMS via Twilio, posting em redes sociais, chat interno com áudio e reply, geração de documentos (Word/PDF/Excel), integrações com HubSpot, Slack, Notion, Bitrix24, RD Station, ContaAzul. RBAC completo com admin, dono de empresa e funcionário. Proteção contra prompt injection, rate limiting, autenticação MFA.",
    },
    problem: {
      en: "Companies need AI agents but building them requires deep technical knowledge. Existing platforms are either too simple (no multi-step pipelines, no integrations) or too complex (require ML engineers). There was no middle ground for business users who need production-grade AI agents with proper security and multi-tenant isolation.",
      pt: "Empresas precisam de agentes IA mas construí-los exige conhecimento técnico profundo. Plataformas existentes são ou simples demais (sem pipelines, sem integrações) ou complexas demais (exigem engenheiros de ML). Não havia meio-termo para usuários de negócio que precisam de agentes IA em produção com segurança e isolamento multi-tenant.",
    },
    solution: {
      en: "Built a full SaaS platform where companies can create, configure, and deploy AI agents without writing code. Each company gets isolated data, their own agent library, and can connect channels like WhatsApp and Slack. The platform handles prompt injection prevention, rate limiting, and document generation automatically.",
      pt: "Construí uma plataforma SaaS completa onde empresas podem criar, configurar e fazer deploy de agentes IA sem escrever código. Cada empresa tem dados isolados, sua própria biblioteca de agentes, e pode conectar canais como WhatsApp e Slack. A plataforma cuida de prevenção de prompt injection, rate limiting e geração de documentos automaticamente.",
    },
    decisions: {
      en: [
        "Supabase over Firebase — needed Row Level Security for true multi-tenant isolation at the database level, not just application-level checks",
        "Gemini as primary LLM — best cost-to-quality ratio for high-volume agent workloads, with Claude and OpenAI as fallbacks",
        "Server-side document generation — Word/PDF/Excel generated on the server to avoid exposing templates and business logic to the client",
        "Twilio for messaging — single provider for WhatsApp, SMS, and voice with reliable webhook delivery and global coverage",
      ],
      pt: [
        "Supabase em vez de Firebase — precisava de Row Level Security para isolamento multi-tenant real no nível do banco, não apenas verificações no nível da aplicação",
        "Gemini como LLM principal — melhor relação custo-qualidade para workloads de agentes em alto volume, com Claude e OpenAI como fallback",
        "Geração de documentos server-side — Word/PDF/Excel gerados no servidor para não expor templates e lógica de negócio ao cliente",
        "Twilio para mensageria — provedor único para WhatsApp, SMS e voz com entrega confiável de webhooks e cobertura global",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "React", "Tailwind CSS"], context: { en: "App Router with SSR, shadcn/ui components", pt: "App Router com SSR, componentes shadcn/ui" } },
      { category: "Backend", items: ["Next.js API Routes", "Supabase Edge Functions"], context: { en: "144 routes handling agents, pipelines, integrations", pt: "144 rotas gerenciando agentes, pipelines, integrações" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "62 migrations, RLS policies on every table", pt: "62 migrações, políticas RLS em toda tabela" } },
      { category: "AI", items: ["Gemini", "Claude", "OpenAI"], context: { en: "Multi-provider with automatic fallback", pt: "Multi-provedor com fallback automático" } },
      { category: "Infra", items: ["Vercel", "Cloudflare"], context: { en: "14 cron jobs, edge caching, DDoS protection", pt: "14 cron jobs, cache na edge, proteção DDoS" } },
    ],
    url: "https://agentbox.com.br",
    stats: { routes: "144", migrations: "62", crons: "14" },
    color: "#22c55e",
  },
  {
    slug: "creevohub",
    name: "CreevoHub",
    tagline: { en: "Construction HR Platform", pt: "Plataforma de RH para Construção Civil" },
    description: {
      en: "Hiring platform for the construction industry. Multi-tenant dashboards per company, NR and medical exam compliance, AI candidate screening, document management, financial module with billing and invoicing. Full RBAC with multi-level access control.",
      pt: "Plataforma de contratação para a indústria da construção civil. Dashboards multi-tenant por empresa, conformidade com NRs e exames médicos, triagem de candidatos com IA, gestão de documentos, módulo financeiro com faturamento e cobrança. RBAC completo com controle de acesso multi-nível.",
    },
    problem: {
      en: "Construction companies manage hiring with spreadsheets and paper. NR compliance tracking is manual and error-prone. No centralized system connects candidate screening, medical exams, document management, and billing.",
      pt: "Construtoras gerenciam contratação com planilhas e papel. Acompanhamento de conformidade NR é manual e propenso a erros. Nenhum sistema centralizado conecta triagem de candidatos, exames médicos, gestão de documentos e faturamento.",
    },
    solution: {
      en: "Built an all-in-one platform where construction companies manage the entire hiring lifecycle. AI screens candidates against NR requirements, tracks medical exam expiry dates, manages documents, and handles billing — all in one place with proper multi-tenant isolation.",
      pt: "Construí uma plataforma completa onde construtoras gerenciam todo o ciclo de contratação. IA faz triagem de candidatos contra requisitos de NRs, rastreia validade de exames médicos, gerencia documentos e cuida do faturamento — tudo em um lugar com isolamento multi-tenant.",
    },
    decisions: {
      en: [
        "Multi-tenant with shared database — RLS policies isolate company data without the overhead of separate databases",
        "AI screening as a feature, not the product — the platform solves hiring workflow first, AI enhances it",
        "Financial module built manual-first — invoice generation before payment gateway, validating the flow with real users",
      ],
      pt: [
        "Multi-tenant com banco compartilhado — políticas RLS isolam dados da empresa sem o overhead de bancos separados",
        "Triagem IA como feature, não como produto — a plataforma resolve o fluxo de contratação primeiro, IA aprimora",
        "Módulo financeiro construído manual-first — geração de faturas antes de gateway de pagamento, validando o fluxo com usuários reais",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Multi-role dashboards with dynamic permissions", pt: "Dashboards multi-role com permissões dinâmicas" } },
      { category: "Backend", items: ["Next.js API Routes"], context: { en: "80+ routes for hiring, compliance, billing", pt: "80+ rotas para contratação, conformidade, faturamento" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "40+ migrations with RLS per company", pt: "40+ migrações com RLS por empresa" } },
      { category: "Infra", items: ["Vercel"], context: { en: "Automated deployments with preview branches", pt: "Deploys automatizados com branches de preview" } },
    ],
    url: "https://creevo.com.br",
    stats: { routes: "80+", migrations: "40+", crons: "—" },
    color: "#f97316",
  },
  {
    slug: "creevo-academy",
    name: "Creevo Academy",
    tagline: { en: "Workplace Safety LMS", pt: "LMS de Segurança do Trabalho" },
    description: {
      en: "Training platform specialized in Regulatory Standards (NRs). Course management with video lessons, certificate generation, progress tracking, dashboards for companies to manage employee training compliance.",
      pt: "Plataforma de treinamento especializada em Normas Regulamentadoras. Gestão de cursos com videoaulas, geração de certificados, acompanhamento de progresso, dashboards para empresas gerenciarem a conformidade de treinamento dos funcionários.",
    },
    problem: {
      en: "NR training compliance is tracked manually. Companies don't know which employees need recertification. Training platforms are generic and don't understand NR-specific requirements.",
      pt: "Conformidade de treinamento NR é rastreada manualmente. Empresas não sabem quais funcionários precisam de recertificação. Plataformas de treinamento são genéricas e não entendem requisitos específicos de NRs.",
    },
    solution: {
      en: "Built a focused LMS that maps courses to specific NRs, auto-generates certificates on completion, and gives companies a dashboard showing exactly who is compliant and who needs retraining.",
      pt: "Construí um LMS focado que mapeia cursos a NRs específicas, gera certificados automaticamente ao completar, e dá às empresas um dashboard mostrando exatamente quem está em conformidade e quem precisa de retreinamento.",
    },
    decisions: {
      en: [
        "NR-first data model — courses link to specific NR requirements, not generic categories",
        "Auto-certification — certificates generated server-side with tamper-proof metadata",
      ],
      pt: [
        "Modelo de dados NR-first — cursos vinculados a requisitos de NRs específicas, não categorias genéricas",
        "Auto-certificação — certificados gerados server-side com metadados à prova de adulteração",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Video player, progress tracking UI", pt: "Player de vídeo, UI de progresso" } },
      { category: "Backend", items: ["Next.js API Routes"], context: { en: "30+ routes for courses, certificates, compliance", pt: "30+ rotas para cursos, certificados, conformidade" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "20+ migrations", pt: "20+ migrações" } },
      { category: "Infra", items: ["Vercel"], context: { en: "CDN-optimized video delivery", pt: "Entrega de vídeo otimizada por CDN" } },
    ],
    url: "https://creevoacademy.com.br",
    stats: { routes: "30+", migrations: "20+", crons: "—" },
    color: "#eab308",
  },
  {
    slug: "tas-ocupacional",
    name: "TAS Ocupacional",
    tagline: { en: "Occupational Health", pt: "Saúde Ocupacional" },
    description: {
      en: "Corporate website for occupational health company. Premium design with scroll animations, service showcase, WhatsApp integration for lead capture, mobile-first responsive layout.",
      pt: "Site corporativo para empresa de saúde ocupacional. Design premium com animações ao scroll, vitrine de serviços, integração WhatsApp para captação de leads, layout responsivo mobile-first.",
    },
    problem: {
      en: "The company had no online presence and was losing leads to competitors with modern websites. Their services were hard to communicate without a visual showcase.",
      pt: "A empresa não tinha presença online e estava perdendo leads para concorrentes com sites modernos. Seus serviços eram difíceis de comunicar sem uma vitrine visual.",
    },
    solution: {
      en: "Built a premium corporate site with scroll-triggered animations, clear service presentation, and WhatsApp CTA buttons throughout. Mobile-first design ensures the site works perfectly on the devices their target audience uses most.",
      pt: "Construí um site corporativo premium com animações ativadas por scroll, apresentação clara de serviços e botões CTA de WhatsApp em todo o site. Design mobile-first garante que funciona perfeitamente nos dispositivos que o público-alvo mais usa.",
    },
    decisions: {
      en: [
        "Vite + React over Next.js — static site with no server-side needs, faster build and simpler deploy",
        "Framer Motion for animations — client wanted smooth, premium scroll animations that CSS alone couldn't achieve cleanly",
        "WhatsApp as primary CTA — the target audience prefers WhatsApp over forms or email",
      ],
      pt: [
        "Vite + React em vez de Next.js — site estático sem necessidades server-side, build mais rápido e deploy mais simples",
        "Framer Motion para animações — cliente queria animações suaves e premium de scroll que CSS sozinho não conseguia de forma limpa",
        "WhatsApp como CTA principal — o público-alvo prefere WhatsApp a formulários ou email",
      ],
    },
    stack: [
      { category: "Frontend", items: ["React", "Vite", "Framer Motion"], context: { en: "Scroll-driven animations, responsive design", pt: "Animações por scroll, design responsivo" } },
      { category: "Infra", items: ["Vercel"], context: { en: "Static deploy with edge caching", pt: "Deploy estático com cache na edge" } },
    ],
    url: "https://tasocupacional.com.br",
    stats: { routes: "—", migrations: "—", crons: "—" },
    color: "#06b6d4",
  },
  {
    slug: "toxbets",
    name: "ToxBets",
    tagline: { en: "Casino Platform", pt: "Plataforma de Casino" },
    description: {
      en: "Full casino platform with Texas Hold'em poker (AI bots, tournaments, Elo ranking, chip economy), Mines, Blackjack, Double, and 7 more games. Real-time multiplayer via Server-Sent Events, emote system, animations, Redis state management.",
      pt: "Plataforma de casino completa com Texas Hold'em poker (bots IA, torneios, ranking Elo, economia de fichas), Mines, Blackjack, Double e mais 7 jogos. Multiplayer em tempo real via Server-Sent Events, sistema de emotes, animações, gerenciamento de estado com Redis.",
    },
    problem: {
      en: "Wanted to build a technically challenging real-time multiplayer system as a learning project. Casino games require complex state machines, real-time sync, and AI opponents — a perfect stress test for full-stack skills.",
      pt: "Queria construir um sistema multiplayer em tempo real tecnicamente desafiador como projeto de aprendizado. Jogos de casino exigem máquinas de estado complexas, sincronização em tempo real e oponentes IA — um teste de estresse perfeito para habilidades full-stack.",
    },
    solution: {
      en: "Built a complete casino with 10 games, each with its own state machine. Poker has full Texas Hold'em rules, AI bots with different play styles, tournaments, and an Elo-based ranking system. All real-time sync uses SSE instead of WebSockets for simpler server architecture.",
      pt: "Construí um casino completo com 10 jogos, cada um com sua máquina de estados. Poker tem regras completas de Texas Hold'em, bots IA com diferentes estilos de jogo, torneios e sistema de ranking baseado em Elo. Toda sincronização em tempo real usa SSE em vez de WebSockets para arquitetura de servidor mais simples.",
    },
    decisions: {
      en: [
        "SSE over WebSockets — server-to-client streaming is sufficient for game state updates, avoids bidirectional connection complexity",
        "Redis for game state — in-memory state machine with pub/sub for multi-player sync, no database writes during gameplay",
        "Elo rating system — well-understood algorithm that naturally creates skill-based matchmaking",
      ],
      pt: [
        "SSE em vez de WebSockets — streaming server-to-client é suficiente para atualizações de estado do jogo, evita complexidade de conexão bidirecional",
        "Redis para estado do jogo — máquina de estados in-memory com pub/sub para sync multiplayer, sem escrita no banco durante gameplay",
        "Sistema de rating Elo — algoritmo bem compreendido que cria matchmaking baseado em habilidade naturalmente",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Game UIs with canvas animations", pt: "UIs de jogos com animações canvas" } },
      { category: "Backend", items: ["Next.js API Routes", "SSE"], context: { en: "60+ routes, real-time game state streaming", pt: "60+ rotas, streaming de estado do jogo em tempo real" } },
      { category: "Database", items: ["PostgreSQL", "Redis"], context: { en: "Redis for live state, Postgres for persistence", pt: "Redis para estado ao vivo, Postgres para persistência" } },
    ],
    url: null,
    stats: { routes: "60+", migrations: "30+", crons: "—" },
    color: "#a855f7",
  },
  {
    slug: "appform",
    name: "AppForm",
    tagline: { en: "Clinic Management SaaS", pt: "SaaS para Clínicas" },
    description: {
      en: "SaaS for clinic management with AI-powered WhatsApp bot for automatic appointment scheduling. Bidirectional Google Calendar sync, patient management, multi-clinic support, automatic reminders via SMS and WhatsApp.",
      pt: "SaaS para gestão de clínicas com bot de WhatsApp com IA para agendamento automático de consultas. Sincronização bidirecional com Google Calendar, gestão de pacientes, suporte multi-clínica, lembretes automáticos via SMS e WhatsApp.",
    },
    problem: {
      en: "Small clinics lose patients to no-shows and manual scheduling inefficiency. Receptionists spend hours on the phone booking appointments. Patients want to book anytime, not just during business hours.",
      pt: "Clínicas pequenas perdem pacientes por no-shows e ineficiência de agendamento manual. Recepcionistas gastam horas ao telefone marcando consultas. Pacientes querem agendar a qualquer hora, não só em horário comercial.",
    },
    solution: {
      en: "Built a WhatsApp bot powered by AI that handles appointment scheduling 24/7. Patients text the clinic's WhatsApp, the bot checks available slots via Google Calendar, books the appointment, and sends reminders. The clinic gets a dashboard to manage everything.",
      pt: "Construí um bot de WhatsApp com IA que faz agendamento 24/7. Pacientes mandam mensagem no WhatsApp da clínica, o bot verifica horários disponíveis via Google Calendar, marca a consulta e envia lembretes. A clínica tem um dashboard pra gerenciar tudo.",
    },
    decisions: {
      en: [
        "WhatsApp over custom app — patients already use WhatsApp, zero adoption friction",
        "Google Calendar as source of truth — doctors already manage their schedules there, bidirectional sync avoids double-booking",
        "Twilio for WhatsApp API — official Business API provider with reliable message delivery and webhook support",
      ],
      pt: [
        "WhatsApp em vez de app próprio — pacientes já usam WhatsApp, zero fricção de adoção",
        "Google Calendar como fonte de verdade — médicos já gerenciam suas agendas lá, sincronização bidirecional evita agendamento duplo",
        "Twilio para API WhatsApp — provedor oficial da Business API com entrega confiável de mensagens e suporte a webhooks",
      ],
    },
    stack: [
      { category: "Frontend", items: ["Next.js", "Tailwind CSS"], context: { en: "Clinic dashboard with calendar UI", pt: "Dashboard da clínica com UI de calendário" } },
      { category: "Backend", items: ["Next.js API Routes", "Twilio"], context: { en: "40+ routes, WhatsApp webhook handlers", pt: "40+ rotas, handlers de webhook WhatsApp" } },
      { category: "Database", items: ["Supabase (PostgreSQL)"], context: { en: "25+ migrations, multi-clinic RLS", pt: "25+ migrações, RLS multi-clínica" } },
      { category: "Integrations", items: ["Google Calendar", "Twilio"], context: { en: "Bidirectional calendar sync, SMS + WhatsApp", pt: "Sincronização bidirecional de calendário, SMS + WhatsApp" } },
    ],
    url: null,
    stats: { routes: "40+", migrations: "25+", crons: "—" },
    color: "#ec4899",
  },
];
