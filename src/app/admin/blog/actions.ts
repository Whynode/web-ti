"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function generateSlug(judul: string): string {
  return judul
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function tambahArtikel(formData: FormData): Promise<void> {
  const judul = formData.get("judul") as string;
  const konten = formData.get("konten") as string;
  const thumbnailUrl = formData.get("thumbnailUrl") as string;

  if (!judul || !konten) {
    throw new Error("Judul dan konten wajib diisi");
  }

  let slug = generateSlug(judul);
  const existingArticle = await prisma.artikelBlog.findUnique({
    where: { slug },
  });
  if (existingArticle) {
    slug = `${slug}-${Date.now()}`;
  }

  try {
    await prisma.artikelBlog.create({
      data: {
        judul: judul.trim(),
        slug,
        konten: konten.trim(),
        thumbnailUrl: thumbnailUrl && thumbnailUrl.trim() !== "" ? thumbnailUrl.trim() : null,
      },
    });
  } catch (error) {
    console.error("Error creating artikel:", error);
    throw new Error("Gagal menyimpan artikel");
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateArtikel(
  id: number,
  formData: FormData
): Promise<void> {
  const judul = formData.get("judul") as string;
  const konten = formData.get("konten") as string;
  const thumbnailUrl = formData.get("thumbnailUrl") as string;

  if (!judul || !konten) {
    throw new Error("Judul dan konten wajib diisi");
  }

  try {
    await prisma.artikelBlog.update({
      where: { id },
      data: {
        judul: judul.trim(),
        konten: konten.trim(),
        thumbnailUrl: thumbnailUrl && thumbnailUrl.trim() !== "" ? thumbnailUrl.trim() : null,
      },
    });
  } catch (error) {
    console.error("Error updating artikel:", error);
    throw new Error("Gagal mengupdate artikel");
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function hapusArtikel(id: number): Promise<void> {
  try {
    await prisma.artikelBlog.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting artikel:", error);
    throw new Error("Gagal menghapus artikel");
  }

  revalidatePath("/admin/blog");
}
