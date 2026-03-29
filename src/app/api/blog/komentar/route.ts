import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId");

    // Validasi blogId
    if (!blogId || typeof blogId !== "string" || blogId.trim() === "") {
      return NextResponse.json({ error: "Blog ID diperlukan" }, { status: 400 });
    }

    const parsedBlogId = Number(blogId);
    if (isNaN(parsedBlogId) || parsedBlogId <= 0) {
      return NextResponse.json({ error: "Blog ID tidak valid" }, { status: 400 });
    }

    const komentar = await prisma.komentar.findMany({
      where: { 
        blogId: parsedBlogId,
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
    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Format data tidak valid" }, { status: 400 });
    }

    const { nama, isi, blogId, parentId } = body;

    // Validasi blogId
    if (!blogId || typeof blogId !== "number" || blogId <= 0) {
      return NextResponse.json({ error: "Blog ID diperlukan dan harus berupa angka valid" }, { status: 400 });
    }

    // Validasi isi komentar (tidak boleh kosong atau hanya spasi)
    if (!isi || typeof isi !== "string" || isi.trim().length === 0) {
      return NextResponse.json({ error: "Isi komentar tidak boleh kosong" }, { status: 400 });
    }

    // Batasi panjang komentar untuk keamanan
    if (isi.trim().length > 2000) {
      return NextResponse.json({ error: "Komentar terlalu panjang (maksimal 2000 karakter)" }, { status: 400 });
    }

    // Validasi parentId jika ada
    if (parentId !== null && parentId !== undefined && typeof parentId !== "string") {
      return NextResponse.json({ error: "Parent ID tidak valid" }, { status: 400 });
    }

    // Cek apakah blog exists
    const blogExists = await prisma.artikelBlog.findUnique({
      where: { id: blogId },
    });

    if (!blogExists) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    const komentar = await prisma.komentar.create({
      data: {
        nama: (typeof nama === "string" && nama.trim().length > 0) ? nama.trim().slice(0, 100) : "Anonim",
        isi: isi.trim(),
        blogId,
        parentId: parentId || null,
      },
    });

    return NextResponse.json({ success: true, komentar }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating komentar:", error);
    
    // Tangani error Prisma untuk foreign key violation
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return NextResponse.json({ error: "Referensi tidak valid" }, { status: 400 });
    }
    
    // Tangani error untuk parentId yang tidak ditemukan
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: "Komentar parent tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
