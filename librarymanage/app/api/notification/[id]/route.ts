import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// /api/notifications/[id]/approve
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // notificationId

  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
      include: { transaction: true },
    });

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    if (notification.status !== "PENDING") {
      return NextResponse.json({ error: "Already processed" }, { status: 400 });
    }

    // Extend transaction due date
    const EXTENSION_DAYS = 7;
    const newDueDate = new Date(notification.transaction.dueAt);
    newDueDate.setDate(newDueDate.getDate() + EXTENSION_DAYS);

    await prisma.transaction.update({
      where: { id: notification.transactionId },
      data: {
        dueAt: newDueDate,
        renewedCount: { increment: 1 },
      },
    });

    // Update notification
    await prisma.notification.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    return NextResponse.json({ success: true, message: "Renewal approved" });
  } catch (error) {
    console.error("❌ Approve error:", error);
    return NextResponse.json({ error: "Failed to approve renewal" }, { status: 500 });
  }
}
