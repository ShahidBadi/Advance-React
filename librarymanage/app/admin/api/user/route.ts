import { PrismaClient } from "@/app/generated/prisma";

const prisma=new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();
       const user = await prisma.user.create({ 
      data: {
        userFirstName: data.userFirstName,
        userLastName: data.userLastName,
        userName: data.userName,
        userEmail: data.userEmail,
        userPassword: data.userPassword,
        userType: data.userType,
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (err: any) {
    console.error("API Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
