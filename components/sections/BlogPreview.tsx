'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const latestPosts = getAllPosts().slice(0, 3);

  useEffect(() => {
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

  if (latestPosts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <div className="container-custom">
        <div className="mb-16">
          <h2 ref={headingRef} className="text-6xl md:text-7xl lg:text-8xl font-bold text-primary mb-6">
            Latest Posts
          </h2>
          <p className="text-xl md:text-2xl text-primary/70 max-w-2xl">
            Thoughts on web development, design, and technology.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

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
    </section>
  );
}
