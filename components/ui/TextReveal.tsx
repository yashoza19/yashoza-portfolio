"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = "span",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const chars = containerRef.current.querySelectorAll(".char");

    if (prefersReducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      chars,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: staggerDelay,
        ease: "power3.out",
        delay: delay,
      }
    );
  }, [delay, staggerDelay]);

  // Split text into characters, preserving spaces
  const chars = text.split("").map((char, index) => (
    <span
      key={index}
      className="char inline-block"
      style={{ opacity: 0 }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <Tag ref={containerRef as any} className={className}>
      {chars}
    </Tag>
  );
}
