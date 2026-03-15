"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
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
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-container min-h-screen overflow-hidden"
    >
      <div className="w-full px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2
            ref={headingRef}
            className="text-display text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-center"
          >
            Skills & Tech Stack
          </h2>

          {/* Skills Categories */}
          <div className="space-y-16">
            {Object.entries(SKILLS).map(([category, skills], index) => (
              <SkillCategory
                key={category}
                title={category}
                skills={skills}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
  direction: "left" | "right";
}

function SkillCategory({ title, skills, direction }: SkillCategoryProps) {
  const categoryRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !marqueeRef.current) return;

    // Animate category title
    if (categoryRef.current) {
      gsap.fromTo(
        categoryRef.current.querySelector(".category-title"),
        { x: direction === "left" ? -40 : 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: categoryRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Infinite marquee animation
    const marquee = marqueeRef.current;
    const marqueeContent = marquee.querySelector(".marquee-content");
    if (!marqueeContent) return;

    const duration = 20; // seconds for one loop
    const distance = marqueeContent.scrollWidth / 2;

    gsap.to(marqueeContent, {
      x: direction === "left" ? -distance : distance,
      duration: duration,
      ease: "none",
      repeat: -1,
    });
  }, [direction]);

  // Duplicate skills for seamless loop
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div ref={categoryRef}>
      {/* Category Title */}
      <h3 className="category-title text-display text-2xl md:text-3xl font-bold mb-8 text-[var(--color-accent)]">
        {title}
      </h3>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="relative overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="marquee-content flex gap-6">
          {duplicatedSkills.map((skill, index) => (
            <SkillBadge key={`${skill}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ skill }: { skill: string }) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;

    const handleMouseEnter = () => {
      gsap.to(badge, {
        scale: 1.1,
        y: -4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(badge, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    badge.addEventListener("mouseenter", handleMouseEnter);
    badge.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      badge.removeEventListener("mouseenter", handleMouseEnter);
      badge.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={badgeRef}
      className="flex-shrink-0 px-8 py-4 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-full hover:border-[var(--color-accent)] transition-colors duration-300 cursor-pointer"
    >
      <span className="text-lg font-medium text-[var(--color-text)] whitespace-nowrap">
        {skill}
      </span>
    </div>
  );
}
