"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahKelas(formData: FormData): Promise<void> {
  const namaKelas = formData.get("namaKelas") as string;
  const waliKelasId = formData.get("waliKelasId") as string;
  const deskripsi = formData.get("deskripsi") as string;

  if (!namaKelas || !waliKelasId) {
    throw new Error("Nama kelas dan wali kelas wajib dipilih");
  }

  try {
    await prisma.kelas.create({
      data: {
        namaKelas: namaKelas.trim(),
        waliKelasId: parseInt(waliKelasId),
        deskripsi: deskripsi && deskripsi.trim() !== "" ? deskripsi.trim() : null,
      },
    });
  } catch (error) {
    console.error("Error creating kelas:", error);
    throw new Error("Gagal menyimpan kelas");
  }

  revalidatePath("/kelas");
  revalidatePath("/");
  revalidatePath("/admin/kelas");
  redirect("/admin/kelas");
}

export async function updateKelas(
  id: number,
  formData: FormData
): Promise<void> {
  const namaKelas = formData.get("namaKelas") as string;
  const waliKelasId = formData.get("waliKelasId") as string;
  const deskripsi = formData.get("deskripsi") as string;

  if (!namaKelas || !waliKelasId) {
    throw new Error("Nama kelas dan wali kelas wajib dipilih");
  }

  try {
    await prisma.kelas.update({
      where: { id },
      data: {
        namaKelas: namaKelas.trim(),
        waliKelasId: parseInt(waliKelasId),
        deskripsi: deskripsi && deskripsi.trim() !== "" ? deskripsi.trim() : null,
      },
    });
  } catch (error) {
    console.error("Error updating kelas:", error);
    throw new Error("Gagal mengupdate kelas");
  }

  revalidatePath("/kelas");
  revalidatePath("/kelas/" + id);
  revalidatePath("/");
  revalidatePath("/admin/kelas");
  redirect("/admin/kelas");
}

export async function hapusKelas(id: number): Promise<void> {
  try {
    await prisma.kelas.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting kelas:", error);
    throw new Error("Gagal menghapus kelas");
  }

  revalidatePath("/kelas");
  revalidatePath("/");
  revalidatePath("/admin/kelas");
}
