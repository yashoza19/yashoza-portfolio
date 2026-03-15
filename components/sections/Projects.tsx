"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { track } from "@vercel/analytics";
import { PROJECTS } from "@/lib/constants";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

    // Stagger animate project cards
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-container min-h-screen"
    >
      <div className="w-full px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <h2
            ref={headingRef}
            className="text-display text-5xl md:text-6xl lg:text-7xl font-bold mb-16 md:mb-24 text-center"
          >
            Projects
          </h2>

          {/* Projects Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {PROJECTS.filter((p) => p.featured).map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    tech: string[];
    liveUrl?: string;
    repoUrl?: string;
    image: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Parallax tilt effect
      gsap.to(image, {
        x: x * 0.02,
        y: y * 0.02,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card group relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] hover:border-[var(--color-accent)] transition-colors duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[var(--color-border)] to-[var(--color-background)]">
        <div
          ref={imageRef}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {/* Modern geometric placeholder */}
          <div className="w-full h-full relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent)]/5" />

            {/* Geometric shapes */}
            <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-[var(--color-accent)]/20 rounded-lg rotate-12" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-[var(--color-accent)]/10 rounded-full" />

            {/* Project initial */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-display text-7xl font-bold text-[var(--color-accent)]/30">
                {project.title[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Color overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-display text-2xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-[var(--color-muted)] mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("project_clicked", { project: project.title, type: "live" })}
              className="text-sm text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-2"
            >
              <span>Live Demo</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("project_clicked", { project: project.title, type: "repo" })}
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 flex items-center gap-2"
            >
              <span>Code</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
