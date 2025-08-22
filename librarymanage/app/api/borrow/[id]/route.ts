import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
 // adjust based on your project

// Example fine policy: ₹10 per day late
const FINE_PER_DAY = 10;
const prisma=new PrismaClient();
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params; // Transaction ID

    // ✅ 1. Find transaction
    const trx = await prisma.transaction.findUnique({ where: { id } });

    if (!trx) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    if (trx.status === "RETURNED") {
      return NextResponse.json({ error: "Book already returned" }, { status: 400 });
    }

    // ✅ 2. Calculate fine (if overdue)
    let fine = 0;
    const now = new Date();
    if (now > trx.dueAt) {
      const daysLate = Math.floor(
        (now.getTime() - trx.dueAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      fine = daysLate * FINE_PER_DAY;
    }

    // ✅ 3. Update transaction
    const updated = await prisma.transaction.update({
      where: { id },
      data: {
        status: "RETURNED",
        returnedAt: now,
        fineAmount: fine,
      },
      include: { book: true, member: true },
    });
    await prisma.reservation.deleteMany({
      where: {
        memberId: trx.memberId,
        bookId: trx.bookId,
      },
    });
    await prisma.book.update({
      where: { id: trx.bookId },
      data: { available: { increment: 1 } },
    });

    return NextResponse.json(
      { message: "Book returned successfully", transaction: updated },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Return Book API Error:", error);
    return NextResponse.json(
      { error: "Failed to return book" },
      { status: 500 }
    );
  }
}
