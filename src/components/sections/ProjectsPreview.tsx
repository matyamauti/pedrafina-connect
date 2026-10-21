import { projects } from "@/content/projects";
import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Placeholder } from "@/components/primitives/Placeholder";
import { Reveal } from "@/components/motion/Reveal";

export function ProjectsPreview() {
  return (
    <section className="surface-light py-24 lg:py-32">
      <Container>
        <Eyebrow tone="goldInk">Projetos das nossas parceiras</Eyebrow>
        <Reveal className="mt-6">
          <DisplayTitle>Arquitetura que inspira</DisplayTitle>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
          {projects.map((project) => (
            <li key={project.slug}>
              <Placeholder
                label="Foto real do projeto — principal"
                className="aspect-4/3 w-full"
              />
              <p className="mt-6 font-display text-display-sm font-medium tracking-[-0.025em] text-pf-graphite">
                {project.author}
              </p>
              <p className="mt-2 font-sans text-sm text-pf-graphite/70">
                {project.note}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-12 font-sans text-xs uppercase tracking-[0.18em] text-pf-graphite/50">
          Conteúdo demonstrativo — aguardando fotografias e nomes reais
        </p>

        <div className="mt-12">
          <Button href="/projetos" variant="ghostDark">
            Ver os projetos
          </Button>
        </div>
      </Container>
    </section>
  );
}
