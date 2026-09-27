import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/app/actions/articlesActions";
import { getGames } from "@/app/actions/gamesActions";
import { ArrowLeft, Clock, User, Tag, TrendingUp, List } from "lucide-react";
import { Metadata } from "next";
import ShareButton from "@/components/ShareButton";

export async function generateStaticParams() {
  const articlesList = await getArticles();
  return articlesList.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tukukoin.com";

  return {
    title: article.title,
    description: article.seoDescription || article.excerpt,
    keywords: article.metaKeywords ? article.metaKeywords.split(',').map(k => k.trim()) : undefined,
    alternates: {
      canonical: `${siteUrl}/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.seoDescription || article.excerpt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.seoDescription || article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const articles = await getArticles();
  const articleIndex = articles.findIndex((a) => a.slug === resolvedParams.slug);
  const article = articles[articleIndex];

  if (!article) {
    notFound();
  }

  const games = await getGames();
  const relatedGame = article.relatedGameId ? games.find(g => g.id === article.relatedGameId) : null;

  // Ambil artikel lain untuk widget trend (kecualikan artikel yang sedang dibaca)
  const trendingArticles = articles
    .filter(a => a.id !== article.id)
    .slice(0, 4);

  const formattedDate = new Date(article.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.image,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.author || "Admin",
    },
    publisher: {
      "@type": "Organization",
      name: "TukuKoin",
    },
    description: article.seoDescription || article.excerpt,
  };

  // Simple heuristic to check if content is HTML (from Tiptap) or plain text (from old hardcoded data)
  const isHtml = article.content.includes('<p>') || article.content.includes('<h2>') || article.content.includes('<ul>');

  // Generate Table of Contents
  const toc: { id: string, title: string, level: number }[] = [];
  let processedContent = article.content;

  if (isHtml) {
    processedContent = processedContent.replace(/<(h[23])>(.*?)<\/\1>/gi, (match, tag, innerText) => {
      // Clean tags from innerText for ID
      const cleanText = innerText.replace(/<[^>]*>?/gm, '');
      const id = cleanText.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      
      toc.push({ id, title: cleanText, level: tag.toLowerCase() === 'h2' ? 2 : 3 });
      
      return `<${tag} id="${id}" class="scroll-mt-24 group relative">
        ${innerText}
        <a href="#${id}" class="opacity-0 group-hover:opacity-100 ml-2 text-gold no-underline text-xl transition-opacity" aria-hidden="true">#</a>
      </${tag}>`;
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb Navigation */}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gold font-bold uppercase tracking-wider mb-8">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Portal
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Main Content Area (Left - 70%) */}
        <article className="w-full lg:w-2/3">
          
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gold/10 text-gold px-3 py-1 rounded text-xs font-bold uppercase tracking-widest border border-gold/20 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Info Game
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400 text-sm font-medium border-y border-black-border py-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold" />
                <span className="text-white font-bold">{article.author}</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold" />
                {formattedDate}
              </div>
              <div className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0 flex justify-start sm:justify-end">
                <ShareButton title={article.title} />
              </div>
            </div>
          </div>

          {/* Hero Image inside content */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 border border-black-border">
            <Image 
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Prose Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-headings:text-white prose-a:text-gold marker:text-gold">
            <p className="text-xl text-gray-400 font-medium mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            {/* Daftar Isi (TOC) */}
            {toc.length > 0 && (
              <div className="mb-10 bg-black-light border border-black-border rounded-xl p-6 not-prose">
                <div className="flex items-center gap-2 font-bold text-white mb-4">
                  <List className="w-5 h-5 text-gold" /> Daftar Isi
                </div>
                <ul className="space-y-2.5">
                  {toc.map((item, index) => (
                    <li key={index} className={`${item.level === 3 ? 'ml-6' : ''}`}>
                      <a 
                        href={`#${item.id}`}
                        className="text-gray-400 hover:text-gold transition-colors flex items-start gap-2 text-sm"
                      >
                        <span className="text-gold opacity-50 text-xs mt-1">
                          {item.level === 2 ? '■' : '●'}
                        </span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Render HTML dynamically or plain text split for legacy */}
            {isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            ) : (
              article.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
              )}
            </div>

            {/* Smart CTA Widget (Jebakan Batman) */}
            {relatedGame && (
              <div className="mt-12 bg-gradient-to-r from-black-light to-[#2A1508] border border-gold/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-[0_0_30px_rgba(255,95,0,0.1)]">
                <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 relative rounded-xl overflow-hidden border-2 border-gold shadow-[0_0_15px_rgba(255,95,0,0.2)]">
                  <Image src={relatedGame.image} alt={relatedGame.name} fill className="object-cover" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Top Up <span className="text-gold">{relatedGame.name}</span> Termurah!</h3>
                  <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                    Dapatkan harga termurah, proses instan 1 detik, dan 100% aman terpercaya hanya di TukuKoin.
                  </p>
                  <Link 
                    href={`/game/${relatedGame.slug}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 bg-gold text-black hover:bg-yellow-500 hover:shadow-[0_0_20px_rgba(255,95,0,0.5)] h-12 px-8 text-sm w-full sm:w-auto"
                  >
                    Beli {relatedGame.currency} Sekarang
                  </Link>
                </div>
              </div>
            )}

          </article>

        {/* Sidebar Area (Right - 30%) */}
        <aside className="w-full lg:w-1/3 space-y-10">
          
          {/* Trending Widget (Same as list page) */}
          <div className="bg-black-light border border-black-border rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider mb-6 pb-4 border-b border-black-border">
              <TrendingUp className="w-5 h-5" /> Sedang Tren
            </div>
            
            <div className="flex flex-col gap-6">
              {trendingArticles.map((trendArticle, index) => (
                <Link href={`/blog/${trendArticle.slug}`} key={trendArticle.id} className="group flex gap-4 items-start">
                  <div className="text-4xl font-black text-black-border group-hover:text-gold/30 transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-200 group-hover:text-gold transition-colors leading-snug mb-1">
                      {trendArticle.title}
                    </h4>
                    <span className="text-[0.65rem] text-gray-500 uppercase tracking-widest">{trendArticle.author}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}
