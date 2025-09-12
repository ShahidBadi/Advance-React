import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const JWT_SECRET=process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET not set in .env file");
  try {
    const body = await req.json();
    console.log("body is:", body);

    const { userEmail, userPassword, userType } = body ??{};

    const user = await prisma.user.findUnique({
      where: { userEmail: userEmail },
    });

    console.log("user fetched", user);

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    if(user.isBlocked){
      return NextResponse.json({ error: "Admin Locked You" }, { status: 403 })
    }

    if (user.userPassword !== userPassword || user.userType.toLowerCase().trim() !== userType.toLowerCase().trim()) {
      console.log("Invalid");
      return NextResponse.json( 
        { error: "invalid password or usertype" },
        { status: 401 }
      );
    }
    const token=jwt.sign({id:user.id,email:user.userEmail},JWT_SECRET,{
      expiresIn:"1h"
    })

    // ✅ Create a NextResponse instance first
    const response = NextResponse.json(
      { message: "login successful", user,token },
      { status: 200 }
    );

    // ✅ Then set the cookie on it
    response.cookies.set("userid", user.id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    

    return response;
  } catch (err) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
}
