import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { blogPostsMeta } from "@/data/blog-posts-meta";

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
            Free tutorials, guides, and deep dives on building AI agents. New
            posts weekly.
          </p>
        </div>

        <div className="space-y-6">
          {blogPostsMeta.map((post) => (
            <article key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block card p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">
                    {post.readTime} read
                  </span>
                  <time
                    className="text-xs text-gray-400"
                    dateTime={post.date}
                  >
                    {post.date}
                  </time>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center card p-8 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950/20 dark:to-gray-900">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Want the full structured course?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            30+ lessons, quizzes, projects, and a verified certificate. Module 1
            is free.
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
