import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { namaPerusahaan, logoUrl, websiteUrl } = body;

    if (!namaPerusahaan) {
      return NextResponse.json({ error: "Nama perusahaan wajib diisi" }, { status: 400 });
    }

    const mitra = await prisma.mitraIndustri.update({
      where: { id },
      data: {
        namaPerusahaan,
        logoUrl: logoUrl || null,
        websiteUrl: websiteUrl || null,
      },
    });

    return NextResponse.json(mitra);
  } catch (error) {
    console.error("Error updating mitra:", error);
    return NextResponse.json({ error: "Failed to update mitra" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.mitraIndustri.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting mitra:", error);
    return NextResponse.json({ error: "Failed to delete mitra" }, { status: 500 });
  }
}
