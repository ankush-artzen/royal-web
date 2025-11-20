import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import { getResetEmailTemplate } from "@/utils/resetEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // ✅ Check user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "No user found with this email" },
        { status: 404 }
      );
    }

    // ✅ Generate reset token (valid 15 mins)
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    // ✅ Generate reset link
    const resetLink = `${process.env.NEXT_PUBLIC_API_URL}/reset-password?token=${resetToken}`;

    // ✅ Send reset email
    await resend.emails.send({
      from: `Royal Portal <${process.env.RESEND_EMAIL}>`,
      to: email,
      subject: "Reset Your Royal Portal Password",
      html: getResetEmailTemplate(resetLink, new Date().getFullYear()),
    });

    return NextResponse.json({
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.error("Reset Password API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
