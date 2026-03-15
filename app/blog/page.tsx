import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogListingClient from './BlogListingClient';

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return <BlogListingClient allPosts={allPosts} allTags={allTags} />;
}
