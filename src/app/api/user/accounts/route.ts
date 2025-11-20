import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/prisma/prisma";
import { splitNameFromEmail } from "@/utils/helper";
import { protectAPI } from "@/lib/api-check";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
  try {
    const { errorResponse } = await protectAPI();

    if (errorResponse) return errorResponse;

    const { royalId, email, country, currency } = await req.json();

    if (!email || !royalId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.designerAccount.findUnique({
      where: { email },
    });

    if (existing)
      return NextResponse.json(
        { error: "Account already exists" },
        { status: 409 }
      );

    const account = await stripe.accounts.create({
      type: "express",
      country: country || "CA", // Canada
      email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    console.log("Error account payment:", account);

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_API_URL}/onboarding-failed`,
      return_url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/accounts/onboarding-success?success=true&email=${email}`,
      type: "account_onboarding",
    });

    const name = splitNameFromEmail(email) || "";

    await prisma.designerAccount.create({
      data: {
        name,
        email,
        royalId: royalId,
        accountId: account.id,
        country,
        currency,
      },
    });

    return NextResponse.json({
      accountId: account.id,
      onboardingUrl: accountLink.url,
    });
  } catch (err: unknown) {
    console.error("Error account payment:", err);
    const errorMessage = err instanceof Error ? err.message : "Stripe account creation failed" ;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { accountId, email } = await req.json();

    console.log("Error account payment:");

    const account = await stripe.accounts.retrieve(accountId);

    if (account?.payouts_enabled) {
      // Update your DB with Stripe's payouts_enabled value
      await prisma.designerAccount.update({
        where: { email },
        data: {
          payoutsEnabled: account.payouts_enabled,
        },
      });

      return NextResponse.json({
        accountId,
        payouts_enabled: true,
      });
    }

    // Create onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_API_URL}/onboarding-failed`,
      return_url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/accounts/onboarding-success?success=true&email=${email}`,
      type: "account_onboarding",
    });

    return NextResponse.json({
      accountId,
      onboardingUrl: accountLink.url,
    });
  } catch (err: unknown) {
    console.error("Error account payment:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const designerId = req.nextUrl.searchParams.get("designerId");

    if (!designerId) {
      return NextResponse.json(
        { error: "Missing designer id" },
        { status: 400 }
      );
    }

    const designerAccount = await prisma.designerAccount.findFirst({
      where: { royalId: designerId },
    });

    return NextResponse.json({
      account: designerAccount,
    });
  } catch (err: unknown) {
    console.error("Error get account:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
