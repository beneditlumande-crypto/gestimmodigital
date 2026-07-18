import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { properties } from "../data/properties";

export default defineTool({
  name: "get_property",
  title: "Détails d'un bien",
  description: "Retourne les détails complets d'un bien immobilier par son id.",
  inputSchema: {
    id: z.string().min(1).describe("Identifiant du bien (ex: villa-gombe-piscine)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id }) => {
    const found = properties.find((p) => p.id === id);
    if (!found) {
      return {
        content: [{ type: "text", text: `Aucun bien trouvé pour l'id "${id}".` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(found, null, 2) }],
      structuredContent: { property: found },
    };
  },
});
