"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function tambahMateri(formData: FormData): Promise<void> {
  const judul = formData.get("judul") as string;
  const tipeMedia = formData.get("tipeMedia") as "VIDEO" | "PDF";
  const linkUrl = formData.get("linkUrl") as string;
  const kelasTarget = formData.get("kelasTarget") as string;

  if (!judul || !tipeMedia || !linkUrl || !kelasTarget) {
    throw new Error("Semua field wajib diisi");
  }

  if (!["VIDEO", "PDF"].includes(tipeMedia)) {
    throw new Error("Tipe media tidak valid");
  }

  try {
    await prisma.materiElearning.create({
      data: {
        judul: judul.trim(),
        tipeMedia,
        linkUrl: linkUrl.trim(),
        kelasTarget: kelasTarget.trim(),
      },
    });
  } catch (error) {
    console.error("Error creating materi:", error);
    throw new Error("Gagal menyimpan materi");
  }

  revalidatePath("/admin/elearning");
  redirect("/admin/elearning");
}

export async function updateMateri(
  id: number,
  formData: FormData
): Promise<void> {
  const judul = formData.get("judul") as string;
  const tipeMedia = formData.get("tipeMedia") as "VIDEO" | "PDF";
  const linkUrl = formData.get("linkUrl") as string;
  const kelasTarget = formData.get("kelasTarget") as string;

  if (!judul || !tipeMedia || !linkUrl || !kelasTarget) {
    throw new Error("Semua field wajib diisi");
  }

  try {
    await prisma.materiElearning.update({
      where: { id },
      data: {
        judul: judul.trim(),
        tipeMedia,
        linkUrl: linkUrl.trim(),
        kelasTarget: kelasTarget.trim(),
      },
    });
  } catch (error) {
    console.error("Error updating materi:", error);
    throw new Error("Gagal mengupdate materi");
  }

  revalidatePath("/admin/elearning");
  redirect("/admin/elearning");
}

export async function hapusMateri(id: number): Promise<void> {
  try {
    await prisma.materiElearning.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting materi:", error);
    throw new Error("Gagal menghapus materi");
  }

  revalidatePath("/admin/elearning");
}
