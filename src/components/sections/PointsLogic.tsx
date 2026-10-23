import { pointsLogic } from "@/content/points";
import { Container } from "@/components/primitives/Container";
import { PointsScrollMask } from "@/components/sections/PointsScrollMask";
import TechText from "@/components/ui/TechText";

// Mantém a conta principal isolada das duas condições complementares.
// Nenhuma regra além das descritas no programa é inferida aqui.
export function PointsLogic() {
  return (
    <>
      <PointsScrollMask />

      <section id="regra-de-pontuacao" className="scroll-mt-16 bg-pf-graphite py-20 lg:scroll-mt-20 lg:py-28" aria-label="Como os pontos são calculados">
        <Container>
          <h2 className="h-20 text-pf-gold sm:h-28 lg:h-36">
            <span className="sr-only">Regra de pontuação</span>
            <div aria-hidden="true" className="h-full">
              <TechText
                text="Regra de pontuação"
                fontWeight={600}
                fontSize={150}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                intro="none"
                introDuration={2}
                clickKick
                guides={false}
                className="font-display"
              />
            </div>
          </h2>

          <div className="mt-10 grid gap-8 border-y border-pf-gold/30 py-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12 lg:py-16">
            <div>
              <p className="font-display text-[clamp(4rem,9vw,8rem)] font-medium leading-none tracking-[-0.06em] text-pf-cream tabular-nums">
                {pointsLogic.amount}
              </p>
              <p className="mt-4 font-sans text-base text-pf-cream/70 sm:text-lg">
                {pointsLogic.criterion}
              </p>
            </div>
            <span className="font-display text-3xl text-pf-gold lg:text-4xl">
              =
            </span>
            <div className="lg:text-right">
              <p className="font-display text-[clamp(3.25rem,8vw,7rem)] font-medium leading-none tracking-[-0.06em] text-pf-gold tabular-nums">
                {pointsLogic.result}
              </p>
              <p className="mt-4 font-sans text-base text-pf-cream/70 sm:text-lg">
                para acumular no clube
              </p>
            </div>
          </div>

          <div className="grid gap-12 border-b border-pf-gold/30 py-12 md:grid-cols-2 md:gap-16 lg:py-16">
            <div>
              <h3 className="font-display text-2xl font-medium tracking-[-0.025em] text-pf-cream sm:text-3xl">
                {pointsLogic.notes[0].label}
              </h3>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-pf-cream/65 sm:text-lg">
                Os valores das duas especialidades entram {pointsLogic.notes[0].detail}.
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-medium tracking-[-0.025em] text-pf-cream sm:text-3xl">
                {pointsLogic.aside}
              </h3>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-pf-cream/65 sm:text-lg">
                A pontuação do clube e a RT são tratadas separadamente.
              </p>
            </div>
          </div>

        </Container>
      </section>
    </>
  );
}
