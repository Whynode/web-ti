import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json({ error: "Blog ID diperlukan" }, { status: 400 });
    }

    const komentar = await prisma.komentar.findMany({
      where: { 
        blogId: Number(blogId),
        parentId: null,
      },
      include: {
        balasan: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(komentar);
  } catch (error) {
    console.error("Error fetching komentar:", error);
    return NextResponse.json({ error: "Gagal mengambil komentar" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, isi, blogId, parentId } = body;

    if (!isi || !blogId) {
      return NextResponse.json({ error: "Isi komentar dan Blog ID diperlukan" }, { status: 400 });
    }

    const komentar = await prisma.komentar.create({
      data: {
        nama: nama || "Anonim",
        isi,
        blogId: Number(blogId),
        parentId: parentId || null,
      },
    });

    return NextResponse.json({ success: true, komentar });
  } catch (error) {
    console.error("Error creating komentar:", error);
    return NextResponse.json({ error: "Gagal membuat komentar" }, { status: 500 });
  }
}
