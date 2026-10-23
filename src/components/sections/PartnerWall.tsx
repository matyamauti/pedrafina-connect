import Image from "next/image";
import { partners } from "@/content/partners";
import { Container } from "@/components/primitives/Container";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";

// A mesma área de exibição e o nome abaixo dão leitura consistente a artes
// horizontais e verticais, sem forçar as marcas a uma proporção única.
export function PartnerWall() {
  return (
    <section id="parceiros" className="surface-light scroll-mt-16 py-24 lg:scroll-mt-20 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow tone="goldInk">Quem já constrói conosco</Eyebrow>
          <DisplayTitle className="mt-6">
            Profissionais e escritórios que constroem conosco
          </DisplayTitle>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-px bg-pf-gold-ink/20 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {partners.map((partner) => (
            <li
              key={partner.slug}
              style={
                partner.tileColor
                  ? { backgroundColor: partner.tileColor }
                  : undefined
              }
              className={`flex min-h-64 flex-col items-center justify-center px-6 py-8 sm:min-h-72 lg:min-h-76 ${
                partner.tileColor ? "" : "bg-pf-cream"
              }`}
            >
              <div className="relative h-32 w-full max-w-72 overflow-hidden sm:h-36">
                <Image
                  src={partner.logo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 18rem"
                  className="object-contain"
                  style={{
                    transform: `translateY(${partner.logoOffsetY ?? "0%"}) scale(${partner.logoScale ?? 1})`,
                  }}
                />
              </div>
              <p
                className={`mt-4 text-center font-sans text-base font-medium leading-snug sm:text-lg ${
                  partner.tileColor ? "text-pf-cream" : "text-pf-graphite"
                }`}
              >
                {partner.name}
              </p>
              <p className={`mt-1 text-center font-sans text-xs leading-relaxed ${partner.tileColor ? "text-pf-cream/70" : "text-pf-graphite/60"}`}>
                {partner.signature}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
