// Parceiros fornecidos pelo cliente. Os arquivos originais traziam cada um
// seu próprio fundo (branco, bege, verde, preto). O fundo foi removido e as
// cores da arte preservadas, para a grade não virar um mosaico de
// retângulos — cada logo aparece na cor da marca, recortado.
//
// Algumas artes claras precisam de uma superfície escura para manter a leitura.
// As escalas corrigem margens transparentes internas dos arquivos originais,
// sem alterar o desenho nem as cores das marcas.
//
// Os nomes e as identificações abaixo seguem as artes enviadas pelo cliente.

export type Partner = {
  slug: string;
  name: string;
  signature: string;
  logo: string;
  width: number;
  height: number;
  tileColor?: string;
  logoScale?: number;
  logoOffsetY?: string;
};

export const partners: Partner[] = [
  { slug: "adequar", name: "Adequar", signature: "Seu ambiente, seu estilo", logo: "/parceiros/adequar-cor.png", width: 620, height: 164 },
  { slug: "studio-1009", name: "Studio 1009", signature: "Arquitetura", logo: "/parceiros/studio-1009-cor.png", width: 534, height: 300 },
  { slug: "alinhar", name: "Alinhar Arquitetura", signature: "Arquitetura", logo: "/parceiros/alinhar-cor.png", width: 620, height: 197 },
  { slug: "my-arquitetura", name: "MY Arquitetura", signature: "Mariana Yamauti", logo: "/parceiros/my-arquitetura-cor.png", width: 307, height: 300, tileColor: "#44332e", logoScale: 0.9 },
  { slug: "maximo-correa", name: "Maximo & Correa", signature: "Arquitetura e Engenharia", logo: "/parceiros/maximo-correa-cor.png", width: 475, height: 300 },
  { slug: "jennifer-novais", name: "Jennifer Novais", signature: "Arquitetura e Interiores", logo: "/parceiros/jennifer-novais-cor.png", width: 215, height: 300, logoScale: 1.5, logoOffsetY: "35%" },
  { slug: "maga-paiva", name: "Maga Paiva", signature: "Design de Interiores", logo: "/parceiros/maga-paiva-cor.png", width: 620, height: 259 },
  {
    slug: "gabriella-tucillo",
    name: "Gabriella Tucillo",
    signature: "Arquitetura e Design",
    logo: "/parceiros/gabriella-tucillo-cor.png",
    width: 300,
    height: 300,
    tileColor: "#90A380",
    logoScale: 2.1,
  },
  { slug: "dr-interiores", name: "DR Interiores", signature: "Design de Interiores", logo: "/parceiros/dr-interiores-cor.png", width: 300, height: 300, logoScale: 2.1 },
];
