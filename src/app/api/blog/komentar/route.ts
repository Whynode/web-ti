import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { komentarSchema, formatZodError } from "@/lib/validations/api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId");

    // Validate blogId as UUID
    if (!blogId || typeof blogId !== "string") {
      return NextResponse.json({ error: "Blog ID diperlukan" }, { status: 400 });
    }

    // UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(blogId)) {
      return NextResponse.json({ error: "Blog ID tidak valid" }, { status: 400 });
    }

    const komentar = await prisma.komentar.findMany({
      where: { 
        blogId: blogId,
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

    // Zod validation
    const validated = komentarSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const { nama, isi, blogId, parentId } = validated.data;

    // Check if blog exists
    const blogExists = await prisma.artikelBlog.findUnique({
      where: { id: blogId },
    });

    if (!blogExists) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    const komentar = await prisma.komentar.create({
      data: {
        nama: nama || "Anonim",
        isi: isi.trim(),
        blogId,
        parentId: parentId || null,
      },
    });

    return NextResponse.json({ success: true, komentar }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating komentar:", error);
    
    // Handle Prisma errors
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003') {
      return NextResponse.json({ error: "Referensi tidak valid" }, { status: 400 });
    }
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: "Komentar parent tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}