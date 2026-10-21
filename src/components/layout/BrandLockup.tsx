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

  return (
    <span
      className={`whitespace-nowrap font-sans text-eyebrow font-bold uppercase ${base} ${className}`}
    >
      Pedra Fina
      <span aria-hidden className="mx-2 font-normal text-pf-gold">
        /
      </span>
      <span className="text-pf-gold">Connect</span>
    </span>
  );
}
