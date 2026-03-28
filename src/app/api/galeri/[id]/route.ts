import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    await prisma.galeri.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json({ error: "Failed to delete galeri" }, { status: 500 });
  }
}
