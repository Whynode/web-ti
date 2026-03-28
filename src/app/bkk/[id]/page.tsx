import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock, Building2, ExternalLink, Globe } from "lucide-react";
import prisma from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getLowongan(id: number) {
  try {
    const lowongan = await prisma.lowonganKerja.findUnique({
      where: { id },
      include: { mitra: true },
    });
    return lowongan;
  } catch (error) {
    console.error("Error fetching lowongan:", error);
    return null;
  }
}

export default async function BKKDetailPage({ params }: PageProps) {
  const { id } = await params;
  const lowongan = await getLowongan(Number(id));

  if (!lowongan) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isOpen = lowongan.status === "BUKA";

  const nomorWA = "6281318216205";
  const pesan = `Halo Admin BKK SMKS Telematika Indramayu, saya tertarik untuk melamar lowongan pekerjaan ${lowongan.judul} di ${lowongan.mitra.namaPerusahaan}. Apakah lowongan ini masih tersedia? Berikut saya lampirkan CV dan berkas pendukung saya.`;
  const encodedPesan = encodeURIComponent(pesan);
  const waLink = `https://wa.me/${nomorWA}?text=${encodedPesan}`;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-[800px] py-8">
          <Link
            href="/bkk"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Lowongan
          </Link>

          {/* Company & Job Info */}
          <div className="flex items-start gap-4 mb-6">
            {lowongan.mitra.logoUrl ? (
              <Image
                src={lowongan.mitra.logoUrl}
                alt={lowongan.mitra.namaPerusahaan}
                width={56}
                height={56}
                className="rounded-xl object-contain bg-gray-50 p-2"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                <Building2 className="w-7 h-7 text-gray-400" />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif mb-1">
                {lowongan.judul}
              </h1>
              <p className="text-gray-600 font-medium">{lowongan.mitra.namaPerusahaan}</p>
              {lowongan.mitra.websiteUrl && (
                <a
                  href={lowongan.mitra.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-pink-start hover:underline flex items-center gap-1 mt-1"
                >
                  <Globe className="w-3 h-3" />
                  Kunjungi Website
                </a>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              lowongan.tipePekerjaan === "Full-Time" 
                ? "bg-brand-pink-100 text-brand-pink-700" 
                : "bg-blue-100 text-blue-700"
            }`}>
              {lowongan.tipePekerjaan}
            </span>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {lowongan.lokasi || "-"}
            </span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${
              isOpen 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}>
              {lowongan.status}
            </span>
          </div>

          {/* CTA Button */}
          {isOpen ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-pink-start hover:bg-brand-pink-end text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand-pink-start/25"
            >
              Lamar Sekarang via WhatsApp
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-500 font-medium rounded-xl">
              <Clock className="w-4 h-4" />
              Lowongan sudah ditutup
            </div>
          )}
          
          <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
            Diposting: {formatDate(lowongan.createdAt)}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-[800px]">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 font-serif mb-4">
              Deskripsi Pekerjaan
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {lowongan.deskripsi || "Tidak ada deskripsi yang tersedia."}
              </p>
            </div>
          </div>

          {/* Poster (if available) */}
          {lowongan.posterUrl && (
            <div className="mb-8 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 font-serif mb-4">
                Poster Lowongan
              </h2>
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <Image
                  src={lowongan.posterUrl}
                  alt={`Poster ${lowongan.judul}`}
                  width={800}
                  height={600}
                  className="w-full object-contain bg-gray-50"
                />
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="pt-8 border-t border-gray-100">
            <Link
              href="/bkk"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-pink-start font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Lihat lowongan lainnya
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
