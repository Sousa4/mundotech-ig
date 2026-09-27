export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "powerbank-solar",
    name: "Power Bank Solar Peining 10000mAh",
    price: 119.90,
    oldPrice: 179.90,
    category: "Cabos e Acessórios",
    image: "/produtos/powerbank-caixa.jpeg",
    images: [
      "/produtos/powerbank-caixa.jpeg",
      "/produtos/powerbank-mao.jpeg"
    ],
    description: "Carregador portátil resistente com painel solar integrado para carregamento de emergência em qualquer lugar.",
    rating: 4.9,
    reviews: 31,
    badge: "Mais Vendido"
  },
  {
    id: "balanca-digital",
    name: "Balança Digital de Precisão",
    price: 29.90,
    oldPrice: 49.90,
    category: "Utilidades",
    image: "/produtos/balanca-caixa.jpeg",
    images: [
      "/produtos/balanca-caixa.jpeg",
      "/produtos/balanca-detalhe.jpeg"
    ],
    description: "Balança digital compacta de alta precisão para uso culinário ou profissional.",
    rating: 4.8,
    reviews: 15
  },
  {
    id: "carregador-portatil",
    name: "Carregador Portátil Compacto",
    price: 49.90,
    oldPrice: 79.90,
    category: "Cabos e Acessórios",
    image: "/produtos/carregador-caixa.jpeg",
    images: [
      "/produtos/carregador-caixa.jpeg",
      "/produtos/carregador-detalhe.jpeg"
    ],
    description: "Carregador compacto e seguro com portas USB de alta velocidade.",
    rating: 4.7,
    reviews: 12
  },
  {
    id: "fonte-veicular-hmaston",
    name: "Fonte Veicular Hmaston Turbo",
    price: 19.90,
    oldPrice: 35.00,
    category: "Cabos e Acessórios",
    image: "/produtos/hmaston-caixa.jpeg",
    images: [
      "/produtos/hmaston-caixa.jpeg",
      "/produtos/hmaston-produto.jpeg"
    ],
    description: "Carregador automotivo turbo de alta performance para manter o seu smartphone sempre carregado.",
    rating: 4.9,
    reviews: 22,
    badge: "Destaque"
  },
  {
    id: "maquina-cortar-cabelo",
    name: "Máquina de Cortar Cabelo Sem Fio",
    price: 59.90,
    oldPrice: 99.90,
    category: "Periféricos",
    image: "/produtos/maquina-cabelo.jpeg",
    images: [
      "/produtos/maquina-cabelo.jpeg"
    ],
    description: "Máquina de corte profissional sem fio, ergonómica e de excelente precisão.",
    rating: 4.6,
    reviews: 18
  },
  {
    id: "lanterna-tatica",
    name: "Lanterna Tática Recarregável",
    price: 39.90,
    oldPrice: 69.90,
    category: "Utilidades",
    image: "/produtos/lanterna-caixa.jpeg",
    images: [
      "/produtos/lanterna-caixa.jpeg",
      "/produtos/lanterna-branca.jpeg",
      "/produtos/lanterna-vermelha.jpeg"
    ],
    description: "Lanterna tática de alta potência com múltiplos modos de iluminação e foco ajustável.",
    rating: 4.8,
    reviews: 25
  },
  {
    id: "microfone-sem-fio",
    name: "Microfone de Lapela Sem Fio",
    price: 79.90,
    oldPrice: 120.00,
    category: "Áudio",
    image: "/produtos/microfone-caixa.jpeg",
    images: [
      "/produtos/microfone-caixa.jpeg",
      "/produtos/microfone-uso.jpeg"
    ],
    description: "Microfone de lapela sem fio ideal para gravações de vídeos, lives e podcasts com som limpo.",
    rating: 4.9,
    reviews: 40,
    badge: "Novo"
  },
  {
    id: "rastreador-bluetooth",
    name: "Rastreador Inteligente Bluetooth",
    price: 35.00,
    oldPrice: 59.90,
    category: "Periféricos",
    image: "/produtos/rastreador-caixa.jpeg",
    images: [
      "/produtos/rastreador-caixa.jpeg",
      "/produtos/rastreador-detalhe.jpeg"
    ],
    description: "Localizador inteligente para chaves, malas, carteiras e objetos pessoais.",
    rating: 4.5,
    reviews: 14
  }
];