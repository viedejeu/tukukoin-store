export interface PaymentMethod {
  id: string;
  name: string;
  type: "E-Wallet" | "Transfer Bank" | "Scan QR";
  image: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "p1",
    name: "QRIS",
    type: "Scan QR",
    image: "/images/res.cloudinary.com/qris-logo-23d6d38343.png",
  },
  {
    id: "p2",
    name: "DANA",
    type: "E-Wallet",
    image: "/images/res.cloudinary.com/Logo_dana_blue.svg_eduyie-8b81920c92.webp",
  },
  {
    id: "p3",
    name: "GoPay",
    type: "E-Wallet",
    image: "/images/res.cloudinary.com/Gopay_logo.svg_ppvg2v-3710017e66.webp",
  },
  {
    id: "p4",
    name: "OVO",
    type: "E-Wallet",
    image: "/images/res.cloudinary.com/Logo_ovo_purple.svg_szquzn-aba465d66b.webp",
  },
  {
    id: "p5",
    name: "ShopeePay",
    type: "E-Wallet",
    image: "/images/res.cloudinary.com/Shopeepay_lyhyn8-4c50c3f832.svg",
  },
  {
    id: "p6",
    name: "BCA",
    type: "Transfer Bank",
    image: "/images/res.cloudinary.com/Bank_Central_Asia.svg_c5zrbe-bee91f410b.webp",
  },
  {
    id: "p7",
    name: "Mandiri",
    type: "Transfer Bank",
    image: "/images/res.cloudinary.com/Bank_Mandiri_logo_2016.svg_it64j6-a314205942.webp",
  },
  {
    id: "p8",
    name: "BNI",
    type: "Transfer Bank",
    image: "/images/res.cloudinary.com/Bank_Negara_Indonesia_logo__2004.svg_u4veag-6cbde7b51f.webp",
  },
  {
    id: "p9",
    name: "BRI",
    type: "Transfer Bank",
    image: "/images/res.cloudinary.com/BRI_2020_z1fj5w-0c0b30790d.svg",
  },
];
