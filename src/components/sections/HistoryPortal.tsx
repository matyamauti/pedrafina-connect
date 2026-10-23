"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HistoryNarrative } from "@/components/sections/HistoryNarrative";
import GlyphPortal from "@/components/ui/glyph-portal";

const desktopFilm = {
  src: "/historia/nossa-historia.mp4",
  poster: "/historia/nossa-historia-poster.webp",
};
const mobileFilm = {
  src: "/historia/nossa-historia-mobile.mp4",
  poster: "/historia/nossa-historia-mobile-poster.webp",
};

export function HistoryPortal() {
  const frontVideoRef = useRef<HTMLVideoElement>(null);
  const portalVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const [film, setFilm] = useState<typeof desktopFilm | null>(null);
  const [storyReady, setStoryReady] = useState(false);

  const syncPlayback = useCallback(() => {
    const canPlay = !reducedMotionRef.current;
    const videos = [
      [frontVideoRef.current, progressRef.current < 0.2],
      [portalVideoRef.current, progressRef.current > 0 && progressRef.current < 0.9],
    ] as const;

    for (const [video, inRange] of videos) {
      if (!video) continue;
      if (canPlay && inRange) {
        if (video.paused) video.play().catch(() => {});
      } else if (!video.paused) {
        video.pause();
      }
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const selectFilm = () => setFilm(media.matches ? mobileFilm : desktopFilm);
    selectFilm();
    media.addEventListener("change", selectFilm);
    return () => media.removeEventListener("change", selectFilm);
  }, []);

  useEffect(() => {
    const video = frontVideoRef.current;
    const portalVideo = portalVideoRef.current;
    if (!video || !portalVideo || !film) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      reducedMotionRef.current = motionPreference.matches;
      syncPlayback();
    };
    onMotionChange();
    motionPreference.addEventListener("change", onMotionChange);
    return () => {
      motionPreference.removeEventListener("change", onMotionChange);
      video.pause();
      portalVideo.pause();
    };
  }, [film, syncPlayback]);

  useEffect(() => {
    const portal = document.querySelector<HTMLElement>(".history-portal");
    if (!portal) return;

    let fallbackTimer: number | undefined;
    const checkStaticMode = () => {
      window.clearTimeout(fallbackTimer);
      if (portal.dataset.gpReady === "true" && portal.dataset.gpMotion === "off") {
        fallbackTimer = window.setTimeout(() => {
          if (portal.dataset.gpMotion === "off") setStoryReady(true);
        }, 600);
      }
    };
    const observer = new MutationObserver(checkStaticMode);
    observer.observe(portal, { attributes: true, attributeFilter: ["data-gp-ready", "data-gp-motion"] });
    checkStaticMode();

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const onProgress = useCallback((progress: number) => {
    progressRef.current = progress;
    syncPlayback();
    if (progress >= 0.9) setStoryReady(true);
  }, [syncPlayback]);

  return (
    <>
      <h1 className="sr-only">Nossa História</h1>
      <GlyphPortal
        word="Nossa História"
        focusChar="H"
        interactive={false}
        annotations={false}
        scrollLength={1.8}
        fontFamily="var(--font-archivo), Arial, sans-serif"
        fontWeight={700}
        enterLabel="Ler nossa história"
        onProgress={onProgress}
        className="history-portal"
        style={{
          "--gp-paper": "#f4f1eb",
          "--gp-ink": "#0a0a0a",
          "--gp-field": "#f4f1eb",
          "--gp-foreground": "#0a0a0a",
        }}
        front={
          <div className="history-portal-front">
            <style>{`
              .history-portal-front { position: absolute; inset: 0; overflow: hidden; background: #f4f1eb; }
              .history-portal-front::before { content: ""; position: absolute; inset: 0; background: url("/historia/nossa-historia-poster.webp") center / cover no-repeat; }
              .history-portal-film { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
              .history-portal [data-gp-caption] { display: none; }
              @media (max-width: 639px) {
                .history-portal-front::before { background-image: url("/historia/nossa-historia-mobile-poster.webp"); background-size: contain; }
                .history-portal-film { object-fit: contain; }
              }
            `}</style>
            {film && (
              <video
                ref={frontVideoRef}
                src={film.src}
                poster={film.poster}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                className="history-portal-film"
              />
            )}
          </div>
        }
        background={
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: "calc(1 - var(--gp-reveal, 0))",
              transform: "scale(var(--gp-field-scale, 1))",
            }}
          >
            {film && (
              <video
                ref={portalVideoRef}
                src={film.src}
                poster={film.poster}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                tabIndex={-1}
                className="history-portal-film"
              />
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-pf-black/50" />
          </div>
        }
      >
        <HistoryNarrative revealed={storyReady} />
      </GlyphPortal>
    </>
  );
}
