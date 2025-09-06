import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Max renewals
const MAX_RENEWALS = 2;

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // transaction ID

  try {
    // 1. Find existing transaction
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: { member: true, book: true },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    if (transaction.status !== "BORROWED") {
      return NextResponse.json(
        { error: "Book is not currently borrowed" },
        { status: 400 }
      );
    }

    if (transaction.renewedCount >= MAX_RENEWALS) {
      return NextResponse.json(
        { error: "Maximum renewals reached" },
        { status: 400 }
      );
    }

    // 2. Instead of renewing → create a notification
    await prisma.notification.create({
      data: {
        type: "RENEW_REQUEST",
        message: `${transaction.member.userFirstName} ${transaction.member.userLastName} requested renewal for "${transaction.book.title}"`,
        status: "PENDING",
        memberId: transaction.memberId,
        transactionId: transaction.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Renewal request sent to admin. Waiting for approval.",
    });
  } catch (error) {
    console.error("❌ Error creating renew request:", error);
    return NextResponse.json(
      { error: "Failed to request renewal" },
      { status: 500 }
    );
  }
}
