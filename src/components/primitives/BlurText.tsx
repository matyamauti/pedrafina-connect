"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useRef } from "react";

type BlurTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

const hidden = {
  filter: "blur(9px)",
  opacity: 0,
  transform: "translate3d(0, -22px, 0)",
};

const visible = {
  filter: "blur(0px)",
  opacity: 1,
  transform: "translate3d(0, 0, 0)",
};

export function BlurText({ text, className = "", delay = 90 }: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40% 0px" });
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={reducedMotion ? false : hidden}
            animate={reducedMotion || inView ? visible : hidden}
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    duration: 0.6,
                    delay: (index * delay) / 1000,
                    ease: [0.23, 1, 0.32, 1],
                  }
            }
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
