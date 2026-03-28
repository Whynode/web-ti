import prisma from "@/lib/prisma";
import BKKClient from "./BKKClient";

async function getLowongan() {
  try {
    return await prisma.lowonganKerja.findMany({
      where: { status: "BUKA" },
      include: { mitra: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

async function getStats() {
  try {
    const totalMitra = await prisma.mitraIndustri.count();
    const lowonganAktif = await prisma.lowonganKerja.count({ where: { status: "BUKA" } });
    const totalPenempatan = await prisma.penempatanAlumni.count();
    
    return {
      totalPenempatan,
      mitraIndustri: totalMitra,
      lowonganAktif,
      tahunBerdiri: 2018,
    };
  } catch {
    return {
      totalPenempatan: 0,
      mitraIndustri: 0,
      lowonganAktif: 0,
      tahunBerdiri: 2018,
    };
  }
}

async function getMitra() {
  try {
    return await prisma.mitraIndustri.findMany({
      take: 8,
      orderBy: { namaPerusahaan: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function BKKPage() {
  const [lowongan, stats, mitra] = await Promise.all([getLowongan(), getStats(), getMitra()]);

  return <BKKClient lowongan={lowongan} stats={stats} mitra={mitra} />;
}
