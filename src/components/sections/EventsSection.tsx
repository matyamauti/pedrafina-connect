import Image from "next/image";
import { Container } from "@/components/primitives/Container";

export function EventsSection() {
  return (
    <section
      id="eventos"
      aria-labelledby="eventos-titulo"
      className="scroll-mt-16 bg-pf-graphite py-24 text-pf-cream lg:scroll-mt-20 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-7 border-t border-pf-gold/45 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-pf-gold">
              Calendário de eventos
            </p>
            <h2
              id="eventos-titulo"
              className="mt-5 max-w-[18ch] font-display text-[clamp(2.5rem,5vw,4.75rem)] font-medium leading-[1.08] tracking-[-0.045em]"
            >
              Acontece no Pedra Fina Connect
            </h2>
          </div>
          <p className="max-w-[36ch] font-sans text-base leading-relaxed text-pf-cream/65 lg:pb-2 lg:text-lg">
            Encontros que aproximam profissionais e celebram as conquistas do clube.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <li>
            <article className="h-full overflow-hidden border border-pf-gold/25 bg-pf-black">
              <div className="relative aspect-[16/10] overflow-hidden bg-pf-cream">
                <Image
                  src="/eventos/cosentino.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-center"
                />
                <div aria-hidden className="pointer-events-none absolute inset-3 border border-pf-black/15 sm:inset-5" />
              </div>
              <div className="grid gap-5 border-t border-pf-gold/25 px-6 py-8 sm:grid-cols-[7.5rem_1fr] sm:gap-8 sm:px-8 sm:py-9">
                <time dateTime="2027-02" className="font-sans text-xs font-bold uppercase leading-relaxed tracking-[0.12em] text-pf-gold">
                  Fevereiro<br />2027
                </time>
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-tight tracking-[-0.035em]">
                    Evento Cosentino
                  </h3>
                  <p className="mt-3 font-sans text-sm text-pf-cream/60">
                    Pedra Fina Mármores e Cosentino
                  </p>
                </div>
              </div>
            </article>
          </li>

          <li>
            <article className="h-full overflow-hidden border border-pf-gold/25 bg-pf-black">
              <div className="relative aspect-[16/10] overflow-hidden bg-pf-black">
                <Image
                  src="/eventos/pedra-fina-connect.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain p-3 sm:p-5"
                />
                <div aria-hidden className="pointer-events-none absolute inset-3 border border-pf-gold/20 sm:inset-5" />
              </div>
              <div className="grid gap-5 border-t border-pf-gold/25 px-6 py-8 sm:grid-cols-[7.5rem_1fr] sm:gap-8 sm:px-8 sm:py-9">
                <div>
                  <time className="block" aria-label="19 de novembro">
                    <span className="block font-display text-[clamp(3.75rem,5vw,5rem)] font-medium leading-none tracking-[-0.06em] text-pf-gold">
                      19
                    </span>
                    <span className="mt-1 block font-sans text-sm font-semibold uppercase tracking-[0.08em] text-pf-cream">
                      Novembro
                    </span>
                  </time>
                  <p className="mt-3 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-pf-gold/80">
                    Evento anual
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-tight tracking-[-0.035em]">
                    Premiação Pedra Fina Connect
                  </h3>
                  <p className="mt-3 font-sans text-sm text-pf-cream/60">
                    Uma celebração das conquistas dos nossos parceiros.
                  </p>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </Container>
    </section>
  );
}
