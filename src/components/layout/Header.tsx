"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { CurvedMenu } from "@/components/ui/curved-menu";
import { SlideTabs } from "@/components/ui/slide-tabs";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // O header só é transparente sobre o herói da home. Nas páginas internas,
  // que abrem em superfície clara, o texto em creme sumiria no fundo.
  const overDarkHero = pathname === "/";
  const opaque = scrolled || menuOpen || !overDarkHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ease-pf ${
        opaque ? "bg-pf-graphite" : "bg-transparent"
      }`}
    >
      <div className="relative z-50 mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-8 lg:px-14 xl:h-20">
        <Link
          href="/#inicio"
          onClick={closeMenu}
          aria-label="Pedra Fina Connect, ir para a home"
          className="-my-3 flex h-11 items-center py-3"
        >
          <BrandLockup />
        </Link>

        <nav aria-label="Principal" className="absolute left-1/2 hidden -translate-x-1/2 xl:block">
          <SlideTabs />
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] xl:hidden"
        >
          <span
            aria-hidden
            className={`h-px w-6 bg-pf-cream transition-transform duration-200 ease-pf ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden
            className={`h-px w-6 bg-pf-cream transition-transform duration-200 ease-pf ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        aria-hidden
        className={`h-px w-full bg-pf-gold/25 transition-opacity duration-300 ease-pf ${
          opaque ? "opacity-100" : "opacity-0"
        }`}
      />

      <CurvedMenu
        open={menuOpen}
        onClose={closeMenu}
        currentPath={pathname}
      />
    </header>
  );
}
