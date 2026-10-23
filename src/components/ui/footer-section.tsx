"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Container } from "@/components/primitives/Container";
import { ctaItem, navItems } from "@/lib/nav";

const footerLinks = [...navItems, ctaItem];

type AnimatedContainerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function AnimatedContainer({
  children,
  className,
  delay = 0,
}: AnimatedContainerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 10, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function FooterSection({ year }: { year: number }) {
  return (
    <footer className="relative isolate overflow-hidden border-t border-pf-gold/45 bg-pf-cream pb-[max(2rem,env(safe-area-inset-bottom))] text-pf-graphite">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(55%_100%_at_50%_0%,rgba(183,154,98,0.13),transparent)]"
      />

      <Container className="relative">
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20 lg:py-24">
          <AnimatedContainer className="flex flex-col items-start">
            <Link
              href="/#inicio"
              aria-label="Pedra Fina Connect — voltar ao início"
              className="inline-flex min-h-11 items-center rounded-sm"
            >
              <BrandLockup tone="dark" className="text-sm sm:text-base" />
            </Link>
            <div aria-hidden="true" className="mt-8 h-px w-20 bg-pf-gold-ink/45" />
          </AnimatedContainer>

          <nav aria-label="Navegação do rodapé">
            <h2 className="mb-6 font-sans text-sm font-medium text-pf-gold-ink sm:mb-8">
              Navegue pelo site
            </h2>
            <ul className="grid grid-cols-2 gap-x-5 sm:gap-x-10">
              {footerLinks.map((item, index) => (
                <li key={item.href}>
                  <AnimatedContainer delay={0.06 + index * 0.05}>
                    <Link
                      href={item.href}
                      className="group flex min-h-16 items-center justify-between gap-2 border-t border-pf-graphite/20 py-3 font-display text-[clamp(1rem,0.9rem+0.35vw,1.3rem)] font-medium leading-tight tracking-[-0.025em] text-pf-graphite transition-colors duration-200 ease-pf hover:text-pf-gold-ink"
                    >
                      <span>{item.label}</span>
                      <span
                        aria-hidden="true"
                        className="text-base text-pf-gold-ink transition-transform duration-200 ease-pf group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </Link>
                  </AnimatedContainer>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-pf-graphite/20 pt-6 font-sans text-xs text-pf-graphite/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Pedra Fina Connect. Todos os direitos reservados.</p>
          <Link
            href="/privacidade"
            className="inline-flex min-h-11 items-center self-start transition-colors duration-200 ease-pf hover:text-pf-gold-ink"
          >
            Política de privacidade
          </Link>
        </div>
      </Container>
    </footer>
  );
}
