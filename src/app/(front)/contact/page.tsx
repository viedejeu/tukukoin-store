import { ArrowRight, ShieldAlert } from "lucide-react";
import { getConfig } from "@/app/actions/configActions";

export default async function ContactPage() {
  const config = await getConfig();

  return (
    <main className="relative pt-24 pb-20 sm:pt-32 min-h-screen selection:bg-gold selection:text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Elegant Typography (Sticky) */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-32 lg:h-max">
            <div data-reveal="up">
              <span className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-gold"></span>
                <span className="text-[0.65rem] font-mono font-bold tracking-[0.3em] text-gold uppercase">
                  Layanan Prioritas
                </span>
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-8">
                Mari mulai <br />
                <span className="font-bold">percakapan.</span>
              </h1>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-light mb-12 max-w-md">
                Layanan pelanggan yang eksklusif, cepat, dan transparan. Tim ahli {config.siteName} berdedikasi penuh untuk memastikan pengalaman transaksi Anda berjalan sempurna.
              </p>

              {/* Elegant Security Notice */}
              <div className="border-l border-red-500/50 pl-5 py-2">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Keamanan</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                  Kami tidak pernah menanyakan kata sandi atau kode OTP. Pastikan Anda hanya berkomunikasi melalui kontak resmi di halaman ini.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Exclusive Cards UI */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
            
            {/* Contact Card 1: WhatsApp */}
            <a href={`https://wa.me/${config.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-2xl bg-[#0a0a0a] border border-gold/30 sm:border-white/5 hover:border-gold/50 transition-all duration-500">
              {/* Shimmering Orange Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/5 to-gold/0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer sm:animate-none group-hover:animate-shimmer skew-x-12 opacity-100 sm:opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative p-6 sm:p-8 flex flex-col h-full z-10">
                <div className="w-14 h-14 rounded-2xl border border-gold sm:border-white/10 bg-gold sm:bg-black/50  flex items-center justify-center group-hover:bg-gold group-hover:border-gold shadow-[0_0_20px_rgba(255,95,0,0.3)] sm:shadow-none sm:group-hover:shadow-[0_0_20px_rgba(255,95,0,0.3)] transition-all duration-500 mb-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black sm:fill-gray-400 group-hover:fill-black transition-colors duration-500" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gold sm:text-white mb-2 group-hover:text-gold transition-colors duration-500">
                  WhatsApp 
                </h2>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 flex-grow">
                  Konsultasi langsung, konfirmasi pesanan, dan penyelesaian kendala instan. Waktu respons rata-rata: &lt; 3 Menit.
                </p>
                <div className="flex items-center text-sm font-medium text-gold sm:text-gray-400 group-hover:text-gold transition-colors duration-500 mt-auto">
                  Hubungi Sekarang <ArrowRight className="w-4 h-4 ml-2 translate-x-1 sm:translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* Contact Card 2: Telegram */}
            <a href={config.telegramUrl} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-2xl bg-[#0a0a0a] border border-blue-500/30 sm:border-white/5 hover:border-blue-500/50 transition-all duration-500">
              {/* Shimmering Blue Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer sm:animate-none group-hover:animate-shimmer skew-x-12 opacity-100 sm:opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative p-6 sm:p-8 flex flex-col h-full z-10">
                <div className="w-14 h-14 rounded-2xl border border-blue-500 sm:border-white/10 bg-blue-500 sm:bg-black/50  flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)] sm:shadow-none sm:group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 mb-6">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white sm:fill-gray-400 group-hover:fill-white transition-colors duration-500" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-blue-400 sm:text-white mb-2 group-hover:text-blue-400 transition-colors duration-500">
                  Telegram Group
                </h2>
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-6 flex-grow">
                  Layanan dengan admin yang sama cepatnya untuk Anda yang lebih mengutamakan privasi dan ekosistem Telegram.
                </p>
                <div className="flex items-center text-sm font-medium text-blue-400 sm:text-gray-400 group-hover:text-blue-400 transition-colors duration-500 mt-auto">
                  Gabung Grup <ArrowRight className="w-4 h-4 ml-2 translate-x-1 sm:translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            {/* Contact Card 3: Official Channel */}
            <a href={config.officialChannelUrl} target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-2xl bg-[#0a0a0a] border border-yellow-500/30 sm:border-white/5 hover:border-yellow-500/50 transition-all duration-500 sm:col-span-2">
              {/* Shimmering Yellow Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-yellow-500/5 to-yellow-500/0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer sm:animate-none group-hover:animate-shimmer skew-x-12 opacity-100 sm:opacity-0 group-hover:opacity-100"></div>
              
              <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 h-full z-10">
                <div className="w-14 h-14 rounded-2xl border border-yellow-500 sm:border-white/10 bg-yellow-500 sm:bg-black/50  flex items-center justify-center group-hover:bg-yellow-500 group-hover:border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)] sm:shadow-none sm:group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-500 shrink-0">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black sm:fill-gray-400 group-hover:fill-black transition-colors duration-500" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-yellow-500 sm:text-white mb-2 group-hover:text-yellow-500 transition-colors duration-500">
                    Saluran Whatsapp
                  </h2>
                  <p className="text-sm text-gray-500 font-light leading-relaxed sm:max-w-md">
                    Dapatkan pengumuman langsung satu arah tentang fluktuasi harga dan pembaruan server dari manajemen pusat.
                  </p>
                </div>
                <div className="flex items-center text-sm font-medium text-yellow-500 sm:text-gray-400 group-hover:text-yellow-500 transition-colors duration-500 shrink-0">
                  Ikuti Saluran <ArrowRight className="w-4 h-4 ml-2 translate-x-1 sm:translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

          </div>
        </div>

      </div>
    </main>
  );
}
