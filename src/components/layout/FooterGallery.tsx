"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type GaleriItem = {
  id: string;
  judul: string;
  imageUrl: string;
};

export default function FooterGallery() {
  const [galeri, setGaleri] = useState<GaleriItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGaleri() {
      try {
        const res = await fetch("/api/galeri");
        if (res.ok) {
          const json = await res.json();
          setGaleri((json.images || []).slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching galeri:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGaleri();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-[10px] overflow-hidden bg-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  if (galeri.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square rounded-[10px] overflow-hidden bg-white/5 relative hover:opacity-80 transition-opacity">
            <img
              src={`https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=200&auto=format&fit=crop&sig=${i}`}
              alt="Galeri"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {galeri.map((item) => (
        <Link href="/galeri" key={item.id} className="aspect-square rounded-[10px] overflow-hidden bg-white/5 relative hover:opacity-80 transition-opacity block">
          <img
            src={item.imageUrl}
            alt={item.judul}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </Link>
      ))}
    </div>
  );
}
