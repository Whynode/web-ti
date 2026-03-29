"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Printer } from "lucide-react";
import NewsletterForm from "@/components/ui/NewsletterForm";
import FooterGallery from "./FooterGallery";

export default function Footer() {
  const schoolName = "SMKS TELEMATIKA";
  const schoolAddress = "Jalan Raya Sindangkerta Lohbener, Indramayu, Jawa Barat 45252";
  const schoolPhone = "(0234) 123456";
  const schoolFax = "(0234) 123457";
  const schoolEmail = "info@smkstelematika.sch.id";
  
  return (
    <footer className="bg-brand-navy bg-grid-dark text-white pt-16 flex flex-col min-h-max relative">
      <div className="container max-w-7xl mx-auto px-4 pb-12">
        {/* Newsletter Section */}
        <div className="bg-[#0B1120] px-6 py-5 md:px-8 md:py-6 -mt-8 mb-12 shadow-lg border-l-4 border-brand-pink-start flex flex-col lg:flex-row items-center justify-between gap-4 rounded-none">
          <div className="flex items-center gap-2 text-center lg:text-left flex-wrap justify-center lg:justify-start shrink-0">
            <h3 className="text-lg md:text-xl font-bold font-primary leading-none m-0">Jangan</h3>
            <p className="text-brand-pink-start font-bold text-base md:text-lg leading-none m-0">Lewatkan Berita Terbaru</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1: School Info */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-white rounded-[10px] flex items-center justify-center shadow-lg overflow-hidden shrink-0 group-hover:scale-105 transition-transform p-1">
                <Image src="/logo-telematika.webp" alt="Logo SMKS Telematika" width={48} height={48} className="object-contain w-full h-full" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-primary font-bold text-lg md:text-xl leading-tight tracking-tight text-white uppercase group-hover:text-brand-pink-start transition-colors">
                  {schoolName}
                </h1>
              </div>
            </Link>

            <div className="text-sm text-white/60 space-y-2">
              <p>{schoolAddress}</p>

              <div className="pt-3 space-y-1.5">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone : {schoolPhone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Fax : {schoolFax}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email : {schoolEmail}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quicklinks */}
          <div>
            <h3 className="text-base font-bold mb-4 font-primary text-brand-pink-start">Tautan Cepat</h3>
            <ul className="space-y-2.5 text-sm text-white/60 font-medium">
              <li><Link href="/" className="hover:text-brand-pink-start transition-colors">Beranda</Link></li>
              <li><Link href="/about" className="hover:text-brand-pink-start transition-colors">Profil</Link></li>
              <li><Link href="/bkk" className="hover:text-brand-pink-start transition-colors">BKK</Link></li>
              <li><Link href="/berita" className="hover:text-brand-pink-start transition-colors">Berita</Link></li>
              <li><Link href="/kontak" className="hover:text-brand-pink-start transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Column 3: Academics */}
          <div>
            <h3 className="text-base font-bold mb-4 font-primary text-brand-pink-start">Akademik</h3>
            <ul className="space-y-2.5 text-sm text-white/60 font-medium">
              <li><Link href="/program" className="hover:text-brand-pink-start transition-colors">Program</Link></li>
              <li><Link href="/ppdb" className="hover:text-brand-pink-start transition-colors">Penerimaan</Link></li>
              <li><Link href="/galeri" className="hover:text-brand-pink-start transition-colors">Galeri</Link></li>
            </ul>
          </div>

          {/* Column 4: Gallery Snapshot - Server Component */}
          <div>
            <h3 className="text-base font-bold mb-4 font-primary text-brand-pink-start">Galeri</h3>
            <FooterGallery />
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start py-5 w-full mt-auto">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center text-white/90 text-[11px] md:text-xs font-medium space-y-1.5">
          <p>
            Hak Cipta © {new Date().getFullYear()} {schoolName}. Semua Hak Dilindungi.
          </p>
          <p>
            Designed & Developed by{" "}
            <a
              href="https://web-portofolio-jade.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-bold hover:text-brand-navy hover:underline underline-offset-2 transition-all duration-300"
            >
              Arya Suhendra
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
