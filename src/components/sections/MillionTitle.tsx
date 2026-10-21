"use client";

import { useRef, type CSSProperties } from "react";
import ReactBitsBlurText from "@/components/primitives/ReactBitsBlurText";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import "./MillionTitle.css";

type MillionTitleProps = {
  text: string;
  className: string;
};

const bursts = [
  { left: "16%", top: "44%", delay: 0 },
  { left: "88%", top: "38%", delay: 0.3 },
] as const;

const directions = [0, 45, 90, 135, 180, 225, 270, 315] as const;

type RayStyle = CSSProperties & {
  "--ray-angle": string;
  "--ray-delay": string;
};

export function MillionTitle({ text, className }: MillionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const title = ref.current;
    if (!title) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      let frame = 0;
      const reset = () => title.removeAttribute("data-celebrate");
      const celebrate = () => {
        window.cancelAnimationFrame(frame);
        reset();
        frame = window.requestAnimationFrame(() => {
          title.setAttribute("data-celebrate", "true");
        });
      };
      const trigger = ScrollTrigger.create({
        trigger: title,
        start: "top 44%",
        end: "bottom 18%",
        onEnter: celebrate,
        onEnterBack: celebrate,
        onLeaveBack: reset,
      });

      if (trigger.isActive) celebrate();
      return () => {
        window.cancelAnimationFrame(frame);
        trigger.kill();
        reset();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <div ref={ref} className="pf-million-title">
      <span aria-hidden="true" className="pf-million-sparks">
        {bursts.map((burst, burstIndex) => (
          <span
            key={`ring-${burstIndex}`}
            className="pf-million-ring"
            style={{
              left: burst.left,
              top: burst.top,
              animationDelay: `${0.28 + burst.delay}s`,
            }}
          />
        ))}
        {bursts.flatMap((burst, burstIndex) =>
          directions.map((angle, directionIndex) => (
            <span
              key={`${burstIndex}-${directionIndex}`}
              className="pf-million-ray"
              style={
                {
                  left: burst.left,
                  top: burst.top,
                  "--ray-angle": `${angle}deg`,
                  "--ray-delay": `${0.3 + burst.delay + directionIndex * 0.015}s`,
                } as RayStyle
              }
            />
          )),
        )}
      </span>
      <ReactBitsBlurText
        text={text}
        effect="blur"
        animateBy="words"
        direction="top"
        staggerFrom="start"
        trigger="view"
        delay={200}
        stepDuration={0.35}
        blur={10}
        distance={50}
        className={`${className} relative z-10`}
      />
    </div>
  );
}
