# Optimisation premium de la page d’accueil

## Objectif
Rendre l’accueil plus professionnel, premium et orienté conversion, sans modifier le design global, la navigation, les formulaires, les rendez-vous, les devis, les biens ni le système de messages.

## Changements prévus

### 1. Hero
- Conserver l’image immobilière en arrière-plan et renforcer sa lisibilité avec la superposition sombre existante.
- Remplacer le titre et le texte par les formulations fournies.
- Faire pointer « Demander un devis » vers `/devis` et « Voir nos biens » vers `/biens`.
- Ajuster uniquement la hiérarchie typographique et les espacements pour un rendu responsive plus premium.

### 2. Domaines d’expertise
- Ajouter immédiatement après le hero une section compacte en trois blocs : Immobilier, Digital, Stratégie & Data.
- Réutiliser les icônes, couleurs, bordures et animations du design actuel.

### 3. Services principaux
- Remplacer l’aperçu actuel par une sélection de 10 services demandés.
- Réutiliser les images professionnelles déjà présentes sur la page Services.
- Conserver des cartes homogènes, responsives et concises, puis ajouter le bouton « Découvrir tous nos services » vers `/services`.

### 4. Pourquoi Gestimmo Digital
- Ajouter une section courte présentant les quatre avantages demandés avec des icônes professionnelles.
- Préserver le rythme visuel bleu, blanc, noir/gris et les animations discrètes existantes.

### 5. Opportunités immobilières
- Vérifier la table réelle `biens` avant affichage.
- La table ne contient actuellement aucun bien : ne pas afficher les propriétés statiques ou générées comme disponibles.
- Afficher à la place un état vide professionnel invitant les propriétaires et partenaires à proposer leurs biens, avec accès à la page Contact, tout en conservant le bouton « Voir les biens ».

### 6. Conversion et contenu existant
- Conserver la section Témoignages existante.
- Ajouter avant le footer le CTA « Vous avez un projet ? Parlons-en. » avec les boutons vers `/rendez-vous` et `/devis`.
- Conserver le footer actuel sans le modifier dans cette intervention.

### 7. SEO de l’accueil
- Appliquer exactement le nouveau title et la nouvelle meta description demandés.
- Intégrer naturellement les expressions locales dans le contenu visible et les mots-clés de la page, sans répétition artificielle.
- Conserver les données structurées, canonical, Open Graph et Twitter existants.

## Détails techniques
- Modifier uniquement les composants de présentation utilisés par l’accueil et `src/pages/Index.tsx`.
- Centraliser les nouvelles sections dans de petits composants dédiés pour garder le code maintenable.
- Réutiliser les assets locaux existants, sans générer ni présenter de faux biens.
- Vérifier le rendu en navigateur aux dimensions mobile et ordinateur, ainsi que les liens et l’absence de débordements.
