// Conteúdo oficial — págs. 5 e 6. As faixas seguem em dois atos,
// agora apresentados sob um único título para a jornada completa.
// Pontuações e prêmios não podem ser alterados.

export type RewardTier = {
  slug: string;
  points: string;
  label: string;
  image: string;
  alt: string;
};

export type RewardAct = {
  eyebrow: string;
  title?: string;
  tiers: RewardTier[];
};

export const rewardActs: RewardAct[] = [
  {
    eyebrow: "Primeiras conquistas",
    title: "Grandes trajetórias merecem grandes conquistas",
    tiers: [
      {
        slug: "vale-jantar",
        points: "30 mil",
        label: "Vale-jantar para o casal",
        image: "/conquistas/vale-jantar.webp",
        alt: "Mesa posta para jantar a dois, à luz de velas",
      },
      {
        slug: "terraco-italia",
        points: "70 mil",
        label: "Experiência gastronômica nas alturas / Terraço Itália",
        image: "/conquistas/terraco-italia.webp",
        alt: "Salão elegante com piano e vista noturna da cidade",
      },
      {
        slug: "macbook",
        points: "100 mil",
        label: "MacBook",
        image: "/conquistas/macbook.webp",
        alt: "Estação de trabalho com notebook sobre mesa de madeira",
      },
      {
        slug: "balao-boituva",
        points: "300 mil",
        label:
          "Final de semana com passeio de balão e hospedagem 5 estrelas em Boituva",
        image: "/conquistas/balao-boituva.webp",
        alt: "Balões coloridos no céu ao entardecer",
      },
    ],
  },
  {
    eyebrow: "Grandes experiências",
    tiers: [
      {
        slug: "cruzeiro",
        points: "500 mil",
        label: "Cruzeiro para uma pessoa",
        image: "/conquistas/cruzeiro.webp",
        alt: "Navio de cruzeiro ancorado diante de praia tropical",
      },
      {
        slug: "lencois-maranhenses",
        points: "700 mil",
        label:
          "Uma semana nos Lençóis Maranhenses para duas pessoas, com passagem e hospedagem",
        image: "/conquistas/lencois-maranhenses.webp",
        alt: "Dunas brancas entre lagoas de água turquesa",
      },
      {
        slug: "machu-picchu",
        points: "1 milhão",
        label:
          "Uma semana com passagem e hospedagem: Chile, Buenos Aires ou Machu Picchu",
        image: "/conquistas/machu-picchu.webp",
        alt: "Ruínas de Machu Picchu entre montanhas e névoa",
      },
    ],
  },
];
