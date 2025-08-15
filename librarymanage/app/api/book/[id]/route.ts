import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// UPDATE BOOK (PUT /api/book/:id)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id: bookId } = params; // ✅ No await needed

  try {
    const body = await req.json();
    const { Title, Author, ISBN, Type, Quantity } = body;

    // Validate fields
    if (!Title || !Author || !ISBN || !Type || Quantity === undefined) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Update book
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        title: Title,
        author: Author,
        isbn: ISBN,
        type: Type,
        quantity: Number(Quantity),
      },
    });

    return NextResponse.json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingBook = await prisma.book.findUnique({
      where: { id: params.id },
    });

    if (!existingBook) {
      return new Response(JSON.stringify({ message: "Book not found" }), {
        status: 404,
      });
    }

    await prisma.book.delete({
      where: { id: params.id },
    });

    return new Response(
      JSON.stringify({ message: "Book deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error deleting book" }), {
      status: 500,
    });
  }
}
