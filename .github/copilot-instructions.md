# Copilot instructions — repository guardrails

Purpose
- Short, actionable rules for AI coding agents (Copilot, assistants) working on this repo.

Where to look first
- Read the repository-level guidance: [AGENTS.md](AGENTS.md)
- Check any human notes: [CLAUDE.md](CLAUDE.md)

Quick commands
```
npm install
npm run dev
npm run build
npm run start
npm run lint
```

Repository specifics
- Framework: Next.js (App Router) using `src/app` and React 19.
- Styling: Tailwind CSS + PostCSS.
- TypeScript: `strict: true` in `tsconfig.json`.

Environment / secrets
- Do NOT add secrets into source. The project reads these env vars at runtime:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Agent behavior (short checklist)
- Prefer linking to existing docs instead of copying them.
- Keep edits minimal and focused; follow the existing code style and patterns.
- When a change affects behavior, run linters and prefer a local dev run (`npm run dev`) and report results.
- Ask for explicit approval before running any write-heavy automation (mass refactor, `--fix` scripts, or package installs that change lockfiles).
- Never commit credentials or environment values.

Pull request guidance
- Make small, self-contained PRs with a short description and the motivation for the change.
- Include file links and a brief testing note (how you verified locally).

If you need more context to act (CI, deploy targets, or infra), ask the repository owner for access or documentation.

CI / Deploy guidance
- Preferred hosting: Vercel for seamless Next.js deployments (auto-deploy on push).
- If deploying via Vercel, link the GitHub repo in Vercel and set required environment variables in the Vercel project settings.
- For GitHub Actions (example only): run install, build and lint on push to `main` and on PRs. Do not create or enable workflows that run destructive changes without approval.

Example GitHub Actions job (copy into `.github/workflows/ci.yml` if desired):

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
```

Secrets and environment variables
- Store these in GitHub Actions / Vercel secrets — do not commit them:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `VERCEL_TOKEN` (if you plan to trigger Vercel via API)

When to create workflows
- Ask the repository owner before adding CI that modifies infrastructure, creates deployments, or changes secrets.
