import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/server";
import { penempatanSchema, formatZodError } from "@/lib/validations/api";

export async function GET() {
  try {
    const penempatan = await prisma.penempatanAlumni.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(penempatan);
  } catch (error) {
    console.error("Error fetching penempatan:", error);
    return NextResponse.json({ error: "Failed to fetch penempatan" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate admin
    await requireAdmin();

    // Parse and validate body
    const body = await request.json();
    const validated = penempatanSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Validation failed", details: formatZodError(validated.error) },
        { status: 400 }
      );
    }

    const penempatan = await prisma.penempatanAlumni.create({
      data: validated.data,
    });

    return NextResponse.json(penempatan, { status: 201 });
  } catch (error) {
    // Handle auth errors
    if (error instanceof NextResponse) {
      return error;
    }
    console.error("Error creating penempatan:", error);
    return NextResponse.json({ error: "Failed to create penempatan" }, { status: 500 });
  }
}