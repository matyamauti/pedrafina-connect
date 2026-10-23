"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ctaItem, navItems } from "@/lib/nav";

type CurvedMenuProps = {
  open: boolean;
  onClose: () => void;
  currentPath: string;
};

const drawerEase = [0.77, 0, 0.175, 1] as const;
const curvedPath = "M100 0 L100 100 Q-80 50 100 0 Z";
const straightPath = "M100 0 L100 100 Q100 50 100 0 Z";

export function CurvedMenu({ open, onClose, currentPath }: CurvedMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("nav a")?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const links = panelRef.current?.querySelectorAll<HTMLAnchorElement>("a");
      if (!links?.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1280px)");
    const onBreakpointChange = () => {
      if (desktop.matches) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          <motion.div
            key="menu-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-30 bg-pf-black/65 xl:hidden"
          />
          <motion.div
            key="menu-panel"
            ref={panelRef}
            id="menu-principal"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            initial={{ transform: reducedMotion ? "translateX(0%)" : "translateX(140%)", opacity: reducedMotion ? 0 : 1 }}
            animate={{ transform: "translateX(0%)", opacity: 1 }}
            exit={{ transform: reducedMotion ? "translateX(0%)" : "translateX(140%)", opacity: reducedMotion ? 0 : 1 }}
            transition={{ duration: reducedMotion ? 0.12 : 0.45, ease: drawerEase }}
            className="fixed inset-y-0 right-0 z-40 h-[100dvh] w-[90vw] max-w-[30rem] bg-pf-black text-pf-cream xl:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -left-[99px] top-0 h-full w-[100px] fill-pf-black"
            >
              <motion.path
                initial={{ d: reducedMotion ? straightPath : curvedPath }}
                animate={{ d: straightPath }}
                exit={{ d: reducedMotion ? straightPath : curvedPath }}
                transition={{ duration: reducedMotion ? 0 : 0.45, ease: drawerEase }}
              />
            </svg>

            <div className="relative flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain px-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(5rem+env(safe-area-inset-top))] sm:px-10">
              <p className="border-b border-pf-gold/35 pb-5 font-sans text-xs font-bold uppercase tracking-[0.16em] text-pf-gold">Navegação</p>
              <nav aria-label="Principal" className="mt-2">
                <ol>
                  {navItems.map((item, index) => (
                    <li key={item.href} className="border-b border-pf-gold/25">
                      <motion.div
                        initial={reducedMotion ? false : { opacity: 0, transform: "translateY(8px)" }}
                        animate={{ opacity: 1, transform: "translateY(0px)" }}
                        transition={{ duration: reducedMotion ? 0 : 0.25, delay: reducedMotion ? 0 : 0.12 + index * 0.04 }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={currentPath === item.href ? "page" : undefined}
                          className="group flex min-h-16 items-center gap-4 py-3 font-display text-[clamp(1.45rem,5vw,2.25rem)] font-medium leading-tight tracking-[-0.035em] text-pf-cream transition-colors duration-200 hover:text-pf-gold focus-visible:text-pf-gold aria-[current=page]:text-pf-gold"
                        >
                          <span className="shrink-0 self-start pt-1 font-sans text-xs font-semibold tabular-nums tracking-normal text-pf-gold">{String(index + 1).padStart(2, "0")}</span>
                          <span>{item.label}</span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-auto pt-10">
                <p className="mb-5 font-sans text-xs leading-relaxed text-pf-cream/55">Cada parceria abre caminho para novas conquistas.</p>
                <Link
                  href={ctaItem.href}
                  onClick={onClose}
                  className="flex min-h-12 items-center justify-center border border-pf-gold px-5 py-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-pf-gold transition-colors duration-200 hover:bg-pf-gold hover:text-pf-black focus-visible:bg-pf-gold focus-visible:text-pf-black"
                >
                  {ctaItem.label}
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
