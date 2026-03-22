"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "../actions/upload";

export async function tambahGuru(
  formData: FormData
): Promise<{ error?: string } | void> {
  const nama = formData.get("nama") as string;
  const posisi = formData.get("posisi") as string;
  const mapel = formData.get("mapel") as string;
  const foto = formData.get("foto") as File | null;

  if (!nama || nama.trim() === "") {
    return { error: "Nama wajib diisi" };
  }

  if (!posisi || posisi.trim() === "") {
    return { error: "Posisi wajib diisi" };
  }

  const mapelValue = mapel && mapel.trim() !== "" ? mapel.trim() : "-";
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
    await prisma.guru.create({
      data: {
        nama: nama.trim(),
        posisi: posisi.trim(),
        mapel: mapelValue,
        fotoUrl,
      },
    });

    revalidatePath("/admin/guru");
    redirect("/admin/guru");
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error creating guru:", error);
    return { error: "Gagal menyimpan data guru" };
  }
}

export async function updateGuru(
  id: number,
  formData: FormData
): Promise<{ error?: string } | void> {
  const nama = formData.get("nama") as string;
  const posisi = formData.get("posisi") as string;
  const mapel = formData.get("mapel") as string;
  const foto = formData.get("foto") as File | null;

  if (!nama || nama.trim() === "") {
    return { error: "Nama wajib diisi" };
  }

  if (!posisi || posisi.trim() === "") {
    return { error: "Posisi wajib diisi" };
  }

  const mapelValue = mapel && mapel.trim() !== "" ? mapel.trim() : "-";

  try {
    const updateData: {
      nama: string;
      posisi: string;
      mapel: string;
      fotoUrl?: string | null;
    } = {
      nama: nama.trim(),
      posisi: posisi.trim(),
      mapel: mapelValue,
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

    await prisma.guru.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/guru");
    redirect("/admin/guru");
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Error updating guru:", error);
    return { error: "Gagal mengupdate data guru" };
  }
}

export async function hapusGuru(id: number): Promise<void> {
  try {
    await prisma.guru.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting guru:", error);
    throw new Error("Gagal menghapus data guru");
  }

  revalidatePath("/admin/guru");
}
