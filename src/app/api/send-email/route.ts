import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { name, email, message, phone } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 관리자에게 보내는 메일
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[New Inquiry] Message from ${name}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 10px; background-color: #f9f9f9; border-left: 3px solid #007bff;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <br>
        <p style="color: #888;">This message was received via the contact form.</p>
      `,
    });

    // 사용자에게 보내는 확인 메일
    await transporter.sendMail({
      from: `"Skylogix Aviation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `[New Inquiry] Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Hi ${name},</h2>
          <p>Thank you for reaching out to Skylogix Aviation. We have received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <blockquote style="padding: 10px; background-color: #f2f2f2; border-left: 4px solid #007bff;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <p>If you have any urgent questions, feel free to reply to this email or Contact Us +1 (562) 266-6868.</p>
          <p>Best regards,<br><strong>Skylogix Aviation Team</strong></p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "이메일이 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("이메일 전송 오류:", error);
    if (res.status == 504) {
      NextResponse.json({ message: "이메일 전송 실패" }, { status: 504 });
    }
    return NextResponse.json({ message: "이메일 전송 실패" }, { status: 500 });
  }
}
