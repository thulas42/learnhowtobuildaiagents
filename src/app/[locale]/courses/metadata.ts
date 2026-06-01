import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata({
    title: "AI Agent Development Course — All Modules & Lessons",
    description:
      "Browse 6 modules and 30+ lessons: AI agent fundamentals, LangChain, LlamaIndex, Claude tool use, MCP, RAG, multi-agent systems & capstone projects. Start Module 1 free.",
    path: "/courses",
    locale: params.locale,
    keywords: [
      "AI agent curriculum",
      "LangChain lessons",
      "AI agent modules",
      "free AI agent course module 1",
    ],
  });
}
