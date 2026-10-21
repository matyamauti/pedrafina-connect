"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ctaItem, navItems } from "@/lib/nav";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-8 lg:px-14 xl:h-20">
        <Link
          href="/"
          aria-label="Pedra Fina Connect, ir para a home"
          className="-my-3 flex h-11 items-center py-3"
        >
          <BrandLockup />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => {
              const current = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="group flex h-11 items-center whitespace-nowrap font-sans text-eyebrow font-bold uppercase text-pf-cream transition-colors duration-200 ease-pf hover:text-pf-gold aria-[current=page]:text-pf-gold"
                  >
                    {/* O fio de 1px é a assinatura do site; aqui ele se
                        desenha da esquerda no hover e fica na página atual.
                        Marca estado, não decora. */}
                    <span className="relative">
                      {item.label}
                      <span
                        aria-hidden
                        className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-pf-gold transition-transform duration-300 ease-pf group-hover:scale-x-100 group-focus-visible:scale-x-100 group-aria-[current=page]:scale-x-100"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={ctaItem.href}
          className="hidden whitespace-nowrap border border-pf-gold px-6 py-3 font-sans text-eyebrow font-bold uppercase text-pf-gold transition-colors duration-200 ease-pf hover:bg-pf-gold hover:text-pf-black xl:block"
        >
          {ctaItem.label}
        </Link>

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

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentPath={pathname}
      />
    </header>
  );
}
