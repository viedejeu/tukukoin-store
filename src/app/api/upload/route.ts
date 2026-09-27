import { NextResponse, NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: NextRequest) {
  try {
    // Re-configure inside the handler to prevent Next.js caching issues
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Mengonversi file ke format Base64 yang bisa dibaca Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Mengirim ke Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64String, {
      folder: 'tukukoin_uploads',
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const errorMessage = error instanceof Error ? error.message : "Gagal mengunggah gambar";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
