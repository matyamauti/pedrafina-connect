type BrandLockupProps = {
  tone?: "light" | "dark";
  className?: string;
};

// PENDENTE: a logomarca original (SVG/AI) ainda não foi fornecida.
// Até receber o arquivo, usamos um lockup tipográfico com a barra dourada.
export function BrandLockup({
  tone = "light",
  className = "",
}: BrandLockupProps) {
  const base = tone === "light" ? "text-pf-cream" : "text-pf-graphite";
  const accent = tone === "light" ? "text-pf-gold" : "text-pf-gold-ink";

  return (
    <span
      className={`whitespace-nowrap font-sans text-eyebrow font-bold uppercase ${base} ${className}`}
    >
      Pedra Fina
      <span aria-hidden className={`mx-2 font-normal ${accent}`}>
        /
      </span>
      <span className={accent}>Connect</span>
    </span>
  );
}
