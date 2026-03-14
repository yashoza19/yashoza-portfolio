"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Cinematic page transition with curtain effect
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Curtain overlay */}
        <motion.div
          className="fixed inset-0 z-[var(--z-overlay)] bg-[var(--color-background)] pointer-events-none"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.19, 1.0, 0.22, 1.0], // expo.out
          }}
          style={{ originY: 1 }}
        />

        {/* Content fade and slide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: [0.215, 0.61, 0.355, 1], // power3.out
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
