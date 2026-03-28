"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MarqueeTickerProps {
  variant?: "dark" | "pink";
  articles?: { text: string; link: string }[];
}

const defaultAnnouncements = [
  { text: "Pendaftaran PPDB Gelombang 1 Dibuka!", link: "/ppdb" },
  { text: "SMKS Telematika - SMK IT Terbaik di Indramayu", link: "/" },
  { text: "Program Unggulan Teknik Komputer & Jaringan", link: "/program/mikrotik" },
  { text: "MikroTik Academy - Sertifikasi Internasional", link: "/program/mikrotik" },
];

export default function MarqueeTicker({ variant = "dark", articles }: MarqueeTickerProps) {
  const items = articles && articles.length > 0 ? articles : defaultAnnouncements;
  const tickerItems = [...items, ...items, ...items, ...items];

  const wrapperClass =
    variant === "pink"
      ? "bg-brand-pink-start border-y border-brand-pink-end/30 text-brand-navy overflow-hidden py-3 relative z-40 shadow-inner w-full flex"
      : "bg-brand-navy border-y border-white/10 text-white overflow-hidden py-3 relative z-40 shadow-inner w-full flex";

  const linkClass =
    variant === "pink"
      ? "flex items-center gap-3 px-8 text-sm font-bold tracking-wide hover:text-white transition-colors group"
      : "flex items-center gap-3 px-8 text-sm font-bold tracking-wide hover:text-brand-pink-start transition-colors group";

  const arrowClass =
    variant === "pink"
      ? "w-4 h-4 group-hover:-rotate-45 transition-transform text-brand-navy/60"
      : "w-4 h-4 group-hover:-rotate-45 transition-transform text-brand-pink-start";

  const dotClass =
    variant === "pink"
      ? "text-brand-navy/20 ml-8 text-xl"
      : "text-white/20 ml-8 text-xl";

  return (
    <div className={wrapperClass}>
      <div className="flex animate-marquee whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
        {tickerItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className={linkClass}
          >
            <span>{item.text}</span>
            <ArrowRight className={arrowClass} />
            <span className={dotClass}>•</span>
          </Link>
        ))}
      </div>
    </div>
  );
}