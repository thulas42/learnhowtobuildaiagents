/**
 * Additional structured data components for SEO.
 * These are rendered as JSON-LD scripts in the page head.
 */

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "AI Agent Academy",
    url: "https://aiagentacademy.com",
    logo: "https://aiagentacademy.com/logo.png",
    description:
      "Global online academy teaching AI agent development. Available in 25+ languages.",
    sameAs: [
      "https://twitter.com/aiagentacademy",
      "https://linkedin.com/company/aiagentacademy",
      "https://github.com/aiagentacademy",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["English", "Spanish", "French", "German", "Japanese", "Chinese"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
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
  lessons: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Module ${moduleNumber}: ${title}`,
    description,
    provider: { "@type": "Organization", name: "AI Agent Academy" },
    hasPart: lessons.map((lesson) => ({
      "@type": "Clip",
      name: lesson.name,
      url: lesson.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebPageSchema({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "AI Agent Academy",
      url: "https://aiagentacademy.com",
    },
    inLanguage: "en",
    potentialAction: {
      "@type": "ReadAction",
      target: url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
