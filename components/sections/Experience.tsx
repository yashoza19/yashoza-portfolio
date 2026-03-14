"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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

    // Horizontal scroll animation
    if (containerRef.current && window.innerWidth >= 1024) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;

      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${scrollWidth + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-container min-h-screen relative overflow-hidden"
    >
      <div className="w-full px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2
            ref={headingRef}
            className="text-display text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-center"
          >
            Experience
          </h2>

          {/* Timeline Container - Desktop Horizontal Scroll */}
          <div className="hidden lg:block">
            <div
              ref={containerRef}
              className="flex gap-16 items-start"
              style={{ willChange: "transform" }}
            >
              {EXPERIENCES.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} index={index} />
              ))}
            </div>
          </div>

          {/* Timeline - Mobile Vertical Stack */}
          <div className="lg:hidden space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceCardMobile
                key={index}
                experience={exp}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ExperienceCardProps {
  experience: {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
  };
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <div className="flex-shrink-0 w-[500px]">
      {/* Timeline Node */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-4 h-4 bg-[var(--color-accent)] rounded-full" />
          <div className="absolute top-4 left-2 w-[2px] h-32 bg-[var(--color-border)]" />
        </div>
        <div className="text-sm text-[var(--color-muted)] font-mono">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="pl-10">
        <div className="mb-4">
          <h3 className="text-display text-2xl md:text-3xl font-bold mb-2">
            {experience.role}
          </h3>
          <p className="text-xl text-[var(--color-accent)] mb-2">
            {experience.company}
          </p>
          <p className="text-sm text-[var(--color-muted)] font-mono">
            {experience.period}
          </p>
        </div>

        <p className="text-[var(--color-text)] mb-6 leading-relaxed">
          {experience.description}
        </p>

        <ul className="space-y-3">
          {experience.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[var(--color-muted)]"
            >
              <span className="text-[var(--color-accent)] mt-1">▸</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExperienceCardMobile({ experience, index }: ExperienceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div ref={cardRef} className="flex gap-6">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-[var(--color-accent)] rounded-full flex-shrink-0" />
        <div className="w-[2px] flex-1 bg-[var(--color-border)] mt-4" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="mb-4">
          <div className="text-sm text-[var(--color-muted)] font-mono mb-2">
            {String(index + 1).padStart(2, "0")}
          </div>
          <h3 className="text-display text-2xl font-bold mb-2">
            {experience.role}
          </h3>
          <p className="text-lg text-[var(--color-accent)] mb-2">
            {experience.company}
          </p>
          <p className="text-sm text-[var(--color-muted)] font-mono">
            {experience.period}
          </p>
        </div>

        <p className="text-[var(--color-text)] mb-6 leading-relaxed">
          {experience.description}
        </p>

        <ul className="space-y-3">
          {experience.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[var(--color-muted)]"
            >
              <span className="text-[var(--color-accent)] mt-1">▸</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
