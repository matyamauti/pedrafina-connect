import type { Metadata } from "next";
import { HistoryPortal } from "@/components/sections/HistoryPortal";

export const metadata: Metadata = {
  title: "História",
  description:
    "Conheça a trajetória de Robinson, a origem do Grupo Pedra Fina e a essência do Pedra Fina Connect.",
  alternates: { canonical: "/historia" },
};

export default function HistoriaPage() {
  return (
    <div className="bg-pf-cream text-pf-graphite">
      <HistoryPortal />
    </div>
  );
}
