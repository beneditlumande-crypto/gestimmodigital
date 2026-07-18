export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  type: "Vente" | "Location";
  beds: number;
  baths: number;
  area: string;
  description: string;
};

export const properties: Property[] = [
  {
    id: "villa-gombe-piscine",
    title: "Villa Moderne avec Piscine",
    location: "Gombe, Kinshasa",
    price: "350 000 $",
    type: "Vente",
    beds: 5,
    baths: 3,
    area: "450 m²",
    description:
      "Magnifique villa contemporaine avec piscine, jardin paysager et finitions haut de gamme.",
  },
  {
    id: "appartement-ngaliema-meuble",
    title: "Appartement Meublé 3 Chambres",
    location: "Ngaliema, Kinshasa",
    price: "1 500 $/mois",
    type: "Location",
    beds: 3,
    baths: 2,
    area: "150 m²",
    description:
      "Appartement entièrement meublé avec vue dégagée, parking sécurisé et gardiennage 24h/24.",
  },
  {
    id: "bureau-gombe-commercial",
    title: "Bureau Commercial",
    location: "Gombe, Kinshasa",
    price: "2 800 $/mois",
    type: "Location",
    beds: 0,
    baths: 2,
    area: "200 m²",
    description:
      "Espace commercial moderne avec façade vitrée, idéal pour bureaux ou showroom.",
  },
  {
    id: "duplex-bandalungwa",
    title: "Maison Duplex avec Parking",
    location: "Bandalungwa, Kinshasa",
    price: "180 000 $",
    type: "Vente",
    beds: 4,
    baths: 2,
    area: "280 m²",
    description:
      "Duplex spacieux avec terrasse, garage et quartier résidentiel calme.",
  },
  {
    id: "penthouse-gombe-panoramique",
    title: "Penthouse Vue Panoramique",
    location: "Gombe, Kinshasa",
    price: "4 500 $/mois",
    type: "Location",
    beds: 3,
    baths: 2,
    area: "220 m²",
    description:
      "Penthouse de luxe au dernier étage avec vue panoramique sur la ville.",
  },
  {
    id: "terrain-mont-ngafula",
    title: "Terrain Constructible 800 m²",
    location: "Mont-Ngafula, Kinshasa",
    price: "95 000 $",
    type: "Vente",
    beds: 0,
    baths: 0,
    area: "800 m²",
    description:
      "Terrain viabilisé dans une zone résidentielle en pleine expansion.",
  },
];
