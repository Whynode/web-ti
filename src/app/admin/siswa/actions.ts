"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/app/admin/actions/upload";

export async function tambahSiswa(
  formData: FormData
): Promise<{ error?: string } | void> {
  const nama = formData.get("nama") as string;
  const peran = formData.get("peran") as string;
  const kelasId = formData.get("kelasId") as string;
  const foto = formData.get("foto") as File | null;

  if (!nama || nama.trim() === "") {
    return { error: "Nama wajib diisi" };
  }

  if (!kelasId) {
    return { error: "Kelas wajib dipilih" };
  }

  const validPeran = ["SISWA", "KETUA_KELAS", "WAKIL_KETUA", "SEKRETARIS", "BENDAHARA"];
  const peranValue = validPeran.includes(peran) ? peran : "SISWA";

  let fotoUrl: string | null = null;
  if (foto && foto.size > 0) {
    const uploadFormData = new FormData();
    uploadFormData.append("file", foto);
    const uploadResult = await uploadImage(uploadFormData);
    
    if (!uploadResult.success) {
      return { error: uploadResult.error || "Gagal mengunggah foto" };
    }
    
    fotoUrl = uploadResult.url || null;
  }

  try {
    await prisma.siswa.create({
      data: {
        nama: nama.trim(),
        peran: peranValue as any,
        kelasId: parseInt(kelasId),
        fotoUrl,
      },
    });

    revalidatePath("/admin/siswa");
    redirect("/admin/siswa");
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error creating siswa:", error);
    return { error: "Gagal menyimpan data siswa" };
  }
}

export async function updateSiswa(
  id: number,
  formData: FormData
): Promise<{ error?: string } | void> {
  const nama = formData.get("nama") as string;
  const peran = formData.get("peran") as string;
  const kelasId = formData.get("kelasId") as string;
  const foto = formData.get("foto") as File | null;

  if (!nama || nama.trim() === "") {
    return { error: "Nama wajib diisi" };
  }

  if (!kelasId) {
    return { error: "Kelas wajib dipilih" };
  }

  const validPeran = ["SISWA", "KETUA_KELAS", "WAKIL_KETUA", "SEKRETARIS", "BENDAHARA"];
  const peranValue = validPeran.includes(peran) ? peran : "SISWA";

  try {
    const updateData: {
      nama: string;
      peran: any;
      kelasId: number;
      fotoUrl?: string | null;
    } = {
      nama: nama.trim(),
      peran: peranValue as any,
      kelasId: parseInt(kelasId),
    };

    if (foto && foto.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", foto);
      const uploadResult = await uploadImage(uploadFormData);
      
      if (!uploadResult.success) {
        return { error: uploadResult.error || "Gagal mengunggah foto" };
      }
      
      updateData.fotoUrl = uploadResult.url || null;
    }

    await prisma.siswa.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/siswa");
    redirect("/admin/siswa");
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error updating siswa:", error);
    return { error: "Gagal mengupdate data siswa" };
  }
}

export async function hapusSiswa(id: number): Promise<void> {
  try {
    await prisma.siswa.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting siswa:", error);
    throw new Error("Gagal menghapus siswa");
  }

  revalidatePath("/admin/siswa");
}
