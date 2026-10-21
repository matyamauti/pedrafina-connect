type PlaceholderProps = {
  label: string;
  tone?: "light" | "dark";
  className?: string;
};

// Marcação de lugar para fotografia ainda não fornecida. Segue a convenção
// do próprio deck (págs. 8 e 9), que rotula cada imagem pendente em vez de
// usar arte genérica.
export function Placeholder({
  label,
  tone = "light",
  className = "",
}: PlaceholderProps) {
  const surface =
    tone === "light"
      ? "bg-pf-stone-200 text-pf-graphite/60"
      : "bg-pf-graphite text-pf-cream/40 ring-1 ring-inset ring-pf-gold/15";

  return (
    <div
      role="img"
      aria-label={`Imagem pendente: ${label}`}
      className={`flex items-center justify-center p-6 ${surface} ${className}`}
    >
      <span className="text-center font-sans text-eyebrow font-bold uppercase">
        {label}
      </span>
    </div>
  );
}
