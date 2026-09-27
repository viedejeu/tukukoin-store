import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import gamesData from '@/data/db/games.json';
import articlesData from '@/data/db/articles.json';
import configData from '@/data/db/config.json';
import seoData from '@/data/db/seo.json';
import testimonialsData from '@/data/db/testimonials.json';

export async function GET() {
  const db = await getDb();
  if (!db) return NextResponse.json({ error: "No DB" }, { status: 500 });

  await db.collection('games').deleteMany({});
  await db.collection('articles').deleteMany({});
  await db.collection('config').deleteMany({});
  await db.collection('seo').deleteMany({});
  await db.collection('testimonials').deleteMany({});

  await db.collection('games').insertMany(JSON.parse(JSON.stringify(gamesData)));
  await db.collection('articles').insertMany(JSON.parse(JSON.stringify(articlesData)));
  await db.collection('config').insertOne(JSON.parse(JSON.stringify(configData)));
  await db.collection('seo').insertOne(JSON.parse(JSON.stringify(seoData)));
  await db.collection('testimonials').insertMany(JSON.parse(JSON.stringify(testimonialsData)));

  return NextResponse.json({ success: true, message: "Database wiped and reseeded successfully without duplicates." });
}
