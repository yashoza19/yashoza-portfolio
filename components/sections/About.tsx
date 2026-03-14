"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { SITE_CONFIG, STATS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const visualRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animate text paragraphs
    textRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      }
    });

    // Animate visual
    if (visualRef.current) {
      gsap.fromTo(
        visualRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Animate stats container
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container min-h-screen flex items-center"
    >
      <div className="w-full px-6 md:px-10">
        <div className="max-w-10xl mx-auto">
          {/* Section Heading */}
          <h2
            ref={headingRef}
            className="text-display text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-center"
          >
            About
          </h2>

          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            <p
              ref={(el) => {
                textRefs.current[0] = el;
              }}
              className="text-lg md:text-xl text-[var(--color-text)] leading-relaxed"
            >
              I'm a passionate developer who believes that great code is not
              just functional—it's elegant, maintainable, and user-centered.
              With a focus on modern web technologies, I craft digital
              experiences that are both beautiful and performant.
            </p>

            <p
              ref={(el) => {
                textRefs.current[1] = el;
              }}
              className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed"
            >
              My journey in tech has been driven by curiosity and a commitment
              to continuous learning. I thrive on solving complex problems and
              transforming ideas into reality through clean, efficient code.
            </p>

            <p
              ref={(el) => {
                textRefs.current[2] = el;
              }}
              className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed"
            >
              When I'm not coding, you'll find me exploring new frameworks,
              contributing to open source, or sharing knowledge with the
              developer community.
            </p>
          </div>

          {/* Right: Visual Element */}
          <div
            ref={visualRef}
            className="relative w-full aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent rounded-lg">
              <div className="absolute inset-4 border-2 border-[var(--color-accent)]/30 rounded-lg" />
              <div className="absolute inset-8 border border-[var(--color-accent)]/20 rounded-lg" />

              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[var(--color-accent)] rounded-full animate-pulse" />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse delay-150" />
              <div className="absolute top-1/2 right-1/3 w-4 h-4 border-2 border-[var(--color-accent)] rounded-full" />

              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-display text-8xl md:text-9xl font-bold text-[var(--color-accent)]/10">
                    {SITE_CONFIG.name.split(" ")[0][0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-32"
        >
          <StatCard
            value={STATS.yearsExperience}
            label="Years Experience"
            suffix="+"
          />
          <StatCard
            value={STATS.projectsCompleted}
            label="Projects Completed"
            suffix="+"
          />
          <StatCard
            value={STATS.technologiesMastered}
            label="Technologies"
            suffix="+"
          />
          <StatCard
            value={STATS.coffeeConsumed}
            label="Coffee Consumed"
            suffix=""
          />
        </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  value,
  label,
  suffix,
}: {
  value: number | string;
  label: string;
  suffix: string;
}) {
  return (
    <div className="text-center">
      <div className="text-display text-5xl md:text-6xl font-bold text-[var(--color-accent)] mb-2">
        <AnimatedCounter end={value} suffix={suffix} />
      </div>
      <p className="text-sm md:text-base text-[var(--color-muted)] uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
