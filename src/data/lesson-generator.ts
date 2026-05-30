import type { LessonData } from "./lessons";

/**
 * All lessons in the course with their metadata.
 * Lessons that don't have full handwritten content yet will get
 * auto-generated content from this structure.
 */
export const allLessonsMeta: { slug: string; number: string; title: string; moduleNumber: number; moduleTitle: string }[] = [
  // Module 1
  { slug: "module-1/lesson-1.1", number: "1.1", title: "What is an AI Agent?", moduleNumber: 1, moduleTitle: "Introduction to AI Agents" },
  { slug: "module-1/lesson-1.2", number: "1.2", title: "Types of AI Agents", moduleNumber: 1, moduleTitle: "Introduction to AI Agents" },
  { slug: "module-1/lesson-1.3", number: "1.3", title: "Key Components of an AI Agent", moduleNumber: 1, moduleTitle: "Introduction to AI Agents" },
  { slug: "module-1/lesson-1.4", number: "1.4", title: "Applications of AI Agents", moduleNumber: 1, moduleTitle: "Introduction to AI Agents" },
  // Module 2
  { slug: "module-2/lesson-2.1", number: "2.1", title: "Core AI Concepts", moduleNumber: 2, moduleTitle: "Fundamentals of AI and Machine Learning" },
  { slug: "module-2/lesson-2.2", number: "2.2", title: "Introduction to Machine Learning", moduleNumber: 2, moduleTitle: "Fundamentals of AI and Machine Learning" },
  { slug: "module-2/lesson-2.3", number: "2.3", title: "Key Algorithms for AI Agents", moduleNumber: 2, moduleTitle: "Fundamentals of AI and Machine Learning" },
  { slug: "module-2/lesson-2.4", number: "2.4", title: "Large Language Models (LLMs)", moduleNumber: 2, moduleTitle: "Fundamentals of AI and Machine Learning" },
  { slug: "module-2/lesson-2.5", number: "2.5", title: "Tools, APIs, and the Agent Ecosystem", moduleNumber: 2, moduleTitle: "Fundamentals of AI and Machine Learning" },
  // Module 3
  { slug: "module-3/lesson-3.1", number: "3.1", title: "Agent Architecture Patterns", moduleNumber: 3, moduleTitle: "Designing and Architecting AI Agents" },
  { slug: "module-3/lesson-3.2", number: "3.2", title: "Defining Agent Goals and Objectives", moduleNumber: 3, moduleTitle: "Designing and Architecting AI Agents" },
  { slug: "module-3/lesson-3.3", number: "3.3", title: "Environment Modeling and Perception", moduleNumber: 3, moduleTitle: "Designing and Architecting AI Agents" },
  { slug: "module-3/lesson-3.4", number: "3.4", title: "Decision-Making and Reasoning", moduleNumber: 3, moduleTitle: "Designing and Architecting AI Agents" },
  { slug: "module-3/lesson-3.5", number: "3.5", title: "System Design for AI Agents", moduleNumber: 3, moduleTitle: "Designing and Architecting AI Agents" },
  // Module 4
  { slug: "module-4/lesson-4.1", number: "4.1", title: "Development Environment Setup", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.2", number: "4.2", title: "Building Your First Agent", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.3", number: "4.3", title: "Building an LLM-Powered Agent", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.4", number: "4.4", title: "Adding Tools and Function Calling", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.5", number: "4.5", title: "Building with LangChain", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.6", number: "4.6", title: "Building with LlamaIndex", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.7", number: "4.7", title: "Building Agents with Claude (Anthropic)", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.8", number: "4.8", title: "Claude Tool Use and MCP (Model Context Protocol)", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.9", number: "4.9", title: "Agent Memory and State Management", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  { slug: "module-4/lesson-4.10", number: "4.10", title: "Testing and Debugging Agents", moduleNumber: 4, moduleTitle: "Implementing AI Agents" },
  // Module 5
  { slug: "module-5/lesson-5.1", number: "5.1", title: "Multi-Agent Systems", moduleNumber: 5, moduleTitle: "Advanced AI Agent Concepts" },
  { slug: "module-5/lesson-5.2", number: "5.2", title: "Agent Communication and Collaboration", moduleNumber: 5, moduleTitle: "Advanced AI Agent Concepts" },
  { slug: "module-5/lesson-5.3", number: "5.3", title: "Learning and Adaptation", moduleNumber: 5, moduleTitle: "Advanced AI Agent Concepts" },
  { slug: "module-5/lesson-5.4", number: "5.4", title: "Safety, Ethics, and Responsible AI", moduleNumber: 5, moduleTitle: "Advanced AI Agent Concepts" },
  { slug: "module-5/lesson-5.5", number: "5.5", title: "Deployment and Scaling", moduleNumber: 5, moduleTitle: "Advanced AI Agent Concepts" },
  { slug: "module-5/lesson-5.6", number: "5.6", title: "Production Best Practices", moduleNumber: 5, moduleTitle: "Advanced AI Agent Concepts" },
  // Module 6
  { slug: "module-6/lesson-6.1", number: "6.1", title: "Project: Customer Support Agent", moduleNumber: 6, moduleTitle: "Project-Based Learning" },
  { slug: "module-6/lesson-6.2", number: "6.2", title: "Project: Research Assistant Agent", moduleNumber: 6, moduleTitle: "Project-Based Learning" },
  { slug: "module-6/lesson-6.3", number: "6.3", title: "Project: Multi-Agent Workflow", moduleNumber: 6, moduleTitle: "Project-Based Learning" },
  { slug: "module-6/lesson-6.4", number: "6.4", title: "Capstone Project", moduleNumber: 6, moduleTitle: "Project-Based Learning" },
];

/**
 * Get prev/next lesson navigation for any lesson by slug
 */
export function getLessonNav(slug: string): { prev?: { slug: string; title: string }; next?: { slug: string; title: string } } {
  const idx = allLessonsMeta.findIndex(l => l.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? { slug: allLessonsMeta[idx - 1].slug, title: allLessonsMeta[idx - 1].title } : undefined,
    next: idx < allLessonsMeta.length - 1 ? { slug: allLessonsMeta[idx + 1].slug, title: allLessonsMeta[idx + 1].title } : undefined,
  };
}

/**
 * Get lesson metadata by slug
 */
export function getLessonMeta(slug: string) {
  return allLessonsMeta.find(l => l.slug === slug) || null;
}
