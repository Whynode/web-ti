import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { likeSchema } from "@/lib/validations/api";

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Format data tidak valid" }, { status: 400 });
    }

    // Zod validation for UUID
    const validated = likeSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validated.error.issues },
        { status: 400 }
      );
    }

    const { artikelId } = validated.data;

    // Check if blog exists
    const blogExists = await prisma.artikelBlog.findUnique({
      where: { id: artikelId },
      select: { id: true, likesCount: true },
    });

    if (!blogExists) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    const updatedBlog = await prisma.artikelBlog.update({
      where: { id: artikelId },
      data: { likesCount: { increment: 1 } },
    });

    return NextResponse.json({ 
      success: true, 
      likesCount: updatedBlog.likesCount 
    });
  } catch (error) {
    console.error("Error updating like:", error);
    
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ error: "Terjadi kesalahan pada server" }, { status: 500 });
  }
}