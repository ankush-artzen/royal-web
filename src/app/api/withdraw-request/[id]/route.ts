import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: designerId } = await context.params;

    console.log(designerId, "params***8888888");

    if (!designerId) {
      return NextResponse.json(
        { error: "designerId are required" },
        { status: 400 }
      );
    }

    // ✅ Aggregate sum directly in database
    const result = await prisma.withdrawRequest.aggregate({
      where: {
        designerId,
        NOT: {
          status: "REJECTED",
        },
      },
      _sum: {
        totalAmount: true,
      },
    });

    const totalAmount = result._sum.totalAmount || 0;

    return NextResponse.json({ designerId, totalAmount }, { status: 200 });
  } catch (error) {
    console.error("❌ Error creating withdraw request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
