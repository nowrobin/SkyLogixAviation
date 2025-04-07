import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests are allowed" });
  }

  const { name, email, message, phone } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
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

  try {
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
    return res
      .status(200)
      .json({ message: "이메일이 성공적으로 전송되었습니다." });
  } catch (error: unknown) {
    console.error("이메일 전송 오류:", error);
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("알 수 없는 에러", error);
    }
    return res.status(500).json({ message: "이메일 전송 실패" });
  }
}
