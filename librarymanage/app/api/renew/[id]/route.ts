import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();

// Example: max renewals allowed
const MAX_RENEWALS = 2;

// Example: extend by 7 days each renewal
const EXTENSION_DAYS = 7;

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // transaction ID

  try {
    // Find existing borrow
    const transaction = await prisma.transaction.findUnique({
      where: { id },
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

    // Extend due date
    const newDueDate = new Date(transaction.dueAt);
    newDueDate.setDate(newDueDate.getDate() + EXTENSION_DAYS);

    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        dueAt: newDueDate,
        renewedCount: { increment: 1 },
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, transaction: updated });
  } catch (error) {
    console.error("❌ Error renewing book:", error);
    return NextResponse.json(
      { error: "Failed to renew borrowed book" },
      { status: 500 }
    );
  }
}
