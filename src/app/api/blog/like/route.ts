import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { blogId } = body;

    if (!blogId) {
      return NextResponse.json({ error: "Blog ID diperlukan" }, { status: 400 });
    }

    const updatedBlog = await prisma.artikelBlog.update({
      where: { id: Number(blogId) },
      data: { likesCount: { increment: 1 } },
    });

    return NextResponse.json({ 
      success: true, 
      likesCount: updatedBlog.likesCount 
    });
  } catch (error) {
    console.error("Error updating like:", error);
    return NextResponse.json({ error: "Gagal update like" }, { status: 500 });
  }
}
