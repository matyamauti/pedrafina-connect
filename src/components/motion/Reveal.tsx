"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Revelação por máscara: o conteúdo sobe de dentro de um recorte, como letra
// gravada aparecendo. Sem prefers-reduced-motion nada é animado e o conteúdo
// já nasce na posição final — nenhum estado inicial é aplicado fora da
// matchMedia, então também funciona se o JS falhar.
export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".reveal-inner",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [delay]);

  return (
    <div ref={root} className={`overflow-hidden ${className}`}>
      <div className="reveal-inner">{children}</div>
    </div>
  );
}
