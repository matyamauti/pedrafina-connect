import { pointsLogic } from "@/content/points";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Placeholder } from "@/components/primitives/Placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { RuleReveal } from "@/components/motion/RuleReveal";

// Pág. 3 do deck. A regra usa a mesma família do restante do site.
export function PointsLogic() {
  return (
    <section className="bg-pf-graphite">
      <div className="grid grid-cols-1 lg:grid-cols-[38fr_62fr]">
        <Placeholder
          tone="dark"
          label="Textura — pedra com veios dourados"
          className="min-h-[18rem] lg:min-h-[44rem]"
        />

        <div className="flex items-center py-24 lg:py-36">
          <Container className="lg:max-w-none lg:pl-20">
            <Eyebrow>{pointsLogic.eyebrow}</Eyebrow>

            <Reveal className="mt-12">
              <p className="font-sans text-display-lg font-normal leading-none tracking-[-0.04em] text-pf-cream">
                {pointsLogic.amount}
              </p>
            </Reveal>

            <Reveal className="mt-5" delay={0.1}>
              <p className="font-sans text-lg font-normal leading-relaxed text-pf-cream/75 sm:text-xl">
                {pointsLogic.equation}
              </p>
            </Reveal>

            <RuleReveal tone="faint" className="my-14 max-w-xl" />

            <dl className="flex max-w-xl flex-col gap-7">
              {pointsLogic.notes.map((note) => (
                <div key={note.label}>
                  <dt className="font-sans text-base text-pf-cream">
                    {note.label}
                  </dt>
                  <dd className="mt-1 font-sans text-base text-pf-cream/55">
                    {note.detail}
                  </dd>
                </div>
              ))}

              <div>
                <dt className="font-sans text-base text-pf-cream">
                  {pointsLogic.aside}
                </dt>
              </div>
            </dl>

            <p className="mt-16 max-w-xl font-sans text-xs leading-relaxed text-pf-cream/40">
              {pointsLogic.disclaimer}
            </p>
          </Container>
        </div>
      </div>
    </section>
  );
}
