"use client";

import { useEffect, useRef } from "react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import { gsap } from "gsap";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-display text-2xl font-bold mb-4">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-[var(--color-muted)] mb-4">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              {SITE_CONFIG.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--color-muted)]">
              Connect
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[var(--color-muted)]">
              Get in Touch
            </h4>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-muted)]">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>

          {/* Back to Top Button */}
          <BackToTopButton onClick={handleScrollToTop} />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleMouseEnter = () => {
      gsap.to(link, {
        x: 4,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(link, {
        x: 0,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300 inline-block"
    >
      {label}
    </a>
  );
}

function BackToTopButton({ onClick }: { onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="group relative px-6 py-3 text-sm font-medium tracking-wide uppercase overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors duration-300"
      aria-label="Back to top"
    >
      <span className="relative z-10 text-[var(--color-text)] group-hover:text-[var(--color-background)] transition-colors duration-500">
        Back to Top
      </span>
      <span className="absolute inset-0 bg-[var(--color-accent)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[var(--ease-expo)]" />
    </button>
  );
}
