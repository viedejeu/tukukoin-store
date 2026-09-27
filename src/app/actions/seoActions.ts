"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/mongodb';
import seoDataFallback from '@/data/db/seo.json';

const seoFilePath = path.join(process.cwd(), 'src', 'data', 'db', 'seo.json');

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  googleAnalyticsId: string;
  facebookPixelId: string;
  googleSiteVerification: string;
}

export async function getSeoConfig(): Promise<SeoConfig> {
  try {
    const db = await getDb();
    if (db) {
      const seo = await db.collection('seo').findOne({});
      if (seo) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = seo;
        return rest as SeoConfig;
      } else {
        // If no SEO in DB yet, insert the fallback
        await db.collection('seo').insertOne({ ...seoDataFallback });
        return seoDataFallback as SeoConfig;
      }
    }

    try {
      const fileContent = await fs.readFile(seoFilePath, 'utf-8');
      return JSON.parse(fileContent) as SeoConfig;
    } catch {
      return seoDataFallback as SeoConfig;
    }
  } catch (error) {
    console.error("Gagal membaca seo config:", error);
    return seoDataFallback as SeoConfig;
  }
}

export async function saveSeoConfig(data: SeoConfig) {
  try {
    const db = await getDb();
    if (db) {
      const existing = await db.collection('seo').findOne({});
      if (existing) {
        await db.collection('seo').updateOne({}, { $set: data });
      } else {
        await db.collection('seo').insertOne({ ...data });
      }
    } else {
      await fs.writeFile(seoFilePath, JSON.stringify(data, null, 2), 'utf-8');
    }
    
    // Revalidate global layout and admin layout
    revalidatePath('/', 'layout');
    
    return { success: true, message: "Berhasil menyimpan pengaturan SEO" };
  } catch (error) {
    console.error("Gagal menyimpan seo config:", error);
    throw new Error("Gagal menyimpan SEO");
  }
}
