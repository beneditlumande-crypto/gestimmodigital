import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const NOTIFY_TO = "contact.gestimmodigital@gmail.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const phone = String(body?.phone ?? "").trim();
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (
      !name || name.length > 100 ||
      !email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.length > 30 || subject.length > 150 ||
      !message || message.length > 2000
    ) {
      return new Response(JSON.stringify({ error: "Données invalides" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } },
    );

    const { error: dbError } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone || null,
      message: subject ? `[${subject}] ${message}` : message,
    });

    if (dbError) {
      console.error("DB insert failed:", dbError.message);
      return new Response(JSON.stringify({ error: "Enregistrement impossible" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const sentAt = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Africa/Kinshasa",
    }).format(new Date());

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    let emailSent = false;
    if (LOVABLE_API_KEY && RESEND_API_KEY) {
      const html = `
        <h2>Nouveau message — Gestimmo Digital</h2>
        <p><strong>Nom :</strong> ${esc(name)}</p>
        <p><strong>Email :</strong> ${esc(email)}</p>
        <p><strong>Téléphone :</strong> ${esc(phone || "non renseigné")}</p>
        <p><strong>Objet :</strong> ${esc(subject || "non renseigné")}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space:pre-wrap">${esc(message)}</p>
        <hr />
        <p><strong>Date et heure :</strong> ${esc(sentAt)} (Kinshasa)</p>
      `;

      const res = await fetch(`${GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: "Gestimmo Digital <onboarding@resend.dev>",
          to: [NOTIFY_TO],
          reply_to: email,
          subject: `Nouveau message de ${name}${subject ? ` — ${subject}` : ""}`,
          html,
        }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        console.error(`Resend request failed [${res.status}]: ${errorBody}`);
      } else {
        emailSent = true;
      }
    } else {
      console.warn("Resend not configured — message saved without email notification.");
    }

    return new Response(JSON.stringify({ ok: true, emailSent }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Unexpected error:", e);
    return new Response(JSON.stringify({ error: "Erreur interne" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
