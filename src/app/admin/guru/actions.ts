"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function tambahGuru(
  formData: FormData
): Promise<{ error?: string; uploadFailed?: boolean } | void> {
  const nama = formData.get("nama") as string;
  const posisi = formData.get("posisi") as string;
  const mapel = formData.get("mapel") as string;
  const foto = formData.get("foto") as File | null;

  console.log("[DEBUG] formData received:");
  console.log("[DEBUG] - nama:", nama);
  console.log("[DEBUG] - posisi:", posisi);
  console.log("[DEBUG] - foto:", foto ? { name: foto.name, size: foto.size, type: foto.type } : "null");
  console.log("[DEBUG] - foto is File?:", foto instanceof File);
  console.log("[DEBUG] - foto.size:", foto?.size);

  if (!nama || nama.trim() === "") {
    return { error: "Nama wajib diisi" };
  }

  if (!posisi || posisi.trim() === "") {
    return { error: "Posisi wajib diisi" };
  }

  const mapelValue = mapel && mapel.trim() !== "" ? mapel.trim() : "-";
  let fotoUrl: string | null = null;

  if (foto && foto.size > 0) {
    let uploadSuccess = false;
    console.log("[DEBUG] Starting upload for:", foto.name);
    try {
      const arrayBuffer = await foto.arrayBuffer();
      console.log("[DEBUG] ArrayBuffer created, size:", arrayBuffer.byteLength);
      const buffer = new Uint8Array(arrayBuffer);
      const safeName = foto.name.replace(/[^a-zA-Z0-9.\-]/g, "_");
      const fileName = `guru/${Date.now()}-${safeName}`;
      console.log("[DEBUG] Uploading to Supabase with filename:", fileName);

      const { data, error } = await supabase.storage
        .from("public-images")
        .upload(fileName, buffer, {
          contentType: foto.type,
          upsert: false,
        });

      console.log("[DEBUG] Supabase response - data:", data, "error:", error);

      if (error || !data) {
        console.error("Supabase Upload Error:", error);
        return { error: `Gagal mengunggah foto ke Supabase: ${error?.message || "Unknown error"}`, uploadFailed: true };
      }

      const { data: publicUrlData } = supabase.storage
        .from("public-images")
        .getPublicUrl(fileName);

      console.log("[DEBUG] Public URL data:", publicUrlData);

      if (!publicUrlData?.publicUrl) {
        console.error("Failed to get public URL");
        return { error: "Gagal mendapatkan URL foto", uploadFailed: true };
      }

      fotoUrl = publicUrlData.publicUrl;
      console.log("[DEBUG] Upload successful, fotoUrl set to:", fotoUrl);
      uploadSuccess = true;
    } catch (err: any) {
      console.error("Exception in Supabase Upload:", err);
      return { error: `Kesalahan fatal saatunggah foto: ${err.message}`, uploadFailed: true };
    }

    if (!uploadSuccess) {
      return { error: "Upload foto gagal. Data tidak akan disimpan.", uploadFailed: true };
    }
  } else {
    console.log("[DEBUG] No photo to upload - foto is null or size is 0");
  }

  console.log("[DEBUG] Creating guru with fotoUrl:", fotoUrl);
  console.log("[FIX-3] PAYLOAD KE PRISMA (tambahGuru):", { nama: nama.trim(), posisi: posisi.trim(), mapel: mapelValue, fotoUrl });
  try {
    const created = await prisma.guru.create({
      data: {
        nama: nama.trim(),
        posisi: posisi.trim(),
        mapel: mapelValue,
        fotoUrl,
      },
    });
    console.log("[FIX-3] DATA YANG TERSIMPAN DI DB (create):", created);
    console.log("[DEBUG] Guru created successfully with fotoUrl:", fotoUrl);

    revalidatePath("/admin/guru");
    revalidatePath("/informasi");
    revalidatePath("/");
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
): Promise<{ error?: string; uploadFailed?: boolean } | void> {
  const nama = formData.get("nama") as string;
  const posisi = formData.get("posisi") as string;
  const mapel = formData.get("mapel") as string;
  const foto = formData.get("foto") as File | null;

  console.log("[DEBUG] updateGuru formData received:");
  console.log("[DEBUG] - id:", id);
  console.log("[DEBUG] - nama:", nama);
  console.log("[DEBUG] - foto:", foto ? { name: foto.name, size: foto.size, type: foto.type } : "null");

  if (!nama || nama.trim() === "") {
    return { error: "Nama wajib diisi" };
  }

  if (!posisi || posisi.trim() === "") {
    return { error: "Posisi wajib diisi" };
  }

  const mapelValue = mapel && mapel.trim() !== "" ? mapel.trim() : "-";

  console.log("[FIX-1] Fetching existing guru data for id:", id);
  const existingGuru = await prisma.guru.findUnique({ where: { id } });
  const existingFotoUrl = existingGuru?.fotoUrl;
  console.log("[FIX-1] Existing fotoUrl:", existingFotoUrl);

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

    let newFotoUrl: string | null = null;
    if (foto && foto.size > 0) {
      let uploadSuccess = false;
      try {
        const arrayBuffer = await foto.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const safeName = foto.name.replace(/[^a-zA-Z0-9.\-]/g, "_");
        const fileName = `guru/${Date.now()}-${safeName}`;

        const { data, error } = await supabase.storage
          .from("public-images")
          .upload(fileName, buffer, {
            contentType: foto.type,
            upsert: false,
          });

        if (error || !data) {
          console.error("Supabase Upload Error:", error);
          return { error: `Gagal mengunggah foto ke Supabase: ${error?.message || "Unknown error"}`, uploadFailed: true };
        }

        const { data: publicUrlData } = supabase.storage
          .from("public-images")
          .getPublicUrl(fileName);

        if (!publicUrlData?.publicUrl) {
          console.error("Failed to get public URL");
          return { error: "Gagal mendapatkan URL foto", uploadFailed: true };
        }

        newFotoUrl = publicUrlData.publicUrl;
        uploadSuccess = true;
      } catch (err: any) {
        console.error("Exception in Supabase Upload:", err);
        return { error: `Kesalahan fatal saatunggah foto: ${err.message}`, uploadFailed: true };
      }

      if (!uploadSuccess) {
        return { error: "Upload foto gagal. Data tidak akan disimpan.", uploadFailed: true };
      }
    }

    if (newFotoUrl) {
      updateData.fotoUrl = newFotoUrl;
      console.log("[FIX-1] Using NEW fotoUrl:", newFotoUrl);
    } else if (existingFotoUrl) {
      updateData.fotoUrl = existingFotoUrl;
      console.log("[FIX-1] No new upload, preserving EXISTING fotoUrl:", existingFotoUrl);
    } else {
      updateData.fotoUrl = null;
      console.log("[FIX-1] No photo at all, setting fotoUrl to null");
    }

    console.log("[FIX-3] PAYLOAD KE PRISMA (updateGuru):", updateData);
    const updated = await prisma.guru.update({
      where: { id },
      data: updateData,
    });
    console.log("[FIX-3] DATA YANG TERSIMPAN DI DB (update):", updated);
    console.log("[DEBUG] Guru updated successfully");

    revalidatePath("/admin/guru");
    revalidatePath("/informasi");
    revalidatePath("/");
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

export async function hapusGuruBulk(ids: number[]): Promise<void> {
  try {
    await prisma.guru.deleteMany({
      where: { id: { in: ids } },
    });
  } catch (error) {
    console.error("Error bulk deleting guru:", error);
    throw new Error("Gagal menghapus data guru secara massal");
  }

  revalidatePath("/admin/guru");
}
