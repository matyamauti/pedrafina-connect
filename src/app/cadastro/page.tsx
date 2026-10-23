import type { Metadata } from "next";
import { ProfessionalRegistrationForm } from "@/components/sections/ProfessionalRegistrationForm";

export const metadata: Metadata = {
  title: "Cadastro profissional",
  description:
    "Cadastre-se no Pedra Fina Connect e envie seus dados à nossa equipe pelo WhatsApp.",
  alternates: { canonical: "/cadastro" },
};

export default function CadastroPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
      <section className="relative flex flex-col justify-between overflow-hidden bg-pf-black px-5 pb-16 pt-36 text-pf-cream sm:px-8 lg:min-h-svh lg:px-14 lg:pb-20 lg:pt-44">
        <div className="relative z-10 max-w-xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-pf-gold">
            Pedra Fina Connect
          </p>
          <h1 className="mt-7 font-display text-[clamp(2.75rem,5vw,5rem)] font-medium leading-[1.06] tracking-[-0.045em]">
            Sua próxima parceria começa aqui.
          </h1>
          <p className="mt-8 max-w-[40ch] font-sans text-base leading-relaxed text-pf-cream/70 sm:text-lg">
            Um espaço para profissionais que transformam ideias em projetos e
            desejam construir com a Pedra Fina.
          </p>
        </div>
        <div className="relative z-10 mt-16 border-t border-pf-gold/40 pt-6 font-sans text-sm text-pf-cream/65">
          Marcenaria e marmoraria em uma mesma conversa.
        </div>
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full border border-pf-gold/10 sm:size-[30rem]" />
      </section>

      <section className="surface-light px-5 pb-20 pt-16 sm:px-8 lg:px-14 lg:pb-24 lg:pt-44" aria-labelledby="cadastro-titulo">
        <div className="mx-auto max-w-2xl">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-pf-gold-ink">
            Cadastro profissional
          </p>
          <h2 id="cadastro-titulo" className="mt-4 font-display text-[clamp(2rem,3vw,3rem)] font-medium leading-tight tracking-[-0.04em]">
            Conte um pouco sobre você
          </h2>
          <p className="mt-4 max-w-[55ch] font-sans text-base leading-relaxed text-pf-graphite/70">
            Preencha seus dados e continue no WhatsApp para enviar seu cadastro
            à equipe Pedra Fina Connect.
          </p>
          <ProfessionalRegistrationForm />
        </div>
      </section>
    </div>
  );
}
