import prisma from "@/lib/prisma";
import MarqueeTicker from "@/components/ui/MarqueeTicker";

const defaultAnnouncements = [
  { text: "Pendaftaran PPDB Gelombang 1 Dibuka!", link: "/ppdb" },
  { text: "SMKS Telematika - SMK IT Terbaik di Indramayu", link: "/" },
  { text: "Program Unggulan Teknik Komputer & Jaringan", link: "/program/mikrotik" },
  { text: "MikroTik Academy - Sertifikasi Internasional", link: "/program/mikrotik" },
];

async function getAnnouncements() {
  try {
    const articles = await prisma.artikelBlog.findMany({
      where: { isPinned: false },
      orderBy: { tanggalPublish: "desc" },
      take: 5,
      select: { judul: true, slug: true },
    });

    if (articles.length === 0) {
      return defaultAnnouncements;
    }

    return articles.map((article) => ({
      text: article.judul,
      link: `/berita/${article.slug}`,
    }));
  } catch {
    return defaultAnnouncements;
  }
}

export default async function MarqueeWrapper({ variant = "dark" }: { variant?: "dark" | "pink" }) {
  const articles = await getAnnouncements();
  return (
    <div className="border-b border-white/10">
      <MarqueeTicker variant={variant} articles={articles} />
    </div>
  );
}