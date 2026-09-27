import { Gamepad2, FileText, ShoppingCart, Users, Info } from "lucide-react";
import { getGames } from "@/app/actions/gamesActions";
import { getArticles } from "@/app/actions/articlesActions";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch dynamic data
  const games = await getGames();
  const articles = await getArticles();
  
  const totalGames = games.length;
  const totalArticles = articles.length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Ringkasan Sistem</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Game", value: totalGames.toString(), icon: Gamepad2, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: "Total Artikel", value: totalArticles.toString(), icon: FileText, color: "text-green-500", bg: "bg-green-500/10" },
          { label: "Pesanan *", value: "1,204", icon: ShoppingCart, color: "text-gold", bg: "bg-gold/10" },
          { label: "Pengunjung *", value: "5.4K", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-black-light border border-black-border rounded-xl p-3 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-transform hover:-translate-y-1">
            <div className={`w-10 h-10 sm:w-14 sm:h-14 shrink-0 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="text-[0.6rem] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
              <div className="text-xl sm:text-2xl font-black mt-0.5 sm:mt-1">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 flex gap-4">
        <div className="shrink-0 pt-1">
          <Info className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-blue-400 mb-2">Sistem Manajemen Konten (CMS) Aktif</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Selamat datang di Dashboard Admin TukuKoin. Data <strong>Game</strong> dan <strong>Artikel</strong> di atas sudah terhubung langsung secara *real-time* ke database website Anda. Setiap perubahan yang Anda buat di menu samping (Tambah/Edit/Hapus) akan langsung tayang ke publik saat itu juga.
          </p>
          <p className="text-xs text-gray-500 mt-4">
            * Catatan: Metrik Pesanan dan Pengunjung masih berupa data ilustrasi, mengingat sistem saat ini meneruskan pesanan langsung ke WhatsApp CS tanpa melalui gerbang pembayaran (Payment Gateway) otomatis.
          </p>
        </div>
      </div>
    </div>
  );
}
