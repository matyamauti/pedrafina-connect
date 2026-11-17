"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export interface EventCardProps {
  eventName: string;
  description: string;
  dateTime: string;
  month: string;
  year: string;
  imageUrl: string;
  imageAlt: string;
  imageFit: "cover" | "contain";
  delay?: number;
}

export function EventCard({
  eventName,
  description,
  dateTime,
  month,
  year,
  imageUrl,
  imageAlt,
  imageFit,
  delay = 0,
}: EventCardProps) {
  const titleId = React.useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby={titleId}
      className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-pf-gold/30 bg-pf-black p-6 text-pf-cream shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[12ch] pt-1 font-display text-lg font-semibold leading-tight tracking-[-0.025em]">
          Pedra Fina Connect
        </p>
        <time dateTime={dateTime} className="shrink-0 text-right text-pf-gold">
          <span className="block font-sans text-xs font-semibold uppercase tracking-[0.1em]">
            {month}
          </span>
          <span className="mt-1 block font-display text-[2rem] font-medium leading-none tracking-[-0.05em]">
            {year}
          </span>
        </time>
      </div>

      <div
        className={`relative mt-6 aspect-[16/10] w-full overflow-hidden rounded-lg ${
          imageFit === "cover" ? "bg-pf-cream" : "bg-pf-black"
        }`}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className={
            imageFit === "cover"
              ? "object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
              : "object-contain p-3 transition-transform duration-500 hover:scale-[1.03] sm:p-5"
          }
        />
      </div>

      <div className="mt-6 border-t border-pf-gold/20 pt-5">
        <h3 id={titleId} className="font-display text-xl font-medium leading-snug tracking-[-0.03em]">
          {eventName}
        </h3>
        <p className="mt-2 font-sans text-sm leading-relaxed text-pf-cream/65">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
