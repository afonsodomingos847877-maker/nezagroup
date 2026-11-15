import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactMessage, getMessages, writeCmsFile } from "@/lib/cms";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "local";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const {
      fullName,
      company,
      email,
      phone,
      country,
      subject,
      service,
      message,
      honeypot,
    } = body;

    // Anti-spam honeypot check
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    // Strict validation
    if (
      !fullName ||
      !email ||
      !subject ||
      !message ||
      String(fullName).trim().length < 2 ||
      String(message).trim().length < 10
    ) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email))) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    let emailSent = false;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"NEZA GROUP Website" <${smtpUser}>`,
        to: process.env.CONTACT_TO_EMAIL || "adolfo@neza.co.mz",
        replyTo: String(email),
        subject: `[NEZA Website] ${String(subject).trim()}`,
        text: [
          `Nome / Name: ${fullName}`,
          `Empresa / Company: ${company || "-"}`,
          `Email: ${email}`,
          `Telefone / Phone: ${phone || "-"}`,
          `País / Country: ${country || "-"}`,
          `Serviço / Service: ${service || "-"}`,
          ``,
          `Mensagem / Message:`,
          `${message}`,
        ].join("\n"),
      });
      emailSent = true;
    }

    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: String(fullName).trim(),
      company: String(company || "").trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      country: String(country || "").trim(),
      subject: String(subject).trim(),
      service: String(service || "").trim(),
      message: String(message).trim(),
      emailSent,
    };

    const existing = await getMessages();
    await writeCmsFile("messages.json", [newMsg, ...existing]);

    return NextResponse.json({
      ok: true,
      id: newMsg.id,
      emailSent,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error while processing request." },
      { status: 500 }
    );
  }
}

