import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { message: "Logout successful" },
    { status: 200 }
  );

  // Remove the cookie
  response.cookies.set("userid", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0, // instantly expire
  });

  return response;
}
