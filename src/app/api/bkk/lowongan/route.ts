import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const lowongan = await prisma.lowonganKerja.findMany({
      include: { mitra: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ vacancies: lowongan });
  } catch (error) {
    console.error("Error fetching lowongan:", error);
    return NextResponse.json({ error: "Failed to fetch lowongan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, tipePekerjaan, lokasi, deskripsi, posterUrl, status, mitraId } = body;

    if (!judul || !mitraId) {
      return NextResponse.json({ error: "Judul dan Mitra wajib diisi" }, { status: 400 });
    }

    const lowongan = await prisma.lowonganKerja.create({
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

    return NextResponse.json(lowongan, { status: 201 });
  } catch (error) {
    console.error("Error creating lowongan:", error);
    return NextResponse.json({ error: "Failed to create lowongan" }, { status: 500 });
  }
}
