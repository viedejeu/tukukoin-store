import Link from "next/link";
import { Zap, ShieldCheck, Clock, Users, Target, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 space-y-32 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto">
        {/* Glow effect */}
        {/* Ambient glow removed */}
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5  text-sm font-semibold mb-8 text-gray-300">
          <Target className="w-4 h-4 text-gold" /> Tentang TukuKoin
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Lebih dari sekadar store,<br className="hidden md:block"/> kami adalah <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-500">Teman Gamermu.</span>
        </h1>
        <p className="text-gray-400 md:text-xl max-w-2xl mx-auto leading-relaxed">
          TukuKoin lahir dari semangat komunitas untuk menghadirkan pengalaman top up yang tidak hanya murah, tapi juga cepat, aman, dan tanpa drama.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-black-border">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">99<span className="text-gold">%</span></div>
          <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Sukses Rate</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">24<span className="text-gold">/7</span></div>
          <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Layanan Aktif</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">1Detik</div>
          <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Kecepatan Proses</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">10K<span className="text-gold">+</span></div>
          <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Pelanggan Aktif</div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa memilih TukuKoin?</h2>
          <p className="text-gray-400">Komitmen kami untuk memberikan layanan kelas satu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Bento Box 1 - Wide */}
          <div className="md:col-span-2 bg-gradient-to-br from-black-light to-black border border-black-border rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:border-gold/50 transition-colors duration-500">
            {/* Ambient glow removed */}
            <Zap className="w-12 h-12 text-gold mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Kecepatan Super Kilat</h3>
            <p className="text-gray-400 leading-relaxed max-w-md relative z-10">
              Sistem kami terintegrasi langsung dengan API pusat. Detik Anda menyelesaikan pembayaran, item game Anda langsung mendarat di akun tanpa perlu menunggu lama.
            </p>
          </div>

          {/* Bento Box 2 - Square */}
          <div className="bg-gradient-to-bl from-black-light to-black border border-black-border rounded-[2rem] p-8 relative overflow-hidden group hover:border-gold/50 transition-colors duration-500">
            <ShieldCheck className="w-10 h-10 text-white mb-6" />
            <h3 className="text-xl font-bold mb-3">100% Legal & Aman</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Anti banned. Semua produk berasal dari jalur resmi yang diakui developer game.
            </p>
          </div>

          {/* Bento Box 3 - Square */}
          <div className="bg-gradient-to-tr from-black-light to-black border border-black-border rounded-[2rem] p-8 relative overflow-hidden group hover:border-gold/50 transition-colors duration-500">
            <Clock className="w-10 h-10 text-white mb-6" />
            <h3 className="text-xl font-bold mb-3">Buka 24 Jam</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Kapanpun Anda butuh top up di tengah malam, sistem otomatis kami siap memprosesnya.
            </p>
          </div>

          {/* Bento Box 4 - Wide */}
          <div className="md:col-span-2 bg-gradient-to-tl from-black-light to-black border border-black-border rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center items-start group hover:border-gold/50 transition-colors duration-500">
            <Users className="w-12 h-12 text-gold mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Dukungan Komunitas & CS Humanis</h3>
            <p className="text-gray-400 leading-relaxed max-w-md relative z-10">
              Bukan dijawab oleh bot template. Tim Customer Service kami adalah gamer yang mengerti keluhan Anda dan siap membantu menyelesaikannya secepat mungkin.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA CTA CTA CTA */}
      <section className="relative rounded-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-gold/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="relative z-10 px-6 py-20 text-center flex flex-col items-center justify-center border border-gold/20 rounded-[3rem]">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Siap untuk push rank?</h2>
          <p className="text-gray-300 mb-10 max-w-xl mx-auto">
            Jangan biarkan kehabisan diamond menghalangi kemenangan epikmu. Top up sekarang dan kembali ke medan pertempuran.
          </p>
          <Link href="/" className="inline-flex items-center gap-3 bg-gold text-background font-bold px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(255,95,0,0.3)]">
            Mulai Top Up <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
