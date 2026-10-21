import type { ElementType, ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  tone?: "gold" | "goldInk";
  className?: string;
};

// Label em caixa alta com tracking largo: é a assinatura do deck original,
// presente nas 12 páginas. tone="goldInk" nas superfícies claras.
export function Eyebrow({
  children,
  as: Tag = "p",
  tone = "gold",
  className = "",
}: EyebrowProps) {
  const color = tone === "gold" ? "text-pf-gold" : "text-pf-gold-ink";

  return (
    <Tag
      className={`font-sans text-eyebrow font-bold uppercase ${color} ${className}`}
    >
      {children}
    </Tag>
  );
}
