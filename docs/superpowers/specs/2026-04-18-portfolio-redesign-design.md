# Portfolio Redesign — Design Spec

## Overview

Structural redesign of tox-portfolio from single-page curriculum-style to a professional multi-page portfolio with improved hero, micro-interactions, case study pages, i18n, and an About section. Maintain the existing dark hacker/green neon design system.

**Target audience:** Brazilian companies and international freelance clients.
**Stack:** Next.js 16, React 19, Tailwind CSS 4. No external animation libs.

---

## 1. Hero (fullscreen)

- **Background:** CSS-only perspective grid. Horizontal and vertical lines converging to a vanishing point. Lines in `rgba(34,197,94,0.07)`, subtle forward-motion animation via `translateZ`. Fade at edges with radial gradient mask.
- **Content (centered):**
  - "Tox" in 5xl-7xl, bold, glow pulse (existing animation)
  - Subtitle with typing animation: "Full-Stack Developer & Security Engineer"
  - Inline stats: "7+ years / 8 apps / 200+ endpoints" in small mono
  - Two anchor CTAs: "View Projects" and "Get in Touch" (scroll links, not buttons)
- **Scroll indicator:** animated chevron at bottom of viewport
- **Height:** 100vh, content vertically centered

## 2. Terminal

- Moves from hero to its own section below hero
- Section header: `$ ./terminal` with divider line (matches existing section pattern)
- All existing functionality preserved: boot sequence, commands, bilingual, internal scroll
- Language syncs with global i18n context (removes its own PT/EN toggle button)
- No logic changes, only repositioning and i18n sync

## 3. About (README.md)

New section between Terminal and Stats.

- **Header:** `$ cat README.md`
- **Container:** card with `bg-surface`, `border-border`, simulating a rendered markdown file
- **Content:**
  - `# About` title
  - 2-3 short paragraphs: who you are, what you do, how you work
  - `## How I Work` with bullets: solo architect/coder, from scratch, security-first
  - `## Currently` with current focus (updatable)
- **Style:** `text-muted` body, `text-foreground` headers, `text-accent` links

## 4. Project Cards (home)

Enhanced cards with micro-interactions:

- **3D tilt on hover:** `transform: perspective(800px) rotateX() rotateY()` following mouse position. Max 3-4 degrees rotation.
- **Cursor glow:** radial gradient following mouse inside card, using `project.color` at ~5% opacity.
- **Border glow:** border changes to `project.color` on hover instead of generic green.
- **Clickable:** entire card links to `/projects/[slug]`. External site link moves to project page.
- **Simplified content:** name, tagline, stats, stack tags only. Long description removed (lives on project page).
- **Stats remain** top-right. **Stack tags remain** bottom.

## 5. Project Pages (`/projects/[slug]`)

Individual pages per project with case study structure:

- **Header:** project name + tagline + project accent color + external link (if exists)
- **Section "The Problem":** 1-2 paragraphs on what the project solves
- **Section "The Solution":** what was built, how it works
- **Section "Technical Decisions":** why Supabase over Firebase, why SSE over WebSocket, etc.
- **Section "Stack Breakdown":** technologies by layer (frontend, backend, db, infra) with one-line context each
- **Section "Numbers":** existing stats (routes, migrations, crons) in visual cards
- **Visual placeholder:** reserved area with "Visual coming soon" message
- **Navigation:** back button + prev/next project links

**Layout:** single column, `max-w-3xl`, consistent with main site.
**Data:** hardcoded in a data file (`src/data/projects.ts`), no CMS.

## 6. Internationalization (i18n)

Simple implementation, no external lib:

- **Toggle:** fixed button top-right corner, `PT / EN`, always visible
- **State:** React Context wrapping the app, `LangProvider`
- **Strings:** `src/data/i18n.ts` with `{ en: {...}, pt: {...} }` for all static content
- **Hook:** `useLang()` returns `{ t, lang, toggleLang }`
- **Projects:** fields like `description_en`, `description_pt` in project data
- **Terminal:** syncs with global context, removes its own toggle
- **Persistence:** `localStorage` for language preference
- **URL:** no separate routes, client-side state only

## 7. Skills & Security Sections

Minimal changes:

- **Skills:** existing grid preserved. All text goes through i18n.
- **Security:** existing card preserved. All text goes through i18n.

## 8. Section Order

1. Hero (fullscreen)
2. Terminal
3. About (README.md)
4. Stats
5. Projects
6. Skills
7. Security
8. Footer (unchanged — github + email)

## 9. Non-Goals

- No screenshots/videos/embeds of projects (deferred)
- No external animation libraries (GSAP, Framer Motion)
- No CMS integration
- No sound design or custom cursor
- No page transitions
- No contact form
