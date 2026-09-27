"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, ChevronRight } from 'lucide-react';
import ExpandableSeoBlock from '@/components/ExpandableSeoBlock';

export default function KalkulatorWR() {
  const [totalMatches, setTotalMatches] = useState<string>('');
  const [currentWr, setCurrentWr] = useState<string>('');
  const [targetWr, setTargetWr] = useState<string>('');
  
  const calculateWR = () => {
    const t = parseFloat(totalMatches);
    const w = parseFloat(currentWr);
    const target = parseFloat(targetWr);

    if (isNaN(t) || isNaN(w) || isNaN(target)) return null;
    if (w < 0 || w > 100 || target < 0 || target > 100) return "Winrate harus di antara 0-100%";
    if (target <= w) return "Target WR harus lebih besar dari WR saat ini.";
    if (target === 100) return "Tidak mungkin mencapai 100% jika Anda pernah kalah.";

    const currentWins = (t * w) / 100;
    const requiredWins = ( (target * t) - (100 * currentWins) ) / (100 - target);
    
    if (requiredWins < 0) return "Terjadi kesalahan perhitungan.";
    return `Kamu membutuhkan sekitar ${Math.ceil(requiredWins)} kemenangan beruntun tanpa kalah untuk mencapai WR ${target}%.`;
  };

  const result = calculateWR();

  const seoText = `
    <p>Kalkulator Winrate (WR) Mobile Legends adalah alat ukur yang wajib dimiliki oleh setiap pemain MLBB yang serius ingin push rank. Bermain di mode Ranked dengan winrate yang tinggi bukan hanya soal kebanggaan, tetapi juga meningkatkan kepercayaan rekan satu tim saat proses draft pick hero.</p>
    <p>Dengan alat ini, Anda bisa secara presisi menghitung butuh berapa kali "Win Streak" (Kemenangan beruntun) tanpa celah kekalahan sama sekali untuk meraih persentase target WR yang Anda impikan. Banyak pro player dan top global menggunakan kalkulator ini untuk menakar performa mingguan mereka.</p>
    <p><strong>Tips Cepat Naik WR:</strong><br/>
    1. Bermainlah bersama squad atau teman yang sudah Anda kenal permainannya (Party 5 atau Trio).<br/>
    2. Gunakan hero power yang sudah benar-benar Anda kuasai mekaniknya.<br/>
    3. Biar mental musuh down sejak awal, pastikan Anda menggunakan skin efek mahal! Beli diamond murah dan aman hanya di TukuKoin Topup.</p>
  `;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/tools" className="hover:text-gold transition-colors">Tools</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">Kalkulator WR ML</span>
      </div>

      <div className="bg-black-light border border-black-border rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient glow removed */}
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-black-dark p-4 rounded-xl border border-black-border">
            <Calculator className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Kalkulator Winrate ML</h1>
            <p className="text-gray-400 text-sm">Hitung jumlah win streak yang dibutuhkan</p>
          </div>
        </div>

        <div className="space-y-5 mb-8 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Total Pertandingan Saat Ini</label>
            <input 
              type="number" 
              placeholder="Contoh: 154" 
              value={totalMatches}
              onChange={(e) => setTotalMatches(e.target.value)}
              className="w-full bg-black-dark border border-black-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Total Winrate Saat Ini (%)</label>
            <input 
              type="number" 
              placeholder="Contoh: 54.3" 
              value={currentWr}
              onChange={(e) => setCurrentWr(e.target.value)}
              className="w-full bg-black-dark border border-black-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Winrate (%)</label>
            <input 
              type="number" 
              placeholder="Contoh: 70" 
              value={targetWr}
              onChange={(e) => setTargetWr(e.target.value)}
              className="w-full bg-black-dark border border-black-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
            />
          </div>
        </div>

        {result && (
          <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-xl p-5 mb-8 animate-in fade-in zoom-in duration-300">
            <p className="text-blue-200 font-medium text-center md:text-lg leading-relaxed">{result}</p>
          </div>
        )}

        <div className="bg-gold/10 border border-gold/20 rounded-xl p-6 text-center">
          <h3 className="text-white font-bold mb-2">Biar Makin Semangat Push Rank!</h3>
          <p className="text-gray-300 text-sm mb-4">Gunakan skin keren supaya musuh kena mental duluan. Top up diamond murah sekarang!</p>
          <Link href="/game/mobile-legends" className="inline-block bg-gold hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-[0_0_20px_rgba(255,95,0,0.3)]">
            Top Up MLBB Sekarang
          </Link>
        </div>
      </div>

      <ExpandableSeoBlock content={seoText} title="Kalkulator WR MLBB" />
    </div>
  );
}
