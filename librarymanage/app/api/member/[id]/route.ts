import { PrismaClient } from "@/app/generated/prisma";

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
