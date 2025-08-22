import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ✅ Block user
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isBlocked: true },
    });

    return NextResponse.json({ message: "User blocked", user });
  } catch (error) {
    console.error("Error blocking user:", error);
    return NextResponse.json({ error: "Failed to block user" }, { status: 500 });
  }
}

// ✅ Unblock user
export async function PUT(req: Request) {
  try {
    const { userId } = await req.json();

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isBlocked: false },
    });

    return NextResponse.json({ message: "User unblocked", user });
  } catch (error) {
    console.error("Error unblocking user:", error);
    return NextResponse.json({ error: "Failed to unblock user" }, { status: 500 });
  }
}
