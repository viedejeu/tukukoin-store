"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongodb";
import configDataFallback from '@/data/db/config.json';

const CONFIG_FILE_PATH = path.join(process.cwd(), "src", "data", "db", "config.json");

export interface SiteConfig {
  auroraOrb1Color?: string;
  auroraOrb2Color?: string;
  auroraOrb3Color?: string;
  auroraBgColor?: string;
  siteName: string;
  siteTagline: string;
  logoUrl: string;
  bannerUrl: string;
  whatsappNumber: string;
  telegramUrl: string;
  officialChannelUrl: string;
  bannerUrlModern?: string;
  bannerUrlModernMiddle?: string;
  bannerUrlModernBottom?: string;
}

export async function getConfig(): Promise<SiteConfig> {
  try {
    const db = await getDb();
    if (db) {
      // Auto-migrate if needed when connecting to MongoDB
      const config = await db.collection('config').findOne({});
      if (config) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, ...rest } = config;
        return rest as SiteConfig;
      }
    }

    try {
      const fileContent = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
      return JSON.parse(fileContent) as SiteConfig;
    } catch {
      return configDataFallback as SiteConfig;
    }
  } catch (error) {
    console.error("Gagal membaca config:", error);
    return configDataFallback as SiteConfig;
  }
}

export async function updateConfig(newConfig: Partial<SiteConfig>) {
  try {
    const currentConfig = await getConfig();
    const updatedConfig = { ...currentConfig, ...newConfig };
    
    const db = await getDb();
    if (db) {
      // Update MongoDB
      const configCount = await db.collection('config').countDocuments();
      if (configCount === 0) {
        await db.collection('config').insertOne(updatedConfig);
      } else {
        await db.collection('config').updateOne({}, { $set: updatedConfig });
      }
    } else {
      // Update local JSON
      await fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(updatedConfig, null, 2), "utf-8");
    }
    
    // Revalidate the frontend pages so they fetch the new config immediately
    revalidatePath("/", "layout");    
    return { success: true, message: "Konfigurasi berhasil disimpan!" };
  } catch (error) {
    console.error("Gagal update config:", error);
    return { success: false, message: "Error DB: " + ((error as Error).message || "Unknown error") };
  }
}


