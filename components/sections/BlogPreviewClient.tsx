'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogCard from '@/components/blog/BlogCard';
import type { BlogPostMeta } from '@/lib/blog-types';

gsap.registerPlugin(ScrollTrigger);

interface BlogPreviewClientProps {
  posts: BlogPostMeta[];
}

export default function BlogPreviewClient({ posts }: BlogPreviewClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;

    if (!section || !heading || !cards) return;

    // Heading animation
    gsap.fromTo(
      heading,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
        },
      }
    );

    // Cards stagger animation
    const cardElements = cards.querySelectorAll('article');
    gsap.fromTo(
      cardElements,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
        },
      }
    );
  }, []);

  if (posts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="section-container min-h-screen"
    >
      <div className="w-full px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2
            ref={headingRef}
            className="text-display text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-center"
          >
            Latest Posts
          </h2>

          {/* Blog Cards Grid */}
          <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* View All Link */}
          <div className="flex justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-accent text-accent rounded-full text-lg font-medium hover:bg-accent hover:text-background transition-all duration-300"
            >
              <span>View all posts</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
