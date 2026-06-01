import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { rtlLocales, type Locale } from "@/i18n/config";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { OrganizationSchema } from "@/components/seo/StructuredData";
import { Analytics } from "@vercel/analytics/react";
import {
  DEFAULT_OG_IMAGE,
  PRIMARY_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  languageAlternates,
  localePath,
} from "@/lib/seo";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: LayoutProps): Promise<Metadata> {
  const verification: Metadata["verification"] = {};
  const verificationOther: Record<string, string> = {};

  if (process.env.GOOGLE_SITE_VERIFICATION) {
    verification.google = process.env.GOOGLE_SITE_VERIFICATION;
  } else if (process.env.NODE_ENV === "production") {
    verification.google = "1yhb22IjVnm-SAFjpYb3d7UI25VYZgx7WZkow8yfrRY";
  }
  if (process.env.YANDEX_VERIFICATION) {
    verification.yandex = process.env.YANDEX_VERIFICATION;
  }
  if (process.env.BING_SITE_VERIFICATION) {
    verificationOther["msvalidate.01"] = process.env.BING_SITE_VERIFICATION;
  }
  if (Object.keys(verificationOther).length > 0) {
    verification.other = verificationOther;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default:
        "AI Agent Academy — Learn to Build AI Agents from Scratch (2026)",
      template: `%s | ${SITE_NAME}`,
    },
    description:
      "Master AI agent development: Python, LangChain, LlamaIndex, CrewAI & Claude. 30+ lessons, hands-on projects, verifiable certificate. Start Module 1 free — 25+ languages.",
    keywords: PRIMARY_KEYWORDS,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Education",
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
    alternates: {
      canonical: localePath("/", locale),
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : undefined,
      url: localePath("/", locale),
      siteName: SITE_NAME,
      title: "AI Agent Academy — Learn to Build AI Agents from Scratch",
      description:
        "Build production-ready AI agents. Free Module 1. Full course with certificate from $49.",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "AI Agent Academy — AI Agent Development Course",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Agent Academy — Learn to Build AI Agents",
      description:
        "30+ lessons, projects & certificate. LangChain, Claude, RAG & multi-agent systems.",
      images: [DEFAULT_OG_IMAGE],
    },
    verification,
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LayoutProps) {
  const messages = await getMessages();
  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${SITE_NAME} Blog & Course Updates`}
          href={`${SITE_URL}/api/feed`}
        />
        <OrganizationSchema />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans antialiased">
        <AuthProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AuthProvider>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={
              process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ||
              "https://cloud.umami.is/script.js"
            }
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        <Analytics />
      </body>
    </html>
  );
}
