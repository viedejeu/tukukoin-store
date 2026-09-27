import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getConfig } from "@/app/actions/configActions";

export default async function Footer() {
  const config = await getConfig();

  return (
    <footer className="border-t border-black-border bg-[#050505] pt-10 md:pt-16 pb-6 md:pb-8 mt-12 md:mt-20 relative overflow-hidden">
      
      {/* Background ambient glow dihapus untuk optimasi FPS */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 lg:gap-8 xl:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              {config.logoUrl ? (
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,95,0,0.3)] transition-transform duration-500 group-hover:-rotate-12">
                  <Image 
                    src={config.logoUrl} 
                    alt={`${config.siteName} Logo`} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-500 rounded-xl flex items-center justify-center font-black text-black text-xl transition-transform duration-500 group-hover:-rotate-12 shadow-[0_0_20px_rgba(255,95,0,0.3)]">
                  {config.siteName.charAt(0)}
                </div>
              )}
              <div className="flex flex-col leading-none">
                <span className="font-black text-2xl tracking-tighter text-white uppercase">{config.siteName}</span>
                <span className="text-[0.65rem] font-bold tracking-[0.25em] text-gold uppercase mt-1">{config.siteTagline}</span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Layanan top up game paling kilat, terjangkau, dan amanah. Komitmen kami adalah menyajikan proses transaksi terbaik tanpa ribet untuk gamer tanah air.
            </p>
          </div>

          {/* Column 2: Layanan */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="font-mono text-[0.7rem] font-bold tracking-[0.2em] text-white uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold/80"></span> Layanan
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link href="/" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gold transition-colors duration-300">
                  Beranda Utama
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link href="/#games" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gold transition-colors duration-300">
                  Daftar Game
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-gold transition-colors duration-300">
                  Blog & Artikel
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Komunitas */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="font-mono text-[0.7rem] font-bold tracking-[0.2em] text-white uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500/80"></span> Komunitas
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a href={config.telegramUrl || "#"} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  Grup Telegram
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </a>
              </li>
              <li>
                <a href={config.officialChannelUrl || "#"} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-green-400 transition-colors duration-300">
                  Channel WhatsApp
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legalitas */}
          <div className="col-span-2 sm:col-span-1 md:col-span-4 lg:col-span-1">
            <h3 className="font-mono text-[0.7rem] font-bold tracking-[0.2em] text-white uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-500/80"></span> Legalitas
            </h3>
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link href="/about" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
                  Tentang Kami
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
                  Kebijakan Privasi
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link href="/terms" className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300">
                  Syarat Ketentuan
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Disclaimer for Anti-Phishing Systems */}
        <div className="mt-12 p-4 border border-white/10 rounded-xl bg-white/5 text-[0.65rem] text-gray-500 leading-relaxed text-center sm:text-left">
          <strong>DISCLAIMER:</strong> {config.siteName} is a legitimate digital goods reseller and e-commerce store. We are not affiliated with, associated with, or in any way officially connected with Moonton, Tencent, Garena, or any of their subsidiaries or affiliates. All product names, logos, and brands are property of their respective owners. All company, product, and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement. We do not ask for user passwords.
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/5 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} {config.siteName} {config.siteTagline}. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
            <span>Server: <span className="text-gold">Online</span></span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}

