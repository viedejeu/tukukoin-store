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
        
        {/* 1. Hero Section (Centered Panoramic) */}
      <section className="relative rounded-[2rem] overflow-hidden border border-[#222222] bg-black">
        {/* Background if banner is present */}
        {config.bannerUrl && (
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={config.bannerUrl} alt="Banner" className="w-full h-full object-cover opacity-20 blur-md" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
          </div>
        )}
        
        <div className="relative z-10 p-6 sm:p-10 md:p-16 flex flex-col items-center text-center max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs sm:text-sm font-bold tracking-wider">
            <Zap className="w-4 h-4" />
            <span>PROSES INSTAN 5 DETIK</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow-lg leading-tight">
            Portal Top Up <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-gold to-yellow-600">Tercepat & Termurah</span>
          </h1>
          
          <p className="text-gray-300 text-sm md:text-lg max-w-2xl font-medium">
            Layanan top up game online terpercaya 24 jam nonstop. Proses instan dengan pilihan pembayaran terlengkap se-Indonesia.
          </p>

          <div className="pt-8 w-full">
            {config.bannerUrl ? (
              <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.15)] border border-gold/20 transition-transform hover:scale-[1.01] duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={config.bannerUrl} alt="Promo" className="w-full h-auto object-cover" />
              </div>
            ) : (
              <div className="h-40 bg-black-light border border-black-border rounded-2xl flex items-center justify-center">
                 <p className="text-gray-500">Banner Promo</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Floating Glassmorphism Stats */}
      <section className="relative z-20 -mt-8 sm:-mt-12 mx-auto max-w-4xl px-4 sm:px-0">
        <div className="bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 shadow-2xl">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">99<span className="text-gold">%</span></div>
            <div className="text-[0.65rem] sm:text-xs text-gray-400 uppercase tracking-widest font-bold">Sukses Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">24<span className="text-gold">/7</span></div>
            <div className="text-[0.65rem] sm:text-xs text-gray-400 uppercase tracking-widest font-bold">Layanan Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">5<span className="text-gold">Dtk</span></div>
            <div className="text-[0.65rem] sm:text-xs text-gray-400 uppercase tracking-widest font-bold">Proses Kilat</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">172K<span className="text-gold">+</span></div>
            <div className="text-[0.65rem] sm:text-xs text-gray-400 uppercase tracking-widest font-bold">Pelanggan</div>
          </div>
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
