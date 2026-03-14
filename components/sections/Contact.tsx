"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

    // Animate form
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    // TODO: Replace with actual form service (Formspree/Web3Forms) endpoint
    // For now, just simulate success
    setTimeout(() => {
      setFormStatus("success");
      if (formRef.current) {
        formRef.current.reset();
      }
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-container min-h-screen flex items-center"
    >
      <div className="w-full px-6 md:px-10">
        <div className="max-w-10xl mx-auto">
          {/* Large CTA */}
          <h2
            ref={headingRef}
            className="text-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-center max-w-4xl mx-auto leading-tight"
          >
            Let's work{" "}
            <span className="text-[var(--color-accent)]">together</span>
          </h2>

          <p className="text-center text-lg md:text-xl text-[var(--color-muted)] mb-16 max-w-2xl mx-auto">
            Have a project in mind? Let's create something extraordinary.
          </p>

          {/* Contact Form and Social Links */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-[var(--color-muted)]"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-300 text-[var(--color-text)]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-[var(--color-muted)]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-transparent border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-300 text-[var(--color-text)]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-[var(--color-muted)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-transparent border-2 border-[var(--color-border)] rounded-lg focus:border-[var(--color-accent)] focus:outline-none transition-colors duration-300 text-[var(--color-text)] resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <MagneticButton
                type="submit"
                className="w-full px-8 py-4 bg-[var(--color-accent)] text-[var(--color-background)] font-bold text-lg rounded-lg hover:bg-[var(--color-accent)]/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formStatus === "submitting"}
              >
                {formStatus === "submitting"
                  ? "Sending..."
                  : formStatus === "success"
                  ? "Message Sent!"
                  : "Send Message"}
              </MagneticButton>

              {formStatus === "error" && (
                <p className="text-red-500 text-sm text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            {/* Social Links */}
            <div className="flex flex-col justify-center">
              <h3 className="text-display text-2xl md:text-3xl font-bold mb-8">
                Connect with me
              </h3>

              <div className="space-y-6">
                {FOOTER_LINKS.social.map((link) => (
                  <SocialLink key={link.label} link={link} />
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
                <p className="text-[var(--color-muted)] mb-2">Email</p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-lg text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ link }: { link: { label: string; href: string } }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const linkEl = linkRef.current;
    if (!linkEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = linkEl.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(linkEl, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(linkEl, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    linkEl.addEventListener("mousemove", handleMouseMove);
    linkEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      linkEl.removeEventListener("mousemove", handleMouseMove);
      linkEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 text-xl text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300"
    >
      <span>{link.label}</span>
      <span className="transform group-hover:translate-x-2 transition-transform duration-300">
        →
      </span>
    </a>
  );
}
