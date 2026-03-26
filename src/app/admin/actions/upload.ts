"use server";

import { cookies } from "next/headers";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function uploadImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");

  if (!adminSession || adminSession.value !== "true") {
    return { success: false, error: "Unauthorized Access" };
  }

  const file = formData.get("file") as File | null;

  if (!file) {
    return { success: false, error: "Tidak ada file yang dipilih" };
  }

  if (!isSupabaseConfigured()) {
    return { success: false, error: "Konfigurasi Supabase belum lengkap" };
  }

  const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return { success: false, error: "Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP" };
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { success: false, error: "Ukuran file terlalu besar. Maksimal 5MB" };
  }

  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const fileName = `images/${timestamp}_${randomStr}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { data, error } = await supabase.storage
    .from("public-images")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error || !data) {
    console.error("Upload error:", error);
    return { success: false, error: `Gagal mengunggah: ${error?.message || "Unknown error"}` };
  }

  const { data: publicUrlData } = supabase.storage
    .from("public-images")
    .getPublicUrl(fileName);

  if (!publicUrlData?.publicUrl) {
    console.error("Failed to get public URL");
    return { success: false, error: "Gagal mendapatkan URL foto" };
  }

  return { success: true, url: publicUrlData.publicUrl };
}
