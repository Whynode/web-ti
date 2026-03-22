import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getArticle(slug: string) {
  try {
    const artikel = await prisma.artikelBlog.findUnique({
      where: { slug },
    });
    return artikel;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const artikel = await getArticle(slug);

  if (!artikel) {
    notFound();
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryFromContent = (konten: string): string => {
    const lower = konten.toLowerCase();
    if (lower.includes("ppdb") || lower.includes("pendaftaran")) return "Pengumuman";
    if (lower.includes("kunjungan") || lower.includes("kegiatan")) return "Kegiatan";
    if (lower.includes("workshop") || lower.includes("pelajaran")) return "Akademik";
    if (lower.includes("juara") || lower.includes("prestasi")) return "Prestasi";
    if (lower.includes("bkk") || lower.includes("lowongan")) return "BKK";
    return "Informasi";
  };

  const category = getCategoryFromContent(artikel.konten);

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900">
      <section className="relative pt-32 pb-12 bg-brand-navy overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Berita</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#FDFDFD] bg-grid-light py-12">
        <div className="container mx-auto px-6 max-w-[800px]">
          <article>
            <header className="mb-8">
              <span className="inline-block px-4 py-1.5 bg-brand-pink-start/10 text-brand-pink-start text-xs font-bold uppercase tracking-widest rounded-[10px] mb-4">
                {category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy font-serif leading-tight mb-4">
                {artikel.judul}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-pink-start" />
                  {formatDate(artikel.tanggalPublish)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-navy" />
                  Tim redaksi SMKS Telematika
                </span>
              </div>
            </header>

            {artikel.thumbnailUrl && (
              <div className="relative w-full aspect-[16/9] mb-8 rounded-[10px] overflow-hidden shadow-xl">
                <Image
                  src={artikel.thumbnailUrl}
                  alt={artikel.judul}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                {artikel.konten.split("\n").map((paragraph, index) => {
                  if (paragraph.trim() === "") {
                    return <div key={index} className="h-4" />;
                  }
                  return (
                    <p key={index} className="mb-4 text-base md:text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </article>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy hover:bg-[#243560] text-white rounded-[10px] font-medium text-sm transition-colors shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Berita
            </Link>
          </div>
        </div>
      </section>

      <MarqueeTicker variant="pink" />
    </main>
  );
}
