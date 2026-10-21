export type NavItem = {
  href: string;
  label: string;
};

// Navegação enxuta: três destinos e uma ação. Quanto menos itens, mais peso
// cada um carrega — e a barra deixa de competir com o herói.
export const navItems: NavItem[] = [
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/reconhecimento", label: "Reconhecimento" },
  { href: "/projetos", label: "Projetos" },
  { href: "/parceiros", label: "Parceiros" },
];

export const ctaItem: NavItem = { href: "/cadastro", label: "Cadastre-se" };
