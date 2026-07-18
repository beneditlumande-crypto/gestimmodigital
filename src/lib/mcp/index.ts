import { defineMcp } from "@lovable.dev/mcp-js";
import listPropertiesTool from "./tools/list-properties";
import getPropertyTool from "./tools/get-property";
import getAgencyInfoTool from "./tools/get-agency-info";
import sendContactMessageTool from "./tools/send-contact-message";

export default defineMcp({
  name: "gestimmo-digital-mcp",
  title: "Gestimmo Digital MCP",
  version: "0.1.0",
  instructions:
    "Outils publics de Gestimmo Digital, agence immobilière et marketing digital à Kinshasa. Utilisez `list_properties` et `get_property` pour explorer le catalogue de biens, `get_agency_info` pour les coordonnées et services, et `send_contact_message` pour transmettre une demande via le formulaire de contact.",
  tools: [
    listPropertiesTool,
    getPropertyTool,
    getAgencyInfoTool,
    sendContactMessageTool,
  ],
});
