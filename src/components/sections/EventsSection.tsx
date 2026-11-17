import { Container } from "@/components/primitives/Container";
import { EventCard } from "@/components/ui/event-card";

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
          <li className="w-full">
            <EventCard
              eventName="Treinamento com a Cosentino"
              description="Pedra Fina Mármores e Cosentino"
              dateTime="2027-02"
              month="Fevereiro"
              year="2027"
              imageUrl="/eventos/cosentino.webp"
              imageAlt="Pedra Fina Mármores e Cosentino sobre superfície de mármore"
              imageFit="cover"
            />
          </li>

          <li className="w-full">
            <EventCard
              eventName="Premiação Pedra Fina Connect"
              description="Uma celebração das conquistas dos nossos parceiros."
              dateTime="2027-02"
              month="Fevereiro"
              year="2027"
              imageUrl="/eventos/pedra-fina-connect.webp"
              imageAlt="Monograma dourado Pedra Fina Connect"
              imageFit="contain"
              delay={0.14}
            />
          </li>
        </ul>
      </Container>
    </section>
  );
}
