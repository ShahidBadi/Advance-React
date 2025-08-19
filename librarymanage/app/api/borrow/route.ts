import { PrismaClient } from "@/app/generated/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();

// 📌 GET: fetch all borrowed books
export async function GET(req: Request) {
    const cookiestore=await cookies();
    const userCookie = cookiestore.get("userid");  // <-- returns Cookie | undefined
    const memberId = userCookie?.value;   
  try {
    const borrows = await prisma.borrow.findMany({
      where: { memberId },
      include: { book: true },
      orderBy: { borrowedAt: "desc" },
    });

    return NextResponse.json({ borrows });
  } catch (error) {
    console.error("❌ Error fetching borrows:", error);
    return NextResponse.json({ error: "Failed to fetch borrowed books" }, { status: 500 });
  }
}

// 📌 POST: checkout → add new borrowed book
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const memberId = cookieStore.get("userid")?.value;

    if (!memberId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookId, dueDate } = await req.json();

    if (!bookId) {
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    // ✅ Check if book exists and is available
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { available: true },
    });

    if (!book || book.available <= 0) {
      return NextResponse.json({ error: "Book not available" }, { status: 400 });
    }

    // ✅ Create borrow record
    const borrow = await prisma.borrow.create({
      data: {
        member: { connect: { id: memberId } },
        book: { connect: { id: bookId } },
        dueDate: new Date(dueDate),
        borrowedAt: new Date(),
      },
    });

    // ✅ Decrease available count
    await prisma.book.update({
      where: { id: bookId },
      data: { available: { decrement: 1 } },
    });

    // ✅ Optional: update any pending reservation for this book to COMPLETED
    await prisma.reservation.updateMany({
      where: { memberId, bookId, status: "PENDING" },
      data: { status: "FULFILLED" },
    });

    return NextResponse.json({ message: "Book borrowed successfully", borrow });
  } catch (error) {
    console.error("❌ Error borrowing book:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}