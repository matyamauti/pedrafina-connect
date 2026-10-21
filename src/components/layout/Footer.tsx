import Link from "next/link";
import { navItems } from "@/lib/nav";
import { BrandLockup } from "@/components/layout/BrandLockup";
import { Container } from "@/components/primitives/Container";
import { GoldRule } from "@/components/primitives/GoldRule";

// "use cache": com cacheComponents ligado, o ano do copyright é um valor
// instável no prerender. Cacheado, ele vira estático e atualiza a cada deploy.
export async function Footer() {
  "use cache";

  const year = new Date().getFullYear();

  return (
    <footer className="bg-pf-black pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-20">
      <Container>
        <GoldRule tone="faint" />

        <div className="flex flex-col gap-12 pt-10 lg:flex-row lg:justify-between">
          <BrandLockup />

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-1 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-3 font-sans text-sm text-pf-cream/70 transition-colors duration-200 ease-pf hover:text-pf-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-pf-cream/50">
            © {year} Pedra Fina. Todos os direitos reservados.
          </p>
          <Link
            href="/privacidade"
            className="inline-block py-3.5 font-sans text-xs text-pf-cream/50 transition-colors duration-200 ease-pf hover:text-pf-gold"
          >
            Política de privacidade
          </Link>
        </div>
      </Container>
    </footer>
  );
}
