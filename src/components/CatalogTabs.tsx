"use client";

import { useState } from "react";
import { Zap, Gamepad2, Ticket, Smartphone, Wallet, Lightbulb } from "lucide-react";
import GameCard from "./GameCard";
import type { Game } from "@/data/games";

const CATEGORIES = [
  { id: "Game Populer", icon: Gamepad2, label: "Game" },
  { id: "Voucher Game", icon: Ticket, label: "Voucher" },
  { id: "Pulsa & Data", icon: Smartphone, label: "Pulsa" },
  { id: "E-Wallet", icon: Wallet, label: "E-Wallet" },
  { id: "Tagihan & Utilitas", icon: Lightbulb, label: "Tagihan" },
];

export default function CatalogTabs({ games }: { games: Game[] }) {
  const [activeTab, setActiveTab] = useState<string>("Game Populer");

  const filteredGames = games.filter((game) => (game.category || "Game Populer") === activeTab);

  return (
    <section id="games" className="scroll-mt-24">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-sm text-gold font-semibold mb-2">
          <Zap className="w-4 h-4" /> Pilih Kategori
        </div>
        <h2 className="text-3xl font-bold">Layanan <span className="text-gold">Terlengkap</span></h2>
      </div>

      {/* TABS SCROLLABLE */}
      <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-8 pb-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-3 font-bold text-sm whitespace-nowrap transition-all duration-300 border-b-2 ${isActive ? "border-gold text-gold" : "border-transparent text-gray-500 hover:text-white hover:border-white/20"}`}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
      
      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 animate-in fade-in zoom-in-95 duration-300">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-400">
            Kategori ini belum memiliki produk.
          </div>
        )}
      </div>
    </section>
  );
}
