# AI Agent Academy — Global Learning Platform

A comprehensive, multilingual AI coding course that teaches learners how to create AI agents from A to Z. Built with Next.js 14, next-intl, and file-based persistence for local development (PostgreSQL/Prisma schema included for future migration).

## Quick Start

```bash
npm install

cp .env.example .env
# Set NEXTAUTH_SECRET (required for production builds)

# Reset local JSON data stores (optional)
npm run seed:data

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Runtime data

User progress, subscriptions, and quiz attempts are stored in [`data/`](data/) (gitignored except `.gitkeep`). No database is required for local development.

### Prisma (optional / future)

The [`prisma/schema.prisma`](prisma/schema.prisma) describes the production data model. Install Prisma separately if you plan to migrate:

```bash
npm install prisma @prisma/client --save-dev
npm run db:generate
npm run db:migrate
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build (includes type checking) |
| `npm run lint` | ESLint via `next lint` |
| `npm run typecheck` | TypeScript check only |
| `npm run test:e2e` | Build, start server, run Cypress (excludes gumroad screenshots) |
| `npm run seed:data` | Reset `data/*.json` for clean local/CI state |
| `npm run marketing:gumroad-images` | Process Gumroad marketing images |
| `npm run marketing:publish-devto` | Publish blog post to Dev.to |
| `npm run marketing:publish-hashnode` | Publish blog post to Hashnode |
| `npm run marketing:backlinks` | Run backlink automation scripts |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS, Radix UI
- **Auth:** NextAuth.js (Google, GitHub, credentials) with session-bound APIs
- **i18n:** next-intl — 25 locales, RTL support
- **Payments:** Paystack + EFT (admin verification)
- **E2E:** Cypress 15
- **Observability:** Sentry, Vercel Analytics

## Project Structure

```
ai-coding-course/
├── data/                    # Local JSON stores (gitignored)
├── prisma/                  # Future PostgreSQL schema
├── src/
│   ├── app/[locale]/        # Localized pages
│   ├── app/api/             # REST API routes
│   ├── components/          # UI components
│   ├── data/                # Course content (lessons, quizzes)
│   ├── i18n/                # Locale config
│   └── lib/                 # auth, data-store, paystack, session
├── messages/                # 25 locale JSON files
├── cypress/e2e/             # E2E tests
├── scripts/                 # Marketing & dev utilities
└── .github/workflows/ci.yml # Lint, typecheck, build, Cypress
```

## Testing

```bash
# Terminal 1 (or use test:e2e which starts the server automatically)
npm run build && npm start

# Terminal 2
npm run cypress:run
```

`npm run test:e2e` runs `start-server-and-test` against the production server.

## Environment Variables

See [`.env.example`](.env.example) for:

- `NEXTAUTH_*`, OAuth providers
- `PAYSTACK_*`, `NEXT_PUBLIC_PAYSTACK_ENABLED`
- `ADMIN_SECRET`, `ADMIN_EMAIL`
- `RESEND_API_KEY`, `NEXT_PUBLIC_SENTRY_DSN`

## SEO

Technical SEO (sitemap, hreflang, JSON-LD, OG images) lives in [`src/lib/seo.ts`](src/lib/seo.ts). After deploy, submit your sitemap in Google Search Console and run `npm run seo:indexnow`. See [`marketing/seo-playbook.md`](marketing/seo-playbook.md) for the full ranking checklist.

## Documentation

| Document | Description |
|----------|-------------|
| `marketing/seo-playbook.md` | SEO technical setup + content/backlink strategy |
| `course-curriculum.md` | 6-module curriculum |
| `platform-requirements.md` | Architecture and requirements |
| `quiz-framework.md` | Quiz design |
| `e-certificate-spec.md` | Certificates |
| `localization/language-support.md` | i18n strategy |

## Features

- **6 modules, 30+ lessons** — Static TypeScript content in `src/data/`
- **Server-side quiz grading** — Answers never sent to the client
- **Session-bound APIs** — Progress, profile, subscription require login
- **25 languages** — UI translations in `messages/`
- **Certificates** — Generate and verify completion credentials
- **Admin** — Sales dashboard and EFT verification (`Authorization: Bearer` + `ADMIN_SECRET`)
