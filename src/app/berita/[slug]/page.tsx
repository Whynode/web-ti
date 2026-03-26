import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import DOMPurify from "isomorphic-dompurify";

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
    <main className="min-h-screen bg-[#0f172a] sm:bg-slate-900 pb-12">
      <section className="pt-8 pb-4">
        <article className="max-w-6xl mx-auto w-full bg-white px-6 md:px-16 lg:px-24 py-12 md:py-16 rounded-none border-none min-h-screen shadow-2xl">
          <Link
            href="/berita"
            className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-2 mb-8 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </Link>

          <header className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-brand-pink-start/10 text-brand-pink-start text-xs font-bold uppercase tracking-widest rounded-[10px] mb-4">
              {category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
              {artikel.judul}
            </h1>
            <div className="text-sm md:text-base font-medium text-slate-500 mb-10 flex items-center gap-3 uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(artikel.tanggalPublish)}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Tim redaksi SMKS Telematika
              </span>
            </div>
          </header>

          {artikel.thumbnailUrl && (
            <div className="w-full aspect-[16/9] mb-10 rounded-none overflow-hidden shadow-xl">
              <img
                src={artikel.thumbnailUrl}
                alt={artikel.judul}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div 
            className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-a:text-blue-600 mt-8 w-full"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(artikel.konten.replace(/&nbsp;/g, ' ')) }} 
          />
        </article>
      </section>

      <MarqueeTicker variant="pink" />
    </main>
  );
}
