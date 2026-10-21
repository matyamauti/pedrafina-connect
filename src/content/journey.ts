// Conteúdo oficial — pág. 4 do deck. São estas as quatro etapas e nenhuma
// outra: não derivar prazos, carências ou condições que o documento não diz.
// O regulamento completo é enviado individualmente ao profissional.

export type JourneyStep = {
  number: string;
  label: string;
  description: string;
};

export const journey = {
  eyebrow: "Como funciona",
  title: "Seu percurso no Connect Club",
  steps: [
    {
      number: "01",
      label: "Apuração",
      description: "A apuração acontece anualmente.",
    },
    {
      number: "02",
      label: "Resgate",
      description: "Ao atingir uma faixa, você escolhe resgatar.",
    },
    {
      number: "03",
      label: "Débito",
      description: "Somente os pontos usados são debitados.",
    },
    {
      number: "04",
      label: "Saldo",
      description: "O restante continua válido por 2 anos.",
    },
  ] satisfies JourneyStep[],
} as const;
