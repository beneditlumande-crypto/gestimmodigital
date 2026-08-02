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
    const company = s(body?.company);
    const service = s(body?.service);
    const budget = s(body?.budget);
    const description = s(body?.description);
    const desiredDate = s(body?.desiredDate);

    if (
      !name || name.length > 100 ||
      !email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.length > 30 || company.length > 150 ||
      !service || service.length > 150 || budget.length > 100 ||
      !description || description.length > 3000
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

    const { error: dbError } = await supabase.from("quote_requests").insert({
      name,
      email,
      phone: phone || null,
      company: company || null,
      service,
      budget: budget || null,
      description,
      desired_date: desiredDate || null,
    });

    if (dbError) {
      console.error("DB insert failed:", dbError.message);
      return new Response(JSON.stringify({ error: "Enregistrement impossible" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminHtml = `
      <h2>Nouvelle demande de devis — Gestimmo Digital</h2>
      <p><strong>Nom :</strong> ${esc(name)}</p>
      <p><strong>Email :</strong> ${esc(email)}</p>
      <p><strong>Téléphone :</strong> ${esc(phone || "non renseigné")}</p>
      <p><strong>Entreprise :</strong> ${esc(company || "non renseignée")}</p>
      <p><strong>Service souhaité :</strong> ${esc(service)}</p>
      <p><strong>Budget estimé :</strong> ${esc(budget || "non renseigné")}</p>
      <p><strong>Date souhaitée :</strong> ${esc(desiredDate || "non renseignée")}</p>
      <p><strong>Description du projet :</strong></p>
      <p style="white-space:pre-wrap">${esc(description)}</p>
      <hr />
      <p><strong>Reçue le :</strong> ${esc(kinshasaNow())} (Kinshasa)</p>
    `;

    const notified = await sendEmail({
      to: NOTIFY_TO,
      subject: `Nouvelle demande de devis — ${name} (${service})`,
      html: adminHtml,
      replyTo: email,
    });

    const replied = await sendEmail({
      to: email,
      subject: "Merci pour votre demande de devis – Gestimmo Digital",
      html: autoReplyHtml(
        name,
        "Merci pour votre demande de devis. Nous avons bien reçu votre demande et notre équipe l'étudiera dans les plus brefs délais.",
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
