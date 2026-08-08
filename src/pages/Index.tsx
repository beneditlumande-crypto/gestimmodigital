import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import HeroSection from "@/components/HeroSection";
import ServicesPreview from "@/components/ServicesPreview";
import PropertiesPreview from "@/components/PropertiesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/components/Seo";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Gestimmo Digital",
    description:
      "Agence immobilière et de marketing digital à Kinshasa : gestion et vente de biens, création de sites web, applications web, automatisation et conseil stratégique en RDC.",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    image: `${SITE_URL}/favicon.png`,
    telephone: "+243829791356",
    email: "contact.gestimmodigital@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kinshasa",
      addressCountry: "CD",
    },
    areaServed: [
      { "@type": "City", name: "Kinshasa" },
      { "@type": "Country", name: "République démocratique du Congo" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gestimmo Digital",
    url: SITE_URL,
    inLanguage: "fr",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Gestimmo Digital | Immobilier & Solutions Digitales en RDC"
        description="Gestimmo Digital accompagne les particuliers, entreprises et professionnels en RDC dans leurs projets immobiliers et leur transformation digitale."
        path="/"
        keywords="immobilier Kinshasa, agence immobilière RDC, marketing digital Kinshasa, création de sites web, applications web, automatisation, analyse de données, conseil stratégique, Congo"
        jsonLd={jsonLd}
      />
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <PropertiesPreview />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
