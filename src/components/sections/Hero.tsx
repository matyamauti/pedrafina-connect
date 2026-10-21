"use client";

import { useRef } from "react";
import { hero } from "@/content/program";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Button } from "@/components/primitives/Button";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Placeholder } from "@/components/primitives/Placeholder";

const OPENING_KEY = "pf-opening-seen";

function openingAlreadySeen() {
  try {
    return sessionStorage.getItem(OPENING_KEY) === "true";
  } catch {
    return false;
  }
}

function markOpeningSeen() {
  try {
    sessionStorage.setItem(OPENING_KEY, "true");
  } catch {
    // Modo privado ou armazenamento bloqueado: a abertura apenas repete.
  }
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      // O único momento orquestrado do site, e só na primeira visita da
      // sessão. Voltar para a home pelo menu não repete a abertura.
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (openingAlreadySeen()) return;

        const timeline = gsap.timeline({ onComplete: markOpeningSeen });

        timeline
          .fromTo(
            ".hero-line",
            { scaleY: 0 },
            { scaleY: 1, duration: 0.9, ease: "power3.inOut" },
          )
          .fromTo(
            ".hero-media",
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.out" },
            "-=0.45",
          )
          .fromTo(
            ".hero-mask",
            { yPercent: 110 },
            { yPercent: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
            "-=0.75",
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          );
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative grid min-h-[100svh] grid-cols-1 bg-pf-black lg:grid-cols-[42fr_58fr]"
    >
      <div className="flex items-center px-4 pb-20 pt-28 sm:px-8 xl:px-14 xl:pt-32">
        <div className="max-w-xl">
          <div className="overflow-hidden">
            <Eyebrow className="hero-mask">{hero.eyebrow}</Eyebrow>
          </div>

          <div className="mt-8 overflow-hidden">
            <DisplayTitle as="h1" size="lg" className="hero-mask">
              {hero.title}
            </DisplayTitle>
          </div>

          <div className="mt-10 overflow-hidden">
            <p className="hero-mask font-sans text-base leading-relaxed text-pf-cream/70 sm:text-lg">
              {hero.lead}
            </p>
          </div>

          <div className="hero-cta mt-12">
            <Button href="/o-connect-club">Conheça o programa</Button>
          </div>
        </div>
      </div>

      <div className="relative min-h-[50svh] lg:min-h-0">
        <Placeholder
          tone="dark"
          label="Fotografia arquitetônica — herói"
          className="hero-media absolute inset-0 h-full w-full"
        />
      </div>

      <div
        aria-hidden
        className="hero-line absolute inset-y-0 left-[42%] hidden w-px origin-top bg-pf-gold/40 lg:block"
      />
    </section>
  );
}
