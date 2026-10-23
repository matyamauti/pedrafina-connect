"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ReactNode } from "react";

type StoryTextRevealProps = {
  children: ReactNode;
  className?: string;
  visible: boolean;
  delay?: number;
};

const revealTransition: Transition = {
  duration: 1.25,
  ease: [0.23, 1, 0.32, 1],
};

export function StoryTextReveal({ children, className = "", visible, delay = 0 }: StoryTextRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.p
      className={className}
      initial={false}
      animate={{ opacity: visible || reducedMotion ? 1 : 0, y: visible || reducedMotion ? 0 : 12 }}
      transition={reducedMotion ? { duration: 0 } : { ...revealTransition, delay }}
    >
      {children}
    </motion.p>
  );
}
