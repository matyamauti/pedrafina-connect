"use client";

import { useEffect, useRef, useState } from "react";
import { HistoryNarrative } from "@/components/sections/HistoryNarrative";

const desktopFilm = {
  src: "/historia/nossa-historia.mp4",
  poster: "/historia/nossa-historia-poster.webp",
};
const mobileFilm = {
  src: "/historia/nossa-historia-mobile.mp4",
  poster: "/historia/nossa-historia-mobile-poster.webp",
};

export function HistoryPortal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const [film, setFilm] = useState<typeof desktopFilm | null>(null);
  const [storyReady, setStoryReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const selectFilm = () => setFilm(media.matches ? mobileFilm : desktopFilm);
    selectFilm();
    media.addEventListener("change", selectFilm);
    return () => media.removeEventListener("change", selectFilm);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});
    return () => video.pause();
  }, [film]);

  useEffect(() => {
    const narrative = narrativeRef.current;
    if (!narrative) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStoryReady(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(narrative);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section aria-label="Vídeo de apresentação da história" className="relative h-svh min-h-[32rem] overflow-hidden bg-pf-cream">
        <h1 className="sr-only">Nossa História</h1>
        {film && (
          <video
            key={film.src}
            ref={videoRef}
            src={film.src}
            poster={film.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            className="h-full w-full object-cover max-sm:object-contain"
          />
        )}
      </section>
      <div ref={narrativeRef}>
        <HistoryNarrative revealed={storyReady} />
      </div>
    </>
  );
}
