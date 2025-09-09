import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { trxNumber } = await req.json();

    if (!trxNumber) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Find transaction
    const transaction = await prisma.transaction.findUnique({
      where: { trxNumber },
      include: { book: true },
    });

    if (!transaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    if (transaction.status !== "BORROWED") {
      return NextResponse.json(
        { error: "This transaction is not active for return" },
        { status: 400 }
      );
    }

    // Check overdue fine (e.g. 10 per day late)
    let fineAmount = 0;
    const now = new Date();
    if (transaction.dueAt < now) {
      const diffDays = Math.ceil(
        (now.getTime() - transaction.dueAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      fineAmount = diffDays * 10; // 10 units per day late
    }

    // Update transaction
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: "RETURNED",
        returnedAt: now,
        fineAmount,
      },
    });

    // Increase available books
    await prisma.book.update({
      where: { id: transaction.bookId },
      data: { available: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      message: `Book returned successfully${
        fineAmount > 0 ? ` (Fine: ₹${fineAmount})` : ""
      }`,
    });
  } catch (error) {
    console.error("❌ Error in return API:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
