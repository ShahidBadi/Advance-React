
import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(){
    try {
    const items = await prisma.item.findMany()
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}