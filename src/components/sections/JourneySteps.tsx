import { journey } from "@/content/journey";
import { Container } from "@/components/primitives/Container";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

export function JourneySteps() {
  return (
    <section id="etapas-do-clube" aria-labelledby="etapas-do-clube-titulo" className="surface-light scroll-mt-16 py-24 lg:scroll-mt-20 lg:py-32">
      <Container>
        <div className="max-w-4xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-pf-gold-ink">{journey.eyebrow}</p>
          <h2 id="etapas-do-clube-titulo" className="mt-5 font-display text-[clamp(2.5rem,5vw,4.75rem)] font-medium leading-[1.08] tracking-[-0.045em] text-pf-graphite">
            {journey.title}
          </h2>
        </div>

        <div className="mt-14 lg:mt-20">
          <FeatureCarousel items={journey.steps} />
        </div>
      </Container>
    </section>
  );
}
