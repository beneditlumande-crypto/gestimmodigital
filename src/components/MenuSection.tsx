import dish1 from "@/assets/dish-1.jpg";
import dish2 from "@/assets/dish-2.jpg";
import dish3 from "@/assets/dish-3.jpg";

const menuItems = [
  {
    name: "Liboke ya Mbisi",
    description: "Poisson grillé en feuilles de bananier, plantains et légumes de saison",
    price: "18 500 FC",
    image: dish1,
  },
  {
    name: "Pondu na Fufu",
    description: "Feuilles de manioc longuement mijotées, accompagnées de fufu traditionnel",
    price: "12 000 FC",
    image: dish2,
  },
  {
    name: "Poulet Moambé",
    description: "Poulet grillé aux épices africaines, sauce moambé et légumes grillés",
    price: "22 000 FC",
    image: dish3,
  },
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-24 bg-secondary">
      <div className="container px-4">
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3">Découvrez</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Notre Menu
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mt-6" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="bg-card rounded-lg overflow-hidden border border-border group hover:border-primary/30 transition-colors"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-lg font-bold text-foreground">{item.name}</h3>
                  <span className="text-primary font-body font-bold text-sm">{item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
