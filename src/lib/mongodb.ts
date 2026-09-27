import { MongoClient } from 'mongodb';
import configData from '@/data/db/config.json';
import gamesData from '@/data/db/games.json';
import articlesData from '@/data/db/articles.json';

const uri = process.env.MONGODB_URI || "";
const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (uri) {
  try {
    if (process.env.NODE_ENV === 'development') {
      if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch(err => {
          console.error("MongoDB connect error:", err);
          throw err;
        });
      }
      clientPromise = global._mongoClientPromise;
    } else {
      client = new MongoClient(uri, options);
      clientPromise = client.connect().catch(err => {
        console.error("MongoDB connect error:", err);
        throw err;
      });
    }
  } catch (err) {
    console.error("MongoDB URI Syntax Error:", err);
    // If it throws here, clientPromise remains null, and getDb() will return null gracefully.
  }
}

export async function getDb(dbName = 'tukukoin_db') {
  if (!clientPromise) return null;
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

// Auto-Migration script
export async function runAutoMigration() {
  const db = await getDb();
  if (!db) return; // If no DB, we are in local JSON mode

  try {
    // Migrate Config
    const configCount = await db.collection('config').countDocuments();
    if (configCount === 0 && configData) {
      const clonedConfig = JSON.parse(JSON.stringify(configData));
      await db.collection('config').insertOne(clonedConfig);
      console.log("Auto-migrated config.json");
    }

    // Migrate Games
    const gamesCount = await db.collection('games').countDocuments();
    if (gamesCount === 0 && gamesData && gamesData.length > 0) {
      const clonedGames = JSON.parse(JSON.stringify(gamesData));
      await db.collection('games').insertMany(clonedGames);
      console.log(`Auto-migrated ${gamesData.length} games`);
    }

    // Migrate Articles
    const articlesCount = await db.collection('articles').countDocuments();
    if (articlesCount === 0 && articlesData && articlesData.length > 0) {
      const clonedArticles = JSON.parse(JSON.stringify(articlesData));
      await db.collection('articles').insertMany(clonedArticles);
      console.log(`Auto-migrated ${articlesData.length} articles`);
    }
  } catch (error) {
    console.error("Auto-migration failed:", error);
  }
}
