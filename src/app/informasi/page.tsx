import prisma from "@/lib/prisma";
import InformasiClient from "./InformasiClient";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getGuru() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { createdAt: "asc" },
    });
    return guru;
  } catch (error) {
    console.error("Error fetching guru:", error);
    return [];
  }
}

async function getSiswaData() {
  try {
    const [totalSiswa, totalKelas, daftarKelas] = await Promise.all([
      prisma.siswa.count(),
      prisma.kelas.count(),
      prisma.kelas.findMany({ orderBy: { namaKelas: 'asc' } }),
    ]);
    
    const siswaList = await prisma.siswa.findMany({
      include: { kelas: true },
    });

    const currentYear = 2026;
    const usiaCounts: Record<number, number> = {};
    
    let lakiLaki = 0;
    let perempuan = 0;

    // Count by tingkat
    const distribusiKelas: Record<string, number> = {};
    daftarKelas.forEach((kelas) => {
      const namaKelas = kelas.namaKelas;
      const tingkat = namaKelas.split(" ")[0];
      if (tingkat === "X" || tingkat === "XI" || tingkat === "XII") {
        distribusiKelas[tingkat] = (distribusiKelas[tingkat] || 0);
      }
    });

    siswaList.forEach((siswa) => {
      // Count by class level
      const namaKelas = siswa.kelas.namaKelas;
      const tingkat = namaKelas.split(" ")[0];
      if (tingkat === "X" || tingkat === "XI" || tingkat === "XII") {
        distribusiKelas[tingkat] = (distribusiKelas[tingkat] || 0) + 1;
      }

      // Count by gender
      if (siswa.jenisKelamin === "L") {
        lakiLaki++;
      } else {
        perempuan++;
      }

      // Count by age
      if (siswa.tanggalLahir) {
        const tahunLahir = new Date(siswa.tanggalLahir).getFullYear();
        const usia = currentYear - tahunLahir;
        if (usia >= 15 && usia <= 20) {
          usiaCounts[usia] = (usiaCounts[usia] || 0) + 1;
        }
      }
    });

    // Convert usiaCounts to sorted array
    const distribusiUsia = Object.entries(usiaCounts)
      .map(([usia, count]) => ({ usia: parseInt(usia), count }))
      .sort((a, b) => a.usia - b.usia);

    return {
      totalSiswa,
      totalKelas,
      daftarKelas,
      rasioSiswaRombel: totalKelas > 0 ? Math.round(totalSiswa / totalKelas) : 0,
      distribusiKelas: {
        X: distribusiKelas["X"] || 0,
        XI: distribusiKelas["XI"] || 0,
        XII: distribusiKelas["XII"] || 0,
      },
      distribusiJenisKelamin: {
        lakiLaki,
        perempuan,
      },
      distribusiUsia,
    };
  } catch (error) {
    console.error("Error fetching siswa data:", error);
    return {
      totalSiswa: 0,
      totalKelas: 0,
      daftarKelas: [],
      rasioSiswaRombel: 0,
      distribusiKelas: { X: 0, XI: 0, XII: 0 },
      distribusiJenisKelamin: { lakiLaki: 0, perempuan: 0 },
      distribusiUsia: [],
    };
  }
}

export default async function InformasiPage() {
  const [guruList, siswaData] = await Promise.all([getGuru(), getSiswaData()]);
  
  const kepalaSekolah = guruList.find((g) => g.posisi.toLowerCase().includes("kepala sekolah")) || guruList[0];
  const guruLainnya = guruList.filter((g) => g !== kepalaSekolah);

  return (
    <InformasiClient 
      guruList={guruList}
      kepalaSekolah={kepalaSekolah}
      guruLainnya={guruLainnya}
      akademikData={siswaData}
    />
  );
}
