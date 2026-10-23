"use client";

import Image from "next/image";
import { Newsreader } from "next/font/google";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { StoryTextReveal } from "@/components/sections/StoryTextReveal";
import SplitText from "@/components/ui/SplitText";

const historyFont = Newsreader({
  subsets: ["latin"],
  display: "swap",
});

export function HistoryNarrative({ revealed }: { revealed: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });
  const reducedMotion = useReducedMotion();
  const showCopy = revealed || reducedMotion === true;

  return (
    <section
      ref={sectionRef}
      aria-label="A trajetória da Pedra Fina"
      className={`${historyFont.className} relative isolate min-h-[var(--gp-height,100svh)] overflow-hidden border-t border-pf-gold-ink/20 bg-pf-cream py-20 lg:py-32`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src="/historia/elegancia-natural-marmore-madeira.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,241,235,0.64)_0%,rgba(244,241,235,0.5)_42%,rgba(244,241,235,0.36)_100%)]" />
      </div>
      <Container className="relative z-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={false}
              animate={{ opacity: showCopy ? 1 : 0, y: showCopy ? 0 : 12 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 1.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <SplitText
                tag="h2"
                text="De um sonho individual a uma história compartilhada."
                className="max-w-[24ch] text-[clamp(2rem,2.4vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.025em] text-pf-gold-ink"
                effect="fade"
                splitType="chars"
                delay={30}
                duration={1.2}
                staggerFrom="start"
                trigger="view"
                hoverEffect="wave"
                threshold={0.1}
                rootMargin="-80px"
                textAlign="left"
              />
            </motion.div>
            <div aria-hidden="true" className="mt-9 h-px w-36 max-w-full bg-pf-gold-ink/25">
              <motion.div
                className="h-full w-full origin-left bg-pf-gold-ink"
                style={{ scaleX: reducedMotion ? 1 : scrollYProgress }}
              />
            </div>
          </div>
          <div className="max-w-[58ch] space-y-7 text-[clamp(1.15rem,1.55vw,1.35rem)] leading-[1.7] text-pf-graphite">
            <StoryTextReveal visible={showCopy} delay={0.18}>
              Há mais de 20 anos, Robinson transformou um momento difícil em recomeço. Sozinho, iniciou uma pequena marmoraria e cuidava de cada etapa, da produção à instalação.
            </StoryTextReveal>
            <StoryTextReveal visible={showCopy} delay={0.38}>
              O nome, sugerido por sua mãe, tornou-se símbolo de trabalho, perseverança e excelência. Aquele sonho cresceu e se transformou no Grupo Pedra Fina, unindo marmoraria e marcenaria.
            </StoryTextReveal>
            <StoryTextReveal visible={showCopy} delay={0.58} className="border-t border-pf-gold-ink/25 pt-7 text-[clamp(1.4rem,2vw,1.85rem)] font-medium leading-[1.48] tracking-[-0.02em]">
              Hoje, o grupo conecta pessoas, constrói relacionamentos e transforma sonhos em realidade. Dessa essência nasceu o Pedra Fina Connect, que celebra as parcerias e as pessoas impactadas ao longo do caminho.
            </StoryTextReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
