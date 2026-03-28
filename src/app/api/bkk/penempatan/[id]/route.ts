import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { namaAlumni, tahunLulus, perusahaanTempatKerja } = body;

    if (!namaAlumni || !tahunLulus || !perusahaanTempatKerja) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const penempatan = await prisma.penempatanAlumni.update({
      where: { id: parseInt(id) },
      data: {
        namaAlumni,
        tahunLulus: parseInt(tahunLulus),
        perusahaanTempatKerja,
      },
    });

    return NextResponse.json(penempatan);
  } catch (error) {
    console.error("Error updating penempatan:", error);
    return NextResponse.json({ error: "Failed to update penempatan" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.penempatanAlumni.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting penempatan:", error);
    return NextResponse.json({ error: "Failed to delete penempatan" }, { status: 500 });
  }
}
