const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

export const NOTIFY_TO = "contact.gestimmodigital@gmail.com";
export const FROM = "Gestimmo Digital <onboarding@resend.dev>";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const kinshasaNow = () =>
  new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Kinshasa",
  }).format(new Date());

export const SIGNATURE = `
  <p style="margin-top:24px">Cordialement,<br /><strong>Gestimmo Digital</strong><br />
  <span style="color:#555">Immobilier • Marketing Digital • Création de sites web • Automatisation • Analyse de données</span></p>
`;

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<boolean> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    console.warn("Resend not configured — email skipped.");
    return false;
  }

  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: FROM,
      to: [opts.to],
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      subject: opts.subject,
      html: opts.html,
    }),
  });

  if (!res.ok) {
    console.error(`Resend request failed [${res.status}]: ${await res.text()}`);
    return false;
  }
  return true;
}

export function autoReplyHtml(name: string, intro: string) {
  return `
    <p>Bonjour ${esc(name)},</p>
    <p>${intro}</p>
    <p>Nous vous répondrons rapidement.</p>
    ${SIGNATURE}
  `;
}
