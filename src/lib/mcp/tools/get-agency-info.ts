import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_agency_info",
  title: "Informations sur l'agence",
  description:
    "Retourne les informations générales sur Gestimmo Digital : services, coordonnées, zone d'activité.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      nom: "Gestimmo Digital",
      responsable: "Benedit",
      ville: "Kinshasa, République Démocratique du Congo",
      email: "beneditlumande@gmail.com",
      whatsapp: "+243 82 97 91 356",
      services: [
        "Vente et location de biens immobiliers à Kinshasa",
        "Gestion locative",
        "Marketing digital (réseaux sociaux, Facebook & Google Ads)",
        "Branding et acquisition de clients",
      ],
      site: "https://gestimmodigital.lovable.app",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
