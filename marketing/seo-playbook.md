# SEO Playbook — AI Agent Academy

Technical SEO is implemented in code (`src/lib/seo.ts`, sitemap, structured data). **Ranking #1 on Google also requires off-site work** — this checklist covers both.

## Already implemented (technical)

- Canonical URLs + **hreflang** for all 25 locales (`languageAlternates`)
- XML sitemap with alternates for static pages, lessons, and blog posts
- `robots.txt` with host + sitemap; private routes disallowed
- JSON-LD: Organization (site-wide), WebSite + Course + FAQ (homepage only), Article (blog), LearningResource (lessons), Breadcrumbs
- Removed **fake aggregate ratings** (Google manual action risk)
- Per-page metadata via `generateMetadata` / `pageMetadata()`
- Dynamic Open Graph image (`/[locale]/opengraph-image`)
- RSS feed at `/api/feed`
- IndexNow script: `node scripts/submit-indexnow.js`

## Environment variables

```env
NEXT_PUBLIC_SITE_URL=https://learnhowtobuildaiagents.com
GOOGLE_SITE_VERIFICATION=...
BING_SITE_VERIFICATION=...
YANDEX_VERIFICATION=...
```

## After each deploy

1. Submit sitemap in [Google Search Console](https://search.google.com/search-console)
2. Run `node scripts/submit-indexnow.js`
3. Request indexing for new blog posts / major pages

## Content strategy (highest ROI for rankings)

Target keywords already mapped in metadata:

| Intent | Example keywords | On-site target |
|--------|------------------|----------------|
| Course | AI agent course, learn AI agents | `/`, `/courses`, `/pricing` |
| Tutorial | build AI agent python, LangChain tutorial | Blog + lessons |
| Comparison | LangChain vs LlamaIndex | Blog post (existing) |
| Tool-specific | Claude tool use, MCP tutorial | Lessons + blog |

**Publish 1–2 blog posts per week** targeting long-tail queries. Internal-link from each post to the relevant lesson and `/courses`.

## Off-page (required for competitive terms)

- Backlinks from Dev.to, Hashnode, GitHub README (use `npm run marketing:*` scripts)
- YouTube/GitHub demos linking to lesson URLs
- Guest posts on AI/engineering blogs
- Product Hunt / Hacker News launch with UTM tracking

## Core Web Vitals

- Keep lesson pages lean; images lazy-loaded
- Monitor Vercel Analytics + Search Console CWV report
- Prefer static generation where possible (`generateStaticParams` on blog)

## Do not

- Add fake reviews/ratings in schema
- Cloak content for bots
- Spin duplicate content across locales (UI is translated; lesson bodies stay English until properly localized)

## Realistic expectations

No codebase change guarantees #1 rankings. Compete on **content depth**, **backlinks**, **search intent match**, and **consistent publishing** for 3–6+ months.
