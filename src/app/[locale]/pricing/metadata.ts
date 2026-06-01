import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata({
    title: "Pricing — Free, Standard ($49) & Premium AI Agent Course",
    description:
      "Start learning AI agent development free (Module 1). Standard plan: all 6 modules, quizzes, certificate — $49 one-time. Premium adds mentoring. Lifetime access.",
    path: "/pricing",
    locale: params.locale,
    keywords: [
      "AI agent course price",
      "free AI agent course",
      "LangChain course cost",
    ],
  });
}
