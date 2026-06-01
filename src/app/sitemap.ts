import { MetadataRoute } from "next";
import { blogPostsMeta } from "@/data/blog-posts-meta";
import { allLessonsMeta } from "@/data/lesson-generator";
import { locales } from "@/i18n/config";
import { SITE_URL, localePath } from "@/lib/seo";

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/courses", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

function urlFor(path: string, locale: string) {
  return `${SITE_URL.replace(/\/$/, "")}${localePath(path, locale)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of STATIC_PAGES) {
      const languages: Record<string, string> = {};
      for (const alt of locales) {
        languages[alt] = urlFor(page.path, alt);
      }
      languages["x-default"] = urlFor(page.path, "en");

      routes.push({
        url: urlFor(page.path, locale),
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
      });
    }

    for (const lesson of allLessonsMeta) {
      const lessonPath = `/courses/${lesson.slug}`;
      const languages: Record<string, string> = {};
      for (const alt of locales) {
        languages[alt] = urlFor(lessonPath, alt);
      }
      languages["x-default"] = urlFor(lessonPath, "en");

      routes.push({
        url: urlFor(lessonPath, locale),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: lesson.moduleNumber === 1 ? 0.85 : 0.75,
        alternates: { languages },
      });
    }

    for (const post of blogPostsMeta) {
      const blogPath = `/blog/${post.slug}`;
      const languages: Record<string, string> = {};
      for (const alt of locales) {
        languages[alt] = urlFor(blogPath, alt);
      }
      languages["x-default"] = urlFor(blogPath, "en");

      routes.push({
        url: urlFor(blogPath, locale),
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  return routes;
}
