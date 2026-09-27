import { Metadata } from "next";
import { getConfig } from "@/app/actions/configActions";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  return {
    title: `Syarat & Ketentuan | ${config.siteName}`,
    description: `Syarat dan ketentuan layanan top up game di ${config.siteName}. Harap baca perjanjian ini dengan saksama sebelum melakukan transaksi.`,
  };
}

export default async function TermsPage() {
  const config = await getConfig();
  
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Syarat & <span className="text-gold">Ketentuan</span>
        </h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Perjanjian mengikat terkait penggunaan layanan top up dan pembelian item game di {config.siteName}.
        </p>
        <p className="text-xs text-gold font-mono">Terakhir diperbarui: 1 September 2026</p>
      </section>

      {/* Content */}
      <article className="prose prose-invert prose-p:text-gray-400 prose-headings:text-foreground prose-a:text-gold max-w-none space-y-8 bg-black-light border border-black-border p-8 rounded-3xl shadow-xl">
        
        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">01</span> Ruang Lingkup Layanan
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            {config.siteName} menyediakan layanan top up mata uang virtual dan item in-game. Kami bertindak sepenuhnya sebagai perantara antara pengguna (Anda) dan penyedia layanan game. Kami tidak berafiliasi secara resmi dengan pihak <em>developer</em> atau <em>publisher</em> game, kecuali disebutkan lain.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">02</span> Kesalahan Input (User ID)
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Pengguna diwajibkan memeriksa kembali User ID, Zone ID, atau nama karakter sebelum menyelesaikan pesanan. <strong>Kami tidak melayani pengembalian dana (refund) atau pengiriman ulang</strong> apabila kesalahan penginputan ID berasal dari kelalaian pengguna.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">03</span> Kebijakan Harga & Pembayaran
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya, menyesuaikan nilai tukar dan kebijakan <em>supplier</em>. Pesanan akan otomatis diproses setelah pembayaran dari Payment Gateway atau mutasi bank berhasil divalidasi oleh sistem.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">04</span> Gangguan Sistem & Refund
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Jika top up gagal dikarenakan server game sedang pemeliharaan (<em>maintenance</em>) atau stok kosong, kami akan menawarkan opsi: (1) Menunggu hingga server kembali normal, atau (2) Pengembalian dana penuh (100% Refund) ke rekening/ewallet Anda. Proses refund manual memakan waktu maksimal 1x24 jam kerja.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-3 border-b border-black-border pb-2 mb-4">
            <span className="text-gold font-mono text-sm">05</span> Penyalahgunaan Layanan
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Pengguna dilarang keras menggunakan website ini untuk segala bentuk tindak kejahatan siber (<em>cybercrime</em>), pencucian uang, atau pemanfaatan <em>bug/glitch</em> eksploitasi transaksi. Kami berhak memblokir IP dan melaporkan tindak kecurangan kepada pihak berwajib.
          </p>
        </div>

      </article>
    </div>
  );
}
