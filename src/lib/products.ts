import nagChampaImg from "@/assets/product-nagchampa.jpg";
import jasminImg from "@/assets/product-jasmin.jpg";
import sandalwoodImg from "@/assets/product-sandalwood.jpg";
import lavenderImg from "@/assets/product-lavender.jpg";
import backImg from "@/assets/product-back.jpg";

export type Product = {
  slug: string;
  name: string;
  sanskrit?: string;
  tagline: string;
  description: string;
  price: number; // USD
  image: string;
  backImage: string;
  notes: string[];
  mood: string;
  burn: string;
  ingredients: string[];
  ritual: string;
  category: "Floral" | "Woody" | "Spiritual" | "Calming";
};

export const PRICE = 8; // USD, all fragrances
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const products: Product[] = [
  {
    slug: "nag-champa",
    name: "Nag Champa",
    sanskrit: "नाग चम्पा",
    tagline: "Divine Champa — a timeless spiritual fragrance.",
    description:
      "A timeless blend of halmaddi resin, sandalwood and champaca flower, hand-rolled in the foothills of South India. The signature scent of meditation halls and quiet temples — grounding, sweet and deeply sacred.",
    price: PRICE,
    image: nagChampaImg,
    backImage: backImg,
    notes: ["Halmaddi resin", "Champaca flower", "Sandalwood", "Vanilla amber"],
    mood: "Grounding · Meditative · Sacred",
    burn: "Approx. 40 minutes per stick. 20 sticks per box (25 g / 0.88 oz).",
    ingredients: [
      "Wood powder",
      "Herbal powder",
      "Natural binder (joss)",
      "Bamboo stick",
      "Essential oils",
      "Fragrance blend",
    ],
    ritual: "Light at dawn to anchor a morning meditation, or before evening prayer.",
    category: "Spiritual",
  },
  {
    slug: "jasmin",
    name: "Jasmin",
    sanskrit: "मल्लिका",
    tagline: "Sacred Jasmin — a floral scent for worship.",
    description:
      "A delicate composition of night-blooming jasmine, white musk and warm tuberose. Inspired by the temple gardens of Madurai at twilight, this blend softens the room and elevates presence.",
    price: PRICE,
    image: jasminImg,
    backImage: backImg,
    notes: ["Night jasmine", "Tuberose", "White musk", "Soft amber"],
    mood: "Calm · Devotional · Uplifting",
    burn: "Approx. 40 minutes per stick. 20 sticks per box (25 g / 0.88 oz).",
    ingredients: [
      "Wood powder",
      "Herbal powder",
      "Natural binder (joss)",
      "Bamboo stick",
      "Jasmine essential oil",
      "Fragrance blend",
    ],
    ritual: "Burn during puja, slow bathing, or before quiet conversation.",
    category: "Floral",
  },
  {
    slug: "sandalwood",
    name: "Sandalwood",
    sanskrit: "चन्दन",
    tagline: "Sacred Sandalwood — a rich, woody aroma.",
    description:
      "Pure Mysore sandalwood pressed into slow-burning sticks. A single ember releases an aroma that has been considered sacred for over a thousand years — warm, woody and timeless.",
    price: PRICE,
    image: sandalwoodImg,
    backImage: backImg,
    notes: ["Mysore sandalwood", "Cedar heart", "Soft labdanum", "Warm amber"],
    mood: "Sacred · Grounding · Timeless",
    burn: "Approx. 40 minutes per stick. 20 sticks per box (25 g / 0.88 oz).",
    ingredients: [
      "Wood powder",
      "Sandalwood powder",
      "Natural binder (joss)",
      "Bamboo stick",
      "Essential oils",
      "Fragrance blend",
    ],
    ritual: "Offer at the altar, or burn during yoga to deepen the breath.",
    category: "Woody",
  },
  {
    slug: "lavender",
    name: "Lavender",
    sanskrit: "लवेण्डर",
    tagline: "Tranquil Lavender — a relaxing floral scent.",
    description:
      "French lavender folded into Indian halmaddi and white sage. A quiet, restorative blend designed for the last hour before sleep — soft, soothing and deeply calming.",
    price: PRICE,
    image: lavenderImg,
    backImage: backImg,
    notes: ["French lavender", "White sage", "Halmaddi", "Soft vetiver"],
    mood: "Restful · Soothing · Quiet",
    burn: "Approx. 40 minutes per stick. 20 sticks per box (25 g / 0.88 oz).",
    ingredients: [
      "Wood powder",
      "Lavender essential oil",
      "Natural binder (joss)",
      "Bamboo stick",
      "White sage",
      "Fragrance blend",
    ],
    ritual: "Light an hour before sleep, dim the room, and let the day soften.",
    category: "Calming",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
