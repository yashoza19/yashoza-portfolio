'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const articleScrolled = scrollTop - articleTop;
      const totalScrollable = articleHeight - windowHeight;

      if (totalScrollable > 0) {
        const scrollPercentage = Math.min(
          Math.max((articleScrolled / totalScrollable) * 100, 0),
          100
        );
        setProgress(scrollPercentage);
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-[#f0ece2]/10 z-50">
      <div
        className="h-full bg-accent transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
