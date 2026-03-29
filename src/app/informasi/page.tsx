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
    // PARALEL: Query semua data statistik sekaligus di DATABASE level
    const [
      totalSiswa,
      totalKelas,
      daftarKelas,
      lakiLaki,
      perempuan,
      distribusiTingkat,
      siswaForAge,
    ] = await Promise.all([
      prisma.siswa.count(),
      prisma.kelas.count(),
      prisma.kelas.findMany({ 
        select: { id: true, namaKelas: true },
        orderBy: { namaKelas: 'asc' } 
      }),
      prisma.siswa.count({ where: { jenisKelamin: "L" } }),
      prisma.siswa.count({ where: { jenisKelamin: "P" } }),
      // Hitung distribusi per tingkat via kelas + siswa count
      prisma.kelas.findMany({
        select: { 
          id: true, 
          namaKelas: true,
          _count: { select: { siswa: true } }
        }
      }),
      // Ambil hanya tanggalLahir untuk hitung umur (data kecil)
      prisma.siswa.findMany({
        select: { tanggalLahir: true },
        where: { tanggalLahir: { not: null } },
      }),
    ]);

    // Hitung distribusi kelas per tingkat dari kelas data
    const distribusiKelas: Record<string, number> = { X: 0, XI: 0, XII: 0 };
    distribusiTingkat.forEach((kelas) => {
      const tingkat = kelas.namaKelas.split(" ")[0];
      if (tingkat === "X" || tingkat === "XI" || tingkat === "XII") {
        distribusiKelas[tingkat] += kelas._count.siswa;
      }
    });

    // Hitung distribusi usia (hanya dari tanggalLahir, bukan semua data siswa)
    const currentYear = new Date().getFullYear();
    const usiaCounts: Record<number, number> = {};
    
    siswaForAge.forEach((siswa) => {
      if (siswa.tanggalLahir) {
        const tahunLahir = new Date(siswa.tanggalLahir).getFullYear();
        const usia = currentYear - tahunLahir;
        if (usia >= 14 && usia <= 21) {
          usiaCounts[usia] = (usiaCounts[usia] || 0) + 1;
        }
      }
    });

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
