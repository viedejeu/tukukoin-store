import Link from 'next/link';
import { Calculator, Target, Star } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools & Kalkulator Game | TukuKoin',
  description: 'Kumpulan alat bantu hitung untuk gamer. Kalkulator Winrate ML, Magic Wheel, dan Zodiac terlengkap dan akurat.',
};

export default function ToolsHubPage() {
  const tools = [
    {
      title: "Kalkulator Winrate ML",
      description: "Hitung butuh berapa kali kemenangan beruntun untuk mencapai target winrate idamanmu.",
      icon: <Target className="w-8 h-8 text-gold" />,
      href: "/tools/kalkulator-wr",
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Kalkulator Magic Wheel",
      description: "Cari tahu sisa diamond yang dibutuhkan untuk mendapatkan Skin Legend dari Magic Wheel.",
      icon: <Calculator className="w-8 h-8 text-gold" />,
      href: "/tools/kalkulator-magic-wheel",
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Kalkulator Zodiac",
      description: "Hitung perkiraan maksimal diamond untuk summon Skin Zodiac berdasarkan poin saat ini.",
      icon: <Star className="w-8 h-8 text-gold" />,
      href: "/tools/kalkulator-zodiac",
      color: "from-yellow-500 to-orange-500",
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Gudang <span className="text-gold">Alat Gamer</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Gunakan kumpulan kalkulator cerdas kami untuk merencanakan target in-game Anda dengan presisi tinggi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => (
          <Link href={tool.href} key={idx} className="group relative bg-black-light border border-black-border rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,95,0,0.2)] hover:border-gold overflow-hidden">
            {/* Ambient glow removed */}
            <div className="bg-black-dark w-16 h-16 rounded-xl flex items-center justify-center border border-black-border mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              {tool.icon}
            </div>
            <h2 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{tool.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
