import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import prisma from "@/prisma/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function GET(req: NextRequest) {
  try {
    // Extract email from query params
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { error: "Email query parameter is required" },
        { status: 400 }
      );
    }

    // Find designer account by email
    const designerAccount = await prisma.designerAccount.findFirst({
      where: { email },
    });

    if (!designerAccount) {
      return NextResponse.json(
        { error: "Designer account not found" },
        { status: 404 }
      );
    }

    // Retrieve account from Stripe
    const account = await stripe.accounts.retrieve(designerAccount.accountId);

    // Update your DB with Stripe's payouts_enabled value
    await prisma.designerAccount.update({
      where: { email },
      data: {
        payoutsEnabled: account.payouts_enabled,
      },
    });

    // (Optional) you can use `account` data here if needed

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/royal-dashboard`
    );
  } catch (err: unknown) {
    console.error("Error get account:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
