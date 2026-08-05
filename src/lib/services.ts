export const SERVICE_OPTIONS = [
  "Conseil stratégique",
  "Gestion des Biens Immobiliers",
  "Location et Vente de Biens",
  "Promotion Immobilière",
  "Création de Sites Web",
  "Marketing Digital pour Entreprises",
  "Analyse de Données",
  "Automatisation des Processus",
  "Intelligence Artificielle & Agents IA",
  "Référencement SEO",
  "Intégration de Solutions de Paiement",
  "Intégration d'API",
  "Développement d'Applications Web",
  "Autre",
];

export const BUDGET_OPTIONS = [
  "Moins de 200 USD",
  "200 – 500 USD",
  "500 – 1 000 USD",
  "1 000 – 5 000 USD",
  "Plus de 5 000 USD",
  "À définir",
];

export const TIME_OPTIONS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

export const slugifyService = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
