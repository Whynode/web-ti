import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { judul, kategori, imageUrl } = body;

    if (!judul || !kategori) {
      return NextResponse.json({ error: "Judul dan kategori wajib diisi" }, { status: 400 });
    }

    const galeri = await prisma.galeri.update({
      where: { id },
      data: {
        judul,
        kategori,
        imageUrl: imageUrl || undefined,
      },
    });

    return NextResponse.json(galeri);
  } catch (error) {
    console.error("Error updating galeri:", error);
    return NextResponse.json({ error: "Failed to update galeri" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const imageUrl = body?.imageUrl as string | undefined;

    // Validasi: imageUrl wajib ada
    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl diperlukan" }, { status: 400 });
    }

    // Ekstrak nama file dari URL (robust parsing)
    let fileName: string | null = null;
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      fileName = pathParts[pathParts.length - 1];
    } catch {
      // Fallback: ambil bagian setelah slash terakhir
      const parts = imageUrl.split('/');
      fileName = parts[parts.length - 1];
    }

    // Debug: log nama file sebelum hapus
    if (!fileName) {
      return NextResponse.json({ error: "Tidak dapat menentukan nama file dari imageUrl" }, { status: 400 });
    }
    console.log("Mencoba menghapus file:", fileName);

    // Hapus dari Supabase Storage
    const { error: storageError } = await supabase.storage.from("public-images").remove([fileName]);
    
    if (storageError) {
      console.error("Storage delete error:", storageError);
      // JANGAN lanjut hapus DB jika storage gagal!
      return NextResponse.json({ error: "Gagal menghapus file di storage" }, { status: 500 });
    }

    // Hapus dari Database (hanya jika storage BERHASIL)
    await prisma.galeri.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json({ error: "Failed to delete galeri" }, { status: 500 });
  }
}
