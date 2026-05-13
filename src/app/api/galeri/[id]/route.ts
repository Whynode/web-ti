import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth/server";
import { galeriUpdateSchema, idParamsSchema, formatZodError } from "@/lib/validations/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    
    const { id } = await params;
    
    // Validate ID parameter
    const idValidation = idParamsSchema.safeParse({ id });
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validated = galeriUpdateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const galeri = await prisma.galeri.update({
      where: { id },
      data: validated.data,
    });

    return NextResponse.json(galeri);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error updating galeri:", error);
    return NextResponse.json({ error: "Failed to update galeri" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    
    const { id } = await params;
    
    // Validate ID parameter
    const idValidation = idParamsSchema.safeParse({ id });
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const imageUrl = body?.imageUrl as string | undefined;

    if (!imageUrl) {
      return NextResponse.json({ error: "imageUrl diperlukan" }, { status: 400 });
    }

    // Extract filename from URL
    let fileName: string | null = null;
    try {
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      fileName = pathParts[pathParts.length - 1];
    } catch {
      const parts = imageUrl.split('/');
      fileName = parts[parts.length - 1];
    }

    if (!fileName) {
      return NextResponse.json({ error: "Tidak dapat menentukan nama file dari imageUrl" }, { status: 400 });
    }

    // Delete from Supabase Storage
    const { error: storageError } = await supabase.storage.from("public-images").remove([fileName]);
    
    if (storageError) {
      console.error("Storage delete error:", storageError);
      return NextResponse.json({ error: "Gagal menghapus file di storage" }, { status: 500 });
    }

    // Delete from Database
    await prisma.galeri.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error deleting galeri:", error);
    return NextResponse.json({ error: "Failed to delete galeri" }, { status: 500 });
  }
}