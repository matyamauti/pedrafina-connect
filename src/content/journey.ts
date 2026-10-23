export type JourneyStep = {
  number: string;
  label: string;
  description: string;
  image: string;
};

export const journey = {
  eyebrow: "Como funciona o clube de pontuação",
  title: "Sua parceria gera pontos. Seus pontos geram conquistas.",
  steps: [
    {
      number: "01",
      label: "Faça parte do Connect",
      description: "Cadastre-se no Pedra Fina Connect e participe do nosso clube de relacionamento para profissionais parceiros.",
      image: "/cards/reuniao-arquitetura.png",
    },
    {
      number: "02",
      label: "Conecte seus projetos",
      description: "Indique o Grupo Pedra Fina para executar os projetos de marmoraria e marcenaria dos seus clientes.",
      image: "/cards/Conecte Seus Projetos a Materiais Premium.png",
    },
    {
      number: "03",
      label: "Acumule pontos",
      description: "Os negócios fechados por sua indicação geram pontos, conforme os critérios do regulamento do programa.",
      image: "/cards/Presente Dourado em Mármore Luxuoso.png",
    },
    {
      number: "04",
      label: "Acompanhe suas conquistas",
      description: "Acompanhe seu saldo e as metas de premiação para planejar suas próximas conquistas.",
      image: "/cards/Dashboard de Conquistas em Mármore e Ouro.png",
    },
    {
      number: "05",
      label: "Alcance recompensas",
      description: "Ao atingir as faixas de pontuação, tenha acesso às premiações correspondentes, conforme as regras do clube.",
      image: "/cards/Experiências de Viagem e Recompensas Luxuosas.png",
    },
    {
      number: "06",
      label: "Continue crescendo",
      description: "O programa tem ciclos anuais e os pontos têm validade de dois anos. Cada novo projeto é uma oportunidade de fortalecer nossa parceria e conquistar mais.",
      image: "/cards/Crescimento em mármore dourado.png",
    },
  ] satisfies JourneyStep[],
} as const;
