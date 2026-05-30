import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — AI Agent Development Tutorials",
  description:
    "Free tutorials and guides on building AI agents with Python, LangChain, Claude, LlamaIndex, and CrewAI. Learn from practical examples.",
};

const posts = [
  {
    slug: "what-are-ai-agents",
    title: "What Are AI Agents? A Complete Beginner's Guide (2026)",
    excerpt:
      "AI agents are autonomous systems that perceive, reason, and act. Learn the fundamentals of agent architecture, types, and real-world applications.",
    category: "Fundamentals",
    readTime: "8 min",
    date: "2026-05-28",
  },
  {
    slug: "build-first-agent-python",
    title: "Build Your First AI Agent in Python (Step-by-Step)",
    excerpt:
      "A hands-on tutorial to build a working AI agent from scratch using Python and the Anthropic Claude API. No prior AI experience needed.",
    category: "Tutorial",
    readTime: "12 min",
    date: "2026-05-29",
  },
  {
    slug: "langchain-vs-llamaindex-vs-crewai",
    title: "LangChain vs LlamaIndex vs CrewAI — Which Framework to Choose?",
    excerpt:
      "A practical comparison of the three most popular AI agent frameworks. When to use each, strengths, weaknesses, and code examples.",
    category: "Comparison",
    readTime: "10 min",
    date: "2026-05-30",
  },
  {
    slug: "claude-tool-use-tutorial",
    title: "Claude Tool Use Tutorial — Build Agents That Take Actions",
    excerpt:
      "Learn how to use Claude's native tool use (function calling) to build agents that can search the web, query databases, and send emails.",
    category: "Tutorial",
    readTime: "15 min",
    date: "2026-05-30",
  },
  {
    slug: "mcp-model-context-protocol",
    title: "MCP (Model Context Protocol) Explained — The Universal AI Tool Standard",
    excerpt:
      "Anthropic's MCP is changing how AI connects to tools. Learn what it is, how to build MCP servers, and why it matters for agent development.",
    category: "Deep Dive",
    readTime: "11 min",
    date: "2026-05-30",
  },
  {
    slug: "rag-retrieval-augmented-generation",
    title: "RAG for AI Agents — Give Your Agent a Knowledge Base",
    excerpt:
      "Retrieval Augmented Generation lets agents access external knowledge. Learn to build a RAG pipeline with vector databases and embeddings.",
    category: "Tutorial",
    readTime: "14 min",
    date: "2026-05-30",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            AI Agent Development Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Free tutorials, guides, and deep dives on building AI agents. New posts weekly.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block card p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.readTime} read</span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center card p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/20 dark:to-gray-900">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Want the full structured course?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            30+ lessons, quizzes, projects, and a verified certificate. Module 1 is free.
          </p>
          <Link href="/courses" className="btn-primary">
            Start Learning Free →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
