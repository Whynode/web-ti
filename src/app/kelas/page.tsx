import prisma from "@/lib/prisma";
import KelasClient from "./KelasClient";

async function getKelasWithStats() {
  try {
    const kelas = await prisma.kelas.findMany({
      include: {
        waliKelas: true,
        siswa: true,
      },
      orderBy: { namaKelas: "asc" },
    });

    return kelas.map((k) => ({
      id: k.id,
      namaKelas: k.namaKelas,
      totalSiswa: k.siswa.length,
      waliKelas: k.waliKelas.nama,
      deskripsi: k.deskripsi || `Kelas ${k.namaKelas} SMKS Telematika Indramayu dengan fokus pada kompetensi jaringan komputer dan teknologi informasi.`,
    }));
  } catch {
    return [];
  }
}

async function getTotalStats() {
  try {
    const kelas = await prisma.kelas.findMany({
      include: { siswa: true },
    });
    const totalSiswa = kelas.reduce((sum, k) => sum + k.siswa.length, 0);
    const totalRombel = kelas.length;
    const tingkatSet = new Set(kelas.map(k => k.namaKelas.replace(/\D/g, "").charAt(0)));
    
    return {
      totalSiswa,
      totalRombel,
      totalTingkat: tingkatSet.size,
    };
  } catch {
    return {
      totalSiswa: 0,
      totalRombel: 0,
      totalTingkat: 0,
    };
  }
}

export default async function KelasPage() {
  const [kelas, stats] = await Promise.all([getKelasWithStats(), getTotalStats()]);
  return <KelasClient kelas={kelas} stats={stats} />;
}
