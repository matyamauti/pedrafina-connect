"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { hero } from "@/content/program";
import { Button } from "@/components/primitives/Button";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

// useSyncExternalStore em vez de estado com efeito: evita o setState no
// corpo do efeito e já devolve o valor certo na primeira renderização do
// cliente, sem um quadro de conteúdo errado.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const query = window.matchMedia(REDUCED_QUERY);
      query.addEventListener("change", notify);
      return () => query.removeEventListener("change", notify);
    },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

export function VideoHero() {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Sem isto o autoplay é bloqueado em parte dos navegadores: a
    // propriedade precisa estar valendo antes do play, e o atributo JSX
    // nem sempre chega a tempo.
    video.muted = true;
    const attempt = video.play();
    // Um play recusado não é erro de aplicação — o pôster continua à mostra.
    if (attempt) attempt.catch(() => {});

    const desktop = window.matchMedia("(min-width: 640px)");
    const updateSource = () => {
      video.load();
      video.play().catch(() => {});
    };
    desktop.addEventListener("change", updateSource);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.05 },
    );
    visibility.observe(video);

    return () => {
      visibility.disconnect();
      desktop.removeEventListener("change", updateSource);
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <section id="inicio" className="relative isolate h-[100svh] overflow-hidden bg-pf-black text-pf-cream">
      <ParallaxComponent className="relative h-full overflow-hidden">
        <div data-parallax-layer="1" className="absolute inset-0">
          {reducedMotion ? (
            <picture className="relative block h-full w-full">
              <source media="(max-width: 639px)" srcSet="/hero/logo-reveal-mobile-poster.webp" />
              <Image
                src="/hero/logo-reveal-desktop-poster.webp"
                alt=""
                aria-hidden
                fill
                priority
                sizes="100vw"
                unoptimized
                className="object-cover object-center max-sm:-translate-y-[10%] max-sm:scale-[1.04] sm:translate-x-[14%] sm:object-contain"
              />
            </picture>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
              tabIndex={-1}
              className="h-full w-full object-cover object-center max-sm:-translate-y-[10%] max-sm:scale-[1.04] sm:translate-x-[14%] sm:object-contain"
            >
              <source media="(max-width: 639px)" src="/hero/logo-reveal-mobile.mp4" type="video/mp4" />
              <source media="(min-width: 640px)" src="/hero/logo-reveal-desktop.mp4" type="video/mp4" />
            </video>
          )}
        </div>

        <div
          data-parallax-layer="2"
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_25%,rgba(0,0,0,0.18)_43%,rgba(0,0,0,0.92)_76%,#000_100%)] sm:bg-[linear-gradient(to_right,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.79)_27%,rgba(0,0,0,0.29)_53%,transparent_76%)]"
        />
        <div
          data-parallax-layer="3"
          className="absolute inset-0 z-10 flex items-end sm:items-center"
        >
          <div className="mx-auto w-full max-w-[90rem] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8 sm:pb-0 lg:px-14">
            <div className="max-w-[19rem] sm:max-w-xl">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <DisplayTitle as="h1" size="lg" className="mt-3 text-pf-cream max-sm:text-[clamp(2rem,8vw,2.4rem)] sm:mt-6">
                {hero.title}
              </DisplayTitle>
              <p className="mt-3 max-w-md font-sans text-[0.8125rem] leading-relaxed text-pf-cream sm:mt-8 sm:text-lg">
                {hero.lead}
              </p>
              <div className="mt-5 sm:mt-10">
                <Button href="/#regra-de-pontuacao" className="max-sm:px-4 max-sm:py-3 max-sm:text-xs">Conheça o clube de pontuação</Button>
              </div>
            </div>
          </div>
        </div>
        <div
          data-parallax-layer="4"
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.32)_0%,transparent_19%,transparent_80%,rgba(0,0,0,0.15)_100%)]"
        />
      </ParallaxComponent>
    </section>
  );
}
