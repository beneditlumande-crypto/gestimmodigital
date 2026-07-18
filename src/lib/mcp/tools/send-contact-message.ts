import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

export default defineTool({
  name: "send_contact_message",
  title: "Envoyer un message de contact",
  description:
    "Envoie un message via le formulaire de contact Gestimmo Digital. Les messages reçus ne sont PAS lisibles via MCP.",
  inputSchema: {
    name: z.string().trim().min(1).max(100).describe("Nom complet de la personne."),
    email: z.string().trim().email().max(255).describe("Adresse email de contact."),
    phone: z.string().trim().max(30).optional().describe("Téléphone (optionnel)."),
    message: z.string().trim().min(1).max(2000).describe("Contenu du message."),
  },
  annotations: { readOnlyHint: false, openWorldHint: false },
  handler: async ({ name, email, phone, message }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      return {
        content: [{ type: "text", text: "Backend non configuré." }],
        isError: true,
      };
    }
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: phone ?? null,
      message,
    });
    if (error) {
      return {
        content: [{ type: "text", text: `Erreur: ${error.message}` }],
        isError: true,
      };
    }
    return {
      content: [
        {
          type: "text",
          text: "Message envoyé avec succès. L'équipe Gestimmo Digital vous répondra rapidement.",
        },
      ],
      structuredContent: { ok: true },
    };
  },
});
