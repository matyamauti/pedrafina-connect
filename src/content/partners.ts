// Parceiros fornecidos pelo cliente. Os primeiros logos têm fundo recortado;
// os novos conservam a arte original e recebem uma superfície compatível.
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
  lightTile?: boolean;
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
  { slug: "elementar", name: "Elementar", signature: "Cubas e Revestimentos", logo: "/parceiros/elementar.jpg", width: 1600, height: 1600, tileColor: "#000000", logoScale: 1.75 },
  { slug: "fernanda-helena", name: "Fernanda Helena", signature: "Arquitetura & Interiores", logo: "/parceiros/fernanda-helena.jpg", width: 1600, height: 900, tileColor: "#fbf8f1", lightTile: true },
  { slug: "arquiteto-dos-anjos", name: "Arquiteto dos Anjos", signature: "Projetos e regularização", logo: "/parceiros/arquiteto-dos-anjos.jpg", width: 1600, height: 972, tileColor: "#ffffff", lightTile: true, logoScale: 1.1 },
  { slug: "studio-mk", name: "Studio MK", signature: "Interiores · Concierge", logo: "/parceiros/studio-mk.jpg", width: 1599, height: 899, tileColor: "#000000", logoScale: 1.1 },
  { slug: "giovana-biazus", name: "Giovana Biazus", signature: "Arquitetura e Interiores", logo: "/parceiros/giovana-biazus.jpg", width: 1599, height: 1600, tileColor: "#3d4960", logoScale: 1.85 },
  { slug: "lara-jordana", name: "Lara Jordana", signature: "Arquitetura e Interiores", logo: "/parceiros/lara-jordana.jpg", width: 1181, height: 236, tileColor: "#e5d9c9", lightTile: true },
  { slug: "juliana-mantovani", name: "Juliana Mantovani", signature: "Arquitetura & Interiores", logo: "/parceiros/juliana-mantovani.jpg", width: 1600, height: 1600, tileColor: "#000000", logoScale: 1.8 },
  { slug: "nayara-samora", name: "Nayara Samora", signature: "Arquitetura e Interiores", logo: "/parceiros/nayara-samora.jpg", width: 1486, height: 1491, tileColor: "#f7f7f7", lightTile: true },
  { slug: "bruno-retameiro", name: "Bruno Retameiro", signature: "Arquitetura e Interiores", logo: "/parceiros/bruno-retameiro.jpg", width: 987, height: 238, tileColor: "#ffffff", lightTile: true },
  { slug: "jessica-inacio", name: "Jéssica Inácio", signature: "Arquitetura e Interiores", logo: "/parceiros/jessica-inacio.png", width: 4500, height: 4501, logoScale: 3 },
  { slug: "lar-arquitetura", name: "LAR", signature: "Arquitetura", logo: "/parceiros/lar-arquitetura.png", width: 268, height: 203, tileColor: "#000000", logoScale: 1.2 },
  { slug: "hall-3", name: "Hall-3", signature: "Montagens e Serviços", logo: "/parceiros/hall-3.jpeg", width: 1200, height: 400, tileColor: "#f7f7f7", lightTile: true },
];
