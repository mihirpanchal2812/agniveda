import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, formatPrice, type Product } from "./products";

export type CartItem = { slug: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  detailed: { product: Product; qty: number; lineTotal: number }[];
  whatsappUrl: string;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE = "agniveda.cart.v1";
export const WHATSAPP_NUMBER = "15103207739"; // +1 (510) 320-7739

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const detailed = items
      .map((i) => {
        const p = products.find((p) => p.slug === i.slug);
        return p ? { product: p, qty: i.qty, lineTotal: p.price * i.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number; lineTotal: number }[];

    const subtotal = detailed.reduce((s, d) => s + d.lineTotal, 0);
    const count = detailed.reduce((s, d) => s + d.qty, 0);

    const lines = detailed
      .map(
        (d, i) =>
          `${i + 1}. ${d.product.name} — ${d.qty} × ${formatPrice(d.product.price)} = ${formatPrice(d.lineTotal)}`
      )
      .join("\n");

    const message =
      detailed.length === 0
        ? `Hello AGNIVEDA, I'd like to place an order.`
        : `Hello AGNIVEDA,\n\nI'd like to place the following order:\n\n${lines}\n\nItems: ${count}\nTotal: ${formatPrice(subtotal)}\n\nPlease confirm availability and shipping. Thank you.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    return {
      items,
      count,
      subtotal,
      open,
      setOpen,
      add: (slug, qty = 1) =>
        setItems((curr) => {
          const ex = curr.find((c) => c.slug === slug);
          if (ex) return curr.map((c) => (c.slug === slug ? { ...c, qty: c.qty + qty } : c));
          return [...curr, { slug, qty }];
        }),
      setQty: (slug, qty) =>
        setItems((curr) =>
          qty <= 0 ? curr.filter((c) => c.slug !== slug) : curr.map((c) => (c.slug === slug ? { ...c, qty } : c))
        ),
      remove: (slug) => setItems((curr) => curr.filter((c) => c.slug !== slug)),
      clear: () => setItems([]),
      detailed,
      whatsappUrl,
    };
  }, [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
