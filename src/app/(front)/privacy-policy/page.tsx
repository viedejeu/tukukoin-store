import { Metadata } from "next";
import { getConfig } from "@/app/actions/configActions";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  return {
    title: `Kebijakan Privasi | ${config.siteName}`,
    description: `Kebijakan Privasi dan perlindungan data pelanggan di ${config.siteName}. Ketahui bagaimana kami mengelola dan melindungi informasi Anda.`,
  };
}

export default async function PrivacyPolicyPage() {
  const config = await getConfig();
  
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Kebijakan <span className="text-gold">Privasi</span>
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Halaman ini menjelaskan informasi apa yang dapat dikumpulkan saat Anda membuka website {config.siteName}, untuk apa informasi itu digunakan, dan perlindungan privasi Anda.
        </p>
        <p className="text-xs text-gold font-mono">Terakhir diperbarui: 1 September 2026</p>
      </section>

      {/* Content */}
      <article className="prose prose-invert prose-p:text-gray-400 prose-headings:text-foreground prose-a:text-gold max-w-none space-y-8 bg-black-light border border-black-border p-8 rounded-3xl shadow-xl">
        
        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">01</span> Informasi yang kami kumpulkan
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Kami hanya mengumpulkan informasi dasar yang diperlukan untuk memproses pesanan top up Anda, yaitu User ID (atau informasi akun terkait di dalam game), nomor WhatsApp, dan data nominal transaksi. Kami <strong>tidak pernah meminta password, kode OTP, atau data rahasia lainnya</strong>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">02</span> Data pesanan dan transaksi
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Seluruh rincian transaksi (metode pembayaran, waktu, dan jumlah pembayaran) dicatat oleh penyedia gerbang pembayaran (Payment Gateway) resmi kami. {config.siteName} tidak menyimpan data kartu kredit atau kredensial perbankan Anda secara langsung.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">03</span> Tujuan penggunaan informasi
          </h2>
          <ul className="text-sm leading-relaxed text-gray-300 list-disc pl-5 space-y-2">
            <li>Memproses, memverifikasi, dan mengirimkan item virtual atau mata uang game ke akun Anda.</li>
            <li>Mengirimkan tanda terima atau notifikasi status pesanan via WhatsApp/Email.</li>
            <li>Mempercepat penanganan masalah (troubleshooting) melalui Customer Service jika terjadi kendala.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">04</span> Cookie dan analitik
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Website ini menggunakan <em>Cookies</em> secara terbatas untuk menganalisis kepadatan pengunjung (melalui layanan analitik). Hal ini membantu kami memperbaiki kualitas server agar website tidak lambat saat diakses banyak orang. Kami tidak menggunakan <em>Cookies</em> untuk melacak aktivitas Anda di luar situs kami.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">05</span> Keamanan Data
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            {config.siteName} berkomitmen melindungi informasi transaksi Anda. Komunikasi antara peramban (<em>browser</em>) Anda dan server kami dienkripsi secara penuh. Kami juga memastikan akses ke database pesanan hanya terbatas untuk tim Customer Service yang bertugas.
          </p>
        </div>

      </article>
    </div>
  );
}
