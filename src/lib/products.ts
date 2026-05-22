import nagChampaImg from "@/assets/product-nagchampa.jpg";
import jasminImg from "@/assets/product-jasmin.jpg";
import sandalwoodImg from "@/assets/product-sandalwood.jpg";
import lavenderImg from "@/assets/product-lavender.jpg";

export type Product = {
  slug: string;
  name: string;
  sanskrit?: string;
  tagline: string;
  description: string;
  price: string;
  image: string;
  notes: string[];
  mood: string;
  burn: string;
  ingredients: string[];
  ritual: string;
  category: "Floral" | "Woody" | "Spiritual" | "Calming";
};

export const products: Product[] = [
  {
    slug: "nag-champa",
    name: "Nag Champa",
    sanskrit: "नाग चम्पा",
    tagline: "Divine earthy aroma for meditation and grounding rituals.",
    description:
      "A timeless blend of halmaddi resin, sandalwood and champaca flower. Hand-rolled in the foothills of South India by artisans whose craft has passed through generations.",
    price: "₹1,280",
    image: nagChampaImg,
    notes: ["Halmaddi resin", "Champaca flower", "Sandalwood", "Vanilla amber"],
    mood: "Grounding · Meditative · Sacred",
    burn: "Each stick burns gently for 45–55 minutes.",
    ingredients: ["Bamboo core", "Halmaddi resin", "Sandalwood powder", "Champaca extract", "Natural binders"],
    ritual: "Light at dawn to anchor a morning meditation, or before evening prayer.",
    category: "Spiritual",
  },
  {
    slug: "jasmin",
    name: "Jasmin",
    sanskrit: "मल्लिका",
    tagline: "Sacred floral essence to calm the senses and elevate presence.",
    description:
      "A delicate composition of night-blooming jasmine, white musk and warm tuberose. Inspired by the temple gardens of Madurai at twilight.",
    price: "₹1,180",
    image: jasminImg,
    notes: ["Night jasmine", "Tuberose", "White musk", "Soft amber"],
    mood: "Calm · Romantic · Uplifting",
    burn: "Each stick burns gently for 40–50 minutes.",
    ingredients: ["Bamboo core", "Jasmine absolute", "Tuberose oil", "Natural resins", "Sandalwood base"],
    ritual: "Burn while bathing or before slow conversation to soften the room.",
    category: "Floral",
  },
  {
    slug: "sandalwood",
    name: "Sandalwood",
    sanskrit: "चन्दन",
    tagline: "Warm woody richness inspired by timeless temple rituals.",
    description:
      "Pure Mysore sandalwood pressed into slow-burning sticks. A single ember releases an aroma that has been considered sacred for over a thousand years.",
    price: "₹1,420",
    image: sandalwoodImg,
    notes: ["Mysore sandalwood", "Cedar heart", "Soft labdanum", "Warm amber"],
    mood: "Sacred · Grounding · Timeless",
    burn: "Each stick burns gently for 50–60 minutes.",
    ingredients: ["Bamboo core", "Mysore sandalwood powder", "Cedar oil", "Natural tree resins"],
    ritual: "Offer at the altar, or burn during yoga to deepen the breath.",
    category: "Woody",
  },
  {
    slug: "lavender",
    name: "Lavender",
    sanskrit: "लवेण्डर",
    tagline: "Soft calming florals for peaceful evening rituals.",
    description:
      "French lavender folded into Indian halmaddi and white sage. A quiet, restorative blend designed for the last hour before sleep.",
    price: "₹1,120",
    image: lavenderImg,
    notes: ["French lavender", "White sage", "Halmaddi", "Soft vetiver"],
    mood: "Restful · Soothing · Quiet",
    burn: "Each stick burns gently for 40–50 minutes.",
    ingredients: ["Bamboo core", "Lavender essential oil", "Halmaddi resin", "White sage", "Vetiver"],
    ritual: "Light an hour before sleep, dim the room, and let the day soften.",
    category: "Calming",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
