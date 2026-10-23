"use client";

import { useRef, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

type ParallaxComponentProps = {
  children: ReactNode;
  className?: string;
};

export function ParallaxComponent({
  children,
  className = "",
}: ParallaxComponentProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: 0,
            invalidateOnRefresh: true,
          },
        });

        const layers = [
          { name: "1", yPercent: 70 },
          { name: "2", yPercent: 55 },
          { name: "3", yPercent: 40 },
          { name: "4", yPercent: 10 },
        ];

        layers.forEach(({ name, yPercent }, index) => {
          const elements = root.querySelectorAll(`[data-parallax-layer="${name}"]`);
          timeline.to(
            elements,
            { yPercent, ease: "none" },
            index === 0 ? undefined : "<",
          );
        });
      }, root);

      const lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        context.revert();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={rootRef} data-parallax-layers className={className}>
      {children}
    </div>
  );
}
