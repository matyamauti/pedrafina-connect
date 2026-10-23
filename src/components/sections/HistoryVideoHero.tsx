"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/primitives/Container";
import { gsap, useIsomorphicLayoutEffect } from "@/lib/gsap";

export function HistoryVideoHero() {
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!heroRef.current || !visualRef.current) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 640px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          visualRef.current,
          { yPercent: -2 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => media.revert();
    }, heroRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    const syncPlayback = () => {
      if (visible && !reducedMotion.matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.08 },
    );

    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <header ref={heroRef} className="relative isolate flex h-[90svh] min-h-[38rem] max-h-[60rem] items-end overflow-hidden bg-pf-cream text-pf-graphite">
      <div ref={visualRef} className="absolute inset-0 sm:-top-[6%] sm:-bottom-[6%]">
        <video
          ref={videoRef}
          src="/historia/nossa-historia.mp4"
          poster="/historia/nossa-historia-poster.webp"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className="h-full w-full scale-[1.4] object-contain object-[center_38%] sm:scale-100 sm:object-cover sm:object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(244,241,235,0.05)_30%,rgba(244,241,235,0.12)_54%,rgba(244,241,235,0.91)_83%,#f4f1eb_100%)]"
      />
      <Container className="relative z-10 w-full pb-12 sm:pb-16 lg:pb-20">
        <h1 className="max-w-[12ch] border-l border-pf-gold-ink pl-5 font-display text-[clamp(2.75rem,5.5vw,5.75rem)] font-medium leading-[1.08] tracking-[-0.045em] sm:pl-7">
          Nossa História
        </h1>
      </Container>
    </header>
  );
}
