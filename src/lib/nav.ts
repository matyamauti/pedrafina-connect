export type NavItem = {
  href: string;
  label: string;
};

// Destinos principais do clube e uma ação de cadastro.
export const navItems: NavItem[] = [
  { href: "/#etapas-do-clube", label: "Como funciona" },
  { href: "/#parceiros", label: "Parceiros" },
  { href: "/#eventos", label: "Eventos" },
  { href: "/historia", label: "História" },
];

export const ctaItem: NavItem = { href: "/cadastro", label: "Cadastre-se" };
