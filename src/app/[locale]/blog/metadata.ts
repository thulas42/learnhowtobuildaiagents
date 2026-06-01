import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata({
    title: "AI Agent Development Blog — Tutorials & Guides (2026)",
    description:
      "Free tutorials on building AI agents with Python, LangChain, Claude, LlamaIndex, CrewAI, MCP & RAG. Step-by-step guides for beginners and engineers.",
    path: "/blog",
    locale: params.locale,
    keywords: [
      "AI agent blog",
      "LangChain tutorial",
      "Claude agent tutorial",
      "RAG guide",
    ],
  });
}
