import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-poppins",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// SEO Global - Target Top 5 Google Indramayu
export const metadata: Metadata = {
  title: "SMKS Telematika Indramayu | Sekolah IT & TKJ Terbaik di Indramayu",
  description: "Mencari SMK IT terbaik di Indramayu? SMKS Telematika Indramayu mencetak lulusan TKJ dan profesional teknologi yang siap kerja dan berkarir di industri global. Daftar sekarang!",
  keywords: [
    "smk it indramayu",
    "smk tkj terbaik indramayu",
    "sekolah komputer indramayu",
    "smks telematika",
    "mikrotik academy indramayu",
    "bursa kerja khusus indramayu",
  ],
  icons: {
    icon: 'icon.jpg',
    shortcut: 'icon.jpg',
    apple: 'icon.jpg',
  },
  openGraph: {
    title: "SMKS Telematika Indramayu | Sekolah IT & TKJ Terbaik",
    description: "Mencari SMK IT terbaik di Indramayu? SMKS Telematika Indramayu mencetak lulusan TKJ dan profesional teknologi yang siap kerja.",
    siteName: "SMKS Telematika Indramayu",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": "https://smkstelematika.sch.id/#organization",
  name: "SMKS Telematika Indramayu",
  alternateName: "SMK Telematika Indramayu",
  description: "Sekolah Menengah Kejuruan bidang Teknologi Informasi terbaik di Indramayu dengan program MikroTik Academy dan sertifikasi TKJ.",
  url: "https://smkstelematika.sch.id",
  logo: "https://smkstelematika.sch.id/logo-telematika.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jalan Raya Sindangkerta Lohbener",
    addressLocality: "Indramayu",
    addressRegion: "Jawa Barat",
    postalCode: "45252",
    addressCountry: "ID"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+62-234-123456",
    contactType: "customer service",
    email: "info@smkstelematika.sch.id"
  },
  sameAs: [
    "https://www.facebook.com/smktelematika",
    "https://www.instagram.com/smktelematika"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${inter.variable} font-sans antialiased bg-[#FDFDFD] text-gray-800 relative`}
      >
        {/* Pure CSS Grid Background */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-[#FDFDFD] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        <Header />
        <div className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
