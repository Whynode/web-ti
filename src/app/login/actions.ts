"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const DEFAULT_ADMIN_PASSWORD = "ADMINtelindra17";
const BCRYPT_SALT_ROUNDS = 10;

export async function handleLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username dan password harus diisi" };
  }

  try {
    const userCount = await prisma.user.count();

    if (userCount === 0) {
      const hashedPassword = bcrypt.hashSync(DEFAULT_ADMIN_PASSWORD, BCRYPT_SALT_ROUNDS);
      await prisma.user.create({
        data: {
          username: "admin",
          passwordHash: hashedPassword,
          role: "ADMIN",
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return { error: "Username atau password salah" };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) {
      return { error: "Username atau password salah" };
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect("/admin");
  } catch (error) {
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Login error:", error);
    return { error: "Terjadi kesalahan sistem. Silakan coba lagi." };
  }
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/login");
}
