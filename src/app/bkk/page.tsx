import prisma from "@/lib/prisma";
import BKKClient from "./BKKClient";

async function getLowongan() {
  try {
    return await prisma.lowonganBKK.findMany({
      where: { statusAktif: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

async function getStats() {
  try {
    const stats = await prisma.statistikSekolah.findFirst();
    const totalPenempatan = 156;
    const mitraIndustri = 28;
    return {
      totalPenempatan,
      mitraIndustri,
      lowonganAktif: stats?.totalSiswa || 12,
      tahunBerdiri: 2018,
    };
  } catch {
    return {
      totalPenempatan: 156,
      mitraIndustri: 28,
      lowonganAktif: 12,
      tahunBerdiri: 2018,
    };
  }
}

export default async function BKKPage() {
  const [lowongan, stats] = await Promise.all([getLowongan(), getStats()]);

  return <BKKClient lowongan={lowongan} stats={stats} />;
}
