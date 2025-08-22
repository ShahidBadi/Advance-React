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
    const borrows = await prisma.transaction.findMany({
      include: { book: true,member:true },
      orderBy: { issuedAt: "desc" },
    });

    return NextResponse.json({ borrows });
  } catch (error) {
    console.error("❌ Error fetching borrows:", error);
    return NextResponse.json({ error: "Failed to fetch borrowed books" }, { status: 500 });
  }
}

// 📌 POST: checkout → add new borrowed book
