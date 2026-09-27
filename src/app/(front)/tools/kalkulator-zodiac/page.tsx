"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ChevronRight } from 'lucide-react';
import ExpandableSeoBlock from '@/components/ExpandableSeoBlock';

export default function KalkulatorZodiac() {
  const [currentPoints, setCurrentPoints] = useState<string>('');
  
  const calculateCost = () => {
    const pts = parseInt(currentPoints);
    if (isNaN(pts)) return null;
    if (pts < 0 || pts >= 100) return "Poin Star Power harus di antara 0 sampai 99.";

    const needed = 100 - pts;
    // Maksimal diamond, asumsikan 1 spin = 1 poin (paling apes). 1 spin = 20 diamond.
    // Jika diskon, biasanya minggu pertama diskon 30%. Kita hitung harga normal saja.
    const maxDiamonds = needed * 20;
    
    return {
      spins: needed,
      diamonds: maxDiamonds,
      rupiah: maxDiamonds * 280 // estimasi
    };
  };

  const result = calculateCost();

  const seoText = `
    <p>Kalkulator Zodiac Mobile Legends dirancang khusus untuk memprediksi berapa jumlah maksimal diamond yang harus Anda siapkan demi meminang Skin Zodiac bulanan.</p>
    <p>Sistem Zodiac Summon membutuhkan 100 Star Power agar skin tersebut dijamin keluar. Namun, karena setiap putaran bisa menghasilkan 1 hingga 5 Star Power secara acak, angka yang dihasilkan kalkulator ini adalah <strong>perkiraan maksimal (paling sial)</strong> jika Anda terus-menerus hanya mendapat 1 Star Power per putaran.</p>
    <p><strong>Tips Gacha Zodiac MLBB:</strong><br/>
    1. Pastikan Anda gacha di minggu pertama perilisan skin untuk menikmati Diskon 30% Zodiac Summon.<br/>
    2. Kumpulkan Aurora Crystal dari event top up atau langganan bulanan karena Aurora Crystal bisa menggantikan Diamond untuk spin Zodiac.<br/>
    3. Semakin banyak skin Zodiac yang Anda miliki sebelumnya, Anda akan mendapat tambahan modal Star Power di awal putaran.<br/>
    4. Top up kebutuhan diamond harian Anda dengan harga terjangkau hanya di TukuKoin Topup.</p>
  `;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/tools" className="hover:text-gold transition-colors">Tools</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Kalkulator Zodiac</span>
      </div>

      <div className="bg-black-light border border-black-border rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient glow removed */}
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-black-dark p-4 rounded-xl border border-black-border">
            <Calculator className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Kalkulator Zodiac</h1>
            <p className="text-gray-400 text-sm">Hitung diamond maksimal untuk Skin Zodiac MLBB</p>
          </div>
        </div>

        <div className="space-y-5 mb-8 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Poin Star Power Saat Ini</label>
            <input 
              type="number" 
              placeholder="Contoh: 60" 
              value={currentPoints}
              onChange={(e) => setCurrentPoints(e.target.value)}
              className="w-full bg-black-dark border border-black-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all"
            />
          </div>
        </div>

        {typeof result === 'string' && (
          <p className="text-red-400 mb-6 text-sm">{result}</p>
        )}

        {result && typeof result !== 'string' && (
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-6 mb-8 animate-in fade-in zoom-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Dibutuhkan Maksimal (Normal)</p>
                <p className="text-3xl font-bold text-white">{result.diamonds} <span className="text-lg text-yellow-500 font-normal">Diamond</span></p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Estimasi Harga (Rupiah)</p>
                <p className="text-3xl font-bold text-white">± Rp {result.rupiah.toLocaleString('id-ID')}</p>
              </div>
            </div>
            <p className="text-yellow-200/60 text-xs text-center mt-4">*Asumsi 1x spin (20 DM) hanya dapat 1 Star Power. Jika sedang diskon minggu pertama, biayanya jauh lebih murah!</p>
          </div>
        )}

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">Persiapkan Diamond Anda!</h3>
          <p className="text-gray-300 text-sm mb-4">Masa berlaku Skin Zodiac hanya 1 bulan. Top up diamond MLBB murah sekarang sebelum rasi bintang berganti!</p>
          <Link href="/game/mobile-legends" className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            Top Up MLBB Termurah
          </Link>
        </div>
      </div>

      <ExpandableSeoBlock content={seoText} title="Kalkulator Zodiac MLBB" />
    </div>
  );
}
