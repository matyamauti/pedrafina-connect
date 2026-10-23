"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { JourneyStep } from "@/content/journey";

const AUTO_PLAY_INTERVAL = 3000;
const IMAGE_REVISION = "20261023-1632";

type FeatureCarouselProps = {
  items: readonly JourneyStep[];
};

export function FeatureCarousel({ items }: FeatureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || reducedMotion || items.length < 2) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTO_PLAY_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isInView, items.length, reducedMotion]);

  if (items.length === 0) return null;

  const activeItem = items[activeIndex];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carrossel"
      aria-label="As seis etapas do clube de pontuação"
      className="grid grid-cols-[minmax(0,0.43fr)_minmax(0,0.57fr)] items-stretch gap-x-3 gap-y-7 sm:gap-x-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-center lg:gap-x-16 xl:gap-x-20"
    >
      <div className="min-w-0">
        <div className="flex items-end justify-between gap-2 border-b border-pf-graphite/25 pb-3 sm:pb-5">
          <p className="font-sans text-[11px] font-semibold leading-tight text-pf-graphite/75 sm:text-xs">Etapas da parceria</p>
          <span className="shrink-0 font-display text-xs tabular-nums text-pf-gold-ink sm:text-sm">{activeItem.number}/{String(items.length).padStart(2, "0")}</span>
        </div>

        <ol aria-label="Selecione uma etapa">
          {items.map((item, index) => {
            const active = index === activeIndex;
            return (
              <li key={item.number} className="border-b border-pf-graphite/15">
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-current={active ? "step" : undefined}
                  aria-label={`Etapa ${index + 1}: ${item.label}`}
                  className={`group grid min-h-12 w-full grid-cols-[2rem_minmax(0,1fr)] items-center gap-2 border-l-[3px] py-2 pl-1 text-left transition-colors duration-300 sm:min-h-16 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-3 sm:pl-3 lg:min-h-[5.4rem] lg:grid-cols-[4.25rem_minmax(0,1fr)] lg:gap-5 lg:pl-5 ${active ? "border-pf-gold-ink bg-pf-gold/15" : "border-transparent"}`}
                >
                  <span className={`font-display text-[clamp(1.65rem,4vw,3.3rem)] font-medium leading-none tabular-nums tracking-[-0.07em] transition-colors duration-300 ${active ? "text-pf-gold-ink" : "text-pf-graphite/55 group-hover:text-pf-gold-ink"}`}>
                    {item.number}
                  </span>
                  <span className={`font-display text-[clamp(0.73rem,1.4vw,1.22rem)] font-medium leading-[1.22] tracking-[-0.02em] transition-colors duration-300 ${active ? "text-pf-graphite" : "text-pf-graphite/75 group-hover:text-pf-graphite"}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative min-w-0 self-stretch lg:self-auto">
        <div className="relative h-full min-h-[21rem] w-full overflow-hidden bg-pf-stone-200 shadow-[0_18px_45px_rgba(23,17,9,0.15)] lg:mx-auto lg:aspect-[3/4] lg:h-auto lg:max-w-[470px] lg:min-h-0">
          {items.map((item, index) => {
            const active = index === activeIndex;
            return (
              <motion.article
                key={item.number}
                aria-hidden={!active}
                initial={false}
                animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.035, zIndex: active ? 1 : 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={`${item.image}?v=${IMAGE_REVISION}`}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 55vw, (max-width: 1024px) 58vw, 470px"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-pf-black/60 to-transparent" />
                <span className="absolute right-3 top-3 font-display text-[clamp(1.7rem,4vw,3rem)] font-medium leading-none tabular-nums text-pf-cream sm:right-6 sm:top-6">
                  {item.number}
                </span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pf-black/95 via-pf-black/75 via-65% to-transparent px-2.5 pb-3 pt-20 text-pf-cream sm:px-6 sm:pb-6 sm:pt-28 lg:px-8 lg:pb-8">
                  <span aria-hidden="true" className="mb-2 block h-px w-7 bg-pf-gold sm:mb-3 sm:w-10" />
                  <h3 className="font-display text-[clamp(1.06rem,2.6vw,2.15rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-pf-gold">{item.label}</h3>
                  <p className="mt-1.5 font-sans text-[clamp(0.75rem,1.12vw,0.95rem)] font-normal leading-[1.35] text-pf-cream/90 sm:mt-3 sm:leading-relaxed">{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

    </div>
  );
}
