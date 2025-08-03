import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();

export async function POST(req: Request) {
  const body=await req.json();
  const userEmail=body.userEmail;
  //  const { firstName, lastName, fullName, email, password, userType } = body;
   if (!body.userEmail || !body.userEmail || !body.userType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  try {
    const existingUser = await prisma.user.findUnique({ where: {userEmail} })

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    const newUser = await prisma.user.create({
      data: {  userFirstName: body.userFirstName,
        userLastName: body.userLastName,
        userName: body.userName,
        userEmail: body.userEmail,
        userPassword: body.userPassword,
        userType: body.userType, },
    })

    return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


