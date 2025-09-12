import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

// Cancel reservation by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Find reservation
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    // Restore book availability
    await prisma.book.update({
      where: { id: reservation.bookId },
      data: { available: { increment: 1 } },
    });

    // Cancel reservation
    await prisma.reservation.update({
      where: { id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling reservation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
