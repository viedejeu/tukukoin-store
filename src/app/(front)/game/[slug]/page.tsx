import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getGames } from "@/app/actions/gamesActions";
import { ArrowLeft, AlertTriangle } from "lucide-react";

import { Game } from "@/data/games";
import ExpandableSeoBlock from "@/components/ExpandableSeoBlock";

function TopUpFormLayout({ game }: { game: Game }) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Left Column: Game Info */}
      <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-28 lg:self-start">
        <div className="bg-black-light border border-black-border rounded-2xl overflow-hidden p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,95,0,0.15)]">
          <div className="aspect-square relative w-32 h-32 mx-auto rounded-2xl overflow-hidden border-2 border-black-border shadow-[0_0_20px_rgba(255,95,0,0.1)] mb-6">
            <Image src={game.image} alt={game.name} fill className="object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-1 text-white">{game.name}</h1>
          <p className="text-sm text-gray-400 text-center mb-6">{game.developer}</p>
          
          <div className="space-y-4 text-sm text-gray-300">
            <p className="leading-relaxed">{game.description}</p>
          </div>
        </div>
      </div>

      {/* Right Column: CTA Box */}
      <div className="w-full lg:w-2/3">
        <div className="bg-black-light border border-black-border rounded-2xl p-8 md:p-12 text-center h-full flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-black pointer-events-none"></div>
          {/* Ambient glow removed */}

          <div className="relative z-10 max-w-lg mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Layanan <span className="text-gold">Top Up Resmi</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Untuk menjamin kecepatan proses (1 detik) dan keamanan transaksi 100%, seluruh pemesanan {game.name} dialihkan ke portal pemrosesan utama kami.
            </p>

            <a 
              href="https://tukukoin.com/"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-black text-xl rounded-full py-5 px-10 transition-all duration-300 shadow-[0_0_30px_rgba(255,95,0,0.4)] hover:shadow-[0_0_50px_rgba(255,95,0,0.6)] transform hover:-translate-y-1"
            >
              Lanjutkan ke Halaman Pembayaran
            </a>
            
            <div className="mt-6 flex items-center justify-center gap-6 text-sm font-semibold text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span> 
                Online 24 Jam
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span> 
                Proses Instan
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryDescription(game: Game) {
  const cat = game.category || "Game Populer";
  switch (cat) {
    case "Pulsa & Data":
      return (
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            {game.name} adalah layanan isi ulang pulsa dan paket data resmi dari {game.developer}. 
            Di TukuKoin, kami memprioritaskan kecepatan dan keamanan transaksi Anda.
          </p>
          <p>
            Layanan ini menggunakan <strong>{game.currency}</strong> reguler maupun data yang akan langsung masuk ke nomor ponsel tujuan. 
            Pastikan nomor yang Anda masukkan sudah benar dan dalam kondisi aktif sebelum melakukan pemesanan.
          </p>
        </div>
      );
    case "E-Wallet":
      return (
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            {game.name} adalah layanan pengisian saldo dompet digital resmi dari {game.developer}. 
            Di TukuKoin, kami menjamin saldo masuk dalam hitungan detik dengan proses yang 100% aman.
          </p>
          <p>
            Pengisian <strong>{game.currency}</strong> ini hanya membutuhkan nomor handphone yang terdaftar pada akun dompet digital Anda.
            Harap periksa kembali nomor Anda untuk menghindari kesalahan pengiriman saldo.
          </p>
        </div>
      );
    case "Voucher Game":
      return (
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            {game.name} adalah voucher digital resmi dari {game.developer}. 
            Di TukuKoin, kami menyediakan kode voucher yang dijamin 100% valid, legal, dan aman.
          </p>
          <p>
            Setelah Anda memesan <strong>{game.currency}</strong> ini, Anda akan menerima kode voucher unik. Kode tersebut bisa langsung ditukarkan (redeem) di dalam platform atau aplikasi resminya.
          </p>
        </div>
      );
    case "Tagihan & Utilitas":
      return (
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            {game.name} adalah layanan pembayaran dan pembelian resmi dari {game.developer}. 
            Kami mempermudah Anda untuk membayar berbagai kebutuhan harian secara praktis dan cepat.
          </p>
          <p>
            Masukkan nomor pelanggan atau nomor ID meteran Anda dengan teliti untuk membeli <strong>{game.currency}</strong> ini agar transaksi bisa langsung diproses ke sistem pusat.
          </p>
        </div>
      );
    default:
      return (
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            {game.name} adalah game kompetitif populer yang di-publish oleh {game.developer}. Pemain bergabung dalam pertempuran strategis untuk menjadi yang terbaik. 
            Di TukuKoin, kami memprioritaskan keamanan dan kenyamanan transaksi Anda.
          </p>
          <p>
            Mata uang berbayarnya adalah <strong>{game.currency}</strong>. {game.currency} dipakai untuk membeli skin, karakter, pass musiman, dan berbagai item kosmetik lainnya. 
            Tidak ada satupun di antaranya yang merusak keseimbangan permainan — pengembang menjaga persaingan tetap adil dengan menempatkan pembelian di sisi tampilan/kosmetik.
          </p>
          <p>
            Untuk mengisi {game.currency}, yang dibutuhkan adalah Player ID yang bisa Anda temukan di menu profil dalam game. 
            Sebelum menyerahkan ID ke layanan mana pun, pastikan nomornya benar dengan menyalin langsung dari dalam game.
          </p>
        </div>
      );
  }
}

// The Coming Soon Component for unavailable games
function ComingSoonLayout({ game }: { game: Game }) {
  return (
    <div className="relative pt-6 pb-8">
      {/* Top Background Glow */}
      {/* Ambient glow removed */}
      
      <header className="max-w-3xl mb-12" data-reveal="up">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/20 bg-gold/10 px-2.5 py-1 font-mono text-[.65rem] font-bold tracking-[.2em] text-gold uppercase">
          <span className="size-1.5 rounded-full bg-gold shadow-[0_0_10px_#FFC72C]"></span>Informasi game
        </span>
        <h1 className="mt-4 text-3xl leading-[1.08] font-bold sm:text-4xl lg:text-5xl text-white">
          Informasi Top Up <span className="text-gold">{game.name}</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
          Informasi & panduan top up {game.currency} {game.name}.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/#games" className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] bg-black-border/30 border border-black-border/50 text-white hover:border-gold/45 hover:text-gold hover:bg-white/[.06] h-11 px-5 text-sm">
            <ArrowLeft className="w-4 h-4" /> Pilih game lain
          </Link>
        </div>
      </header>

      {/* Alert Box */}
      <div className="bg-[#2A1508] border border-gold/30 rounded-2xl p-5 sm:p-6 mb-12 flex gap-4">
        <AlertTriangle className="w-6 h-6 text-gold shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-white text-base sm:text-lg mb-1">Pemesanan {game.name} belum tersedia di TUKUKOIN</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Halaman ini berisi informasi saja. Kami belum membuka layanan pemesanan untuk {game.name}, jadi tidak ada daftar nominal, harga, maupun proses pembayaran di sini.
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-14">
        {/* Left: Sticky Card */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="bg-black-light border border-black-border overflow-hidden rounded-[1.35rem] transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,95,0,0.15)]">
            <div className="relative aspect-square w-full">
              <Image src={game.image} alt={game.name} fill className="object-cover" />
            </div>
            <div className="p-5">
              <p className="text-base font-bold text-white">{game.name}</p>
              <p className="mt-1.5 font-mono text-[.68rem] tracking-[.14em] text-gray-500 uppercase">Informasi & panduan</p>
            </div>
          </div>
        </div>

        {/* Right: Article */}
        <div className="space-y-12">
          <section>
            <h2 className="text-xl font-bold text-white sm:text-2xl mb-4">Tentang {game.name}</h2>
            {getCategoryDescription(game)}
          </section>

          <section>
            <h2 className="text-xl font-bold text-white sm:text-2xl mb-4">Status layanan di TUKUKOIN</h2>
            <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
              <p>
                Saat ini kami <strong>belum membuka pemesanan {game.currency} {game.name}</strong>. Halaman ini bersifat informasi saja, sehingga tidak memuat daftar nominal, harga, maupun proses pembayaran.
              </p>
              <p>
                Layanan top up yang sudah berjalan di TUKUKOIN bisa Anda lihat di halaman utama. Kalau Anda ingin dikabari begitu layanan {game.name} dibuka, sampaikan lewat WhatsApp resmi kami di halaman kontak. Selama status ini masih berlaku, tidak ada pihak yang berhak menerima pembayaran {game.name} atas nama TUKUKOIN — kalau ada yang menawarkannya kepada Anda, konfirmasikan dulu ke kanal resmi.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white sm:text-2xl mb-6">Pertanyaan yang sering diajukan</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white mb-2">Apakah saya bisa top up {game.name} di TUKUKOIN sekarang?</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Belum. Kami belum membuka pemesanan untuk {game.name}, jadi halaman ini tidak memuat daftar nominal, harga, maupun proses pembayaran. Halaman ini murni informasi.</p>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">Kenapa harganya tidak ditampilkan?</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Kami hanya menampilkan harga untuk layanan yang benar-benar bisa kami proses. Menampilkan daftar harga {game.name} sekarang berarti menjanjikan sesuatu yang belum bisa kami penuhi.</p>
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">Kapan layanannya dibuka?</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Belum ada tanggal yang bisa kami pastikan. Kalau Anda ingin dikabari, sampaikan lewat customer service resmi kami.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-black-light border border-black-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white sm:text-xl mb-3">Yang bisa Anda lakukan sekarang</h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Hubungi customer service kami supaya Anda langsung tahu begitu layanan {game.name} dibuka.
              </p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-all duration-300 bg-gold text-black hover:bg-yellow-500 hover:shadow-[0_0_15px_rgba(255,95,0,0.4)] h-11 px-6 text-sm">
                Hubungi Customer Service
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const gamesList = await getGames();
  return gamesList.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<import("next").Metadata> {
  const resolvedParams = await params;
  const gamesList = await getGames();
  const game = gamesList.find((g) => g.slug === resolvedParams.slug);

  if (!game) {
    return {
      title: "Game Tidak Ditemukan",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tukukoin.com";

  return {
    title: `Top Up ${game.name} Murah & Aman`,
    description: `Beli mata uang ${game.currency} untuk ${game.name} termurah dan terpercaya. ${game.description?.substring(0, 100)}...`,
    alternates: {
      canonical: `${siteUrl}/game/${game.slug}`,
    },
    openGraph: {
      title: `Top Up ${game.name} Murah & Aman`,
      description: `Beli mata uang ${game.currency} untuk ${game.name} termurah dan terpercaya.`,
      images: [
        {
          url: game.image,
          width: 800,
          height: 800,
          alt: game.name,
        },
      ],
    },
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const gamesList = await getGames();
  const game = gamesList.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  const faqQuestions = game.isAvailable ? [
    {
      question: `Bagaimana cara top up ${game.name} di TukuKoin?`,
      answer: `Untuk melakukan top up ${game.name}, cukup masukkan User ID Anda, pilih nominal ${game.currency} yang diinginkan, lalu pilih metode pembayaran. Setelah pembayaran berhasil, ${game.currency} akan otomatis masuk ke akun Anda dalam hitungan detik.`
    },
    {
      question: `Berapa lama proses masuknya ${game.currency} ${game.name}?`,
      answer: `Proses top up di TukuKoin sepenuhnya otomatis dan instan. ${game.currency} akan langsung masuk ke akun ${game.name} Anda dalam waktu 1-5 detik setelah pembayaran dikonfirmasi.`
    },
    {
      question: `Apakah top up ${game.name} di sini resmi dan aman?`,
      answer: `Ya, 100% aman dan resmi. Kami bekerja sama langsung dengan penyedia layanan sehingga akun Anda dijamin aman dari risiko banned atau masalah lainnya.`
    }
  ] : [
    {
      question: `Apakah saya bisa top up ${game.name} di TUKUKOIN sekarang?`,
      answer: `Belum. Kami belum membuka pemesanan untuk ${game.name}, jadi halaman ini tidak memuat daftar nominal, harga, maupun proses pembayaran. Halaman ini murni informasi.`
    },
    {
      question: `Kenapa harganya tidak ditampilkan?`,
      answer: `Kami hanya menampilkan harga untuk layanan yang benar-benar bisa kami proses. Menampilkan daftar harga ${game.name} sekarang berarti menjanjikan sesuatu yang belum bisa kami penuhi.`
    },
    {
      question: `Kapan layanannya dibuka?`,
      answer: `Belum ada tanggal yang bisa kami pastikan. Kalau Anda ingin dikabari, sampaikan lewat customer service resmi kami.`
    }
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqQuestions.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tukukoin.com";
  
  const productLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": `Top Up ${game.name}`,
    "image": game.image,
    "description": `Beli mata uang ${game.currency} untuk ${game.name} termurah dan terpercaya.`,
    "brand": {
      "@type": "Brand",
      "name": game.developer
    },
    "offers": {
      "@type": "AggregateOffer",
      "url": `${siteUrl}/game/${game.slug}`,
      "priceCurrency": "IDR",
      "lowPrice": "1000",
      "highPrice": "1000000",
      "availability": game.isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    }
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Game",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": game.name,
        "item": `${siteUrl}/game/${game.slug}`
      }
    ]
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {game.isAvailable === false ? (
        <ComingSoonLayout game={game} />
      ) : (
        <TopUpFormLayout game={game} />
      )}
      
      {game.seoContent && <ExpandableSeoBlock content={game.seoContent} title={game.name} />}
    </div>
  );
}
