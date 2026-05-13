import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { mitraUpdateSchema, idParamsSchema, formatZodError } from "@/lib/validations/api";

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
    const validated = mitraUpdateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const mitra = await prisma.mitraIndustri.update({
      where: { id },
      data: validated.data,
    });

    return NextResponse.json(mitra);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error updating mitra:", error);
    return NextResponse.json({ error: "Failed to update mitra" }, { status: 500 });
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

    await prisma.mitraIndustri.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error deleting mitra:", error);
    return NextResponse.json({ error: "Failed to delete mitra" }, { status: 500 });
  }
}