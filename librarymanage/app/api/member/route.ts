import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const items = await prisma.user.findMany({where:{userType:"Student"}});
    return NextResponse.json(items,{status:200});
  } catch (err) {
    console.error("GET /api/books error:", err);
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
