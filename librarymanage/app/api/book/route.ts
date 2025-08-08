// app/api/books/route.ts
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function mapPrismaToFrontend(b: any) {
  return {
    id: b.id,
    title: b.title,
    author: b.author,
    isbn: b.isbn,
    type: b.type,
    quantity: b.quantity,
    available: b.available,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

export async function GET() {
  try {
    const items = await prisma.book.findMany();
    return NextResponse.json(items,{status:200});
  } catch (err) {
    console.error("GET /api/books error:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Accept frontend keys or lowercase keys
    const Title = body.Title ?? body.title;
    const Author = body.Author ?? body.author;
    const ISBN = body.ISBN ?? body.isbn;
    const Type = body.Type ?? body.type ?? body.Category;
    const Quantity = body.Quantity ?? body.quantity;

    if (!Title || !Author || (typeof Quantity === "undefined" || Quantity === null)) {
      return NextResponse.json({ error: "Title, Author and Quantity are required" }, { status: 400 });
    }

    const quantity = Number(Quantity);
    if (!Number.isInteger(quantity) || quantity < 0) {
      return NextResponse.json({ error: "Quantity must be a non-negative integer" }, { status: 400 });
    }

    // Optional: check ISBN uniqueness (remove if isbn is not unique in schema)
    if (ISBN) {
      const existing = await prisma.book.findFirst({ where: { isbn: String(ISBN).trim() } });
      if (existing) {
        return NextResponse.json({ error: "A book with this ISBN already exists" }, { status: 400 });
      }
    }

    const book = await prisma.book.create({
      data: {
        title: String(Title).trim(),
        author: String(Author).trim(),
        isbn: ISBN ? String(ISBN).trim() : null,
        type: Type ? String(Type).trim() : null,
        quantity,
        available: quantity,
      },
    });

    return NextResponse.json({ message: "Book added successfully", book: mapPrismaToFrontend(book) }, { status: 201 });
  } catch (err) {
    console.error("POST /api/books error:", err);
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 });
  }
}
