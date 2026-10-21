"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";

type MemberRolesProps = {
  members: readonly string[];
};

// Foco contínuo amarrado à rolagem: o item sob o centro da tela fica em
// opacidade cheia e os demais recuam, tudo interpolado com scrub.
//
// O piso é 0.4, não 0.2: creme a 20% sobre preto dá 2.5:1 de contraste e
// reprovaria até para texto grande. A 40% são 3.8:1, acima do mínimo de
// 3:1, e o salto para 1.0 continua bem visível.
const DIM = 0.4;

// Deslocamento vertical de cada escrita ao atravessar o foco. Quem anda é
// só o texto — a linha e a borda da fileira ficam paradas, senão abririam
// vãos entre as fileiras. Fica abaixo do respiro da fileira (24px) para o
// movimento não precisar de recorte, que cortaria os acentos.
const DESLOCAMENTO = 18;

export function MemberRoles({ members }: MemberRolesProps) {
  const root = useRef<HTMLOListElement>(null);

  useIsomorphicLayoutEffect(() => {
    const context = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".member-item", root.current);
      const texts = gsap.utils.toArray<HTMLElement>(".member-text", root.current);
      const lines = gsap.utils.toArray<HTMLElement>(".member-line", root.current);

      if (rows.length < 2) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(texts, {
          opacity: (index) => (index === 0 ? 1 : DIM),
          y: (index) => (index === 0 ? 0 : DESLOCAMENTO),
        });
        gsap.set(lines, { scaleX: (index) => (index === 0 ? 1 : 0) });

        // Uma linha do tempo só: acende e sobe os seguintes, apaga e
        // continua subindo os anteriores, com o fio acompanhando.
        const dimmer = gsap
          .timeline()
          .to(texts.slice(1), { opacity: 1, y: 0, stagger: 0.5 }, 0)
          .to(lines.slice(1), { scaleX: 1, stagger: 0.5 }, 0)
          .to(
            texts.slice(0, -1),
            { opacity: DIM, y: -DESLOCAMENTO, stagger: 0.5 },
            0,
          )
          .to(lines.slice(0, -1), { scaleX: 0, stagger: 0.5 }, 0);

        const trigger = ScrollTrigger.create({
          trigger: rows[0],
          endTrigger: rows[rows.length - 1],
          start: "center center",
          end: "center center",
          animation: dimmer,
          scrub: 0.2,
        });

        return () => trigger.kill();
      });

      // Sem o ramo de movimento reduzido nada é aplicado: a lista nasce
      // inteira legível e parada, que é o estado certo para quem pediu
      // menos movimento — e também se o JS falhar.
      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  // O respiro em vh é o que alonga o travamento do bloco da esquerda: ele
  // dura "altura da lista menos a janela", então um padding proporcional à
  // tela mantém a duração certa em qualquer monitor. De quebra, a primeira
  // e a última categoria também passam pelo centro.
  return (
    <ol ref={root} className="mt-12 lg:mt-0 lg:pt-[22vh] lg:pb-[48vh]">
      {members.map((member) => (
        <li
          key={member}
          className="member-item border-t border-pf-cream/10 last:border-b"
        >
          {/* Fileiras altas de propósito: a lista precisa ser mais alta que a
              janela, senão não sobra percurso para o bloco da esquerda ficar
              fixo — e o foco rolante só faz sentido com uma por vez no
              centro. */}
          <div className="py-7 lg:py-28">
            <span className="member-text block font-display text-[1.375rem] font-medium tracking-[-0.025em] text-pf-cream lg:text-4xl">
              {member}
            </span>
          </div>

          <div aria-hidden className="member-line h-px origin-left bg-pf-gold" />
        </li>
      ))}
    </ol>
  );
}
