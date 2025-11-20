import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { designerId, type, message } = body;

    if (!designerId) {
      return NextResponse.json(
        { error: "designerId are required" },
        { status: 400 }
      );
    }

    const newRequest = await prisma.notification.create({
      data: {
        designerId,
        type,
        message,
        shop: "",
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating withdraw request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { designerId, notificationId } = body;

    if (!notificationId) {
      return NextResponse.json(
        { error: "notificationId are required" },
        { status: 400 }
      );
    }

    const newRequest = await prisma.notification.update({
      where: { id: notificationId },
      data: {
        designerId,
        isRead: true,
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("❌ Error creating withdraw request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const designerId = searchParams.get("designerId");

    if (!designerId) {
      return NextResponse.json(
        { error: "designerId and amount are required" },
        { status: 400 }
      );
    }

    const withdrawRequest = await prisma.notification.findMany({
      where: { designerId, isRead: false },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json(withdrawRequest, { status: 200 });
  } catch (error) {
    console.error("❌ Error creating withdraw request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
