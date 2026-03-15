"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { STATS } from "@/lib/constants";

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
        <div className="max-w-7xl mx-auto">
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
              I'm a Senior DevOps Engineer with 5+ years of experience building
              and operating scalable Kubernetes-based infrastructure, CI/CD
              systems, and cloud-native platforms on AWS. I specialize in
              container orchestration, multi-cluster Kubernetes environments,
              and infrastructure automation using Terraform and CloudFormation.
            </p>

            <p
              ref={(el) => {
                textRefs.current[1] = el;
              }}
              className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed"
            >
              I've mentored 15+ engineers, driven technical roadmaps, and
              designed deployment guardrails that enable hundreds of developers
              to ship safely at high velocity. Currently at Red Hat, working on
              AI application deployment and developer platform engineering.
            </p>

            <p
              ref={(el) => {
                textRefs.current[2] = el;
              }}
              className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed"
            >
              When I'm not architecting infrastructure, you'll find me
              contributing to open source, exploring new cloud-native
              technologies, or sharing knowledge with the DevOps community.
            </p>
          </div>

          {/* Right: Visual Element - Subtle geometric pattern */}
          <div
            ref={visualRef}
            className="relative w-full aspect-square max-w-md mx-auto lg:max-w-none"
          >
            {/* Minimal geometric pattern */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="relative w-48 h-48 md:w-64 md:h-64">
                {/* Subtle rotating square */}
                <div
                  className="absolute inset-0 border border-[var(--color-accent)]/20 rounded-lg"
                  style={{
                    animation: "rotate 20s linear infinite",
                  }}
                />
                {/* Subtle inner square */}
                <div
                  className="absolute inset-8 border border-[var(--color-accent)]/10 rounded-lg"
                  style={{
                    animation: "rotate 30s linear infinite reverse",
                  }}
                />
                {/* Center accent dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full" />
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
            value={STATS.partnerCertifications}
            label="Partner Certifications"
            suffix="+"
          />
          <StatCard
            value={STATS.engineersMentored}
            label="Engineers Mentored"
            suffix="+"
          />
          <StatCard
            value={STATS.referenceArchitectures}
            label="Reference Architectures"
            suffix="+"
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
