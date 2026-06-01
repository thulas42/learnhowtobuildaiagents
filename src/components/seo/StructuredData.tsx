import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.svg`,
        description:
          "Online academy teaching AI agent development with Python, LangChain, LlamaIndex, and Claude. Available in 25+ languages.",
        sameAs: [
          "https://github.com/learnhowtobuildaiagents",
        ],
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "es", "fr", "de", "ja", "ko", "zh-CN", "pt-BR", "ar", "hi"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/courses?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function HomeCourseSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "AI Agent Development: From Zero to Production",
        description:
          "Learn to build production-ready AI agents with Python, LangChain, LlamaIndex, CrewAI, and Claude. 30+ lessons, quizzes, projects, and a verifiable certificate.",
        url: SITE_URL,
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        educationalLevel: "Beginner to Advanced",
        teaches: [
          "AI Agent Architecture",
          "LangChain",
          "LlamaIndex",
          "Claude Tool Use",
          "Multi-Agent Systems",
          "RAG",
          "Agent Deployment",
        ],
        numberOfCredits: 30,
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          courseWorkload: "PT72H",
          inLanguage: "en",
        },
        offers: [
          {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            category: "Free",
            url: `${SITE_URL}/pricing`,
            availability: "https://schema.org/InStock",
          },
          {
            "@type": "Offer",
            price: "49",
            priceCurrency: "USD",
            category: "Standard",
            url: `${SITE_URL}/pricing`,
            availability: "https://schema.org/InStock",
          },
        ],
        isAccessibleForFree: true,
      }}
    />
  );
}

export function HomeFaqSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What will I learn in this AI agent course?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You'll learn to build production-ready AI agents using Python, LangChain, LlamaIndex, and CrewAI — from architecture and LLM integration to multi-agent systems and deployment.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need prior AI experience?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Basic programming knowledge is enough. The course starts from fundamentals and progresses to advanced agent patterns.",
            },
          },
          {
            "@type": "Question",
            name: "Is there a free module?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Module 1 is free with no credit card required. You can start immediately at learnhowtobuildaiagents.com/courses.",
            },
          },
          {
            "@type": "Question",
            name: "Do I get a certificate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Completing the course and assessments earns a verifiable e-certificate with a unique verification URL.",
            },
          },
        ],
      }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function LessonLearningResourceSchema({
  title,
  description,
  lessonPath,
  moduleTitle,
}: {
  title: string;
  description: string;
  lessonPath: string;
  moduleTitle: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: title,
        description,
        url: absoluteUrl(lessonPath),
        learningResourceType: "Lesson",
        isPartOf: {
          "@type": "Course",
          name: moduleTitle,
          provider: { "@type": "Organization", name: SITE_NAME },
        },
        educationalLevel: "Beginner to Advanced",
        inLanguage: "en",
        isAccessibleForFree: lessonPath.includes("module-1"),
      }}
    />
  );
}

export function BlogArticleSchema({
  title,
  description,
  path,
  datePublished,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: absoluteUrl(path),
        datePublished,
        dateModified: datePublished,
        author: {
          "@type": "Organization",
          name: SITE_NAME,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
        },
        mainEntityOfPage: absoluteUrl(path),
      }}
    />
  );
}

export function CourseModuleSchema({
  moduleNumber,
  title,
  description,
  lessons,
}: {
  moduleNumber: number;
  title: string;
  description: string;
  lessons: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: `Module ${moduleNumber}: ${title}`,
        description,
        provider: { "@type": "Organization", name: SITE_NAME },
        hasPart: lessons.map((lesson) => ({
          "@type": "LearningResource",
          name: lesson.name,
          url: absoluteUrl(lesson.path),
        })),
      }}
    />
  );
}
