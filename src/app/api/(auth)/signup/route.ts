import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { generateRoyalId } from "@/utils/helper";
import { getWelcomeEmailTemplate } from "@/utils/welcomeEmailTemplate";

const JWT_SECRET = process.env.JWT_SECRET || "royal_jwt-secret-key";
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    console.log("[SIGNUP] ➤ Incoming signup request");

    const { email, phoneNumber, password } = await req.json();
    console.log("[SIGNUP] Received data:", { email, phoneNumber });

    // check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phoneNumber }],
      },
    });
    console.log("[SIGNUP] Existing user check:", !!existingUser);

    if (existingUser) {
      if (existingUser.email === email) {
        console.log("[SIGNUP] Email already exists:", email);
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 }
        );
      }

      if (existingUser.phoneNumber === phoneNumber) {
        console.log("[SIGNUP] Phone number already exists:", phoneNumber);
        return NextResponse.json(
          { error: "User with this phone number already exists" },
          { status: 400 }
        );
      }
    }

    // hash password
    console.log("[SIGNUP] Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[SIGNUP] Password hashed successfully");

    // generate unique Royal ID
    let royalId = generateRoyalId();
    console.log("[SIGNUP] Generated Royal ID:", royalId);

    // ensure uniqueness in DB
    while (await prisma.user.findUnique({ where: { royalId } })) {
      console.log("[SIGNUP] Duplicate Royal ID found, regenerating...");
      royalId = generateRoyalId();
    }

    // create user
    console.log("[SIGNUP] Creating user in database...");
    const user = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        password: hashedPassword,
        royalId,
      },
    });
    console.log("[SIGNUP] User created successfully:", {
      royalId: user.royalId,
      email: user.email,
    });

    // send welcome email using Resend
    try {
      const response = await resend.emails.send({
        from: `Royal Portal <${process.env.RESEND_EMAIL}>`,
        to: email,
        subject: "Welcome to Royal Portal 👑",
        html: getWelcomeEmailTemplate(email, royalId, new Date().getFullYear()),
      });
      console.log(
        "[SIGNUP] Resend response:",
        JSON.stringify(response, null, 2)
      );

      if (response.error) {
        console.error("[SIGNUP] ❌ Resend error:", response.error);
      } else {
        console.log("[SIGNUP] ✅ Welcome email sent successfully");
      }
    } catch (emailError: unknown) {
      console.error(
        "[SIGNUP] ❌ Email sending failed:",
        emailError instanceof Error ? emailError.message : emailError
      );
    }

    // generate JWT token
    console.log("[SIGNUP] JWT token generated successfully");

    const token = jwt.sign(
      { id: user.id, email: user.email, royalId: user?.royalId },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("[SIGNUP] Signup completed successfully ✅");
    return NextResponse.json({
      token,
      user: { id: user.royalId, email: user.email, royalId: user?.royalId },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    console.error("[SIGNUP] ❌ Error occurred:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
