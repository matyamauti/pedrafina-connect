import type { ReactNode } from "react";

type DisplayTitleProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-display-sm",
  md: "text-display-md",
  lg: "text-display-lg",
} as const;

export function DisplayTitle({
  children,
  as: Tag = "h2",
  size = "md",
  className = "",
}: DisplayTitleProps) {
  return (
    <Tag
      className={`font-display font-medium tracking-[-0.035em] text-balance ${sizes[size]} ${className}`}
    >
      {children}
    </Tag>
  );
}
