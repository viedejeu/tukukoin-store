
import { getSultans } from "@/app/actions/sultanActions";
import { Crown, Trophy, TrendingUp } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaderboard | TukuKoin Topup',
  description: 'Papan Peringkat Top Spender TukuKoin Topup. Jadilah Sultan No. 1!',
};

export default async function LeaderboardPage() {
  const sultans = await getSultans();
  const top3 = sultans.slice(0, 3);
  const others = sultans.slice(3, 10);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16 relative">
        {/* Ambient glow removed */}
        <div className="inline-flex items-center justify-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-6">
          <Crown className="w-8 h-8 text-yellow-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-wider">
          Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Spenders</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Papan peringkat Top Spender bulan ini. Peringkat direset setiap tanggal 1. 
          Pertahankan posisi Anda di Peringkat 1 untuk mendapatkan Cashback Spesial!
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 pt-10">
        {/* Rank 2 */}
        {top3[1] && (
          <div className="order-2 md:order-1 flex flex-col items-center w-full md:w-1/3">
            <div className="relative mb-4">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-300 text-black text-xs font-bold px-2 py-1 rounded">Rank 2</div>
              <div className="w-24 h-24 rounded-full border-4 border-gray-400 bg-black-dark flex items-center justify-center shadow-[0_0_20px_rgba(156,163,175,0.4)] relative z-10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-500 to-black rounded-full opacity-60"></div>
                <span className="absolute text-3xl font-bold text-gray-300">2</span>
              </div>
            </div>
            <div className="bg-gradient-to-t from-gray-800 to-gray-700/50 w-full rounded-t-2xl border border-gray-600 p-4 text-center h-40 flex flex-col justify-end pb-6 shadow-xl">
              <h3 className="font-bold text-white text-lg truncate">{top3[1].name}</h3>
              <p className="text-yellow-500 font-black">Rp {top3[1].amount.toLocaleString('id-ID')}</p>
              <p className="text-xs text-gray-400 mt-1">{top3[1].favoriteGame}</p>
            </div>
          </div>
        )}

        {/* Rank 1 */}
        {top3[0] && (
          <div className="order-1 md:order-2 flex flex-col items-center w-full md:w-1/3 z-20">
            <div className="relative mb-4">
              <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-10 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] animate-pulse" />
              <div className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-black-dark flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.5)] relative z-10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-yellow-700 to-black rounded-full opacity-60"></div>
                <span className="absolute text-5xl font-bold text-yellow-400">1</span>
              </div>
            </div>
            <div className="bg-gradient-to-t from-yellow-900 to-yellow-700/40 w-full rounded-t-2xl border border-yellow-500 p-4 text-center h-52 flex flex-col justify-end pb-8 shadow-[0_-10px_40px_rgba(250,204,21,0.2)]">
              <h3 className="font-black text-white text-xl truncate">{top3[0].name}</h3>
              <p className="text-yellow-400 font-black text-lg">Rp {top3[0].amount.toLocaleString('id-ID')}</p>
              <p className="text-xs text-gray-300 mt-1">{top3[0].favoriteGame}</p>
            </div>
          </div>
        )}

        {/* Rank 3 */}
        {top3[2] && (
          <div className="order-3 md:order-3 flex flex-col items-center w-full md:w-1/3">
            <div className="relative mb-4">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded">Rank 3</div>
              <div className="w-24 h-24 rounded-full border-4 border-amber-700 bg-black-dark flex items-center justify-center shadow-[0_0_20px_rgba(180,83,9,0.4)] relative z-10 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-amber-700 to-black rounded-full opacity-60"></div>
                <span className="absolute text-3xl font-bold text-amber-700">3</span>
              </div>
            </div>
            <div className="bg-gradient-to-t from-amber-900/80 to-amber-900/30 w-full rounded-t-2xl border border-amber-800 p-4 text-center h-32 flex flex-col justify-end pb-4 shadow-xl">
              <h3 className="font-bold text-white text-md truncate">{top3[2].name}</h3>
              <p className="text-yellow-500 font-bold">Rp {top3[2].amount.toLocaleString('id-ID')}</p>
              <p className="text-xs text-gray-400 mt-1">{top3[2].favoriteGame}</p>
            </div>
          </div>
        )}
      </div>

      {/* Ranks 4-10 */}
      {others.length > 0 && (
        <div className="bg-black-light border border-black-border rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-black-border flex items-center gap-3">
            <TrendingUp className="text-gold w-5 h-5" />
            <h2 className="text-lg font-bold text-white">Challenger Board</h2>
          </div>
          <div className="divide-y divide-black-border">
            {others.map((sultan, idx) => (
              <div key={sultan.id} className="flex items-center justify-between p-4 md:p-6 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 rounded-full bg-black-dark border border-gray-600 flex items-center justify-center font-bold text-gray-400 group-hover:border-gold group-hover:text-gold transition-colors">
                    {sultan.rank}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{sultan.name}</h3>
                    <p className="text-xs text-gray-400">{sultan.maskedPhone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-yellow-500">Rp {sultan.amount.toLocaleString('id-ID')}</p>
                  <p className="text-xs text-gray-400">{sultan.favoriteGame}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
