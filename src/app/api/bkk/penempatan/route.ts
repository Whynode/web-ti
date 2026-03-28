import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const penempatan = await prisma.penempatanAlumni.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(penempatan);
  } catch (error) {
    console.error("Error fetching penempatan:", error);
    return NextResponse.json({ error: "Failed to fetch penempatan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaAlumni, tahunLulus, perusahaanTempatKerja } = body;

    if (!namaAlumni || !tahunLulus || !perusahaanTempatKerja) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const penempatan = await prisma.penempatanAlumni.create({
      data: {
        namaAlumni,
        tahunLulus: parseInt(tahunLulus),
        perusahaanTempatKerja,
      },
    });

    return NextResponse.json(penempatan, { status: 201 });
  } catch (error) {
    console.error("Error creating penempatan:", error);
    return NextResponse.json({ error: "Failed to create penempatan" }, { status: 500 });
  }
}
