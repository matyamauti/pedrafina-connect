import { whoBelongs } from "@/content/program";
import { Container } from "@/components/primitives/Container";
import { DisplayTitle } from "@/components/primitives/DisplayTitle";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { MemberRoles } from "@/components/sections/MemberRoles";
import { PartnerWall } from "@/components/sections/PartnerWall";
import { ScrollFocus } from "@/components/motion/ScrollFocus";

// Pág. 2 do deck: quem faz parte. Escuro para a declaração de identidade,
// claro para a prova — os escritórios que já estão na rede.
export function WhoBelongs() {
  return (
    <>
      <section className="bg-pf-black py-24 lg:py-0">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[46fr_54fr] lg:gap-20">
            {/* Parado no meio da tela enquanto a lista passa ao lado. O
                centramento vem de uma caixa da altura da janela com o
                conteúdo centrado dentro — e não de deslocar o elemento
                para cima, que o fazia transbordar por cima do herói. */}
            <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:self-start">
              <ScrollFocus>
                <Eyebrow>{whoBelongs.eyebrow}</Eyebrow>
                <DisplayTitle size="lg" className="mt-6">
                  {whoBelongs.title}
                </DisplayTitle>
                <p className="mt-10 font-display text-display-sm font-medium tracking-[-0.025em] text-pf-gold">
                  {whoBelongs.tagline}
                </p>
              </ScrollFocus>
            </div>

            <MemberRoles members={whoBelongs.members} />
          </div>
        </Container>
      </section>

      <PartnerWall />
    </>
  );
}
