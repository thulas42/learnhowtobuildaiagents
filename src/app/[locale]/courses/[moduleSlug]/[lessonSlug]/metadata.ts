import type { Metadata } from "next";
import { getLessonMeta } from "@/data/lesson-generator";

interface Props {
  params: { locale: string; moduleSlug: string; lessonSlug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = `${params.moduleSlug}/${params.lessonSlug}`;
  const meta = getLessonMeta(slug);

  if (!meta) {
    return { title: "Lesson Not Found" };
  }

  const title = `${meta.title} — Lesson ${meta.number} | AI Agent Academy`;
  const description = `Learn ${meta.title.toLowerCase()} in Module ${meta.moduleNumber}: ${meta.moduleTitle}. Interactive lesson with code examples, diagrams, and quiz. Part of the AI Agent Development course.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      section: meta.moduleTitle,
    },
    twitter: {
      card: "summary",
      title: `Lesson ${meta.number}: ${meta.title}`,
      description,
    },
  };
}
