import type { APIRoute } from "astro";
import { createClient } from "@sanity/client";

export const POST: APIRoute = async ({ request }) => {
  const writeToken = import.meta.env.SANITY_WRITE_TOKEN;
  if (!writeToken) {
    return new Response(JSON.stringify({ error: "Write token not configured." }), { status: 500 });
  }

  const client = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    token: writeToken,
    useCdn: false,
  });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON." }), { status: 400 });
  }

  const { type, ...fields } = body as Record<string, unknown>;
  if (type !== "intern" && type !== "partner") {
    return new Response(JSON.stringify({ error: "Invalid type." }), { status: 400 });
  }

  try {
    await client.create({ _type: "application", type, submittedAt: new Date().toISOString(), ...fields });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
