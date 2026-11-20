export const prerender = false;

import type { APIRoute } from "astro";
import { Resend } from "resend";
import { saveOTP } from "../../lib/otp-store";

export const POST: APIRoute = async ({ request }) => {
  const { email } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return new Response(JSON.stringify({ error: "invalid_email" }), { status: 400 });
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  saveOTP(email, code);

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "no_api_key" }), { status: 500 });
  }

  const resend = new Resend(apiKey);
  const from = import.meta.env.FROM_EMAIL ?? "IMHPR <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "Your IMHPR verification code",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;">
        <p style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#888;margin-bottom:24px;">
          International Movement for Human and Peoples' Rights
        </p>
        <h1 style="font-size:28px;font-weight:900;letter-spacing:-0.03em;color:#111;margin:0 0 8px;">
          Verification Code
        </h1>
        <p style="font-size:14px;color:#555;margin:0 0 32px;">
          Use the code below to verify your email address. It expires in 10 minutes.
        </p>
        <div style="border:1px solid #e5e7eb;padding:24px;text-align:center;margin-bottom:32px;">
          <span style="font-size:36px;font-weight:900;letter-spacing:0.2em;color:#111;">${code}</span>
        </div>
        <p style="font-size:12px;color:#aaa;">
          If you did not request this code, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error: "send_failed" }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
