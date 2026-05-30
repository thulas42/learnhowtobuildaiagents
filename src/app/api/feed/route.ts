import { NextResponse } from "next/server";
import { allLessonsMeta } from "@/data/lesson-generator";

const SITE_URL = "https://learnhowtobuildaiagents.com";
const SITE_TITLE = "AI Agent Academy";
const SITE_DESCRIPTION = "Learn to build AI agents from scratch. 30+ lessons covering Python, LangChain, LlamaIndex, Claude, CrewAI. Free to start.";

/**
 * GET /api/feed — RSS/Atom feed for the course
 * This allows aggregators, podcast apps, and RSS readers to discover and share content.
 * Also helps with SEO as Google indexes RSS feeds.
 */
export async function GET() {
  const now = new Date().toISOString();

  const items = allLessonsMeta.map((lesson) => {
    return `    <item>
      <title>Lesson ${lesson.number}: ${lesson.title}</title>
      <link>${SITE_URL}/courses/${lesson.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/courses/${lesson.slug}</guid>
      <description>Module ${lesson.moduleNumber}: ${lesson.moduleTitle} — ${lesson.title}. Part of the AI Agent Academy course.</description>
      <category>${lesson.moduleTitle}</category>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`;
  });

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/feed" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/icon-512.png</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}</link>
    </image>
${items.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
