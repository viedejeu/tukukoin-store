export interface Game {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  developer: string;
  isAvailable?: boolean;
  currency?: string;
  externalUrl?: string;
  category?: string;
  seoContent?: string;
  order?: number;
}

export const games: Game[] = [
  {
    id: "g1",
    name: "Royal Dream",
    slug: "royal-dream",
    description: "Top up koin Royal Dream dengan proses cepat dan mudah.",
    image: "/images/res.cloudinary.com/unnamed-a7b16113ad.webp",
    developer: "Higgs Games",
    isAvailable: true,
    currency: "Koin",
    externalUrl: "https://tukukoin.com/royal-dream/top-up",
  },
  {
    id: "g2",
    name: "Higgs Domino",
    slug: "higgs-domino",
    description: "Top up Higgs Domino koin MD murah dan aman.",
    image: "/images/res.cloudinary.com/c604e18f99a30bf76daa205687467c32icon-55ffcbad36.png",
    developer: "Higgs Games",
    isAvailable: true,
    currency: "Koin MD",
    externalUrl: "https://tukukoin.com/higgs-domino/top-up",
  },
  {
    id: "g3",
    name: "Mobile Legends",
    slug: "mobile-legends",
    description: "Top up Diamond Mobile Legends (MLBB) termurah.",
    image: "/images/res.cloudinary.com/mobilelegends-1696089976653-667686d747.jpg",
    developer: "Moonton",
    isAvailable: false,
    currency: "Diamond",
  },
  {
    id: "g4",
    name: "Free Fire",
    slug: "free-fire",
    description: "Top up Diamond Free Fire (FF) kilat.",
    image: "/images/res.cloudinary.com/ff-68c1481c17.jpg",
    developer: "Garena",
    isAvailable: false,
    currency: "Diamond",
  },
  {
    id: "g5",
    name: "PUBG Mobile",
    slug: "pubg-mobile",
    description: "Top up UC PUBG Mobile resmi.",
    image: "/images/res.cloudinary.com/pubg-4d9b3a6e90.webp",
    developer: "Tencent Games",
    isAvailable: false,
    currency: "UC",
  },
  {
    id: "g6",
    name: "Neo Party",
    slug: "neo-party",
    description: "Top up Neo Party termurah dan aman.",
    image: "/images/res.cloudinary.com/neoparty-57f87d0b93.png",
    developer: "Neo Games",
    isAvailable: false,
    currency: "Koin",
  },
];
