import { journey } from "@/content/journey";
import { pointsLogic } from "@/content/points";
import { Container } from "@/components/primitives/Container";

// Os quatro passos da pág. 4 do deck. O fio acima de cada etapa é cinza,
// menos o do último, que é dourado — é assim no original e marca onde o
// percurso chega. Não é decoração: a sequência aqui é real.
export function JourneySteps() {
  return (
    <section className="surface-light pb-24 pt-20 lg:pb-32">
      <Container>
        <ol className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {journey.steps.map((step, index) => {
            const isLast = index === journey.steps.length - 1;

            return (
              <li key={step.number}>
                <div
                  aria-hidden
                  className={`h-px w-full ${
                    isLast ? "bg-pf-gold" : "bg-pf-graphite/20"
                  }`}
                />
                <p className="mt-8 font-display text-display-sm font-medium tabular-nums text-pf-gold-ink">
                  {step.number}
                </p>
                <h2 className="mt-6 font-sans text-eyebrow font-bold uppercase text-pf-graphite">
                  {step.label}
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-pf-graphite/75">
                  {step.description}
                </p>
              </li>
            );
          })}
        </ol>

        <p className="mt-20 text-center font-sans text-xs font-bold uppercase tracking-[0.18em] text-pf-graphite">
          {pointsLogic.disclaimer}
        </p>
      </Container>
    </section>
  );
}
