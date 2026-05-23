import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Heart, Search, Plus } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { products, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Agniveda" },
      { name: "description", content: "Browse the Agniveda collection of handcrafted, charcoal-free Ayurvedic incense." },
      { property: "og:title", content: "Shop — Agniveda" },
      { property: "og:description", content: "Browse the Agniveda collection of handcrafted incense." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const categories = ["All", "Spiritual", "Floral", "Woody", "Calming"] as const;
const sorts = ["Featured", "Price · Low to High", "Price · High to Low", "Name"] as const;


function ShopPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Featured");
  const [q, setQ] = useState("");

  const { add, setOpen } = useCart();

  const list = useMemo(() => {
    let l = [...products];
    if (cat !== "All") l = l.filter((p) => p.category === cat);
    if (q.trim()) l = l.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
    if (sort === "Price · Low to High") l.sort((a, b) => a.price - b.price);
    if (sort === "Price · High to Low") l.sort((a, b) => b.price - a.price);
    if (sort === "Name") l.sort((a, b) => a.name.localeCompare(b.name));
    return l;
  }, [cat, sort, q]);

  return (
    <SiteLayout>
      <section className="pt-40 pb-16">
        <div className="container-luxe">
          <Reveal>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">The Collection</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-3xl">Shop the rituals.</h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground">
              Hand-rolled in India. Charcoal-free. Made to be burned slowly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border/60 bg-cream/60">
        <div className="container-luxe flex flex-col md:flex-row md:items-center md:justify-between gap-6 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-xs tracking-luxe uppercase transition ${
                  cat === c
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search"
                className="rounded-full border border-border bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-clay"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-full border border-border bg-background px-4 py-2 text-xs tracking-luxe uppercase outline-none focus:border-clay"
            >
              {sorts.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe">
          <Stagger className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <StaggerItem key={p.slug}>
                <div className="group">
                  <Link to="/shop/$slug" params={{ slug: p.slug }} className="block hover-lift">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-110"
                      />
                      <button
                        aria-label="Wishlist"
                        onClick={(e) => { e.preventDefault(); }}
                        className="absolute top-4 right-4 h-9 w-9 rounded-full bg-ivory/80 backdrop-blur flex items-center justify-center text-foreground hover:text-clay"
                      >
                        <Heart className="h-4 w-4" strokeWidth={1.2} />
                      </button>
                      <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="rounded-full bg-foreground text-background text-center py-3 text-xs tracking-luxe uppercase">
                          Quick view
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-6 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">{p.category}</p>
                      <h3 className="mt-1 font-display text-2xl">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{p.tagline}</p>
                    </div>
                    <span className="text-sm text-foreground/80 whitespace-nowrap">{formatPrice(p.price)}</span>
                  </div>
                  <button
                    onClick={() => { add(p.slug); setOpen(true); }}
                    className="mt-4 inline-flex items-center gap-2 text-[10px] tracking-luxe uppercase text-foreground hover:text-clay transition"
                  >
                    <Plus className="h-3 w-3" /> Add to cart
                  </button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          {list.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No fragrances match your search.</p>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
