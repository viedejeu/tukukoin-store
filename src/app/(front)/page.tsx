import Image from "next/image";
import Link from "next/link";
import { getGames } from "@/app/actions/gamesActions";
import { getArticles } from "@/app/actions/articlesActions";
import { getApprovedTestimonials } from "@/app/actions/testimonialActions";
import { paymentMethods } from "@/data/payment-methods";
import GameCard from "@/components/GameCard";
import CatalogTabs from "@/components/CatalogTabs";
import ArticleCard from "@/components/ArticleCard";
import TestimonialSection from "@/components/TestimonialSection";
import { Zap, ShieldCheck } from "lucide-react";
import { getConfig } from "@/app/actions/configActions";

export const revalidate = 60;

export default async function Home() {
  const config = await getConfig();
  const games = await getGames();
  const articles = await getArticles();
  const testimonials = await getApprovedTestimonials();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tukukoin.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: config.siteName,
    description: config.siteTagline,
    url: siteUrl,
    image: config.logoUrl || config.bannerUrl,
    priceRange: "$$",
    paymentAccepted: "QRIS, Bank Transfer, E-Wallet",
  };

  return (
    <main className="flex flex-col pt-8 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-20 relative z-10">
        
        {/* 1. Hero Section */}
        <section className="relative rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#000000] border border-[#222222]">
          {/* Glow effect */}
          {/* Ambient glow removed */}
          {/* Ambient glow removed */}
          
          <div className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1 space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold w-fit mx-auto md:mx-0">
                <Zap className="w-4 h-4" />
                <span>Proses Instan 5 Detik</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight text-center md:text-left text-white drop-shadow-sm">
                Situs Top Up Game <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-[#FF8C00]">Murah & Cepat</span>
                <span className="block text-xl md:text-2xl mt-3 text-gray-300 font-bold tracking-normal">TukuKoin Official Store 24 Jam</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed text-center md:text-left max-w-xl mx-auto md:mx-0">
                Layanan top up game online terpercaya 24 jam nonstop. Proses instan dengan pilihan pembayaran terlengkap (e-wallet, transfer bank, & minimarket).
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:gap-4 pt-2">
                <a href="https://tukukoin.com/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gold hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,95,0,0.3)]">
                  Top Up Sekarang
                </a>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-sm md:max-w-xl mx-auto hidden md:block relative group">
              {config.bannerUrl ? (
                <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_0_40px_rgba(255,95,0,0.15)] transition-transform duration-500 hover:scale-[1.02] border border-black-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={config.bannerUrl} 
                    alt={`Promo Top Up Game Termurah ${config.siteName}`} 
                    className="w-full h-auto object-contain block"
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-tr from-black-border to-black rounded-2xl border border-black-border/50 shadow-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/50" />
                  <ShieldCheck className="w-32 h-32 text-gold/20 absolute -right-10 -bottom-10" />
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-20 h-20 bg-black-light border border-gold/30 rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(255,95,0,0.2)]">
                      <span className="text-4xl">T</span>
                    </div>
                    <p className="text-white font-bold tracking-widest text-sm uppercase">TukuKoin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-black-border">
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">99<span className="text-gold">%</span></div>
          <div className="text-[0.65rem] sm:text-sm text-gray-500 uppercase tracking-widest font-semibold">Sukses Rate</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">24<span className="text-gold">/7</span></div>
          <div className="text-[0.65rem] sm:text-sm text-gray-500 uppercase tracking-widest font-semibold">Layanan Aktif</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">5<span className="text-gold">Dtk</span></div>
          <div className="text-[0.65rem] sm:text-sm text-gray-500 uppercase tracking-widest font-semibold">Kecepatan Proses</div>
        </div>
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">172K<span className="text-gold">+</span></div>
          <div className="text-[0.65rem] sm:text-sm text-gray-500 uppercase tracking-widest font-semibold">Pelanggan Aktif</div>
        </div>
      </section>

      {/* Catalogs Section (Tabbed) */}
      <CatalogTabs games={games} />

      {/* Latest Articles */}
        <section>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold">Artikel <span className="text-gold">Terbaru</span></h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-gold hover:text-gold-hover transition-colors">
              Lihat Semua Artikel &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6">
            {articles.slice(0, 4).map((article) => (
              <ArticleCard key={article.id} article={article} layout="horizontal" />
            ))}
          </div>
        </section>
      {/* Testimonials */}
      <TestimonialSection initialTestimonials={testimonials} />

      {/* Payment Methods */}
      <section>
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
             <div className="inline-flex items-center gap-2 text-sm text-gold font-semibold mb-2">
              <ShieldCheck className="w-4 h-4" /> Pembayaran
            </div>
            <h2 className="text-3xl font-bold">Metode Pembayaran <span className="text-gold">Lengkap</span></h2>
          </div>
          <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" /> Terverifikasi Aman
          </div>
        </div>

          {/* Desktop Marquee (1 Row) */}
          <div className="hidden md:flex relative overflow-hidden w-full group py-4">
            <div className="flex animate-marquee gap-4 whitespace-nowrap min-w-full group-hover:[animation-play-state:paused]">
               {[...paymentMethods, ...paymentMethods].map((method, i) => (
                <div key={`desktop-${i}`} className="bg-black-light border border-black-border rounded-xl px-6 py-4 flex items-center gap-4 shrink-0 min-w-[180px]">
                  <div className="w-12 h-12 relative rounded-lg bg-background/5 overflow-hidden flex items-center justify-center">
                    <Image src={method.image} alt={method.name} fill className="object-contain p-2" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{method.name}</div>
                    <div className="text-[0.65rem] text-gray-500 uppercase tracking-widest">{method.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Marquee (2 Rows) */}
          <div className="flex md:hidden flex-col gap-3 relative overflow-hidden w-full py-2">
            {/* Row 1: Normal Direction */}
            <div className="flex animate-marquee gap-3 whitespace-nowrap min-w-full">
               {[...paymentMethods.slice(0, Math.ceil(paymentMethods.length / 2)), ...paymentMethods.slice(0, Math.ceil(paymentMethods.length / 2)), ...paymentMethods.slice(0, Math.ceil(paymentMethods.length / 2))].map((method, i) => (
                <div key={`mobile1-${i}`} className="bg-black-light border border-black-border rounded-lg px-4 py-2.5 flex items-center gap-3 shrink-0 min-w-[140px]">
                  <div className="w-8 h-8 relative rounded overflow-hidden flex items-center justify-center bg-white/5">
                    <Image src={method.image} alt={method.name} fill className="object-contain p-1" />
                  </div>
                  <div className="font-bold text-xs truncate">{method.name}</div>
                </div>
              ))}
            </div>
            
            {/* Row 2: Reverse Direction */}
            <div className="flex animate-marquee [animation-direction:reverse] gap-3 whitespace-nowrap min-w-full">
               {[...paymentMethods.slice(Math.ceil(paymentMethods.length / 2)), ...paymentMethods.slice(Math.ceil(paymentMethods.length / 2)), ...paymentMethods.slice(Math.ceil(paymentMethods.length / 2))].map((method, i) => (
                <div key={`mobile2-${i}`} className="bg-black-light border border-black-border rounded-lg px-4 py-2.5 flex items-center gap-3 shrink-0 min-w-[140px]">
                  <div className="w-8 h-8 relative rounded overflow-hidden flex items-center justify-center bg-white/5">
                    <Image src={method.image} alt={method.name} fill className="object-contain p-1" />
                  </div>
                  <div className="font-bold text-xs truncate">{method.name}</div>
                </div>
              ))}
            </div>
          </div>
      </section>

        
      </div>
    </main>
  );
}
