import { MetadataRoute } from 'next';
import { getGames } from '@/app/actions/gamesActions';
import { getArticles } from '@/app/actions/articlesActions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tukukointopup.com';
  
  // Base routes
  const routes = [
    '',
    '/blog',
    '/contact',
    '/about',
    '/leaderboard',
    '/tools',
    '/tools/kalkulator-wr',
    '/tools/kalkulator-magic-wheel',
    '/tools/kalkulator-zodiac'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Game routes
  const games = await getGames();
  const gameRoutes = games.filter(g => g.isAvailable).map((game) => ({
    url: `${siteUrl}/game/${game.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Article routes
  const articles = await getArticles();
  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date).toISOString(), // Use article publish date
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...gameRoutes, ...articleRoutes];
}
