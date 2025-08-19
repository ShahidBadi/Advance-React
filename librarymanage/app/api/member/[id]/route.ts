import { PrismaClient } from "@/app/generated/prisma";
import { NextResponse } from "next/server";

const prisma=new PrismaClient();
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    await prisma.user.delete({
      where: { id: params.id },
    });

    return new Response(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error deleting User" }), {
      status: 500,
    });
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id: memberId } = params; // ✅ No await needed

  try {
    const body = await req.json();
    const {
      userFirstName,
      userLastName,
      userName,
      userEmail,
      userPassword,
      userType,
    } = body;

    // Validate required fields
    if (!userFirstName || !userLastName || !userName || !userEmail || !userType) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Update member
    const updatedMember = await prisma.user.update({
      where: { id: memberId },
      data: {
        userFirstName,
        userLastName,
        userName,
        userEmail,
        ...(userPassword && { userPassword }), // only update password if provided
        userType,
      },
    });

    return NextResponse.json({
      message: "Member updated successfully",
      member: updatedMember,
    });
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 }
    );
  }
}
