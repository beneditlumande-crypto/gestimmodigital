import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logoAsset from "@/assets/gestimmo-logo.jpg.asset.json";
import { SERVICE_OPTIONS, slugifyService } from "@/lib/services";

const Footer = () => (
  <footer className="bg-dark text-dark-foreground py-16">
    <div className="container px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <img
              src={logoAsset.url}
              alt="Gestimmo Digital"
              width={40}
              height={40}
              className="h-12 w-12 shrink-0 rounded-full object-contain bg-white p-0.5"
            />
            <h3 className="font-display text-xl font-bold">
              Gestimmo <span className="text-primary">Digital</span>
            </h3>
          </div>
          <p className="text-xs opacity-60 mb-4">Benedit</p>
          <p className="text-sm opacity-70 leading-relaxed">
            Votre partenaire de confiance en immobilier et marketing digital à Kinshasa.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Navigation</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="/biens" className="hover:text-primary transition-colors">Biens</Link>
            <Link to="/a-propos" className="hover:text-primary transition-colors">À Propos</Link>
            <Link to="/devis" className="hover:text-primary transition-colors">Devis</Link>
            <Link to="/rendez-vous" className="hover:text-primary transition-colors">Rendez-vous</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>

          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            {SERVICE_OPTIONS.filter((s) => s !== "Autre").map((s) => (
              <Link
                key={s}
                to={`/services#${slugifyService(s)}`}
                className="hover:text-primary transition-colors"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <a href="tel:+243829791356" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={16} /> +243 82 97 91 356
            </a>
            <a href="mailto:contact.gestimmodigital@gmail.com" className="flex items-start gap-2 break-all hover:text-primary transition-colors">
              <Mail size={16} /> contact.gestimmodigital@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> Kinshasa, RDC
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-[hsl(0,0%,100%,0.1)] mt-10 pt-6 text-center text-xs opacity-50">
        © 2026 Gestimmo Digital. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
