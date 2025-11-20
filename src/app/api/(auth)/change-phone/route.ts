import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, oldPhoneNumber, newPhoneNumber } = await req.json();

    console.log(
      "Email:",
      email,
      "Old:",
      oldPhoneNumber,
      "New:",
      newPhoneNumber
    );

    // 1️⃣ Validate input
    if (!email) {
      return NextResponse.json({ error: "Email  required" }, { status: 400 });
    }
    if (!oldPhoneNumber) {
      return NextResponse.json(
        { error: "Old phone number required" },
        { status: 400 }
      );
    }
    if (!newPhoneNumber) {
      return NextResponse.json(
        { error: "new phone number required" },
        { status: 400 }
      );
    }

    // 2️⃣ Validate phone number format
    // This regex allows +countrycode optional, then exactly 10 digits
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if (!phoneRegex.test(newPhoneNumber)) {
      return NextResponse.json(
        { error: "Invalid new phone number format" },
        { status: 400 }
      );
    }

    if (!phoneRegex.test(oldPhoneNumber)) {
      return NextResponse.json(
        { error: "Invalid old phone number format" },
        { status: 400 }
      );
    }

    // Optional normalization (remove spaces/dashes)
    const normalizedOld = oldPhoneNumber.replace(/[\s-]/g, "");
    const normalizedNew = newPhoneNumber.replace(/[\s-]/g, "");

    // 3️⃣ Check if user exists and old number matches
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.phoneNumber.replace(/[\s-]/g, "") !== normalizedOld) {
      return NextResponse.json(
        { error: "Old phone number does not match our records" },
        { status: 401 }
      );
    }

    // 4️⃣ Check if new number already exists
    const existing = await prisma.user.findUnique({
      where: { phoneNumber: normalizedNew },
    });
    if (existing) {
      return NextResponse.json(
        { error: "New phone number already in use" },
        { status: 400 }
      );
    }

    // 5️⃣ Update the phone number
    await prisma.user.update({
      where: { email },
      data: { phoneNumber: normalizedNew },
    });

    // 6️⃣ Notify user by email
    await resend.emails.send({
      from: "support@royalapp.com",
      to: email,
      subject: "Your Royal Phone Number Has Been Changed",
      html: `
        <h1>Phone Number Updated</h1>
        <p>Your phone number has been changed from <strong>${normalizedOld}</strong> to <strong>${normalizedNew}</strong>.</p>
        <p>If this wasn't you, please contact support immediately.</p>
      `,
    });

    // 7️⃣ Respond with success
    return NextResponse.json({
      message: "Phone number updated successfully",
    });
  } catch (err) {
    console.error("Error updating phone number:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
