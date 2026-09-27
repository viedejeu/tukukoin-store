import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "No DB" }, { status: 500 });

  const articles = await db.collection('articles').find({}).toArray();
  const games = await db.collection('games').find({}).toArray();

  return NextResponse.json({ 
    articlesCount: articles.length,
    articles: articles.map(a => ({ _id: a._id, id_string: a.id, slug: a.slug })),
    gamesCount: games.length
  });
}
