import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "SMKS Telematika Indramayu",
  description: "Website Resmi SMKS Telematika Indramayu",
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${inter.variable} font-sans antialiased bg-gray-50 text-gray-800 bg-tech-grid`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
