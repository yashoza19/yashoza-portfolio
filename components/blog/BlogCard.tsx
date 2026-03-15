import Link from 'next/link';
import { BlogPostMeta, formatDate } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="p-6 rounded-lg border border-[#f0ece2]/10 bg-[#0a0a0a] hover:border-accent/30 transition-all duration-300">
        <div className="flex items-start justify-between gap-4 mb-3">
          <time className="text-sm text-[#f0ece2]/60">
            {formatDate(post.date)}
          </time>
          <span className="text-sm text-[#f0ece2]/60">{post.readingTime}</span>
        </div>

        <h3 className="text-xl font-semibold text-[#f0ece2] mb-3 group-hover:text-accent transition-colors duration-200">
          {post.title}
        </h3>

        <p className="text-[#f0ece2]/70 mb-4 line-clamp-2">
          {post.description}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-[#f0ece2]/10 text-[#f0ece2]/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 text-accent text-sm font-medium">
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            Read more
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-200">
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
