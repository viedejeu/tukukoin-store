"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Mock data for fake sales
const names = ["GCR***", "Royal***", "DAV1D***", "D0P***", "LANC***", "PAND4***", "Dollar***", "S565***", "WALID12***", "Wolf***", "Stecu***", "PICA2***", "AL0Y***", "Sir001***", "Nolim1T***", "MultiP***"];
const purchases = [
  "membeli 150M Koin Royal Dream",
  "membeli 1B Koin Higgs Domino",
  "membeli 1B Koin Royal Dream",
  "berhasil top up Royal Dream",
  "top up 2B Koin Higgs Domino",
  "membeli 10B Koin Royal Dream",
  "membeli 700M Koin Royal Dream",
  "membeli 500M Koin Royal Dream",
  "membeli 20B Koin Royal Dream",
  "membeli 3B Koin Royal Dream",
  "membeli 2B Koin Royal Dream",
  "membeli 1B Koin Royal Dream",
  "top up 500M Koin Higgs Domino",
  "top up 2B Koin Higgs Domino",
];
const times = ["Baru saja", "1 menit yang lalu", "2 menit yang lalu", "Beberapa detik yang lalu"];

export default function LiveSalesPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [sale, setSale] = useState({ name: "", action: "", time: "" });
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    function showRandomSale() {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAction = purchases[Math.floor(Math.random() * purchases.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      
      setSale({ name: randomName, action: randomAction, time: randomTime });
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }

    // First popup after 3 seconds
    const initialTimer = setTimeout(() => {
      showRandomSale();
    }, 3000);

    // Loop every 12 seconds
    const intervalTimer = setInterval(() => {
      showRandomSale();
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed top-20 right-4 sm:top-24 sm:right-6 z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-[#0a0a0a]/90  border border-gold/30 rounded-xl p-2.5 sm:p-3 shadow-[0_0_20px_rgba(255,95,0,0.15)] flex items-start gap-2.5 sm:gap-3 max-w-[240px] sm:max-w-[280px]">
        <div className="mt-1 flex-shrink-0">
          <svg className="w-8 h-8 drop-shadow-[0_3px_8px_rgba(250,204,21,0.4)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gold-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D48806" />
                <stop offset="20%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#F5B700" />
                <stop offset="80%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D48806" />
              </linearGradient>
              <linearGradient id="gold-top" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF2A8" />
                <stop offset="100%" stopColor="#F5B700" />
              </linearGradient>
            </defs>

            {/* Coin 1 (Bottom) */}
            <ellipse cx="12" cy="18" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="17.5" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="17" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="16.5" rx="9" ry="3.5" fill="url(#gold-top)" stroke="#B47304" strokeWidth="0.5" />
            
            {/* Coin 2 (Middle) */}
            <ellipse cx="12" cy="14.5" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="14" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="13.5" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="13" rx="9" ry="3.5" fill="url(#gold-top)" stroke="#B47304" strokeWidth="0.5" />

            {/* Coin 3 (Top) */}
            <ellipse cx="12" cy="11" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="10.5" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="10" rx="9" ry="3.5" fill="url(#gold-edge)" />
            <ellipse cx="12" cy="9.5" rx="9" ry="3.5" fill="url(#gold-top)" stroke="#B47304" strokeWidth="0.5" />
            
            {/* Top coin inner detail */}
            <ellipse cx="12" cy="9.5" rx="6" ry="2" fill="none" stroke="#FFE066" strokeWidth="0.5" opacity="0.8" />
            <path d="M12 7.5 L12.5 8.5 L13.5 8.5 L12.8 9.2 L13 10.2 L12 9.7 L11 10.2 L11.2 9.2 L10.5 8.5 L11.5 8.5 Z" fill="#FFF" opacity="0.7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5">{sale.time}</p>
          <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
            <span className="text-gold">{sale.name}</span> {sale.action}
          </p>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }} 
          className="text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
