'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlogCard from '@/components/blog/BlogCard';
import type { BlogPostMeta } from '@/lib/blog-types';

interface BlogListingClientProps {
  allPosts: BlogPostMeta[];
  allTags: string[];
}

export default function BlogListingClient({ allPosts, allTags }: BlogListingClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return allPosts;
    return allPosts.filter((post) => post.tags.includes(selectedTag));
  }, [allPosts, selectedTag]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6">
            Blog
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl">
            Thoughts on web development, design, and technology.
          </p>
        </motion.div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === null
                    ? 'bg-accent text-background'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                All Posts ({allPosts.length})
              </button>
              {allTags.map((tag) => {
                const count = allPosts.filter((post) =>
                  post.tags.includes(tag)
                ).length;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag
                        ? 'bg-accent text-background'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    {tag} ({count})
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full text-center py-20"
              >
                <p className="text-xl text-primary/60">
                  No posts found with tag &quot;{selectedTag}&quot;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
