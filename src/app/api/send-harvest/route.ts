import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, body } = await req.json();

    if (!to || !subject || !body) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "heath@coastalcontractorsofnwfl.com",
        pass: "nfskztfmmmmjleqp",
      },
    });

    await transporter.sendMail({
      from: "Sugar Sands Harvest Log <carla@coastalcontractorsofnwfl.com>",
      to,
      subject,
      text: body,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Harvest email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
