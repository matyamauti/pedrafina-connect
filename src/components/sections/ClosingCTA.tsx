import { closing } from "@/content/program";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Reveal } from "@/components/motion/Reveal";
import { RuleReveal } from "@/components/motion/RuleReveal";

export function ClosingCTA() {
  return (
    <section className="bg-pf-black pb-24 pt-20 lg:pb-32">
      <Container>
        <RuleReveal />

        <div className="mt-16 max-w-3xl">
          <Reveal>
            <DisplayTitle size="md">{closing.title}</DisplayTitle>
          </Reveal>
          <p className="mt-8 font-sans text-base leading-relaxed text-pf-cream/70 sm:text-lg">
            {closing.lead}
          </p>
          <div className="mt-12">
            <Button href="/cadastro" variant="gold">
              Cadastre-se
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
