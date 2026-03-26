"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export async function tambahSiswa(
  formData: FormData
): Promise<{ error?: string; uploadFailed?: boolean } | void> {
  const nama = formData.get("nama") as string;
  const peran = formData.get("peran") as string;
  const kelasId = formData.get("kelasId") as string;
  const foto = formData.get("foto") as File | null;

  console.log("[DEBUG] formData received:");
  console.log("[DEBUG] - nama:", nama);
  console.log("[DEBUG] - kelasId:", kelasId);
  console.log("[DEBUG] - foto:", foto ? { name: foto.name, size: foto.size, type: foto.type } : "null");

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
    try {
      const arrayBuffer = await foto.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const safeName = foto.name.replace(/[^a-zA-Z0-9.\-]/g, "_");
      const fileName = `siswa/${Date.now()}-${safeName}`;

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

      fotoUrl = publicUrlData.publicUrl;
    } catch (err: any) {
      console.error("Exception in Supabase Upload:", err);
      return { error: `Kesalahan fatal saatunggah foto: ${err.message}`, uploadFailed: true };
    }
  }

  console.log("[DEBUG] Creating siswa with fotoUrl:", fotoUrl);
  console.log("[FIX-3] PAYLOAD KE PRISMA (tambahSiswa):", { nama: nama.trim(), peran: peranValue, kelasId: parseInt(kelasId), fotoUrl });
  try {
    const created = await prisma.siswa.create({
      data: {
        nama: nama.trim(),
        peran: peranValue as any,
        kelasId: parseInt(kelasId),
        fotoUrl,
      },
    });
    console.log("[FIX-3] DATA YANG TERSIMPAN DI DB (create):", created);
    console.log("[DEBUG] Siswa created successfully with fotoUrl:", fotoUrl);

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
): Promise<{ error?: string; uploadFailed?: boolean } | void> {
  const nama = formData.get("nama") as string;
  const peran = formData.get("peran") as string;
  const kelasId = formData.get("kelasId") as string;
  const foto = formData.get("foto") as File | null;

  console.log("[DEBUG] updateSiswa formData received:");
  console.log("[DEBUG] - id:", id);
  console.log("[DEBUG] - nama:", nama);
  console.log("[DEBUG] - foto:", foto ? { name: foto.name, size: foto.size, type: foto.type } : "null");

  if (!nama || nama.trim() === "") {
    return { error: "Nama wajib diisi" };
  }

  if (!kelasId) {
    return { error: "Kelas wajib dipilih" };
  }

  const validPeran = ["SISWA", "KETUA_KELAS", "WAKIL_KETUA", "SEKRETARIS", "BENDAHARA"];
  const peranValue = validPeran.includes(peran) ? peran : "SISWA";

  console.log("[FIX-1] Fetching existing siswa data for id:", id);
  const existingSiswa = await prisma.siswa.findUnique({ where: { id } });
  const existingFotoUrl = existingSiswa?.fotoUrl;
  console.log("[FIX-1] Existing fotoUrl:", existingFotoUrl);

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

    let newFotoUrl: string | null = null;
    if (foto && foto.size > 0) {
      try {
        const arrayBuffer = await foto.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const safeName = foto.name.replace(/[^a-zA-Z0-9.\-]/g, "_");
        const fileName = `siswa/${Date.now()}-${safeName}`;

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
      } catch (err: any) {
        console.error("Exception in Supabase Upload:", err);
        return { error: `Kesalahan fatal saatunggah foto: ${err.message}`, uploadFailed: true };
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

    console.log("[FIX-3] PAYLOAD KE PRISMA (updateSiswa):", updateData);
    console.log("[DEBUG] Updating siswa id:", id, "with fotoUrl:", updateData.fotoUrl);
    const updated = await prisma.siswa.update({
      where: { id },
      data: updateData,
    });
    console.log("[FIX-3] DATA YANG TERSIMPAN DI DB (update):", updated);
    console.log("[DEBUG] Siswa updated successfully");

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

export async function hapusSiswaBulk(ids: number[]): Promise<void> {
  try {
    await prisma.siswa.deleteMany({
      where: { id: { in: ids } },
    });
  } catch (error) {
    console.error("Error bulk deleting siswa:", error);
    throw new Error("Gagal menghapus siswa secara massal");
  }

  revalidatePath("/admin/siswa");
}
