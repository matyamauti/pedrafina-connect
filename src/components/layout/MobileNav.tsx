"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ctaItem, navItems } from "@/lib/nav";
import { GoldRule } from "@/components/primitives/GoldRule";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  currentPath: string;
};

export function MobileNav({ open, onClose, currentPath }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      id="menu-principal"
      hidden={!open}
      className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto overscroll-contain bg-pf-black xl:hidden"
    >
      <nav aria-label="Principal" className="flex flex-col gap-2 px-4 pt-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            aria-current={currentPath === item.href ? "page" : undefined}
            className="font-display text-display-sm font-medium tracking-[-0.025em] text-pf-cream transition-colors duration-200 ease-pf aria-[current=page]:text-pf-gold active:text-pf-gold"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <GoldRule tone="faint" className="mb-6" />
        <Link
          href={ctaItem.href}
          onClick={onClose}
          className="block border border-pf-gold px-6 py-4 text-center font-sans text-eyebrow font-bold uppercase text-pf-gold transition-colors duration-200 ease-pf active:bg-pf-gold active:text-pf-black"
        >
          {ctaItem.label}
        </Link>
      </div>
    </div>
  );
}
