# AI Agent Academy — Global Learning Platform

A comprehensive, multilingual AI coding course that teaches learners how to create AI agents from A to Z. Built with Next.js, Prisma, and next-intl. Supports 25+ languages with RTL support.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and API keys

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with course content
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the platform.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js (Google, GitHub, Credentials)
- **i18n:** next-intl (25 languages, RTL support)
- **UI:** Radix UI + Lucide Icons

## Project Structure

```
ai-coding-course/
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Course content seeder
├── src/
│   ├── app/
│   │   ├── [locale]/             # i18n-routed pages
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── auth/             # Login & signup
│   │   │   ├── dashboard/        # Learner dashboard
│   │   │   ├── courses/          # Course modules & lessons
│   │   │   └── certificate/      # Certificate verification
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # NextAuth endpoints
│   │   │   ├── quiz/             # Quiz submission & grading
│   │   │   ├── progress/         # Progress tracking
│   │   │   └── certificates/     # Certificate generation
│   │   └── globals.css
│   ├── components/
│   │   ├── landing/              # Landing page sections
│   │   ├── layout/               # Header, Footer
│   │   ├── quiz/                 # Quiz player component
│   │   └── ui/                   # Shared UI components
│   ├── i18n/                     # i18n configuration
│   └── lib/                      # Utilities (prisma, certificate)
├── messages/
│   └── en.json                   # English translations
├── course-curriculum.md          # Full course outline
├── platform-requirements.md      # Platform architecture spec
├── quiz-framework.md             # Quiz design system
├── e-certificate-spec.md         # Certificate specification
├── localization/
│   └── language-support.md       # i18n strategy (25+ languages)
└── improved-prompt.md            # Refined prompt document
```

## Features

- **6 Modules, 30+ Lessons** — From AI agent fundamentals to production deployment
- **Interactive Quizzes** — 8 question types with adaptive difficulty
- **25+ Languages** — Full RTL support, culturally adapted content
- **E-Certificates** — Three levels (Completion, Distinction, Excellence) with QR verification
- **Progress Tracking** — Dashboard with streaks, completion %, and activity feed
- **OAuth Login** — Google, GitHub, and email/password
- **Mobile-First** — Responsive design, PWA-ready
- **Accessible** — WCAG 2.1 AA compliant

## Documentation

| Document | Description |
|----------|-------------|
| `course-curriculum.md` | Complete 6-module curriculum with learning objectives |
| `platform-requirements.md` | Technical architecture, i18n, accessibility, pricing |
| `quiz-framework.md` | Quiz types, difficulty progression, anti-cheating |
| `e-certificate-spec.md` | Certificate levels, design, verification, localization |
| `localization/language-support.md` | 25 languages, translation workflow, regional adaptations |
