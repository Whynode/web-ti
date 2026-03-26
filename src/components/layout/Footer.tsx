"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, Printer } from "lucide-react";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;
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
                  SMKS TELEMATIKA
                </h1>
              </div>
            </Link>

            <div className="text-sm text-white/60 space-y-2">
              <p>Jalan Pahlawan No. 123 Margadadi, Indramayu, Jawa Barat 45212</p>

              <div className="pt-3 space-y-1.5">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Phone : (0234) 123456</span>
                </p>
                <p className="flex items-center gap-2">
                  <Printer className="w-3.5 h-3.5" />
                  <span>Fax : (0234) 123457</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email : info@smkstelematika.sch.id</span>
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

          {/* Column 4: Gallery Snapshot */}
          <div>
            <h3 className="text-base font-bold mb-4 font-primary text-brand-pink-start">Galeri</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded-[10px] overflow-hidden bg-white/5 relative hover:opacity-80 transition-opacity">
                  <Image
                    src={`https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=200&auto=format&fit=crop&sig=${i}`}
                    alt="Galeri"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar (Updated: Posisi Rata Tengah Sempurna) */}
      <div className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start py-5 w-full mt-auto">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center text-white/90 text-[11px] md:text-xs font-medium space-y-1.5">
          <p>
            Hak Cipta © {new Date().getFullYear()} SMKS Telematika Indramayu. Semua Hak Dilindungi.
          </p>
          <p>
            Dirancang & Dikembangkan oleh{" "}
            <a
              href="https://arya-portfolio-web3.vercel.app"
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