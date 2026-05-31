"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Lock, CheckCircle, PlayCircle, BookOpen } from "lucide-react";
import { Header } from "@/components/layout/Header";

interface ModuleData {
  number: number;
  titleKey: string;
  color: string;
  lessons: { number: string; title: string; status: "completed" | "current" | "locked" }[];
  progress: number;
}

const modules: ModuleData[] = [
  {
    number: 1,
    titleKey: "module1",
    color: "from-blue-500 to-cyan-500",
    progress: 0,
    lessons: [
      { number: "1.1", title: "What is an AI Agent?", status: "current" },
      { number: "1.2", title: "Types of AI Agents", status: "current" },
      { number: "1.3", title: "Key Components of an AI Agent", status: "current" },
      { number: "1.4", title: "Applications of AI Agents", status: "current" },
    ],
  },
  {
    number: 2,
    titleKey: "module2",
    color: "from-purple-500 to-pink-500",
    progress: 40,
    lessons: [
      { number: "2.1", title: "Core AI Concepts", status: "completed" },
      { number: "2.2", title: "Introduction to Machine Learning", status: "completed" },
      { number: "2.3", title: "Key Algorithms for AI Agents", status: "current" },
      { number: "2.4", title: "Large Language Models (LLMs)", status: "locked" },
      { number: "2.5", title: "Tools, APIs, and the Agent Ecosystem", status: "locked" },
    ],
  },
  {
    number: 3,
    titleKey: "module3",
    color: "from-amber-500 to-orange-500",
    progress: 0,
    lessons: [
      { number: "3.1", title: "Agent Architecture Patterns", status: "locked" },
      { number: "3.2", title: "Defining Agent Goals and Objectives", status: "locked" },
      { number: "3.3", title: "Environment Modeling and Perception", status: "locked" },
      { number: "3.4", title: "Decision-Making and Reasoning", status: "locked" },
      { number: "3.5", title: "System Design for AI Agents", status: "locked" },
    ],
  },
  {
    number: 4,
    titleKey: "module4",
    color: "from-green-500 to-emerald-500",
    progress: 0,
    lessons: [
      { number: "4.1", title: "Development Environment Setup", status: "locked" },
      { number: "4.2", title: "Building Your First Agent", status: "locked" },
      { number: "4.3", title: "Building an LLM-Powered Agent", status: "locked" },
      { number: "4.4", title: "Adding Tools and Function Calling", status: "locked" },
      { number: "4.5", title: "Building with LangChain", status: "locked" },
      { number: "4.6", title: "Building with LlamaIndex", status: "locked" },
      { number: "4.7", title: "Building Agents with Claude (Anthropic)", status: "locked" },
      { number: "4.8", title: "Claude Tool Use and MCP (Model Context Protocol)", status: "locked" },
      { number: "4.9", title: "Agent Memory and State Management", status: "locked" },
      { number: "4.10", title: "Testing and Debugging Agents", status: "locked" },
    ],
  },
  {
    number: 5,
    titleKey: "module5",
    color: "from-red-500 to-rose-500",
    progress: 0,
    lessons: [
      { number: "5.1", title: "Multi-Agent Systems", status: "locked" },
      { number: "5.2", title: "Agent Communication and Collaboration", status: "locked" },
      { number: "5.3", title: "Learning and Adaptation", status: "locked" },
      { number: "5.4", title: "Safety, Ethics, and Responsible AI", status: "locked" },
      { number: "5.5", title: "Deployment and Scaling", status: "locked" },
      { number: "5.6", title: "Production Best Practices", status: "locked" },
    ],
  },
  {
    number: 6,
    titleKey: "module6",
    color: "from-indigo-500 to-violet-500",
    progress: 0,
    lessons: [
      { number: "6.1", title: "Project: Customer Support Agent", status: "locked" },
      { number: "6.2", title: "Project: Research Assistant Agent", status: "locked" },
      { number: "6.3", title: "Project: Multi-Agent Workflow", status: "locked" },
      { number: "6.4", title: "Capstone Project", status: "locked" },
    ],
  },
];

export default function CoursesPage() {
  const t = useTranslations("course");
  const mt = useTranslations("landing.modules");

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Course Modules
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 ml-[52px]">
            6 modules • 34 lessons • From fundamentals to production
          </p>
        </div>

        {/* Free Module 1 banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
              <PlayCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Module 1 is completely free
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No signup or credit card needed. Start learning right now.
              </p>
            </div>
          </div>
          <Link
            href="/courses/module-1/lesson-1.1"
            className="btn-primary whitespace-nowrap gap-2"
          >
            Start Lesson 1
            <PlayCircle className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-6">
          {modules.map((mod) => (
            <div key={mod.number} className="card group">
              {/* Module Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${mod.color} text-white font-bold text-sm shadow-md`}>
                    {mod.number}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {mt(`${mod.titleKey}.title`)}
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {mod.lessons.length} lessons
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${
                  mod.progress === 100
                    ? "text-green-600"
                    : mod.progress > 0
                    ? "text-primary-600"
                    : "text-gray-300 dark:text-gray-600"
                }`}>
                  {mod.progress}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="progress-bar mb-5">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${mod.progress}%` }}
                />
              </div>

              {/* Lessons */}
              <div className="space-y-1">
                {mod.lessons.map((lesson) => (
                  <Link
                    key={lesson.number}
                    href={
                      lesson.status !== "locked"
                        ? `/courses/module-${mod.number}/lesson-${lesson.number}`
                        : "#"
                    }
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      lesson.status === "locked"
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    } ${
                      lesson.status === "current"
                        ? "bg-primary-50/70 dark:bg-primary-900/20 border border-primary-200/50 dark:border-primary-800/50"
                        : ""
                    }`}
                  >
                    {lesson.status === "completed" && (
                      <div className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    )}
                    {lesson.status === "current" && (
                      <div className="w-7 h-7 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                        <PlayCircle className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                      </div>
                    )}
                    {lesson.status === "locked" && (
                      <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                        <Lock className="h-3.5 w-3.5 text-gray-400" />
                      </div>
                    )}
                    <span className="text-xs text-gray-400 font-mono w-8">
                      {lesson.number}
                    </span>
                    <span className={`text-sm ${
                      lesson.status === "current"
                        ? "font-medium text-primary-700 dark:text-primary-300"
                        : lesson.status === "completed"
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-500"
                    }`}>
                      {lesson.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
