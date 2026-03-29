import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const homepage = searchParams.get("homepage");

  try {
    if (homepage === "true") {
      const pinned = await prisma.artikelBlog.findFirst({
        where: { isPinned: true },
        orderBy: { tanggalPublish: "desc" },
      });

      const latest = await prisma.artikelBlog.findMany({
        where: { isPinned: false },
        orderBy: { tanggalPublish: "desc" },
        take: 8,
      });

      return NextResponse.json({ pinned, latest });
    }

    const artikel = await prisma.artikelBlog.findMany({
      orderBy: { tanggalPublish: "desc" },
      take: 20,
    });

    return NextResponse.json(artikel);
  } catch (error) {
    console.error("Error fetching artikel:", error);
    return NextResponse.json({ error: "Failed to fetch artikel" }, { status: 500 });
  }
}