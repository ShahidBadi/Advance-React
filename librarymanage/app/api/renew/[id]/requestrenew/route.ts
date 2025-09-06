import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params; // This is the notification ID
  const body = await req.json();
  const { action } = body; // "APPROVE" or "REJECT"

  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
      include: { transaction: true },
    });

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    if (notification.status !== "PENDING") {
      return NextResponse.json({ error: "This request is already processed" }, { status: 400 });
    }

    if (action === "APPROVE") {
      // Extend due date by 7 days
      const newDueDate = new Date(notification.transaction.dueAt);
      newDueDate.setDate(newDueDate.getDate() + 7);

      await prisma.transaction.update({
        where: { id: notification.transactionId },
        data: {
          dueAt: newDueDate,
          renewedCount: { increment: 1 },
        },
      });

      await prisma.notification.update({
        where: { id },
        data: { status: "APPROVED" },
      });

      return NextResponse.json({ success: true, message: "Renew request approved" });

    } else if (action === "REJECT") {
      await prisma.notification.update({
        where: { id },
        data: { status: "REJECTED" },
      });

      return NextResponse.json({ success: true, message: "Renew request rejected" });

    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

  } catch (err) {
    console.error("Error processing renew request:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
