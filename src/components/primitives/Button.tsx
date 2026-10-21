import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "gold" | "ghostLight" | "ghostDark";
  className?: string;
};

const variants = {
  gold: "border-pf-gold bg-pf-gold text-pf-black hover:bg-transparent hover:text-pf-gold",
  ghostLight: "border-pf-gold text-pf-gold hover:bg-pf-gold hover:text-pf-black",
  ghostDark:
    "border-pf-gold-ink text-pf-gold-ink hover:bg-pf-gold-ink hover:text-pf-cream",
} as const;

export function Button({
  href,
  children,
  variant = "ghostLight",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-block border px-8 py-4 font-sans text-eyebrow font-bold uppercase transition-colors duration-200 ease-pf active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
