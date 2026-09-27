export interface Sultan {
  id: string;
  rank: number;
  name: string;
  maskedPhone: string;
  amount: number;
  favoriteGame: string;
}

export const sultansFallback: Sultan[] = [
  { id: '1', rank: 1, name: 'Sultan_Andara', maskedPhone: '0812****8899', amount: 15500000, favoriteGame: 'Mobile Legends' },
  { id: '2', rank: 2, name: 'JessNoLimit', maskedPhone: '0856****1122', amount: 12400000, favoriteGame: 'Mobile Legends' },
  { id: '3', rank: 3, name: 'Bos_Muda', maskedPhone: '0899****7766', amount: 9800000, favoriteGame: 'Royal Dream' },
  { id: '4', rank: 4, name: 'Ratu_Gacha', maskedPhone: '0813****5544', amount: 8500000, favoriteGame: 'Genshin Impact' },
  { id: '5', rank: 5, name: 'Tukang_Pamer', maskedPhone: '0878****3322', amount: 7200000, favoriteGame: 'Free Fire' },
];
