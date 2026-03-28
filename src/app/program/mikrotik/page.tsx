// src/app/program/mikrotik/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Award, BookOpen, UserCheck, ArrowRight, ShieldCheck, CheckCircle, Router, Wifi, Lock, Gauge, GitBranch, Network, FlaskConical, FileCheck, Monitor, Ticket, Briefcase, Circle } from 'lucide-react';
import Header from '@/components/layout/Header';

const benefits = [
  {
    icon: <Award className="w-5 h-5" />,
    title: 'Sertifikasi Internasional',
    description: 'Sertifikat MTCNA langsung dari MikroTik Latvia yang diakui secara global.',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Kurikulum Industri',
    description: 'Materi up-to-date sesuai standar terbaru MikroTik RouterOS.',
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: 'Instruktur Tersertifikasi',
    description: 'Diajar langsung oleh certified trainer (MTCRE/MTCINE).',
  },
];

const curriculum = [
  { title: 'Routing (Static & OSPF)' },
  { title: 'Bridging & Switch Management' },
  { title: 'Wireless Configuration' },
  { title: 'Firewall & Security' },
  { title: 'QoS & Bandwidth Management' },
  { title: 'VPN & Tunnel Protocols' },
];

const certificationPath = [
  { level: 'MTCNA', name: 'Network Associate', status: 'current' },
  { level: 'MTCRE', name: 'Routing Engineer', status: 'next' },
  { level: 'MTCINE', name: 'Internetworking Engineer', status: 'future' },
];

const learningSteps = [
  {
    step: '01',
    title: 'Basic Networking',
    description: 'Pemahaman dasar TCP/IP & Topologi',
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    step: '02',
    title: 'RouterOS Fundamental',
    description: 'Eksplorasi fitur dasar MikroTik',
    icon: <Router className="w-5 h-5" />,
  },
  {
    step: '03',
    title: 'Advanced Lab',
    description: 'Praktik real-case: Routing, Firewall, QoS',
    icon: <FlaskConical className="w-5 h-5" />,
  },
  {
    step: '04',
    title: 'Ujian MTCNA',
    description: 'Simulasi & Ujian Sertifikasi Resmi',
    icon: <FileCheck className="w-5 h-5" />,
  },
];

const extraBenefits = [
  {
    icon: <Monitor className="w-6 h-6" />,
    title: 'Akses RouterBoard Fisik',
    description: 'Praktik langsung dengan perangkat nyata.',
  },
  {
    icon: <Ticket className="w-6 h-6" />,
    title: 'Lisensi RouterOS Level 4',
    description: 'Student license untuk setiap siswa.',
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: 'Peluang Karir Jaringan',
    description: 'Kontrak kerja dengan mitra industri.',
  },
];

export default function MikrotikAcademyPage() {
  return (
    <>
      <Header />
      
      <main className="flex flex-col">
        
        {/* HERO SECTION - Deep Blue Dark */}
        <section className="relative w-full h-[500px] xl:h-[600px] flex items-center bg-[#0B1120]">
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

        {/* Divider */}
        <div className="w-full border-y border-white/10 bg-[#0B1120] relative z-40" />

        {/* ============================================ */}
        {/* SECTION 1: KENAPA MEMILIH - DEEP BLUE */}
        {/* ============================================ */}
        <section className="py-20 lg:py-24 px-6 bg-[#0B1120]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-14">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Kenapa Memilih <span className="text-brand-pink-start">Mikrotik Academy</span>
              </h2>
              <p className="text-white/50 text-sm max-w-xl mx-auto">
                SMKS Telematika Indramayu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-pink-start/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-pink-start/10 border border-brand-pink-start/20 flex items-center justify-center mb-4 text-brand-pink-start">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: MTCNA FOCUS - LIGHT THEME */}
        {/* ============================================ */}
        <section className="py-20 lg:py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left: MTCNA Explanation */}
              <div className="order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 bg-brand-pink-start/10 border border-brand-pink-start/20 px-3 py-1 rounded-full mb-4">
                  <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest">Focus</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-5">
                  MTCNA <span className="text-brand-pink-start">Certification</span>
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  MikroTik Certified Network Associate (MTCNA) adalah sertifikasi fundamental yang diakui secara global. Peserta akan mempelajari konsep jaringan tingkat lanjut termasuk routing, bridging, firewall, wireless, hingga manajemen bandwidth.
                </p>
                <div className="space-y-3">
                  {[
                    'Konsep TCP/IP dan subnetting',
                    'Static Routing & OSPF',
                    'Bridging dan Wireless',
                    'Firewall Filter & NAT',
                    'Hotspot & User Management',
                    'Queue & Bandwidth Control',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-pink-start flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Certification Path with Glow */}
              <div className="order-1 lg:order-2">
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-sm font-semibold text-slate-700 mb-6 uppercase tracking-wider">Certification Path</h3>
                  
                  <div className="space-y-4">
                    {certificationPath.map((cert, index) => (
                      <div key={cert.level} className="relative">
                        <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                          cert.status === 'current' 
                            ? 'bg-brand-pink-start/10 border-brand-pink-start/30' 
                            : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xs border ${
                            cert.status === 'current'
                              ? 'bg-gradient-to-br from-brand-pink-start to-brand-blue-start border-brand-pink-start text-white shadow-lg'
                              : 'bg-slate-100 border-slate-200 text-slate-400'
                          }`}>
                            {cert.level}
                          </div>
                          
                          <div className="flex-1">
                            <p className={`text-sm font-semibold ${
                              cert.status === 'current' ? 'text-slate-900' : 'text-slate-400'
                            }`}>{cert.name}</p>
                            <p className="text-[10px] uppercase tracking-wider mt-0.5 ${
                              cert.status === 'current' ? 'text-brand-pink-start' : 'text-slate-300'
                            }">
                              {cert.status === 'current' ? 'Sedang Dipelajari' : cert.status === 'next' ? 'Selanjutnya' : 'Tingkat Lanjut'}
                            </p>
                          </div>

                          {cert.status === 'current' && (
                            <div className="w-2 h-2 rounded-full bg-brand-pink-start animate-pulse" />
                          )}
                        </div>
                        
                        {index < certificationPath.length - 1 && (
                          <div className="absolute left-1/2 -bottom-4 w-0.5 h-4 bg-slate-200 -translate-x-1/2">
                            <div className={`w-full h-1/2 ${
                              cert.status === 'current' ? 'bg-gradient-to-b from-brand-pink-start to-transparent' : ''
                            }`} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                      <span>Progress</span>
                      <span>33%</span>
                    </div>
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full w-[33%] bg-gradient-to-r from-brand-pink-start to-brand-blue-start rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: TIMELINE - DEEP BLUE */}
        {/* ============================================ */}
        <section className="py-20 lg:py-24 px-6 bg-[#0B1120]">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-14">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Alur Pembelajaran <span className="text-brand-pink-start">& Sertifikasi</span>
              </h2>
              <p className="text-white/50 text-sm">
                Jalur kompetensi dari dasar hingga sertifikasi
              </p>
            </div>

            <div className="relative">
              {/* Horizontal Line */}
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-pink-start to-transparent" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {learningSteps.map((step, index) => (
                  <div key={index} className="relative flex flex-col items-center text-center">
                    {/* Node Circle */}
                    <div className="w-16 h-16 rounded-full bg-[#0B1120] border-2 border-brand-pink-start flex items-center justify-center text-brand-pink-start shadow-lg shadow-brand-pink-start/20 mb-4 z-10">
                      {step.icon}
                    </div>
                    
                    {/* Step Number */}
                    <span className="text-[10px] font-bold text-brand-pink-start uppercase tracking-widest mb-1">
                      Step {step.step}
                    </span>
                    
                    {/* Content */}
                    <h3 className="text-base font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed max-w-[140px]">
                      {step.description}
                    </p>

                    {/* Connector Line (mobile) */}
                    {index < learningSteps.length - 1 && (
                      <div className="lg:hidden absolute -bottom-6 left-1/2 w-0.5 h-6 bg-brand-pink-start/30 -translate-x-1/2" />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: EXTRA BENEFITS - LIGHT THEME */}
        {/* ============================================ */}
        <section className="py-20 lg:py-24 px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {extraBenefits.map((item, index) => (
                <div 
                  key={index}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-brand-pink-start/20 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-pink-start/10 to-brand-blue-start/10 border border-brand-pink-start/20 flex items-center justify-center mx-auto mb-4 text-brand-pink-start">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-14">
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
