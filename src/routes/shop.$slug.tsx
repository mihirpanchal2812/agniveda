import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Minus, Plus, Heart, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { getProduct, products, formatPrice } from "@/lib/products";
import { useCart, WHATSAPP_NUMBER } from "@/lib/cart";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — Agniveda` : "Agniveda" },
        { name: "description", content: p?.tagline ?? "" },
        { property: "og:title", content: p ? `${p.name} — Agniveda` : "Agniveda" },
        { property: "og:description", content: p?.tagline ?? "" },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p?.image ?? "" },
        { property: "og:url", content: p ? `/shop/${p.slug}` : "/shop" },
      ],
      links: p ? [{ rel: "canonical", href: `/shop/${p.slug}` }] : [],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="pt-32 pb-20">
        <div className="container-luxe grid md:grid-cols-2 gap-12 lg:gap-20">
          <Reveal>
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={`h-full w-full object-cover transition-transform duration-[1500ms] ${
                  zoom ? "scale-125" : "scale-100"
                }`}
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-sm bg-sand">
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">{product.category}</p>
            <h1 className="mt-3 font-display text-5xl md:text-6xl">{product.name}</h1>
            {product.sanskrit && (
              <p className="mt-2 font-display text-2xl text-clay/80 italic">{product.sanskrit}</p>
            )}
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-display text-3xl">{product.price}</span>
              <span className="text-xs tracking-luxe uppercase text-muted-foreground">Bundle of 12</span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-full border border-border">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:text-clay" aria-label="Decrease">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:text-clay" aria-label="Increase">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button className="flex-1 min-w-[180px] rounded-full bg-foreground px-8 py-4 text-xs tracking-luxe uppercase text-background transition hover:bg-clay">
                Add to cart
              </button>
              <button className="rounded-full border border-border p-4 hover:text-clay" aria-label="Wishlist">
                <Heart className="h-4 w-4" strokeWidth={1.2} />
              </button>
            </div>
            <button className="mt-4 w-full rounded-full border border-foreground/30 px-8 py-4 text-xs tracking-luxe uppercase hover:border-foreground hover:bg-foreground/5">
              Checkout · {product.price}
            </button>

            <div className="mt-10 space-y-2">
              <Accordion title="Fragrance notes">
                <ul className="space-y-2">
                  {product.notes.map((n: string) => <li key={n} className="flex gap-3"><span className="text-gold">·</span>{n}</li>)}
                </ul>
              </Accordion>
              <Accordion title="Spiritual mood">{product.mood}</Accordion>
              <Accordion title="Burn experience">{product.burn}</Accordion>
              <Accordion title="Ingredients">
                <ul className="space-y-2">
                  {product.ingredients.map((n: string) => <li key={n} className="flex gap-3"><span className="text-gold">·</span>{n}</li>)}
                </ul>
              </Accordion>
              <Accordion title="Ritual recommendation">{product.ritual}</Accordion>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-border/60 bg-cream/40">
        <div className="container-luxe">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl">You may also love</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-10 sm:grid-cols-3">
            {related.map((p) => (
              <StaggerItem key={p.slug}>
                <Link to="/shop/$slug" params={{ slug: p.slug }} className="group block hover-lift">
                  <div className="aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </SiteLayout>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-xs tracking-luxe uppercase">{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm leading-relaxed text-muted-foreground">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
