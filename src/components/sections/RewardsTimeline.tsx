"use client";

import Image from "next/image";
import { useRef } from "react";
import { rewardActs } from "@/content/rewards";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Button } from "@/components/primitives/Button";
import { BlurText } from "@/components/primitives/BlurText";
import { Container } from "@/components/primitives/Container";
import TextType from "@/components/primitives/TextType";
import { MillionTitle } from "@/components/sections/MillionTitle";

const pointsClassName =
  "font-sans text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-pf-gold tabular-nums";

// A curva segue a posição real dos marcos. Assim o mesmo percurso atravessa
// os dois capítulos e continua alinhado quando o texto quebra em outra tela.
function routeThrough(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";

  return points.reduce((path, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;

    const previous = points[index - 1];
    const middleY = (previous.y + point.y) / 2;
    return `${path} C ${previous.x} ${middleY}, ${point.x} ${middleY}, ${point.x} ${point.y}`;
  }, "");
}

export function RewardsTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const routeSvg = useRef<SVGSVGElement>(null);
  const routeTrack = useRef<SVGPathElement>(null);
  const routeProgress = useRef<SVGPathElement>(null);
  const routeHead = useRef<SVGCircleElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = root.current;
    const svg = routeSvg.current;
    const track = routeTrack.current;
    const progress = routeProgress.current;
    const head = routeHead.current;
    if (!section || !svg || !track || !progress || !head) return;

    const nodes = gsap.utils.toArray<HTMLElement>("[data-route-node]", section);
    const cards = gsap.utils.toArray<HTMLElement>("[data-reward-card]", section);
    const backdrops = gsap.utils.toArray<HTMLElement>("[data-reward-backdrop]", section);
    if (nodes.length < 2) return;

    let routeLength = 0;
    let nodeYs: number[] = [];
    let nodeLengths: number[] = [];
    let routeTrigger: ScrollTrigger | undefined;

    const updateProgress = (scrollProgress: number) => {
      if (nodeYs.length < 2) return;

      const firstY = nodeYs[0];
      const lastY = nodeYs[nodeYs.length - 1];
      const scrollY = firstY + scrollProgress * (lastY - firstY);
      let segment = 0;

      while (segment < nodeYs.length - 2 && scrollY >= nodeYs[segment + 1]) {
        segment++;
      }

      const segmentProgress = Math.min(
        1,
        Math.max(
          0,
          (scrollY - nodeYs[segment]) /
            (nodeYs[segment + 1] - nodeYs[segment]),
        ),
      );
      // A linha descansa no marco antes de seguir viagem. Apenas o percurso
      // responde ao scroll; cada prêmio permanece no fluxo normal da página.
      const travelProgress = Math.min(
        1,
        Math.max(0, (segmentProgress - 0.38) / 0.62),
      );
      const distance =
        nodeLengths[segment] +
        (nodeLengths[segment + 1] - nodeLengths[segment]) * travelProgress;
      const point = progress.getPointAtLength(distance);

      progress.style.strokeDashoffset = String(routeLength - distance);
      head.style.opacity = "1";
      head.setAttribute("cx", String(point.x));
      head.setAttribute("cy", String(point.y));
    };

    const updateRoute = () => {
      const bounds = section.getBoundingClientRect();
      const points = nodes.map((node) => {
        const point = node.getBoundingClientRect();
        return {
          x: Math.round(point.left - bounds.left + point.width / 2),
          y: Math.round(point.top - bounds.top + point.height / 2),
        };
      });
      const path = routeThrough(points);

      svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      track.setAttribute("d", path);
      progress.setAttribute("d", path);
      routeLength = progress.getTotalLength();
      nodeYs = points.map((point) => point.y);
      nodeLengths = nodeYs.map((y) => {
        let low = 0;
        let high = routeLength;
        // A curva sempre avança em Y; a busca localiza o comprimento exato
        // de cada marco sem depender da largura ou da altura da tela.
        for (let step = 0; step < 18; step++) {
          const middle = (low + high) / 2;
          if (progress.getPointAtLength(middle).y < y) low = middle;
          else high = middle;
        }
        return (low + high) / 2;
      });
      progress.style.strokeDasharray = String(routeLength);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        progress.style.strokeDashoffset = "0";
        head.style.opacity = "0";
      } else {
        updateProgress(routeTrigger?.progress ?? 0);
      }
    };

    updateRoute();
    const observer = new ResizeObserver(updateRoute);
    observer.observe(section);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // O percurso responde ao scroll nos dois sentidos. Os cards revelam
        // apenas a opacidade, sem deslocar texto ou imagem.
        routeTrigger = ScrollTrigger.create({
          trigger: nodes[0],
          endTrigger: nodes[nodes.length - 1],
          start: "top 58%",
          end: "top 58%",
          onUpdate: (self) => updateProgress(self.progress),
        });
        updateProgress(routeTrigger.progress);

        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0.35 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.6,
              },
            },
          );
        });

        backdrops.forEach((backdrop) => {
          gsap.fromTo(
            backdrop,
            { opacity: 0 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: backdrop.parentElement,
                start: "top 92%",
                end: "top 48%",
                scrub: 0.6,
              },
            },
          );
        });
      });

      return () => {
        routeTrigger = undefined;
        progress.style.strokeDashoffset = "";
        head.style.opacity = "0";
        media.revert();
      };
    }, section);

    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);

  let milestoneIndex = 0;

  return (
    <section className="overflow-x-clip bg-pf-black py-24 lg:py-32">
      <Container>
        <div ref={root} className="relative">
          <svg
            ref={routeSvg}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              ref={routeTrack}
              fill="none"
              stroke="var(--color-pf-gold)"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <path
              ref={routeProgress}
              fill="none"
              stroke="var(--color-pf-gold)"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <circle
              ref={routeHead}
              r="5"
              fill="var(--color-pf-gold)"
              stroke="var(--color-pf-black)"
              strokeWidth="3"
              opacity="0"
            />
          </svg>

          {rewardActs.map((act, actIndex) => (
            <div key={act.eyebrow} className={actIndex > 0 ? "mt-28 lg:mt-40" : ""}>
              {act.title ? (
                <header className="relative z-30 pb-5 pl-14 lg:pl-0">
                  <h2 className="relative max-w-[18ch] font-display text-[clamp(1.5rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.045em] text-pf-cream lg:max-w-none lg:whitespace-nowrap">
                    <span aria-hidden="true" className="invisible block">{act.title}</span>
                    <TextType
                      text={act.title}
                      as="span"
                      typingSpeed={75}
                      pauseDuration={1500}
                      deletingSpeed={50}
                      deleteMode="backspace"
                      typeEffect="fade"
                      mistakes={0.2}
                      cursorStyle="bar"
                      cursorGlide
                      showCursor
                      loop={false}
                      startOnVisible
                      className="absolute inset-0 w-full"
                      cursorClassName="text-pf-gold"
                    />
                  </h2>
                  <div aria-hidden="true" className="mt-6 h-px w-24 bg-pf-gold/70" />
                </header>
              ) : null}

              <ol className="mt-12 lg:mt-16">
                {act.tiers.map((tier) => {
                  const isRight = milestoneIndex++ % 2 === 1;

                  return (
                    <li
                      key={tier.slug}
                      className="relative grid min-h-[80svh] grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-4 lg:min-h-[95svh] lg:grid-cols-[minmax(0,1fr)_8rem_minmax(0,1fr)] lg:gap-x-6"
                    >
                      <div
                        data-reward-backdrop
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden"
                      >
                        <Image
                          src={tier.image}
                          alt=""
                          fill
                          sizes="100vw"
                          className="object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-pf-black via-pf-black/20 to-pf-black" />
                      </div>
                      <span
                        data-route-node
                        aria-hidden="true"
                        className={`relative z-30 col-start-1 row-start-1 block h-3 w-3 rotate-45 border border-pf-gold bg-pf-black lg:col-start-2 ${
                          isRight ? "justify-self-end" : "justify-self-start"
                        }`}
                      />

                      <div
                        data-reward-card
                        className={`relative z-30 col-start-2 row-start-1 w-full max-w-[34rem] ${
                          isRight
                            ? "lg:col-start-3 lg:justify-self-start"
                            : "lg:col-start-1 lg:justify-self-end"
                        }`}
                      >
                        {tier.points === "1 milhão" ? (
                          <MillionTitle text={tier.points} className={pointsClassName} />
                        ) : (
                          <BlurText
                            text={tier.points}
                            delay={120}
                            className={pointsClassName}
                          />
                        )}
                        <BlurText
                          text={tier.label}
                          delay={75}
                          className="mt-4 max-w-md font-sans text-lg leading-relaxed text-pf-cream lg:text-xl"
                        />

                        <div className="mt-8 rounded-2xl border border-pf-gold/25 bg-pf-graphite p-1.5">
                          <div className="relative aspect-4/3 max-h-[48svh] overflow-hidden rounded-xl">
                            <Image
                              src={tier.image}
                              alt={tier.alt}
                              fill
                              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 75vw, 90vw"
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <Button href="/recompensas">Ver todas as recompensas</Button>
        </div>
      </Container>
    </section>
  );
}
