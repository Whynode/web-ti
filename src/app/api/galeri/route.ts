import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(galeri);
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json({ error: "Failed to fetch galeri" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, kategori, imageUrl } = body;

    if (!judul || !kategori || !imageUrl) {
      return NextResponse.json({ error: "Judul, kategori, dan gambar wajib diisi" }, { status: 400 });
    }

    const galeri = await prisma.galeri.create({
      data: {
        judul,
        kategori,
        imageUrl,
      },
    });

    return NextResponse.json(galeri, { status: 201 });
  } catch (error) {
    console.error("Error creating galeri:", error);
    return NextResponse.json({ error: "Failed to create galeri" }, { status: 500 });
  }
}
