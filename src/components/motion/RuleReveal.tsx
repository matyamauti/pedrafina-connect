"use client";

import { useRef } from "react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

type RuleRevealProps = {
  tone?: "gold" | "faint";
  className?: string;
};

// O fio de 1px que marca a troca de lâmina. É o único elemento que se repete
// de ponta a ponta do site, e a única animação de entrada por seção.
export function RuleReveal({ tone = "gold", className = "" }: RuleRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const color = tone === "gold" ? "bg-pf-gold" : "bg-pf-gold/25";

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          root.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: root.current, start: "top 90%", once: true },
          },
        );
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className={`h-px w-full origin-left ${color} ${className}`}
    />
  );
}
