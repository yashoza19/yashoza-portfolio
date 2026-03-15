import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, getAllPosts, getAdjacentPosts, formatDate } from '@/lib/blog';
import MDXComponents from '@/components/blog/MDXComponents';
import TableOfContents from '@/components/blog/TableOfContents';
import ReadingProgress from '@/components/blog/ReadingProgress';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(slug);

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen bg-background pt-32 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-16">
            {/* Main Content */}
            <div className="max-w-3xl">
              {/* Back Link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary/60 hover:text-accent transition-colors duration-200 mb-8 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-200">
                  ←
                </span>
                <span>Back to Blog</span>
              </Link>

              {/* Header */}
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-primary/60 mb-6">
                  <time>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>

                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {/* Article Content */}
              <article className="prose prose-invert prose-lg max-w-none">
                <MDXRemote
                  source={post.content}
                  components={MDXComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkGfm],
                      rehypePlugins: [
                        [
                          rehypePrettyCode,
                          {
                            theme: 'one-dark-pro',
                            keepBackground: false,
                          },
                        ],
                      ],
                    },
                  }}
                />
              </article>

              {/* Navigation */}
              <nav className="mt-20 pt-12 border-t border-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {previous && (
                    <Link
                      href={`/blog/${previous.slug}`}
                      className="group p-6 rounded-lg border border-primary/10 hover:border-accent/30 transition-all duration-300"
                    >
                      <div className="text-sm text-primary/60 mb-2">
                        ← Previous Post
                      </div>
                      <div className="text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-200">
                        {previous.title}
                      </div>
                    </Link>
                  )}
                  {next && (
                    <Link
                      href={`/blog/${next.slug}`}
                      className="group p-6 rounded-lg border border-primary/10 hover:border-accent/30 transition-all duration-300 md:col-start-2"
                    >
                      <div className="text-sm text-primary/60 mb-2 text-right">
                        Next Post →
                      </div>
                      <div className="text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-200 text-right">
                        {next.title}
                      </div>
                    </Link>
                  )}
                </div>
              </nav>
            </div>

            {/* Sidebar with Table of Contents */}
            <aside>
              <TableOfContents />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
