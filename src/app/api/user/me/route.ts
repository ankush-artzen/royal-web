import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(req: Request) {
  try {
    // For simplicity, assume email is passed as a query param (you can later replace with auth/session)
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "No user specified" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id },
      select: { royalId: true, email: true, phoneNumber: true },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
