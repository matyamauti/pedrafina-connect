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

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHeader
        eyebrow={journey.eyebrow}
        title="Conheça o clube de pontuação"
        lead="Entenda como cada projeto indicado pode gerar pontos e abrir caminho para novas conquistas."
      />
      <PointsLogic />
      <JourneySteps />
      <ClosingCTA />
    </>
  );
}
