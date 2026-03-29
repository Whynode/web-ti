import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pencarian | SMKS Telematika Indramayu",
};

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      {/* Header */}
      <section className="pt-32 pb-16 bg-[#0B1120]">
        <div className="container mx-auto px-6 max-w-[1120px]">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-serif">
              Hasil Pencarian
            </h1>
          </div>
          
          {query && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 rounded-xl max-w-md">
              <Search className="w-4 h-4 text-white/60" />
              <span className="text-white/90 text-sm">
                {query}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-[1120px]">
          {query ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-brand-pink-start/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-brand-pink-start" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy mb-3 font-serif">
                Mencari: &quot;{query}&quot;
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                Fitur pencarian lengkap sedang dalam pengembangan. Untuk saat ini, 
                Anda dapat menjelajahi halaman-halaman berikut:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <Link href="/berita" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-pink-start/30 hover:shadow-md transition-all">
                  <p className="font-bold text-brand-navy text-sm">Berita</p>
                  <p className="text-[10px] text-gray-400 mt-1">Artikel terbaru</p>
                </Link>
                <Link href="/galeri" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-pink-start/30 hover:shadow-md transition-all">
                  <p className="font-bold text-brand-navy text-sm">Galeri</p>
                  <p className="text-[10px] text-gray-400 mt-1">Foto kegiatan</p>
                </Link>
                <Link href="/bkk" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-pink-start/30 hover:shadow-md transition-all">
                  <p className="font-bold text-brand-navy text-sm">BKK</p>
                  <p className="text-[10px] text-gray-400 mt-1">Lowongan kerja</p>
                </Link>
                <Link href="/program" className="p-4 bg-white border border-gray-200 rounded-xl hover:border-brand-pink-start/30 hover:shadow-md transition-all">
                  <p className="font-bold text-brand-navy text-sm">Program</p>
                  <p className="text-[10px] text-gray-400 mt-1">Jurusan & kurikulum</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-brand-navy mb-3 font-serif">
                Ketik Kata Kunci
              </h2>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Masukkan kata kunci di kolom pencarian untuk mencari informasi seputar SMKS Telematika Indramayu.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
