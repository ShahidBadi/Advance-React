
import { PrismaClient } from "@/app/generated/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET(){
    try {
    const items = await prisma.book.findMany()
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}
export async function POST(req:Request){
  const body=await req.json();
  const{Title,Author,ISBN,Type,Quantity}=body;
  if(!Title||!Author||!ISBN||!Type||!Quantity){
    return NextResponse.json({error:"All fields are required"},{status:400})
  }
  try{
     const book=await prisma.book.create({
    data:{
      Title:Title,
      Author:Author,
      ISBN:ISBN,
      Type:Type,
      Quantity:Number(Quantity)
    },
  });
  return NextResponse.json({message:"book added successfully"},{status:201})
  }
  catch(err){
    return NextResponse.json({error:"Failed to add book"},{status:500})
  }
 
}