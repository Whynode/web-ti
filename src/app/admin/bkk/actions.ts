"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahLowongan(formData: FormData): Promise<void> {
  const posisi = formData.get("posisi") as string;
  const perusahaan = formData.get("perusahaan") as string;
  const lokasi = formData.get("lokasi") as string;
  const tipePekerjaan = formData.get("tipePekerjaan") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const persyaratan = formData.get("persyaratan") as string;
  const batasLamaran = formData.get("batasLamaran") as string;

  if (!posisi || !perusahaan || !lokasi || !tipePekerjaan || !deskripsi || !persyaratan || !batasLamaran) {
    throw new Error("Semua field wajib diisi");
  }

  try {
    await prisma.lowonganBKK.create({
      data: {
        posisi: posisi.trim(),
        perusahaan: perusahaan.trim(),
        lokasi: lokasi.trim(),
        tipePekerjaan: tipePekerjaan.trim(),
        deskripsi: deskripsi.trim(),
        persyaratan: persyaratan.trim(),
        batasLamaran: new Date(batasLamaran),
        statusAktif: true,
      },
    });
  } catch (error) {
    console.error("Error creating lowongan:", error);
    throw new Error("Gagal menyimpan lowongan");
  }

  revalidatePath("/admin/bkk");
  redirect("/admin/bkk");
}

export async function updateLowongan(
  id: number,
  formData: FormData
): Promise<void> {
  const posisi = formData.get("posisi") as string;
  const perusahaan = formData.get("perusahaan") as string;
  const lokasi = formData.get("lokasi") as string;
  const tipePekerjaan = formData.get("tipePekerjaan") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const persyaratan = formData.get("persyaratan") as string;
  const batasLamaran = formData.get("batasLamaran") as string;

  if (!posisi || !perusahaan || !lokasi || !tipePekerjaan || !deskripsi || !persyaratan || !batasLamaran) {
    throw new Error("Semua field wajib diisi");
  }

  try {
    await prisma.lowonganBKK.update({
      where: { id },
      data: {
        posisi: posisi.trim(),
        perusahaan: perusahaan.trim(),
        lokasi: lokasi.trim(),
        tipePekerjaan: tipePekerjaan.trim(),
        deskripsi: deskripsi.trim(),
        persyaratan: persyaratan.trim(),
        batasLamaran: new Date(batasLamaran),
      },
    });
  } catch (error) {
    console.error("Error updating lowongan:", error);
    throw new Error("Gagal mengupdate lowongan");
  }

  revalidatePath("/admin/bkk");
  redirect("/admin/bkk");
}

export async function hapusLowongan(id: number): Promise<void> {
  try {
    await prisma.lowonganBKK.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting lowongan:", error);
    throw new Error("Gagal menghapus lowongan");
  }

  revalidatePath("/admin/bkk");
}

export async function hapusLowonganBulk(ids: number[]): Promise<void> {
  try {
    await prisma.lowonganBKK.deleteMany({
      where: { id: { in: ids } },
    });
  } catch (error) {
    console.error("Error bulk deleting lowongan:", error);
    throw new Error("Gagal menghapus lowongan secara massal");
  }

  revalidatePath("/admin/bkk");
}
