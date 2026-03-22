import Link from "next/link";
import { ServerCrash, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-[#0B1120]">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-brand-navy via-brand-navy to-[#1a2744]" />
      </div>

      {/* Static Glowing Orb - Behind content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-pink/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Glassmorphism Card */}
      <div className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-[10px] p-8 md:p-14 max-w-2xl w-full text-center shadow-2xl">
        {/* Icon */}
        <div className="bg-brand-pink/10 p-4 rounded-full inline-block mb-6">
          <ServerCrash className="w-20 h-20 text-brand-pink" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Ups! Halaman durung bisa dibuka.
        </h1>

        {/* Sub-headline */}
        <p className="text-gray-400 text-lg mb-8">
          Alamat yang Anda tuju sepertinya sedang dalam perbaikan, atau Anda tersesat dari jaringan utama SMKS Telematika.
        </p>

        {/* CTA Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-brand-pink text-white font-bold py-3.5 px-8 rounded-[10px] hover:bg-white hover:text-brand-pink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          KEMBALI KE BERANDA
        </Link>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-navy/30 to-transparent" />
    </main>
  );
}
