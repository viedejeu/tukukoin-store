import { getArticles } from "@/app/actions/articlesActions";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import { Flame, TrendingUp, Crown } from "lucide-react";
import { getSultans } from "@/app/actions/sultanActions";

export default async function BlogPage() {
  const articles = await getArticles();
  if (!articles || articles.length === 0) return null;

  // Simulate Featured vs Latest
  const featuredArticle = articles[0];
  const latestArticles = articles.slice(1);
  // Ambil beberapa artikel untuk widget trend (misalnya artikel ke-2 hingga ke-5)
  const trendingArticles = articles.length > 4 ? articles.slice(1, 5) : articles.slice(0, 4);
  const sultans = await getSultans();
  const top3Sultans = sultans.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-10 border-b border-black-border pb-4">
        <Flame className="w-8 h-8 text-gold" />
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">
          Portal <span className="text-gold">Berita</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Main Content Area (Left - 70%) */}
        <div className="w-full lg:w-2/3">
          
          {/* Featured Headline */}
          <Link href={`/blog/${featuredArticle.slug}`} className="group block relative w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-black-border">
            <Image 
              src={featuredArticle.image}
              alt={featuredArticle.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 z-10">
              <span className="inline-block bg-gold text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-4">
                Sorotan Utama
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2 group-hover:text-gold transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-300 line-clamp-2 max-w-2xl">
                {featuredArticle.excerpt}
              </p>
            </div>
          </Link>

          {/* Latest News Feed (Horizontal Cards) */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-6 bg-gold rounded-full"></div>
              <h2 className="text-2xl font-bold">Semua Berita</h2>
            </div>
            
            <div className="flex flex-col gap-4 md:gap-6">
              {latestArticles.map((article) => (
                <ArticleCard key={article.id} article={article} layout="horizontal" />
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Area (Right - 30%) */}
        <div className="w-full lg:w-1/3 space-y-10">
          
          {/* Trending Widget */}
          <div className="bg-black-light border border-black-border rounded-2xl p-6">
            <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider mb-6 pb-4 border-b border-black-border">
              <TrendingUp className="w-5 h-5" /> Sedang Tren
            </div>
            
            <div className="flex flex-col gap-6">
              {trendingArticles.map((article, index) => (
                <Link href={`/blog/${article.slug}`} key={article.id} className="group flex gap-4 items-start">
                  <div className="text-4xl font-black text-black-border group-hover:text-gold/30 transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-200 group-hover:text-gold transition-colors leading-snug mb-1">
                      {article.title}
                    </h4>
                    <span className="text-[0.65rem] text-gray-500 uppercase tracking-widest">{article.author}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Top Spender Leaderboard Widget */}
          <div className="bg-gradient-to-b from-yellow-900/40 to-black-light border border-yellow-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(234,179,8,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30">
                <Crown className="text-yellow-500 w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Top Spender</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              {top3Sultans.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-4 bg-black-dark p-3 rounded-xl border border-white/5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${idx === 0 ? 'bg-yellow-400 text-black shadow-[0_0_10px_rgba(250,204,21,0.5)]' : idx === 1 ? 'bg-gray-300 text-black' : 'bg-amber-700 text-white'}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white font-bold text-sm truncate">{s.name}</p>
                    <p className="text-yellow-500 font-black text-xs">Rp {(s.amount / 1000000).toFixed(1)}Jt</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/leaderboard" className="block text-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold uppercase px-6 py-3 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)] hover:scale-105">
              Lihat Leaderboard
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
