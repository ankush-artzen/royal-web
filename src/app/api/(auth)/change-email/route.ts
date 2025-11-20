import prisma from '@/prisma/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { royalId, password, newEmail } = await req.json();
    if (!royalId) {
      return NextResponse.json({ error: 'royalId is required' }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: 'password is required' }, { status: 400 });
    }
    if (!newEmail) {
      return NextResponse.json({ error: 'email are required' }, { status: 400 });
    }
    // ✅ Fetch user by royalId
    const user = await prisma.user.findUnique({ where: { royalId } });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // ✅ Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return NextResponse.json({ error: 'Password is incorrect' }, { status: 401 });

    // ✅ Check if new email is already taken
    const existing = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });

    // ✅ Update email using royalId
    const updatedUser = await prisma.user.update({ 
      where: { royalId }, 
      data: { email: newEmail } 
    });

    // ✅ Notify old email
    await resend.emails.send({
      from: 'support@royalapp.com',
      to: user.email,
      subject: 'Your Royal Email Has Been Changed',
      html: `<h1>Email Changed</h1><p>Your Royal email has been updated to ${newEmail}.</p>`,
    });

    return NextResponse.json({ 
      message: 'Email updated and notification sent',
      newEmail: updatedUser.email 
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
