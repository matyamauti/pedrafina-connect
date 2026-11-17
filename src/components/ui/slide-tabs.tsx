"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ctaItem, navItems } from "@/lib/nav";

const tabs = [{ href: "/#inicio", label: "Início" }, ...navItems, ctaItem];

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

function getHash() {
  return window.location.hash;
}

function getSelectedIndex(pathname: string, hash: string) {
  if (pathname === "/como-funciona") return 1;
  if (pathname === "/") {
    const index = tabs.findIndex((tab) => tab.href === `/${hash || "#inicio"}`);
    return index < 0 ? 0 : index;
  }
  const index = tabs.findIndex((tab) => tab.href === pathname);
  return index < 0 ? 0 : index;
}

type CursorPosition = { left: number; width: number; opacity: number };

export function SlideTabs() {
  const pathname = usePathname();
  const hash = useSyncExternalStore(subscribeToHash, getHash, () => "");
  const selectedIndex = getSelectedIndex(pathname, hash);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [position, setPosition] = useState<CursorPosition>({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef<Array<HTMLLIElement | null>>([]);
  const reducedMotion = useReducedMotion();
  const activeIndex = hoveredIndex ?? selectedIndex;

  const measure = useCallback((index: number) => {
    const tab = tabsRef.current[index];
    if (!tab) return;
    const next = { left: tab.offsetLeft, width: tab.offsetWidth, opacity: 1 };
    setPosition((current) =>
      current.left === next.left && current.width === next.width && current.opacity === 1
        ? current
        : next,
    );
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => measure(activeIndex));
    const onResize = () => measure(activeIndex);
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [activeIndex, measure]);

  return (
    <ul
      onMouseLeave={() => setHoveredIndex(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHoveredIndex(null);
      }}
      className="relative mx-auto flex w-fit items-center rounded-full border border-pf-gold/40 bg-pf-black/85 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
    >
      {tabs.map((tab, index) => (
        <li
          key={tab.href}
          ref={(element) => { tabsRef.current[index] = element; }}
          onMouseEnter={() => setHoveredIndex(index)}
          className="relative z-10"
        >
          <Link
            href={tab.href}
            onFocus={() => setHoveredIndex(index)}
            aria-current={selectedIndex === index ? (tab.href.includes("#") ? "location" : "page") : undefined}
            className={`flex h-10 items-center whitespace-nowrap rounded-full px-3.5 font-sans text-[11px] font-semibold uppercase tracking-[0.065em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pf-gold 2xl:px-4.5 ${
              activeIndex === index ? "text-pf-black" : "text-pf-cream/90"
            }`}
          >
            {tab.label}
          </Link>
        </li>
      ))}
      <motion.li
        aria-hidden="true"
        animate={position}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38, mass: 0.7 }}
        className="pointer-events-none absolute inset-y-1 z-0 rounded-full bg-pf-gold"
      />
    </ul>
  );
}
