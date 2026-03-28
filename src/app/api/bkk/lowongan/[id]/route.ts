import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { judul, tipePekerjaan, lokasi, deskripsi, posterUrl, status, mitraId } = body;

    if (!judul || !mitraId) {
      return NextResponse.json({ error: "Judul dan Mitra wajib diisi" }, { status: 400 });
    }

    const lowongan = await prisma.lowonganKerja.update({
      where: { id: parseInt(id) },
      data: {
        judul,
        tipePekerjaan: tipePekerjaan || "Full-Time",
        lokasi: lokasi || "",
        deskripsi: deskripsi || "",
        posterUrl: posterUrl || null,
        status: status || "BUKA",
        mitraId,
      },
    });

    return NextResponse.json(lowongan);
  } catch (error) {
    console.error("Error updating lowongan:", error);
    return NextResponse.json({ error: "Failed to update lowongan" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.lowonganKerja.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting lowongan:", error);
    return NextResponse.json({ error: "Failed to delete lowongan" }, { status: 500 });
  }
}
