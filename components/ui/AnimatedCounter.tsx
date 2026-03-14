"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  end: number | string;
  duration?: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated.current) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      counterRef.current.textContent = `${end}${suffix}`;
      return;
    }

    // Handle numeric and string values
    const isNumeric = typeof end === "number";
    const target = isNumeric ? end : 0;

    const counter = { value: 0 };

    const animation = gsap.to(counter, {
      value: target,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          if (isNumeric) {
            counterRef.current.textContent = `${Math.round(counter.value)}${suffix}`;
          } else {
            counterRef.current.textContent = `${end}${suffix}`;
          }
        }
      },
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          hasAnimated.current = true;
        },
      },
    });

    return () => {
      animation.kill();
    };
  }, [end, duration, suffix]);

  return (
    <span ref={counterRef} className={className}>
      0{suffix}
    </span>
  );
}
