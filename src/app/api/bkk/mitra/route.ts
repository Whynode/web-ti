import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const mitra = await prisma.mitraIndustri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(mitra);
  } catch (error) {
    console.error("Error fetching mitra:", error);
    return NextResponse.json({ error: "Failed to fetch mitra" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaPerusahaan, logoUrl, websiteUrl } = body;

    if (!namaPerusahaan) {
      return NextResponse.json({ error: "Nama perusahaan wajib diisi" }, { status: 400 });
    }

    const mitra = await prisma.mitraIndustri.create({
      data: {
        namaPerusahaan,
        logoUrl: logoUrl || null,
        websiteUrl: websiteUrl || null,
      },
    });

    return NextResponse.json(mitra, { status: 201 });
  } catch (error) {
    console.error("Error creating mitra:", error);
    return NextResponse.json({ error: "Failed to create mitra" }, { status: 500 });
  }
}
