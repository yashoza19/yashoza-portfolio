"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

interface BlogPostAnalyticsProps {
  slug: string;
  title: string;
}

export default function BlogPostAnalytics({ slug, title }: BlogPostAnalyticsProps) {
  useEffect(() => {
    // Track blog post view when component mounts
    track("blog_post_viewed", {
      slug,
      title,
    });
  }, [slug, title]);

  return null; // This component doesn't render anything
}
