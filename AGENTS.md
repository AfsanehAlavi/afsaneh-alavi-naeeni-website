# AGENTS.md — Agent guidance for this repo

Purpose
- Short, actionable instructions for AI coding agents working in this workspace.

Quick start (commands)
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Lint: `npm run lint`

What this project is
- Next.js (App Router) application using `src/app` and React 19.
- Tailwind CSS + PostCSS; TypeScript with `strict` enabled.

Key files and locations
- App root / routes: [src/app/layout.tsx](src/app/layout.tsx#L1-L40), [src/app/page.tsx](src/app/page.tsx#L1-L40)
- Components: [src/components](src/components)
- UI primitives: [src/components/ui/button.tsx](src/components/ui/button.tsx)
- Supabase helper / server functions: [src/lib/supabase.ts](src/lib/supabase.ts#L1-L80)
- Project manifest and scripts: [package.json](package.json#L1-L40)

Conventions and guidance
- Prefer linking to existing documentation instead of copying it.
- Keep changes minimal and focused; follow the existing code style and patterns.
- This repo uses Next.js App Router in `src/app`; prefer route/segment conventions accordingly.
- Environment: sensitive values (e.g. `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are read from env — do not hardcode secrets.

Agent behavior checklist
- Before running any modifying script (formatters, lint --fix, or package installs), confirm with the user.
- When proposing code edits, include file links and minimal diffs.
- Run `npm run dev` to verify changes locally if the user asks; provide exact commands.

Existing agent docs
- There is a `CLAUDE.md` file at repo root (may contain project-specific notes). Link: [CLAUDE.md](CLAUDE.md)

Suggested next customizations
- Add `.github/copilot-instructions.md` to provide repository-specific guardrails for automated suggestions.
- Create small skills for common tasks (e.g., `format`, `dev`, `deploy`) if you want interactive agent shortcuts.

CI / Deploy notes
- Preferred hosting: Vercel (Next.js-first experience). For quick deploys, connect the GitHub repo to Vercel and set environment variables in the Vercel dashboard.
- Example CI: use GitHub Actions to run `npm ci`, `npm run lint`, and `npm run build` on PRs and `main` pushes.
- Keep secrets out of source; use GitHub Secrets or Vercel Environment Variables. Relevant keys:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
	- `VERCEL_TOKEN` (optional for API-driven deploys)

Where to look
- Build and scripts: [package.json](package.json#L1-L40)
- Next config: [next.config.ts](next.config.ts#L1-L40)


If anything here looks off or you want more detail (CI, deploy, testing), tell me which area to expand.
