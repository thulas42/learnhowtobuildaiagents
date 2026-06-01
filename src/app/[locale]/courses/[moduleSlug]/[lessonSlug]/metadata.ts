import type { Metadata } from "next";
import { getLessonMeta } from "@/data/lesson-generator";
import { pageMetadata } from "@/lib/seo";

interface Props {
  params: { locale: string; moduleSlug: string; lessonSlug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = `${params.moduleSlug}/${params.lessonSlug}`;
  const meta = getLessonMeta(slug);

  if (!meta) {
    return { title: "Lesson Not Found", robots: { index: false } };
  }

  const title = `${meta.title} — Lesson ${meta.number}`;
  const description = `Free lesson: ${meta.title}. Module ${meta.moduleNumber} (${meta.moduleTitle}) of the AI Agent Development course. Code examples, diagrams & quiz. Learn LangChain, Claude & agent architecture.`;
  const path = `/courses/${slug}`;

  return pageMetadata({
    title,
    description,
    path,
    locale: params.locale,
    keywords: [
      meta.title.toLowerCase(),
      meta.moduleTitle.toLowerCase(),
      `AI agent lesson ${meta.number}`,
      "AI agent tutorial",
    ],
    ogType: "article",
  });
}
