import type { ReactNode } from "react";
import { Container } from "@/components/primitives/Container";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
};

// Abertura das páginas internas. O padding superior precisa limpar o header
// fixo (h-16, xl:h-20) sem deixar o título colado nele.
export function PageHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
}: PageHeaderProps) {
  const isLight = tone === "light";

  return (
    <header
      className={`pb-16 pt-32 xl:pt-40 ${isLight ? "surface-light" : "bg-pf-black"}`}
    >
      <Container>
        <Eyebrow tone={isLight ? "goldInk" : "gold"}>{eyebrow}</Eyebrow>
        <DisplayTitle as="h1" size="lg" className="mt-6 max-w-4xl">
          {title}
        </DisplayTitle>
        {lead ? (
          <p
            className={`mt-10 max-w-2xl font-sans text-base leading-relaxed sm:text-lg ${
              isLight ? "text-pf-graphite/75" : "text-pf-cream/70"
            }`}
          >
            {lead}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
