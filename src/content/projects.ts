// Conteúdo DEMONSTRATIVO — págs. 8 e 9 do deck trazem apenas marcações de
// lugar ("[ NOME DA ARQUITETA PARCEIRA ]"). Substituir quando chegarem as
// fotografias e os nomes reais.

export type Project = {
  slug: string;
  author: string;
  note: string;
  isPlaceholder: boolean;
};

export const projects: Project[] = [
  {
    slug: "projeto-01",
    author: "[ Nome da arquiteta parceira ]",
    note: "Obrigada por construir esta história conosco.",
    isPlaceholder: true,
  },
  {
    slug: "projeto-02",
    author: "[ Nome da arquiteta parceira ]",
    note: "Nosso agradecimento por transformar ideias em espaços memoráveis.",
    isPlaceholder: true,
  },
  {
    slug: "projeto-03",
    author: "[ Nome da arquiteta parceira ]",
    note: "Obrigada por construir esta história conosco.",
    isPlaceholder: true,
  },
];
