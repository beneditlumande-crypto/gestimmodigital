import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import {
  corsHeaders,
  esc,
  kinshasaNow,
  NOTIFY_TO,
  sendEmail,
  autoReplyHtml,
} from "../_shared/email.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const s = (v: unknown) => String(v ?? "").trim();
    const name = s(body?.name);
    const email = s(body?.email);
    const phone = s(body?.phone);
    const service = s(body?.service);
    const date = s(body?.date);
    const time = s(body?.time);
    const comment = s(body?.comment);

    if (
      !name || name.length > 100 ||
      !email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.length > 30 ||
      !service || service.length > 150 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !time || time.length > 20 ||
      comment.length > 2000
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

    const { error: dbError } = await supabase.from("appointments").insert({
      name,
      email,
      phone: phone || null,
      service,
      appointment_date: date,
      appointment_time: time,
      comment: comment || null,
    });

    if (dbError) {
      console.error("DB insert failed:", dbError.message);
      return new Response(JSON.stringify({ error: "Enregistrement impossible" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminHtml = `
      <h2>Nouvelle demande de rendez-vous — Gestimmo Digital</h2>
      <p><strong>Nom :</strong> ${esc(name)}</p>
      <p><strong>Email :</strong> ${esc(email)}</p>
      <p><strong>Téléphone :</strong> ${esc(phone || "non renseigné")}</p>
      <p><strong>Service :</strong> ${esc(service)}</p>
      <p><strong>Date :</strong> ${esc(date)}</p>
      <p><strong>Heure :</strong> ${esc(time)}</p>
      <p><strong>Commentaire :</strong></p>
      <p style="white-space:pre-wrap">${esc(comment || "aucun")}</p>
      <hr />
      <p><strong>Reçue le :</strong> ${esc(kinshasaNow())} (Kinshasa)</p>
    `;

    const notified = await sendEmail({
      to: NOTIFY_TO,
      subject: `Nouveau rendez-vous — ${name} le ${date} à ${time}`,
      html: adminHtml,
      replyTo: email,
    });

    const replied = await sendEmail({
      to: email,
      subject: "Confirmation de votre demande de rendez-vous – Gestimmo Digital",
      html: autoReplyHtml(
        name,
        `Nous avons bien reçu votre demande de rendez-vous du <strong>${esc(date)}</strong> à <strong>${esc(time)}</strong> concernant : <strong>${esc(service)}</strong>. Notre équipe confirmera ce créneau dans les plus brefs délais.`,
      ),
    });

    return new Response(JSON.stringify({ ok: true, notified, replied }), {
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
