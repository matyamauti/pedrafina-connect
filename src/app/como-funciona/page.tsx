import type { Metadata } from "next";
import { journey } from "@/content/journey";
import { PageHeader } from "@/components/sections/PageHeader";
import { PointsLogic } from "@/components/sections/PointsLogic";
import { JourneySteps } from "@/components/sections/JourneySteps";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "Como funciona",
  description:
    "R$ 1 em contrato assinado equivale a 1 ponto. Marcenaria e marmoraria na mesma conta, RT independente, apuração anual e saldo válido por 2 anos.",
  alternates: { canonical: "/como-funciona" },
};

// A ordem segue o deck: primeiro o que gera ponto (pág. 3), depois o que
// acontece com ele (pág. 4). Claro para explicar, escuro para a regra.
export default function ComoFuncionaPage() {
  return (
    <>
      <PageHeader
        eyebrow={journey.eyebrow}
        title={journey.title}
        lead="Do contrato assinado ao resgate, sem letra miúda escondida."
      />
      <PointsLogic />
      <JourneySteps />
      <ClosingCTA />
    </>
  );
}
