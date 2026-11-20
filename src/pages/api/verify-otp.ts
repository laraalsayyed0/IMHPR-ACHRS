export const prerender = false;

import type { APIRoute } from "astro";
import { verifyOTP } from "../../lib/otp-store";

export const POST: APIRoute = async ({ request }) => {
  const { email, code } = await request.json();

  if (!email || !code) {
    return new Response(JSON.stringify({ error: "missing_fields" }), { status: 400 });
  }

  const result = verifyOTP(email, code);
  if (result === "ok") {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  const messages: Record<string, string> = {
    invalid:  "Incorrect code. Please try again.",
    expired:  "Code has expired. Please request a new one.",
    too_many: "Too many attempts. Please request a new code.",
  };

  return new Response(JSON.stringify({ error: result, message: messages[result] }), { status: 400 });
};
