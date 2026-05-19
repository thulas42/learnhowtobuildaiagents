import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { rtlLocales, type Locale } from "@/i18n/config";
import { AuthProvider } from "@/components/providers/AuthProvider";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: {
    default: "AI Agent Academy — Learn to Build AI Agents from Scratch",
    template: "%s | AI Agent Academy",
  },
  description:
    "Master AI agent development with our comprehensive course. Build production-ready AI agents using Python, LangChain, LlamaIndex, and CrewAI. 30+ lessons, hands-on projects, and verified certificate. Available in 25+ languages.",
  keywords: [
    "AI agent course",
    "build AI agents",
    "LangChain tutorial",
    "LlamaIndex course",
    "AI agent development",
    "learn AI agents",
    "AI coding course",
    "multi-agent systems",
    "LLM agents",
    "AI agent certification",
    "Python AI course",
    "CrewAI tutorial",
    "AutoGen course",
    "prompt engineering",
    "RAG tutorial",
    "AI agent architecture",
    "reinforcement learning agents",
    "AI agent deployment",
    "production AI agents",
    "AI agent online course",
  ],
  authors: [{ name: "AI Agent Academy" }],
  creator: "AI Agent Academy",
  publisher: "AI Agent Academy",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AI Agent Academy",
    title: "AI Agent Academy — Learn to Build AI Agents from Scratch",
    description:
      "Master AI agent development. Build production-ready agents with Python, LangChain, and LlamaIndex. 30+ lessons, projects, and verified certificate.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Agent Academy — Learn to Build AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Academy — Learn to Build AI Agents",
    description:
      "Master AI agent development. 30+ lessons, hands-on projects, verified certificate. Available in 25+ languages.",
    images: ["/og-image.png"],
    creator: "@aiagentacademy",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "es": "/es",
      "fr": "/fr",
      "de": "/de",
      "ja": "/ja",
      "ko": "/ko",
      "zh-CN": "/zh-CN",
      "pt-BR": "/pt-BR",
      "ru": "/ru",
      "ar": "/ar",
      "hi": "/hi",
    },
  },
  verification: {
    google: "google-site-verification-code-here",
  },
  category: "Education",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AI Agent Development: From Zero to Production",
    description:
      "Comprehensive course teaching AI agent development using Python, LangChain, LlamaIndex, and CrewAI. From fundamentals to production deployment.",
    provider: {
      "@type": "Organization",
      name: "AI Agent Academy",
      sameAs: "https://aiagentacademy.com",
    },
    educationalLevel: "Beginner to Advanced",
    programmingLanguage: "Python",
    coursePrerequisites: "Basic programming knowledge",
    numberOfLessons: 30,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT72H",
      inLanguage: ["en", "es", "fr", "de", "ja", "ko", "zh", "pt", "ru", "ar", "hi"],
    },
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        category: "Free",
        description: "Module 1 free access",
      },
      {
        "@type": "Offer",
        price: "49",
        priceCurrency: "USD",
        category: "Standard",
        description: "Full course access with certificate",
      },
      {
        "@type": "Offer",
        price: "149",
        priceCurrency: "USD",
        category: "Premium",
        description: "Full course with mentoring and GPU access",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2450",
      bestRating: "5",
    },
    teaches: [
      "AI Agent Architecture",
      "LangChain Development",
      "LlamaIndex RAG",
      "Multi-Agent Systems",
      "Prompt Engineering",
      "Agent Deployment",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What will I learn in this AI agent course?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You'll learn to build production-ready AI agents from scratch using Python, LangChain, LlamaIndex, and CrewAI. The course covers agent architecture, LLM integration, tool use, multi-agent systems, and deployment.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need prior AI experience?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. The course starts from fundamentals and progressively builds to advanced topics. Basic programming knowledge (variables, loops, functions) is the only prerequisite. Python is recommended.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a certificate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Upon completing all modules, passing the final exam, and submitting your capstone project, you receive a verifiable e-certificate with a unique QR code that can be shared on LinkedIn.",
        },
      },
      {
        "@type": "Question",
        name: "How many languages is the course available in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The course is available in 25+ languages including English, Spanish, French, German, Japanese, Korean, Chinese, Portuguese, Russian, Arabic, Hindi, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a free tier?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Module 1 is completely free with no credit card required. You can start learning immediately and upgrade when ready.",
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
