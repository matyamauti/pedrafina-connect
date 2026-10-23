"use client";

import Image from "next/image";
import { useRef } from "react";
import { pointsLogic } from "@/content/points";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Container } from "@/components/primitives/Container";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";

// Primeiro a matéria e o ambiente; só depois a regra que eles representam.
// A imagem e o texto ficam no fluxo da página quando há movimento reduzido.
export function PointsScrollMask() {
  const section = useRef<HTMLElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!section.current || !mask.current || !copy.current) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(
            mask.current,
            { clipPath: "circle(8% at 50% 50%)", scale: 1.08 },
            {
              clipPath: "circle(150% at 50% 50%)",
              scale: 1,
              duration: 0.72,
              ease: "none",
            },
          )
          .fromTo(
            copy.current,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
            0.72,
          );
      });

      return () => media.revert();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={section}
      className="relative h-[190svh] bg-pf-black lg:h-[210svh] motion-reduce:h-auto"
      aria-label="Introdução à pontuação"
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:relative motion-reduce:min-h-[80svh]">
        <div ref={mask} className="absolute inset-0 overflow-hidden">
          <Image
            src="/sala-pedra-fina.png"
            alt="Sala com pedra natural e marcenaria iluminada pelo pôr do sol"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-pf-black/90 via-pf-black/35 to-pf-black/10"
          />
        </div>

        <div ref={copy} className="absolute inset-x-0 bottom-0 z-10 pb-16 sm:pb-20 lg:pb-24">
          <Container>
            <Eyebrow>{pointsLogic.eyebrow}</Eyebrow>
            <DisplayTitle className="mt-5 max-w-[21ch]" size="lg">
              {pointsLogic.title}
            </DisplayTitle>
          </Container>
        </div>
      </div>
    </section>
  );
}
