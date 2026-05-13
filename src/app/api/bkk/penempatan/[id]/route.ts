import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { penempatanUpdateSchema, idParamsSchema, formatZodError } from "@/lib/validations/api";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    
    const { id } = await params;
    
    // Validate ID parameter as UUID
    const idValidation = idParamsSchema.safeParse({ id });
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validated = penempatanUpdateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const penempatan = await prisma.penempatanAlumni.update({
      where: { id },
      data: validated.data,
    });

    return NextResponse.json(penempatan);
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error updating penempatan:", error);
    return NextResponse.json({ error: "Failed to update penempatan" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin();
    
    const { id } = await params;
    
    // Validate ID parameter as UUID
    const idValidation = idParamsSchema.safeParse({ id });
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    await prisma.penempatanAlumni.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error deleting penempatan:", error);
    return NextResponse.json({ error: "Failed to delete penempatan" }, { status: 500 });
  }
}