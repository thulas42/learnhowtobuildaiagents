import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { allLessonsMeta } from "@/data/lesson-generator";

const BASE_URL = process.env.NEXTAUTH_URL || "https://aiagentacademy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  const staticPages = ["", "/courses", "/pricing", "/auth/login", "/auth/signup"];

  for (const locale of locales) {
    const prefix = locale === "en" ? "" : `/${locale}`;

    for (const page of staticPages) {
      routes.push({
        url: `${BASE_URL}${prefix}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/courses" ? 0.9 : 0.7,
      });
    }

    // Lesson pages
    for (const lesson of allLessonsMeta) {
      routes.push({
        url: `${BASE_URL}${prefix}/courses/${lesson.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return routes;
}
