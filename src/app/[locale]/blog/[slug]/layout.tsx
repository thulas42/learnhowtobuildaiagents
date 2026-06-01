import { BlogArticleSchema } from "@/components/seo/StructuredData";
import { blogPostsMeta } from "@/data/blog-posts-meta";

export default function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const post = blogPostsMeta.find((p) => p.slug === params.slug);
  if (!post) return children;

  return (
    <>
      <BlogArticleSchema
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        datePublished={post.date}
      />
      {children}
    </>
  );
}
