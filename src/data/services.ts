import serviceOne from "@/assets/service-1.jpg";
import serviceTwo from "@/assets/service-2.jpg";
import serviceThree from "@/assets/service-3.jpg";

export type Service = {
  id: string;
  name: string;
  category: "Soins du corps" | "Rituels" | "Intimité" | "Visage";
  tagline: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  includes: string[];
  isNew?: boolean;
};

export const services: Service[] = [
  {
    id: "rituel-ancrage",
    name: "Rituel d'ancrage",
    category: "Rituels",
    tagline: "Un massage lent à l'huile chaude, pensé pour redescendre.",
    description:
      "Quatre-vingt-dix minutes de pression profonde et régulière, à l'huile de sésame chauffée. Le rituel commence par un bain de pieds aux herbes et se termine par un temps de repos silencieux, sous plaid de lin.",
    price: 180,
    duration: 90,
    image: serviceOne,
    includes: [
      "Bain de pieds aux herbes amères",
      "Massage corps entier à l'huile chaude",
      "Travail respiratoire guidé",
      "Repos silencieux de 15 minutes",
    ],
  },
  {
    id: "soin-botanique",
    name: "Soin botanique",
    category: "Visage",
    tagline: "Argile verte, vapeur douce, sérums formulés en interne.",
    description:
      "Un soin du visage sans appareil ni lumière : uniquement des mains, de la vapeur d'eau florale et des textures végétales. Adapté aux peaux réactives et aux périodes hormonales sensibles.",
    price: 140,
    duration: 60,
    image: serviceTwo,
    includes: [
      "Double nettoyage à l'huile",
      "Masque d'argile verte tiède",
      "Massage kobido du visage",
      "Sérum ciblé selon la saison",
    ],
    isNew: true,
  },
  {
    id: "bain-hammam",
    name: "Bain rituel & hammam",
    category: "Soins du corps",
    tagline: "Vapeur, gommage au savon noir, immersion florale.",
    description:
      "Le parcours complet de la maison : hammam privatif, gommage traditionnel au savon noir, puis immersion dans un bain d'infusion florale préparé à la commande.",
    price: 210,
    duration: 120,
    image: serviceThree,
    includes: [
      "Hammam privatif 25 minutes",
      "Gommage au savon noir et gant kessa",
      "Bain floral chaud",
      "Thé aux herbes et repos",
    ],
  },
  {
    id: "accompagnement-intime",
    name: "Accompagnement intime",
    category: "Intimité",
    tagline: "Un espace confidentiel, sans jugement, à votre rythme.",
    description:
      "Un entretien privé avec une praticienne formée à la santé intime féminine, suivi d'un soin doux. Conçu pour les périodes de post-partum, de ménopause ou de reprise de contact avec son corps.",
    price: 160,
    duration: 75,
    image: serviceOne,
    includes: [
      "Entretien confidentiel de 20 minutes",
      "Soin périnéal doux",
      "Conseils personnalisés",
      "Suivi par message pendant 30 jours",
    ],
    isNew: true,
  },
  {
    id: "massage-post-partum",
    name: "Massage post-partum",
    category: "Soins du corps",
    tagline: "Reconstruire, doucement, ce qui a beaucoup porté.",
    description:
      "Un massage enveloppant pensé pour les corps qui viennent de donner naissance : bassin, dos, nuque et ventre, avec des pressions adaptées et un enveloppement final au lin chaud.",
    price: 155,
    duration: 75,
    image: serviceThree,
    includes: [
      "Bilan de confort en début de séance",
      "Massage adapté au post-partum",
      "Enveloppement au lin chaud",
      "Coussins de soutien sur mesure",
    ],
  },
  {
    id: "heure-silencieuse",
    name: "L'heure silencieuse",
    category: "Rituels",
    tagline: "Une heure pour rien. Aucune parole demandée.",
    description:
      "Accès seul à la salle de repos, au thé et au bain de vapeur. Aucune praticienne, aucune conversation. Le soin le plus simple que nous proposons, et souvent le plus demandé.",
    price: 60,
    duration: 60,
    image: serviceTwo,
    includes: [
      "Salle de repos privative",
      "Bain de vapeur libre",
      "Thé et eau infusée",
      "Lin et peignoir fournis",
    ],
  },
];

export const categories = [
  "Tous",
  "Rituels",
  "Soins du corps",
  "Visage",
  "Intimité",
] as const;

export function getService(id: string) {
  return services.find((s) => s.id === id);
}
