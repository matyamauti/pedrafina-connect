type GoldRuleProps = {
  tone?: "gold" | "faint";
  className?: string;
};

// O fio de 1px que separa as lâminas. Decorativo: fica fora da árvore
// de acessibilidade.
export function GoldRule({ tone = "gold", className = "" }: GoldRuleProps) {
  const color = tone === "gold" ? "bg-pf-gold" : "bg-pf-gold/25";

  return <div aria-hidden className={`h-px w-full ${color} ${className}`} />;
}
