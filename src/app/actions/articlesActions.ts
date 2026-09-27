"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { Article } from '@/data/articles';
import { pingGoogleIndexing, testGoogleIndexingConnection } from '@/lib/googleIndexing';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tukukointopup.com';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import articlesDataFallback from '@/data/db/articles.json';

const articlesFilePath = path.join(process.cwd(), 'src', 'data', 'db', 'articles.json');

export async function getArticles(): Promise<Article[]> {
  try {
    const db = await getDb();
    if (db) {
      const articles = await db.collection('articles').find({}).sort({ date: -1 }).toArray();
      return articles.map(a => { const { _id, ...rest } = a; return { ...rest, id: _id.toString() } as unknown as Article; });
    }

    try {
      const fileContent = await fs.readFile(articlesFilePath, 'utf-8');
      return JSON.parse(fileContent) as Article[];
    } catch {
      return articlesDataFallback as Article[];
    }
  } catch (error) {
    console.error("Gagal membaca articles:", error);
    return articlesDataFallback as Article[];
  }
}

export async function saveArticles(articles: Article[]) {
  try {
    await fs.writeFile(articlesFilePath, JSON.stringify(articles, null, 2), 'utf-8');
    revalidatePath('/', 'layout');
    return { success: true, message: "Berhasil menyimpan daftar Artikel" };
  } catch (error) {
    console.error("Gagal menyimpan articles.json:", error);
    throw new Error("Gagal menyimpan artikel");
  }
}

export async function addArticle(article: Article) {
  const db = await getDb();
  if (db) {
    await db.collection('articles').insertOne({ ...article });
    revalidatePath('/', 'layout');
    pingGoogleIndexing(`${siteUrl}/blog/${article.slug}`, 'URL_UPDATED').catch(console.error);
    return { success: true, message: "Berhasil menyimpan daftar Artikel" };
  } else {
    const articles = await getArticles();
    articles.unshift(article);
    return saveArticles(articles);
  }
}

export async function updateArticle(id: string, updatedArticle: Partial<Article>) {
  const db = await getDb();
  if (db) {
    const { id: _, ...updateData } = updatedArticle as any; // eslint-disable-line
    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { id };
    }
    await db.collection('articles').updateOne(filter, { $set: updateData });
    revalidatePath('/', 'layout');
    if (updatedArticle.slug) pingGoogleIndexing(`${siteUrl}/blog/${updatedArticle.slug}`, 'URL_UPDATED').catch(console.error);
    return { success: true, message: "Berhasil menyimpan daftar Artikel" };
  } else {
    const articles = await getArticles();
    const index = articles.findIndex(a => a.id === id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updatedArticle, id };
      return saveArticles(articles);
    }
    throw new Error("Artikel tidak ditemukan");
  }
}

export async function deleteArticle(id: string) {
  const db = await getDb();
  if (db) {
    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { id };
    }
    await db.collection('articles').deleteOne(filter);
    revalidatePath('/', 'layout');
    return { success: true, message: "Berhasil menghapus Artikel" };
  } else {
    const articles = await getArticles();
    const filtered = articles.filter(a => a.id !== id);
    return saveArticles(filtered);
  }
}

export async function bulkDeleteArticles(ids: string[]) {
  const db = await getDb();
  if (db) {
    const objectIds: ObjectId[] = [];
    const stringIds: string[] = [];
    
    for (const id of ids) {
      try {
        objectIds.push(new ObjectId(id));
      } catch {
        stringIds.push(id);
      }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let filter: any = {};
    if (objectIds.length > 0 && stringIds.length > 0) {
      filter = { $or: [{ _id: { $in: objectIds } }, { id: { $in: stringIds } }] };
    } else if (objectIds.length > 0) {
      filter = { _id: { $in: objectIds } };
    } else if (stringIds.length > 0) {
      filter = { id: { $in: stringIds } };
    } else {
      return { success: true };
    }

    await db.collection('articles').deleteMany(filter);
    revalidatePath('/', 'layout');
    return { success: true, message: 'Berhasil menghapus artikel terpilih' };
  } else {
    const articles = await getArticles();
    const filtered = articles.filter(a => !ids.includes(a.id));
    return saveArticles(filtered);
  }
}




export async function testGoogleIndexing() {
  return await testGoogleIndexingConnection();
}
