// Parceiros fornecidos pelo cliente. Os arquivos originais traziam cada um
// seu próprio fundo (branco, bege, verde, preto). O fundo foi removido e as
// cores da arte preservadas, para a grade não virar um mosaico de
// retângulos — cada logo aparece na cor da marca, recortado.
//
// tileColor existe para um caso só: a Gabriella Tucillo tem arte branca,
// que sobre superfície clara dá 1,1:1 de contraste e sumiria. A célula dela
// leva o verde da própria marca. Medido, não estimado.
//
// PENDENTE: confirmar a grafia dos nomes, lidos dos próprios logos, e se há
// site de cada escritório para linkar.

export type Partner = {
  slug: string;
  name: string;
  logo: string;
  width: number;
  height: number;
  tileColor?: string;
};

export const partners: Partner[] = [
  { slug: "adequar", name: "Adequar", logo: "/parceiros/adequar-cor.png", width: 620, height: 164 },
  { slug: "studio-1009", name: "Studio 1009", logo: "/parceiros/studio-1009-cor.png", width: 534, height: 300 },
  { slug: "alinhar", name: "Alinhar Arquitetura", logo: "/parceiros/alinhar-cor.png", width: 620, height: 197 },
  { slug: "my-arquitetura", name: "MY Arquitetura", logo: "/parceiros/my-arquitetura-cor.png", width: 307, height: 300 },
  { slug: "maximo-correa", name: "Maximo & Correa", logo: "/parceiros/maximo-correa-cor.png", width: 475, height: 300 },
  { slug: "jennifer-novais", name: "Jennifer Novais", logo: "/parceiros/jennifer-novais-cor.png", width: 215, height: 300 },
  { slug: "maga-paiva", name: "Maga Paiva", logo: "/parceiros/maga-paiva-cor.png", width: 620, height: 259 },
  {
    slug: "gabriella-tucillo",
    name: "Gabriella Tucillo",
    logo: "/parceiros/gabriella-tucillo-cor.png",
    width: 300,
    height: 300,
    tileColor: "#90A380",
  },
  { slug: "dr-interiores", name: "DR Interiores", logo: "/parceiros/dr-interiores-cor.png", width: 300, height: 300 },
];
