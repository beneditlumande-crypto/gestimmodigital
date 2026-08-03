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
    const date = s(body?.date);
    const time = s(body?.time);
    const payerNumber = s(body?.payerNumber);
    const proofPath = s(body?.proofPath);
    const comment = s(body?.comment);

    if (
      !name || name.length > 100 ||
      !email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      phone.length > 30 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !time || time.length > 20 ||
      !payerNumber || payerNumber.length > 30 ||
      !proofPath || proofPath.length > 300 ||
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

    const { error: dbError } = await supabase.from("consultation_payments").insert({
      name,
      email,
      phone: phone || null,
      appointment_date: date,
      appointment_time: time,
      amount_usd: 50,
      payment_method: "M-Pesa",
      payer_number: payerNumber,
      proof_path: proofPath,
      comment: comment || null,
      payment_status: "en_attente",
    });

    if (dbError) {
      console.error("DB insert failed:", dbError.message);
      return new Response(JSON.stringify({ error: "Enregistrement impossible" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let proofLink = "non disponible";
    const { data: signed } = await supabase.storage
      .from("payment-proofs")
      .createSignedUrl(proofPath, 60 * 60 * 24 * 7);
    if (signed?.signedUrl) proofLink = signed.signedUrl;

    const adminHtml = `
      <h2>Nouvelle consultation stratégique (60 min) — paiement à vérifier</h2>
      <p><strong>Nom :</strong> ${esc(name)}</p>
      <p><strong>Email :</strong> ${esc(email)}</p>
      <p><strong>Téléphone :</strong> ${esc(phone || "non renseigné")}</p>
      <p><strong>Date :</strong> ${esc(date)}</p>
      <p><strong>Heure :</strong> ${esc(time)}</p>
      <p><strong>Montant :</strong> 50 USD</p>
      <p><strong>Moyen de paiement :</strong> M-Pesa</p>
      <p><strong>Numéro utilisé :</strong> ${esc(payerNumber)}</p>
      <p><strong>Preuve de paiement :</strong> <a href="${esc(proofLink)}">Ouvrir la preuve</a> (lien valable 7 jours)</p>
      <p><strong>Commentaire :</strong></p>
      <p style="white-space:pre-wrap">${esc(comment || "aucun")}</p>
      <hr />
      <p><strong>Statut :</strong> En attente de validation manuelle</p>
      <p><strong>Reçue le :</strong> ${esc(kinshasaNow())} (Kinshasa)</p>
    `;

    const notified = await sendEmail({
      to: NOTIFY_TO,
      subject: `Consultation stratégique — ${name} le ${date} à ${time} (paiement à vérifier)`,
      html: adminHtml,
      replyTo: email,
    });

    const replied = await sendEmail({
      to: email,
      subject: "Demande de consultation stratégique reçue – Gestimmo Digital",
      html: autoReplyHtml(
        name,
        "Nous avons bien reçu votre demande de consultation ainsi que votre preuve de paiement. Notre équipe vérifiera votre paiement et vous recevrez un e-mail de confirmation dès que votre rendez-vous sera validé.",
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
