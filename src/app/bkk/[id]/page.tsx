import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Building2, Briefcase, CheckCircle, ExternalLink } from "lucide-react";
import prisma from "@/lib/prisma";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getLowongan(id: number) {
  try {
    const lowongan = await prisma.lowonganBKK.findUnique({
      where: { id },
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

  const isExpired = new Date(lowongan.batasLamaran) < new Date();
  const persyaratanList = lowongan.persyaratan.split("\n").filter((p) => p.trim() !== "");

  return (
    <main className="min-h-screen bg-[#FDFDFD] text-gray-900">
      <section className="relative pt-32 pb-12 bg-brand-navy overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-pink-start/20 rounded-[10px] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue-start/20 rounded-[10px] blur-3xl" />
        <div className="container mx-auto px-6 max-w-[1120px] relative z-10">
          <Link
            href="/bkk"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Lowongan</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#FDFDFD] bg-grid-light py-12">
        <div className="container mx-auto px-6 max-w-[800px]">
          <div className="bg-white rounded-[10px] border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-brand-pink-start to-brand-blue-start p-8 text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-[10px] ${lowongan.tipePekerjaan === "Full Time" ? "bg-white/20" : "bg-amber-400/80 text-amber-900"}`}>
                  {lowongan.tipePekerjaan}
                </span>
                {isExpired && (
                  <span className="px-3 py-1 text-xs font-bold rounded-[10px] bg-red-500/80">
                    Ditutup
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                {lowongan.posisi}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {lowongan.perusahaan}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {lowongan.lokasi}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Batas: {formatDate(lowongan.batasLamaran)}
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-brand-pink-start" />
                  Deskripsi Pekerjaan
                </h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {lowongan.deskripsi}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-brand-navy font-serif mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-brand-pink-start" />
                  Persyaratan
                </h2>
                <ul className="space-y-3">
                  {persyaratanList.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-[10px] bg-brand-pink-start/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-3 h-3 text-brand-pink-start" />
                      </div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                {!isExpired ? (
                  <a
                    href={`https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20lowongan%20${encodeURIComponent(lowongan.posisi)}%20di%20${encodeURIComponent(lowongan.perusahaan)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-pink-start to-[#d94f92] hover:shadow-lg hover:shadow-brand-pink-start/30 text-white font-bold rounded-[10px] transition-all"
                  >
                    Lamar Sekarang via WhatsApp
                    <ExternalLink className="w-5 h-5" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-4 bg-gray-100 text-gray-500 font-medium rounded-[10px]">
                    <Clock className="w-5 h-5" />
                    Masa pendaftaran sudah ditutup
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <Link
                  href="/bkk"
                  className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-pink-start font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Lihat lowongan lainnya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeTicker variant="pink" />
    </main>
  );
}
