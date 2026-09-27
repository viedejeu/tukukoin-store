import Image from "next/image";
import Link from "next/link";
import { Article } from "@/data/articles";
import { Calendar, Clock } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  layout?: "vertical" | "horizontal";
}

export default function ArticleCard({ article, layout = "vertical" }: ArticleCardProps) {
  const formattedDate = new Date(article.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  if (layout === "horizontal") {
    return (
      <Link href={`/blog/${article.slug}`} className="group flex flex-col sm:flex-row gap-3 sm:gap-6 p-3 sm:p-6 bg-black-light border border-black-border rounded-xl sm:rounded-2xl hover:bg-black-border/30 transition-colors h-full">
        {/* Image container */}
        <div className="relative w-full sm:w-64 aspect-video sm:aspect-[4/3] flex-shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-black-border">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 256px"
          />
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 bg-gold text-black text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            INFO GAME
          </div>
        </div>
        
        {/* Content */}
        <div className="flex flex-col justify-center flex-grow pt-1 sm:pt-0">
          <h3 className="font-bold text-white text-[0.75rem] leading-snug sm:text-2xl sm:leading-tight mb-1.5 sm:mb-3 group-hover:text-gold transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="hidden sm:block text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 sm:gap-4 mt-auto">
            <span className="flex items-center gap-1 sm:gap-1.5 text-[0.55rem] sm:text-xs text-gray-500 font-medium">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {formattedDate}
            </span>
            <span className="text-[0.55rem] sm:text-xs text-gray-500 font-bold uppercase tracking-widest hidden sm:inline-block">
              By <span className="text-white">{article.author}</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // Default Vertical Layout
  return (
    <Link href={`/blog/${article.slug}`} className="group flex flex-col h-full bg-black-light border border-black-border rounded-xl md:rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,95,0,0.15)]">
      <div className="relative aspect-video sm:aspect-[4/3] w-full overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 md:px-2.5 rounded-md bg-black border border-black-border text-[0.6rem] uppercase tracking-widest text-gold font-bold">
            <Calendar className="w-3 h-3" />
            {formattedDate}
          </span>
        </div>
        <h3 className="font-bold text-foreground text-base md:text-lg leading-snug mb-2 md:mb-3 group-hover:text-gold transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="mt-auto border-t border-black-border/50 pt-3 md:pt-4 flex items-center justify-between">
           <div className="text-[0.65rem] md:text-xs text-gray-500 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
             Oleh <span className="text-gray-300 font-medium">{article.author}</span>
           </div>
        </div>
      </div>
    </Link>
  );
}
