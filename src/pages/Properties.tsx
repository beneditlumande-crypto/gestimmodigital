import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const properties = [
  {
    title: "Villa Moderne avec Piscine",
    location: "Gombe, Kinshasa",
    price: "350 000 $",
    type: "Vente",
    beds: 5,
    baths: 3,
    area: "450 m²",
    description: "Magnifique villa contemporaine avec piscine, jardin paysager et finitions haut de gamme.",
    image: property1,
  },
  {
    title: "Appartement Meublé 3 Chambres",
    location: "Ngaliema, Kinshasa",
    price: "1 500 $/mois",
    type: "Location",
    beds: 3,
    baths: 2,
    area: "150 m²",
    description: "Appartement entièrement meublé avec vue dégagée, parking sécurisé et gardiennage 24h/24.",
    image: property2,
  },
  {
    title: "Bureau Commercial",
    location: "Gombe, Kinshasa",
    price: "2 800 $/mois",
    type: "Location",
    beds: 0,
    baths: 2,
    area: "200 m²",
    description: "Espace commercial moderne avec façade vitrée, idéal pour bureaux ou showroom.",
    image: property3,
  },
  {
    title: "Maison Duplex avec Parking",
    location: "Bandalungwa, Kinshasa",
    price: "180 000 $",
    type: "Vente",
    beds: 4,
    baths: 2,
    area: "280 m²",
    description: "Duplex spacieux avec terrasse, garage et quartier résidentiel calme.",
    image: property4,
  },
  {
    title: "Penthouse Vue Panoramique",
    location: "Gombe, Kinshasa",
    price: "4 500 $/mois",
    type: "Location",
    beds: 3,
    baths: 2,
    area: "220 m²",
    description: "Penthouse de luxe au dernier étage avec vue panoramique sur la ville.",
    image: property5,
  },
  {
    title: "Terrain Constructible 800 m²",
    location: "Mont-Ngafula, Kinshasa",
    price: "95 000 $",
    type: "Vente",
    beds: 0,
    baths: 0,
    area: "800 m²",
    description: "Terrain viabilisé dans une zone résidentielle en pleine expansion.",
    image: property6,
  },
];

const Properties = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Immobilier</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Nos Biens Disponibles
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {properties.map((p) => (
              <div
                key={p.title}
                className="bg-card rounded-xl overflow-hidden border border-border group hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    {p.type}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-display font-semibold text-foreground mb-1">{p.title}</h2>
                  <p className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                    <MapPin size={14} /> {p.location}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3">{p.description}</p>
                  {(p.beds > 0 || p.area) && (
                    <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                      {p.beds > 0 && <span>{p.beds} Ch.</span>}
                      {p.baths > 0 && <span>{p.baths} SdB</span>}
                      <span>{p.area}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-primary font-bold text-lg">{p.price}</span>
                    <Link
                      to="/contact"
                      className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Contacter
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Properties;
