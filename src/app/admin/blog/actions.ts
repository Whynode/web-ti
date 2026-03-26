"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "@/app/admin/actions/upload";

function generateSlug(judul: string): string {
  return judul
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function tambahArtikel(formData: FormData): Promise<void> {
  const judul = formData.get("judul") as string;
  const konten = formData.get("konten") as string;
  const thumbnailFile = formData.get("thumbnailUrl") as File | null;

  if (!judul || !konten) {
    throw new Error("Judul dan konten wajib diisi");
  }

  let finalThumbnailUrl: string | null = null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadFormData = new FormData();
    uploadFormData.append("file", thumbnailFile);
    const uploadResult = await uploadImage(uploadFormData);
    if (!uploadResult.success) {
      throw new Error(uploadResult.error || "Gagal mengunggah thumbnail");
    }
    finalThumbnailUrl = uploadResult.url || null;
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
        thumbnailUrl: finalThumbnailUrl,
      },
    });
  } catch (error) {
    console.error("Error creating artikel:", error);
    throw new Error("Gagal menyimpan artikel");
  }

  revalidatePath("/admin/blog");
  revalidatePath("/berita");
  revalidatePath("/");
  redirect("/admin/blog");
}

export async function updateArtikel(
  id: number,
  formData: FormData
): Promise<void> {
  const judul = formData.get("judul") as string;
  const konten = formData.get("konten") as string;
  const thumbnailFile = formData.get("thumbnailUrl") as File | null;

  if (!judul || !konten) {
    throw new Error("Judul dan konten wajib diisi");
  }

  const updateData: any = {
    judul: judul.trim(),
    konten: konten.trim(),
  };

  if (thumbnailFile && thumbnailFile.size > 0) {
    const uploadFormData = new FormData();
    uploadFormData.append("file", thumbnailFile);
    const uploadResult = await uploadImage(uploadFormData);
    if (!uploadResult.success) {
      throw new Error(uploadResult.error || "Gagal mengunggah thumbnail");
    }
    updateData.thumbnailUrl = uploadResult.url || null;
  }

  try {
    await prisma.artikelBlog.update({
      where: { id },
      data: updateData,
    });
  } catch (error) {
    console.error("Error updating artikel:", error);
    throw new Error("Gagal mengupdate artikel");
  }

  revalidatePath("/admin/blog");
  revalidatePath("/berita");
  revalidatePath("/");
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
  revalidatePath("/berita");
  revalidatePath("/");
}

export async function hapusArtikelBulk(ids: number[]): Promise<void> {
  try {
    await prisma.artikelBlog.deleteMany({
      where: { id: { in: ids } },
    });
  } catch (error) {
    console.error("Error bulk deleting artikel:", error);
    throw new Error("Gagal menghapus artikel secara massal");
  }

  revalidatePath("/admin/blog");
  revalidatePath("/berita");
  revalidatePath("/");
}
