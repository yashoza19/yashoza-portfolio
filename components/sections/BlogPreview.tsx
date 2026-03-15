import { getAllPosts } from '@/lib/blog';
import BlogPreviewClient from './BlogPreviewClient';

export default function BlogPreview() {
  const latestPosts = getAllPosts().slice(0, 3);

  if (latestPosts.length === 0) return null;

  return <BlogPreviewClient posts={latestPosts} />;
}
