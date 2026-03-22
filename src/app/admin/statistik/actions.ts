"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStatistik(formData: FormData): Promise<void> {
  const totalSiswa = formData.get("totalSiswa") as string;
  const totalGuru = formData.get("totalGuru") as string;
  const totalKelas = formData.get("totalKelas") as string;
  const totalAlumni = formData.get("totalAlumni") as string;

  if (!totalSiswa || !totalGuru || !totalKelas || !totalAlumni) {
    throw new Error("Semua field wajib diisi");
  }

  const siswaNum = parseInt(totalSiswa);
  const guruNum = parseInt(totalGuru);
  const kelasNum = parseInt(totalKelas);
  const alumniNum = parseInt(totalAlumni);

  if (isNaN(siswaNum) || isNaN(guruNum) || isNaN(kelasNum) || isNaN(alumniNum)) {
    throw new Error("Semua nilai harus berupa angka");
  }

  try {
    await prisma.statistikSekolah.upsert({
      where: { id: 1 },
      update: {
        totalSiswa: siswaNum,
        totalGuru: guruNum,
        totalKelas: kelasNum,
        totalAlumni: alumniNum,
      },
      create: {
        id: 1,
        totalSiswa: siswaNum,
        totalGuru: guruNum,
        totalKelas: kelasNum,
        totalAlumni: alumniNum,
      },
    });

    revalidatePath("/admin/statistik");
    revalidatePath("/");
  } catch (error) {
    console.error("Error updating statistik:", error);
    throw new Error("Gagal menyimpan statistik");
  }
}
