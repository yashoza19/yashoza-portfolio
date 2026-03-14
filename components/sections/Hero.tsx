"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import TextReveal from "@/components/ui/TextReveal";
import { SITE_CONFIG } from "@/lib/constants";

// Dynamically import Three.js scene with SSR disabled
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export default function Hero() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate scroll indicator
    if (scrollIndicatorRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Fade out scroll indicator on scroll
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const opacity = Math.max(0, 1 - window.scrollY / 300);
        scrollIndicatorRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <HeroScene />

      {/* Content */}
      <div className="relative z-[var(--z-content)] max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Name */}
        <TextReveal
          text={SITE_CONFIG.name}
          as="h1"
          className="text-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold mb-6 leading-none tracking-tight"
          delay={0.3}
          staggerDelay={0.03}
        />

        {/* Role/Tagline */}
        <div className="overflow-hidden">
          <p
            className="text-xl md:text-2xl lg:text-3xl text-[var(--color-muted)] max-w-2xl mx-auto opacity-0"
            ref={(el) => {
              if (!el) return;

              // Check for reduced motion
              const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches;

              if (prefersReducedMotion) {
                gsap.set(el, { opacity: 1, y: 0 });
                return;
              }

              gsap.fromTo(
                el,
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 1,
                  ease: "power3.out",
                  delay: 1.5,
                }
              );
            }}
          >
            {SITE_CONFIG.role}
          </p>
        </div>

        {/* CTA or Additional Text */}
        <div
          className="mt-12 opacity-0"
          ref={(el) => {
            if (!el) return;

            const prefersReducedMotion = window.matchMedia(
              "(prefers-reduced-motion: reduce)"
            ).matches;

            if (prefersReducedMotion) {
              gsap.set(el, { opacity: 1, y: 0 });
              return;
            }

            gsap.fromTo(
              el,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 2,
              }
            );
          }}
        >
          <p className="text-lg text-[var(--color-text)]">
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ opacity: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-[var(--color-muted)]">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent" />
      </div>
    </section>
  );
}
