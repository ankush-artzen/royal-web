import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { protectAPI } from "@/lib/api-check";

export async function POST(req: NextRequest) {
  try {
    const { errorResponse } = await protectAPI();
    if (errorResponse) return errorResponse;

    const body = await req.json();
    const { designerId, amount, currency, notes } = body;

    if (!designerId || !amount) {
      return NextResponse.json(
        { error: "designerId and amount are required" },
        { status: 400 }
      );
    }

    const designerAccount = await prisma.designerAccount.findFirst({
      where: { royalId: designerId },
    });

    if (!designerAccount) {
      return NextResponse.json(
        { error: "Payout account not setup for this account" },
        { status: 404 }
      );
    }

    if (!designerAccount.payoutsEnabled) {
      return NextResponse.json(
        { error: "Payouts not enabled for this account" },
        { status: 400 }
      );
    }

    const transactionFees = parseFloat((amount * 0.03).toFixed(2));

    const newRequest = await prisma.withdrawRequest.create({
      data: {
        designerId,
        totalAmount: amount,
        fees: transactionFees,
        depositAmount: amount - transactionFees,
        currency: currency || "USD",
        notes,
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

    const withdrawRequest = await prisma.withdrawRequest.findMany({
      where: { designerId },
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
