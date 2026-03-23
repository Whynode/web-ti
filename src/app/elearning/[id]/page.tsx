export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, FileText, BookOpen, ExternalLink, Download, Clock, User } from "lucide-react";
import prisma from "@/lib/prisma";

type PageProps = {
  params: Promise<{ id: string }>;
};

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

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

export default async function ElearningDetailPage({ params }: PageProps) {
  const { id } = await params;
  const materi = await getMateri(Number(id));

  if (!materi) {
    notFound();
  }

  const isVideo = materi.tipeMedia === "VIDEO";
  const isPdf = materi.tipeMedia === "PDF";
  const youtubeId = isVideo ? extractYouTubeId(materi.linkUrl) : null;
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : null;

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900">
      <section className="relative pt-28 pb-8 bg-brand-navy bg-grid-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink-start/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue-start/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <Link
            href="/elearning"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-pink-start text-sm font-medium transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke E-Learning
          </Link>
        </div>
      </section>

      <section className="bg-[#FDFDFD] bg-grid-light py-10">
        <div className="container mx-auto px-6 max-w-[900px]">
          <div className="bg-white rounded-[10px] border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-brand-navy via-[#1a2340] to-[#243560] p-6 md:p-8 text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold rounded-[8px] uppercase tracking-wider ${isVideo ? "bg-brand-pink-start/20 text-brand-pink-start" : "bg-brand-blue-start/20 text-brand-blue-start"}`}>
                  {isVideo ? <Play className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  {isVideo ? "Video" : "Dokumen"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-[8px] bg-white/10 text-white/80">
                  <BookOpen className="w-3 h-3" />
                  Kelas {materi.kelasTarget}
                </span>
              </div>
              
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif leading-tight">
                {materi.judul}
              </h1>
              
              <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {materi.createdAt ? new Date(materi.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "-"}
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {isVideo && (
                <div className="mb-8">
                  <h2 className="text-base font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                    <Play className="w-5 h-5 text-brand-pink-start" />
                    Tonton Video
                  </h2>
                  
                  {embedUrl ? (
                    <div className="w-full aspect-video rounded-[10px] overflow-hidden shadow-lg border border-gray-100 bg-black">
                      <iframe
                        src={embedUrl}
                        title={materi.judul}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="eager"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-video rounded-[10px] bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200">
                      <div className="text-center p-6">
                        <Play className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium text-sm mb-3">Video tidak dapat diputar</p>
                        {materi.linkUrl && (
                          <a
                            href={materi.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-pink-start hover:bg-[#d94f92] text-white text-xs font-bold rounded-[8px] transition-colors"
                          >
                            Buka di YouTube
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {isPdf && (
                <div className="mb-8">
                  <h2 className="text-base font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-blue-start" />
                    Unduh Materi
                  </h2>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[10px] p-6 border border-amber-100">
                    <div className="flex flex-col md:flex-row items-center gap-5">
                      <div className="w-20 h-28 bg-white rounded-[8px] shadow-md flex items-center justify-center border border-amber-200 shrink-0">
                        <FileText className="w-10 h-10 text-amber-500" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{materi.judul}</h3>
                        <p className="text-sm text-gray-500 mb-4">Materi untuk kelas {materi.kelasTarget}</p>
                        <a
                          href={materi.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-blue-start to-[#0284c7] hover:shadow-lg hover:shadow-brand-blue-start/20 text-white text-sm font-bold rounded-[8px] transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download Materi
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-gray-100">
                <Link
                  href="/elearning"
                  className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-pink-start text-sm font-medium transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
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
