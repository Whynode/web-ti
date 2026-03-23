export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, FileText, BookOpen, ExternalLink, Download, Eye } from "lucide-react";
import prisma from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getMateri(id: number) {
  try {
    const materi = await prisma.materiElearning.findUnique({
      where: { id },
    });
    return materi;
  } catch (error) {
    console.error("Error fetching materi:", error);
    return null;
  }
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default async function ElearningDetailPage({ params }: PageProps) {
  const { id } = await params;
  const materi = await getMateri(Number(id));

  if (!materi) {
    notFound();
  }

  const isVideo = materi.tipeMedia === "VIDEO";
  const isPdf = materi.tipeMedia === "PDF";
  const youtubeId = isVideo ? extractYouTubeId(materi.linkUrl) : null;

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900">
      <section className="relative pt-32 pb-12 bg-brand-navy overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink-start/20 rounded-[10px] blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue-start/20 rounded-[10px] blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <Link
            href="/elearning"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke E-Learning</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#FDFDFD] bg-grid-light py-12">
        <div className="container mx-auto px-6 max-w-[900px]">
          <div className="bg-white rounded-[10px] border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-brand-navy to-[#243560] p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-4 py-2 text-xs font-bold rounded-[10px] ${isVideo ? "bg-brand-pink-start/30" : "bg-brand-blue-start/30"}`}>
                  <span className="flex items-center gap-2">
                    {isVideo ? <Play className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    {isVideo ? "Video Pembelajaran" : "E-Book / Dokumen"}
                  </span>
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif mb-4">
                {materi.judul}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {materi.kelasTarget}
                </span>
              </div>
            </div>

            <div className="p-8">
              {isVideo && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-brand-pink-start" />
                    Video Pembelajaran
                  </h2>
                  {youtubeId ? (
                    <div className="relative aspect-video w-full rounded-[10px] overflow-hidden shadow-xl">
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={materi.judul}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-[10px] bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">Video tidak tersedia</p>
                        <a
                          href={materi.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-brand-pink-start hover:bg-[#d94f92] text-white font-bold rounded-[10px] transition-colors"
                        >
                          Buka di Browser
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isPdf && (
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-blue-start" />
                    E-Book / Dokumen
                  </h2>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[10px] p-8 border border-amber-100">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-24 h-32 bg-white rounded-[10px] shadow-lg flex items-center justify-center border border-amber-200">
                        <FileText className="w-12 h-12 text-amber-500" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{materi.judul}</h3>
                        <p className="text-sm text-gray-500 mb-4">Materi untuk kelas {materi.kelasTarget}</p>
                        <a
                          href={materi.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue-start to-[#0284c7] hover:shadow-lg hover:shadow-brand-blue-start/30 text-white font-bold rounded-[10px] transition-all"
                        >
                          <Download className="w-5 h-5" />
                          Download / Baca Materi
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                <Link
                  href="/elearning"
                  className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-pink-start font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke daftar materi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
