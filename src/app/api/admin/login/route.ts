import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { login, password } = await req.json();

  if (
    login === process.env.ADMIN_LOGIN &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_session", process.env.ADMIN_SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 4, // 4 години
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
