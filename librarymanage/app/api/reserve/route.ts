import { NextResponse } from "next/server";

import { randomUUID } from "crypto";
import { PrismaClient } from "@/app/generated/prisma";
import { cookies } from "next/headers";
import { error } from "console";

 const prisma=new PrismaClient();
  
export async function POST(req: Request) {
   const cookiestore=cookies();
    const memberId=(await cookiestore).get('userid')?.value;
  try {
    const { bookId } = await req.json();

    if (!bookId || !memberId) {
      return NextResponse.json({ error: "Book ID and Member ID are required" }, { status: 400 });
    }

    // Check book availability
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { available: true }
    });

    if (!book || book.available <= 0) {
      return NextResponse.json({ error: "Book not available" }, { status: 400 });
    }

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        reservationNumber: `RES-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        bookId,
        memberId,
        status: "PENDING",
        reservedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // expires in 7 days
      }
    });

    // Reduce available count
    await prisma.book.update({
      where: { id: bookId },
      data: { available: { decrement: 1 } }
    });

    return NextResponse.json({ message: "Book reserved successfully", reservation });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function GET(){
  const cookiestore=cookies();
        try{
            const memberId=(await cookiestore).get('userid')?.value;
            if(!memberId)
            {
                return NextResponse.json({error:"user not login"},{status:401})
            }
            const reservation=await prisma.reservation.findMany({
                where:{memberId:memberId},
                include:{
                  book:{
                    select:{
                      title:true,
                      author:true
                    }
                }},
                orderBy:{reservedAt:"desc"}
            })
            return NextResponse.json({reservation});
        }catch(err){
          return NextResponse.json({ error: "Server error" }, { status: 500 });
        }

}
