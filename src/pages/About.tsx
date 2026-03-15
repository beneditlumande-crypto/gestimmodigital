import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/hero-realestate.jpg";
import { Target, Eye, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-xs mb-2">Qui sommes-nous</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              À Propos de Gestimmo Digital
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto mb-20">
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={heroImg}
                alt="Équipe Gestimmo Digital"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Votre partenaire de confiance
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Gestimmo Digital est une agence basée à Kinshasa qui allie expertise immobilière et 
                compétences en marketing digital. Fondée par des professionnels passionnés, notre 
                agence accompagne particuliers et entreprises dans leurs projets immobiliers et digitaux.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Notre approche unique combine la connaissance approfondie du marché immobilier congolais 
                avec les dernières stratégies du marketing digital, offrant ainsi à nos clients un 
                accompagnement complet et des résultats concrets.
              </p>
              <div className="flex gap-10">
                <div>
                  <p className="text-3xl font-display font-bold text-primary">5+</p>
                  <p className="text-muted-foreground text-sm">Années d'expérience</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-primary">200+</p>
                  <p className="text-muted-foreground text-sm">Biens gérés</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-primary">150+</p>
                  <p className="text-muted-foreground text-sm">Clients satisfaits</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Target size={28} className="text-accent-foreground" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-3">Notre Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Offrir des solutions immobilières et digitales de qualité, accessibles et adaptées 
                au marché congolais.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Eye size={28} className="text-accent-foreground" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-3">Notre Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Devenir la référence en matière d'immobilier et de transformation digitale 
                en République Démocratique du Congo.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Award size={28} className="text-accent-foreground" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-3">Nos Valeurs</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Transparence, professionnalisme, innovation et engagement envers la satisfaction 
                de nos clients.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
