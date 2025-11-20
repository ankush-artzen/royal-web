import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, royalId, oldPassword, newPassword } = await req.json();

    // ✅ Validate missing fields separately
    if (!royalId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    if (!oldPassword) {
      return NextResponse.json(
        { error: "Old password is required" },
        { status: 400 }
      );
    }
    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required" },
        { status: 400 }
      );
    }

    console.log("email:", royalId);

    // ✅ Check if user exists
    const user = await prisma.user.findUnique({ where: { royalId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 401 }
      );
    }

    // ✅ Prevent using the same password again
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return NextResponse.json(
        { error: "New password cannot be the same as old password" },
        { status: 400 }
      );
    }

    // ✅ Check password length (must be at least 8 characters)
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    // ✅ Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { royalId },
      data: { password: hashedPassword },
    });

    // ✅ Send email notification
    await resend.emails.send({
      from: "support@royalapp.com",
      to: email,
      subject: "Your Royal Password Has Been Changed",
      html: `
        <h1>Password Changed</h1>
        <p>Hello ${email},</p>
        <p>Your password has been successfully updated. If you did not request this change, please contact our support immediately.</p>
      `,
    });

    return NextResponse.json({ message: "Password updated and email sent" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
