import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userFirstName,
      userLastName,
      userName,
      userEmail,
      userPassword,
      userType
    } = body ?? {};

    // Basic validation
    if (!userFirstName || !userLastName || !userName || !userEmail || !userPassword || !userType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Normalize userType to match Prisma enum values
    // const normalizedType = String(userType).trim();
    // if (!["Admin", "Student"].includes(normalizedType)) {
    //   return NextResponse.json({ error: "Invalid userType. Must be 'Admin' or 'Student'." }, { status: 400 });
    // }

    // Check existing email
    const existingByEmail = await prisma.user.findUnique({ where: { userEmail } });
    if (existingByEmail) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    // Check existing username
    const existingByUserName = await prisma.user.findUnique({ where: { userName } });
    if (existingByUserName) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
    }

    // Hash password
    // const hashed = await bcrypt.hash(userPassword, 10);

    // Create user (select returned fields to avoid sending password)
    const newUser = await prisma.user.create({
      data: {
        userFirstName,
        userLastName,
        userName,
        userEmail,
        userPassword,
        userType
      },
      select: {
        id: true,
        userFirstName: true,
        userLastName: true,
        userName: true,
        userEmail: true,
        userType: true,
        membershipDate: true,
        createdAt: true
      }
    });

    return NextResponse.json({ message: "User registered successfully", user: newUser }, { status: 201 });

  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    // optional: don't call prisma.$disconnect() per request in serverless environments
  }
}
