import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

import { getConfig } from "@/app/actions/configActions";
import { getSeoConfig } from "@/app/actions/seoActions";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const seo = await getSeoConfig();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tukukoin.com"; 

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.metaTitle || `${config.siteName} - ${config.siteTagline}`,
      template: `%s | ${config.siteName}`
    },
    description: seo.metaDescription || config.siteTagline,
    keywords: seo.keywords || "",
    alternates: {
      canonical: siteUrl,
    },
    verification: {
      google: seo.googleSiteVerification || undefined,
    },
    openGraph: {
      title: seo.metaTitle || config.siteName,
      description: seo.metaDescription || config.siteTagline,
      url: siteUrl,
      siteName: config.siteName,
      images: config.bannerUrl ? [
        {
          url: config.bannerUrl,
          width: 1200,
          height: 630,
        }
      ] : [],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle || config.siteName,
      description: seo.metaDescription || config.siteTagline,
      images: config.bannerUrl ? [config.bannerUrl] : [],
    },
  };
}

import Script from 'next/script';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();
  const seo = await getSeoConfig();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tukukoin.com";
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": config.siteName,
    "image": config.logoUrl || config.bannerUrl,
    "description": seo.metaDescription || config.siteTagline,
    "url": siteUrl,
    "telephone": config.whatsappNumber,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ID"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.siteName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Google Analytics (GA4) */}
        {seo.googleAnalyticsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${seo.googleAnalyticsId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${seo.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}

        {/* Facebook Pixel */}
        {seo.facebookPixelId && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${seo.facebookPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground`}>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0A0A0A',
              color: '#fff',
              border: '1px solid #1A1A1A',
            },
            success: {
              iconTheme: {
                primary: '#D4AF37',
                secondary: '#000',
              },
            },
          }}
        />
      </body>
    </html>
  );
}

