"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

type ScrollFocusProps = {
  children: ReactNode;
  className?: string;
};

// O mesmo foco por rolagem da lista, aplicado a um bloco de texto: os
// filhos diretos entram em sequência, interpolados por scrub, em vez de
// aparecerem de uma vez. Recuam de novo quando o bloco deixa a tela.
const DIM = 0.4;

export function ScrollFocus({ children, className = "" }: ScrollFocusProps) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const node = root.current;
      if (!node) return;

      const kids = Array.from(node.children) as HTMLElement[];
      if (kids.length === 0) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(kids, { opacity: DIM });

        const entrada = gsap.to(kids, {
          opacity: 1,
          stagger: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: node,
            start: "top bottom-=12%",
            end: "center center+=10%",
            scrub: 0.2,
          },
        });

        return () => {
          entrada.scrollTrigger?.kill();
          entrada.kill();
        };
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
