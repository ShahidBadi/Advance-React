import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// UPDATE BOOK (PUT /api/book/:id)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const bookId = params.id;
  const body = await req.json();

  const { bookTitle, bookAuthor, bookGenre, bookCopies } = body;

  if (!bookTitle || !bookAuthor || !bookGenre || bookCopies == null) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        bookTitle,
        bookAuthor,
        bookGenre,
        bookCopies: Number(bookCopies),
      },
    });

    return NextResponse.json({ message: "Book updated successfully", book: updatedBook });
  } catch (error: any) {
    console.error("Error updating book:", error);
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 });
  }
}
