import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import KelasDetailClient from "./KelasDetailClient";

type Props = {
  params: Promise<{ id: string }>;
};

async function getKelasDetail(id: string) {
  try {
    const kelas = await prisma.kelas.findUnique({
      where: { id: parseInt(id) },
      include: {
        waliKelas: true,
        siswa: {
          orderBy: [
            { peran: "asc" },
            { nama: "asc" },
          ],
        },
      },
    });

    if (!kelas) return null;

    const siswaMap = kelas.siswa.reduce((acc, s) => {
      acc[s.peran] = s;
      return acc;
    }, {} as Record<string, typeof kelas.siswa[0]>);

    const ketuaKelas = siswaMap["KETUA_KELAS"];
    const wakil = siswaMap["WAKIL_KETUA"];
    const sekretaris = siswaMap["SEKRETARIS"];
    const bendahara = siswaMap["BENDAHARA"];

    return {
      id: kelas.id,
      namaKelas: kelas.namaKelas,
      deskripsi: kelas.deskripsi,
      totalSiswa: kelas.siswa.length,
      waliKelas: {
        nama: kelas.waliKelas.nama,
        posisi: `Wali Kelas ${kelas.namaKelas}`,
        avatar: kelas.waliKelas.nama.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase(),
        fotoUrl: kelas.waliKelas.fotoUrl,
      },
      struktur: {
        waliKelas: {
          nama: kelas.waliKelas.nama,
          posisi: `Wali Kelas ${kelas.namaKelas}`,
          avatar: kelas.waliKelas.nama.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase(),
          fotoUrl: kelas.waliKelas.fotoUrl,
        },
        ketuaKelas: {
          nama: ketuaKelas?.nama || "Belum Ditentukan",
          posisi: `Ketua Kelas ${kelas.namaKelas}`,
          avatar: (ketuaKelas?.nama || "KC").split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase(),
          fotoUrl: ketuaKelas?.fotoUrl || null,
        },
        wakil: {
          nama: wakil?.nama || "Belum Ditentukan",
          posisi: `Wakil Ketua ${kelas.namaKelas}`,
          avatar: (wakil?.nama || "WK").split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase(),
          fotoUrl: wakil?.fotoUrl || null,
        },
        sekretaris: {
          nama: sekretaris?.nama || "Belum Ditentukan",
          posisi: `Sekretaris ${kelas.namaKelas}`,
          avatar: (sekretaris?.nama || "SK").split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase(),
          fotoUrl: sekretaris?.fotoUrl || null,
        },
        bendahara: {
          nama: bendahara?.nama || "Belum Ditentukan",
          posisi: `Bendahara ${kelas.namaKelas}`,
          avatar: (bendahara?.nama || "BD").split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase(),
          fotoUrl: bendahara?.fotoUrl || null,
        },
      },
      siswa: kelas.siswa.map((s) => ({
        id: s.id,
        nama: s.nama,
        peran: s.peran,
        fotoUrl: s.fotoUrl,
      })),
    };
  } catch {
    return null;
  }
}

export default async function KelasDetailPage({ params }: Props) {
  const { id } = await params;
  const data = await getKelasDetail(id);

  if (!data) {
    notFound();
  }

  return <KelasDetailClient data={data} />;
}
