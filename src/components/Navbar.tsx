import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/gestimmo-logo.jpg.asset.json";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Biens", href: "/biens" },
  { label: "Devis", href: "/devis" },
  { label: "Rendez-vous", href: "/rendez-vous" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container px-4 flex items-center justify-between h-16 sm:h-20 gap-3">
        <Link to="/" className="flex items-center gap-2.5 min-w-0 shrink">
          <img
            src={logoAsset.url}
            alt="Gestimmo Digital"
            width={56}
            height={56}
            className="h-11 w-11 sm:h-14 sm:w-14 shrink-0 rounded-full object-contain bg-white p-0.5 ring-1 ring-border"
          />
          <div className="font-display text-[15px] sm:text-xl font-bold text-primary flex flex-col leading-tight min-w-0">
            <span className="truncate">Gestimmo <span className="text-foreground">Digital</span></span>
            <span className="text-[10px] font-normal text-muted-foreground tracking-wide">Benedit</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm font-body font-medium transition-colors ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium transition-colors ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
