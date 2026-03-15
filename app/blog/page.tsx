import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogListingClient from './BlogListingClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on web development, design, and technology. Articles about React, TypeScript, Next.js, and modern web development practices.',
  openGraph: {
    title: 'Blog | Yash Oza',
    description: 'Thoughts on web development, design, and technology.',
    type: 'website',
  },
};

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return <BlogListingClient allPosts={allPosts} allTags={allTags} />;
}
