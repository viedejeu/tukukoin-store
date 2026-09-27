import { google } from 'googleapis';

export async function pingGoogleIndexing(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED') {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    // Replace literal \n with actual newlines to support Vercel/env string parsing
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!clientEmail || !privateKey) {
      console.warn("Google Indexing API: Credentials not configured (GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY missing). Skipping ping.");
      return false;
    }

    const jwtClient = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    await jwtClient.authorize();

    const indexing = google.indexing({ version: 'v3', auth: jwtClient });
    
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: type,
      },
    });

    console.log(`[Google Indexing API] Successfully pinged ${type} for ${url}. Response status:`, response.status);
    return true;
  } catch (error: any) {
    console.error("[Google Indexing API] Error pinging Google:", error?.message || error);
    return false;
  }
}


export async function testGoogleIndexingConnection(): Promise<{success: boolean, message: string}> {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').replace(/\\/g, ''); // Ensure proper unescaping
    
    if (!clientEmail || !privateKey) {
      return { success: false, message: "Kredensial tidak ditemukan di Vercel (GOOGLE_CLIENT_EMAIL atau GOOGLE_PRIVATE_KEY kosong)." };
    }

    const jwtClient = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    await jwtClient.authorize();
    
    // Test with a dummy URL
    const indexing = google.indexing({ version: 'v3', auth: jwtClient });
    const dummyUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://tukukointopup.com') + '/ping-test';
    
    const response = await indexing.urlNotifications.publish({
      requestBody: { url: dummyUrl, type: 'URL_UPDATED' },
    });

    return { success: true, message: `Koneksi Sukses! Google menjawab dengan status: ${response.status}` };
  } catch (error: any) {
    return { success: false, message: `Gagal terhubung ke Google: ${error.message || error}` };
  }
}
