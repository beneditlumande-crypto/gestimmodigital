import { createClient } from "https://esm.sh/@supabase/supabase-js@2.58.0";
import { corsHeaders, esc, kinshasaNow, NOTIFY_TO, sendEmail, SIGNATURE } from "../_shared/email.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Non autorisé" }, 401);

    const url = Deno.env.get("SUPABASE_URL")!;
    const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
      auth: { persistSession: false },
    });

    const { data: userData, error: userError } = await admin.auth.getUser(
      authHeader.replace("Bearer ", ""),
    );
    if (userError || !userData?.user) return json({ error: "Non autorisé" }, 401);

    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) return json({ error: "Accès réservé aux administrateurs" }, 403);

    const body = await req.json();
    const id = String(body?.id ?? "").trim();
    const status = String(body?.status ?? "").trim();
    const reason = String(body?.reason ?? "").trim();

    if (!/^[0-9a-f-]{36}$/i.test(id) || !["valide", "refuse"].includes(status) || reason.length > 2000) {
      return json({ error: "Données invalides" }, 400);
    }

    const { data: row, error: readError } = await admin
      .from("consultation_payments")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (readError || !row) return json({ error: "Consultation introuvable" }, 404);

    const { error: updateError } = await admin
      .from("consultation_payments")
      .update({
        payment_status: status,
        comment: reason ? `${row.comment ? row.comment + "\n\n" : ""}[Admin] ${reason}` : row.comment,
      })
      .eq("id", id);
    if (updateError) {
      console.error("Update failed:", updateError.message);
      return json({ error: "Mise à jour impossible" }, 500);
    }

    const dateTime = `${row.appointment_date} à ${row.appointment_time}`;
    const reference = `GD-CONS-${String(row.id).slice(0, 8).toUpperCase()}`;
    const recapHtml = `
      <h3 style="margin-bottom:8px">Récapitulatif du rendez-vous</h3>
      <p><strong>Référence de la transaction :</strong> ${esc(reference)}</p>
      <p><strong>Prestation :</strong> Consultation stratégique (60 minutes)</p>
      <p><strong>Client :</strong> ${esc(row.name)}</p>
      <p><strong>Email :</strong> ${esc(row.email)}</p>
      <p><strong>Téléphone :</strong> ${esc(row.phone || "non renseigné")}</p>
      <p><strong>Date et heure :</strong> ${esc(dateTime)} (heure de Kinshasa)</p>
      <p><strong>Montant :</strong> ${esc(String(row.amount_usd))} USD</p>
      <p><strong>Moyen de paiement :</strong> ${esc(row.payment_method)}</p>
      <p><strong>Numéro payeur :</strong> ${esc(row.payer_number || "non renseigné")}</p>
      <p><strong>Statut du paiement :</strong> Validé</p>
    `;

    const html =
      status === "valide"
        ? `
          <p>Bonjour ${esc(row.name)},</p>
          <p>Votre paiement de ${esc(String(row.amount_usd))} USD a été <strong>vérifié et validé</strong>.</p>
          <p>Votre consultation stratégique (60 minutes) est confirmée pour le <strong>${esc(dateTime)}</strong> (heure de Kinshasa).</p>
          ${reason ? `<p>${esc(reason)}</p>` : ""}
          ${recapHtml}
          <p>Nous vous contacterons peu avant le rendez-vous avec les modalités de connexion ou de rencontre.</p>
          ${SIGNATURE}
        `
        : `
          <p>Bonjour ${esc(row.name)},</p>
          <p>Après vérification, nous n'avons malheureusement pas pu confirmer votre paiement pour la consultation stratégique prévue le <strong>${esc(dateTime)}</strong>.</p>
          ${reason ? `<p><strong>Motif :</strong> ${esc(reason)}</p>` : ""}
          <p>Référence de la transaction : ${esc(reference)}</p>
          <p>Votre rendez-vous n'est donc pas confirmé. Vous pouvez nous répondre à cet e-mail ou nous écrire au +243 82 97 91 356 (WhatsApp) pour régulariser la situation.</p>
          ${SIGNATURE}
        `;

    const sent = await sendEmail({
      to: row.email,
      subject:
        status === "valide"
          ? `Consultation stratégique confirmée (${reference}) – Gestimmo Digital`
          : `Paiement non confirmé (${reference}) – Gestimmo Digital`,
      html,
      replyTo: NOTIFY_TO,
    });

    let adminSent = false;
    if (status === "valide") {
      adminSent = await sendEmail({
        to: NOTIFY_TO,
        subject: `Paiement validé — ${row.name} le ${row.appointment_date} à ${row.appointment_time} (${reference})`,
        html: `
          <h2>Consultation stratégique confirmée</h2>
          <p>Le paiement a été validé le ${esc(kinshasaNow())} (Kinshasa).</p>
          ${recapHtml}
          ${reason ? `<p><strong>Note interne / message envoyé au client :</strong> ${esc(reason)}</p>` : ""}
          <p>Le client a reçu son e-mail de confirmation.</p>
        `,
        replyTo: row.email,
      });
    }

    console.log(`Consultation ${id} -> ${status} le ${kinshasaNow()} (client: ${sent}, agence: ${adminSent})`);
    return json({ ok: true, status, reference, emailSent: sent, adminEmailSent: adminSent });

  } catch (e) {
    console.error("Unexpected error:", e);
    return json({ error: "Erreur interne" }, 500);
  }
});
