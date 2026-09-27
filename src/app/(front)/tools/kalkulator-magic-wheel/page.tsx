"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ChevronRight } from 'lucide-react';
import ExpandableSeoBlock from '@/components/ExpandableSeoBlock';

export default function KalkulatorMagicWheel() {
  const [currentPoints, setCurrentPoints] = useState<string>('');
  
  const calculateCost = () => {
    const pts = parseInt(currentPoints);
    if (isNaN(pts)) return null;
    if (pts < 0 || pts >= 200) return "Poin harus di antara 0 sampai 199.";

    const needed = 200 - pts;
    const spins5 = Math.floor(needed / 5);
    const spins1 = needed % 5;
    
    const cost5 = spins5 * 270;
    const cost1 = spins1 * 60;
    const totalDiamonds = cost5 + cost1;
    
    return {
      spins: needed,
      diamonds: totalDiamonds,
      rupiah: totalDiamonds * 280 // estimasi kasar harga dm Rp 280
    };
  };

  const result = calculateCost();

  const seoText = `
    <p>Kalkulator Magic Wheel MLBB adalah alat bantu yang digunakan untuk menghitung sisa diamond dan perkiraan uang Rupiah yang dibutuhkan untuk mendapatkan Skin Legend idaman Anda di Mobile Legends.</p>
    <p>Sistem Magic Wheel di Mobile Legends menjamin pemain akan mendapatkan hadiah utama (Magic Crystal / Magic Core) jika mereka mencapai batas maksimal 200 putaran (poin). Namun, untuk melakukan putaran ini membutuhkan jumlah diamond yang tidak sedikit.</p>
    <p><strong>Cara Hemat Spin Magic Wheel:</strong><br/>
    1. Manfaatkan diskon 20% yang biasa hadir di event-event tertentu.<br/>
    2. Gunakan potion gratis (Magic Wheel Potion) yang bisa didapat dari Starlight Member atau event bulanan.<br/>
    3. Selalu lakukan spin opsi "5x Spin" seharga 270 Diamond karena lebih murah dibanding spin satuan.<br/>
    4. Beli diamond MLBB dengan harga paling miring dan terpercaya hanya di TukuKoin Topup!</p>
  `;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/tools" className="hover:text-gold transition-colors">Tools</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Kalkulator Magic Wheel</span>
      </div>

      <div className="bg-black-light border border-black-border rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient glow removed */}
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-black-dark p-4 rounded-xl border border-black-border">
            <Calculator className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Kalkulator Magic Wheel</h1>
            <p className="text-gray-400 text-sm">Hitung diamond untuk Skin Legend MLBB</p>
          </div>
        </div>

        <div className="space-y-5 mb-8 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Poin Magic Wheel Saat Ini</label>
            <input 
              type="number" 
              placeholder="Contoh: 150" 
              value={currentPoints}
              onChange={(e) => setCurrentPoints(e.target.value)}
              className="w-full bg-black-dark border border-black-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>

        {typeof result === 'string' && (
          <p className="text-red-400 mb-6 text-sm">{result}</p>
        )}

        {result && typeof result !== 'string' && (
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-xl p-6 mb-8 animate-in fade-in zoom-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-1">Dibutuhkan Maksimal</p>
                <p className="text-3xl font-bold text-white">{result.diamonds} <span className="text-lg text-purple-300 font-normal">Diamond</span></p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Estimasi Harga (Rupiah)</p>
                <p className="text-3xl font-bold text-white">± Rp {result.rupiah.toLocaleString('id-ID')}</p>
              </div>
            </div>
            <p className="text-purple-200/60 text-xs text-center mt-4">*Asumsi menggunakan 5x Spin (270 DM). Harga IDR hanyalah estimasi.</p>
          </div>
        )}

        <div className="bg-purple-600/10 border border-purple-500/20 rounded-xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">Kurang Diamond?</h3>
          <p className="text-gray-300 text-sm mb-4">Jangan sampai point reset atau kehabisan waktu. Isi diamond MLBB sekarang dan klaim Skin Legend impianmu!</p>
          <Link href="/game/mobile-legends" className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            Top Up MLBB Termurah
          </Link>
        </div>
      </div>

      <ExpandableSeoBlock content={seoText} title="Kalkulator Magic Wheel MLBB" />
    </div>
  );
}
