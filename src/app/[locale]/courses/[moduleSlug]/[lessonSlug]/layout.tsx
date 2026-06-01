import {
  BreadcrumbSchema,
  LessonLearningResourceSchema,
} from "@/components/seo/StructuredData";
import { getLessonMeta } from "@/data/lesson-generator";

export default function LessonLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { moduleSlug: string; lessonSlug: string };
}) {
  const slug = `${params.moduleSlug}/${params.lessonSlug}`;
  const meta = getLessonMeta(slug);
  const lessonPath = `/courses/${slug}`;

  if (!meta) {
    return children;
  }

  const description = `Lesson ${meta.number}: ${meta.title} — ${meta.moduleTitle}`;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Courses", path: "/courses" },
          { name: `Module ${meta.moduleNumber}`, path: "/courses" },
          { name: meta.title, path: lessonPath },
        ]}
      />
      <LessonLearningResourceSchema
        title={meta.title}
        description={description}
        lessonPath={lessonPath}
        moduleTitle={meta.moduleTitle}
      />
      {children}
    </>
  );
}
