// src/app/program/mikrotik/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Award, UserCheck, Server, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import MarqueeWrapper from '@/components/ui/MarqueeWrapper';

const mikrotikFeatures = [
  {
    icon: <Award className="w-5 h-5 text-brand-pink-start" />,
    title: 'Lisensi Internasional',
    description: 'Sertifikasi resmi langsung dari MikroTik pusat di Latvia.',
  },
  {
    icon: <UserCheck className="w-5 h-5 text-brand-pink-start" />,
    title: 'Mentor Expert',
    description: 'Instruktur tersertifikasi tingkat Advance (MTCRE/MTCINE).',
  },
  {
    icon: <Server className="w-5 h-5 text-brand-pink-start" />,
    title: 'Standar Industri',
    description: 'Praktik langsung menggunakan perangkat Routerboard asli.',
  },
];

const whatYouGet = [
  'Sertifikat Internasional MTCNA',
  'Skill Routing & Switching',
  'Manajemen Bandwidth & Hotspot',
  'Keamanan Jaringan (Firewall)',
  'Konfigurasi Hotspot Cafe/Warkop',
  'Siap Kerja Network Admin',
];

export default function MikrotikAcademyPage() {
  return (
    <>
      <Header />
      
      <main className="bg-[#0B1120] min-h-screen flex flex-col">
        
        {/* HERO SECTION - Compact & Clean */}
        <section className="relative w-full h-[500px] xl:h-[600px] flex items-center">
          <Image
            src="/ban-mikrotik.webp" 
            alt="MikroTik Academy Background"
            fill
            className="object-cover object-right"
            priority
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-pink-start" />
                <span className="text-[10px] font-semibold text-white uppercase tracking-widest">
                  Official MikroTik Academy
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.15] mb-3">
                Pusat Keunggulan <br />
                <span className="text-brand-pink-start">Jaringan Masa Depan</span>
              </h1>
              
              <p className="text-sm lg:text-base text-white/70 mb-6 leading-relaxed max-w-md">
                SMK Swasta Pertama di Indramayu dengan lisensi resmi untuk mencetak Network Engineer berstandar global.
              </p>
              
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 bg-brand-pink-start hover:bg-[#d94f92] text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-all shadow-lg shadow-brand-pink-start/20 uppercase tracking-wide"
              >
                Daftar PPDB <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Marquee Divider */}
        <div className="w-full border-y border-white/10 bg-[#0B1120] relative z-40">
          <MarqueeWrapper variant="dark" />
        </div>

        {/* COMPACT FEATURES GRID - No Row Span, Auto Height */}
        <section className="bg-slate-50 py-12 lg:py-16 px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Keunggulan <span className="text-brand-pink-start">MikroTik Academy</span>
              </h2>
            </div>

            {/* 3 Column Grid - Equal Size, Compact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Jalur Emas */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-brand-pink-start" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest">Program Unggulan</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Jalur Emas: UKK + MTCNA</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Setiap siswa kelas 12 melaksanakan UKK terintegrasi langsung dengan ujian MTCNA internasional.
                </p>
                <div className="inline-flex items-center gap-2 bg-brand-pink-start text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  Hemat 63% vs ujian mandiri
                </div>
              </div>

              {/* Card 2: Lisensi */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center">
                    {mikrotikFeatures[0].icon}
                  </div>
                  <span className="text-xs font-bold text-slate-900">{mikrotikFeatures[0].title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{mikrotikFeatures[0].description}</p>
              </div>

              {/* Card 3: Mentor */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center">
                    {mikrotikFeatures[1].icon}
                  </div>
                  <span className="text-xs font-bold text-slate-900">{mikrotikFeatures[1].title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{mikrotikFeatures[1].description}</p>
              </div>

            </div>

            {/* What You Get - Horizontal List */}
            <div className="mt-6 bg-[#0B1120] p-5 rounded-2xl border border-slate-800">
              <h4 className="text-xs font-bold text-white mb-3 uppercase tracking-wide">Yang Akan Kamu Kuasai</h4>
              <div className="flex flex-wrap gap-3">
                {whatYouGet.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-slate-800/50 text-slate-300 text-[11px] px-2.5 py-1 rounded-md border border-slate-700">
                    <CheckCircle className="w-3 h-3 text-brand-pink-start" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-8">
              <Link
                href="/ppdb"
                className="inline-flex items-center gap-2 bg-brand-pink-start hover:bg-[#d94f92] text-white text-xs font-bold px-8 py-3 rounded-lg transition-all shadow-lg shadow-brand-pink-start/20 uppercase tracking-wide"
              >
                Daftar PPDB Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}