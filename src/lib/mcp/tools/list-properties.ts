import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { properties } from "../data/properties";

export default defineTool({
  name: "list_properties",
  title: "Lister les biens immobiliers",
  description:
    "Retourne les biens immobiliers Gestimmo Digital à Kinshasa (villas, appartements, bureaux, terrains). Filtres optionnels par type (Vente/Location) et par commune.",
  inputSchema: {
    type: z
      .enum(["Vente", "Location"])
      .optional()
      .describe("Filtrer par type: Vente ou Location."),
    location: z
      .string()
      .optional()
      .describe("Filtrer par commune de Kinshasa (ex: Gombe, Ngaliema)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ type, location }) => {
    const loc = location?.toLowerCase();
    const results = properties.filter(
      (p) =>
        (!type || p.type === type) &&
        (!loc || p.location.toLowerCase().includes(loc)),
    );
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
      structuredContent: { properties: results, count: results.length },
    };
  },
});
