import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      where:{status:"PENDING"},
      orderBy: { createdAt: "desc" },
      include: {
        member: true,        // who requested
        transaction: {
          include: { book: true }, // which book
        },
      },
    });

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}
