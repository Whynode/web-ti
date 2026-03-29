import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Format data tidak valid" }, { status: 400 });
    }

    const { blogId } = body;

    // Validasi blogId harus ada dan berupa number yang valid
    if (blogId === undefined || blogId === null) {
      return NextResponse.json({ error: "Blog ID diperlukan" }, { status: 400 });
    }

    const parsedBlogId = Number(blogId);
    if (isNaN(parsedBlogId) || parsedBlogId <= 0 || !Number.isInteger(parsedBlogId)) {
      return NextResponse.json({ error: "Blog ID tidak valid" }, { status: 400 });
    }

    // Cek apakah blog exists
    const blogExists = await prisma.artikelBlog.findUnique({
      where: { id: parsedBlogId },
      select: { id: true, likesCount: true },
    });

    if (!blogExists) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    const updatedBlog = await prisma.artikelBlog.update({
      where: { id: parsedBlogId },
      data: { likesCount: { increment: 1 } },
    });

    return NextResponse.json({ 
      success: true, 
      likesCount: updatedBlog.likesCount 
    });
  } catch (error) {
    console.error("Error updating like:", error);
    
    // Tangani error Prisma untuk record not found
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}
