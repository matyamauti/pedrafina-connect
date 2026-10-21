"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { hero } from "@/content/program";
import { Button } from "@/components/primitives/Button";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";

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
  }, [reducedMotion]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-pf-black">
      {reducedMotion ? (
        <Image
          src="/hero/hero-poster.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero/hero-poster.webp"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* O filme ocupa a tela inteira; o texto se sustenta num degradê
          quase sólido na área que ele ocupa e que some antes do meio da
          tela. As paradas foram calculadas sobre a luminância medida nos
          quadros mais claros do laço, não estimadas: no celular o texto fica
          embaixo, então o degradê é vertical; no desktop fica à esquerda. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.84)_54%,rgba(0,0,0,0.35)_72%,rgba(0,0,0,0)_90%)] lg:bg-[linear-gradient(to_right,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_40%,rgba(0,0,0,0.3)_56%,rgba(0,0,0,0)_72%)]"
      />

      {/* O header é transparente sobre a home e passa por cima do filme. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-pf-black/85 to-transparent"
      />

      <div className="relative flex min-h-[100svh] items-end lg:items-center">
        {/* Mesmas margens do Container e do header: o título do herói
            alinha com a marca na barra. */}
        <div className="mx-auto w-full max-w-[90rem] px-4 pb-20 pt-32 sm:px-8 lg:px-14 lg:py-32">
          <div className="max-w-xl">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <DisplayTitle as="h1" size="lg" className="mt-8">
              {hero.title}
            </DisplayTitle>
            {/* Creme cheio, sem opacidade: sobre o filme, 80% já lavava o
                texto depois que o degradê foi aliviado. */}
            <p className="mt-10 max-w-md font-sans text-base leading-relaxed text-pf-cream sm:text-lg">
              {hero.lead}
            </p>
            <div className="mt-12">
              <Button href="/o-connect-club">Conheça o programa</Button>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-pf-gold/40"
      />
    </section>
  );
}
