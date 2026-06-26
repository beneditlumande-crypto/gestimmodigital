import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    title: "Villa Moderne avec Piscine",
    location: "Gombe, Kinshasa",
    price: "350 000 $",
    type: "Vente",
    image: property1,
  },
  {
    title: "Appartement Meublé 3 Chambres",
    location: "Ngaliema, Kinshasa",
    price: "1 500 $/mois",
    type: "Location",
    image: property2,
  },
  {
    title: "Bureau Commercial",
    location: "Gombe, Kinshasa",
    price: "2 800 $/mois",
    type: "Location",
    image: property3,
  },
];

const PropertiesPreview = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Immobilier</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Biens en Vedette
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {properties.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="bg-card rounded-xl overflow-hidden border border-border group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {p.type}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin size={14} /> {p.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-lg">{p.price}</span>
                    <Link
                      to="/contact"
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Contacter
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/biens"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
          >
            Voir tous les biens <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertiesPreview;
