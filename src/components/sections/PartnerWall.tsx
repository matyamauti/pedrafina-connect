import Image from "next/image";
import { partners } from "@/content/partners";
import { Container } from "@/components/primitives/Container";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";

// Parede de parceiros. Cada logo aparece na cor da marca, com o fundo do
// arquivo removido — a grade é feita de fios de 1px, não de retângulos
// soltos. A célula só recebe cor quando a arte é clara demais para a
// superfície clara (ver tileColor em content/partners).
export function PartnerWall() {
  return (
    <section className="surface-light py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow tone="goldInk">Quem já constrói conosco</Eyebrow>
          <DisplayTitle className="mt-6">
            Escritórios que assinam a nossa rede
          </DisplayTitle>
        </div>

        <ul className="mt-20 grid grid-cols-2 gap-px bg-pf-gold-ink/20 md:grid-cols-3">
          {partners.map((partner) => (
            <li
              key={partner.slug}
              style={
                partner.tileColor
                  ? { backgroundColor: partner.tileColor }
                  : undefined
              }
              className={`flex min-h-[9.5rem] items-center justify-center px-8 py-12 transition-colors duration-500 ease-pf lg:min-h-[13rem] ${
                partner.tileColor ? "" : "bg-pf-cream hover:bg-white"
              }`}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                sizes="(min-width: 768px) 22rem, 45vw"
                // Teto de altura generoso: as logos verticais (Jennifer Novais,
                // DR Interiores) são limitadas pela altura e ficavam miúdas ao
                // lado das largas, que são limitadas pela largura.
                className="h-auto max-h-24 w-auto max-w-[11rem] lg:max-h-28 lg:max-w-[14rem]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
