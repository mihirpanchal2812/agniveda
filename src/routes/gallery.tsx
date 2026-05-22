import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import ritual1 from "@/assets/ritual-1.jpg";
import ritual2 from "@/assets/ritual-2.jpg";
import nag from "@/assets/product-nagchampa.jpg";
import jas from "@/assets/product-jasmin.jpg";
import san from "@/assets/product-sandalwood.jpg";
import lav from "@/assets/product-lavender.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Agniveda" },
      { name: "description", content: "An editorial visual study of incense, ritual, and the slow craft behind Agniveda." },
      { property: "og:title", content: "Gallery — Agniveda" },
      { property: "og:description", content: "An editorial visual study of incense and ritual." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

type Item = { src: string; cat: "Products" | "Rituals" | "Smoke" | "Materials"; span?: string };
const items: Item[] = [
  { src: gallery1, cat: "Smoke", span: "row-span-2" },
  { src: nag, cat: "Products" },
  { src: ritual1, cat: "Rituals" },
  { src: gallery2, cat: "Materials", span: "row-span-2" },
  { src: jas, cat: "Products" },
  { src: gallery3, cat: "Rituals" },
  { src: san, cat: "Products" },
  { src: ritual2, cat: "Rituals", span: "row-span-2" },
  { src: lav, cat: "Products" },
  { src: gallery4, cat: "Rituals", span: "row-span-2" },
];

const tabs = ["All", "Products", "Rituals", "Smoke", "Materials"] as const;

function GalleryPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [active, setActive] = useState<string | null>(null);

  const list = tab === "All" ? items : items.filter((i) => i.cat === tab);

  return (
    <SiteLayout>
      <section className="pt-40 pb-12">
        <div className="container-luxe">
          <Reveal>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">Gallery</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl">An archive of smoke.</h1>
          </Reveal>
        </div>
      </section>

      <div className="container-luxe flex flex-wrap gap-2 pb-12">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-2 text-xs tracking-luxe uppercase transition ${
              tab === t
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <section className="pb-32">
        <div className="container-luxe">
          <Stagger
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[180px] md:auto-rows-[240px]"
            stagger={0.06}
          >
            {list.map((it, i) => (
              <StaggerItem key={`${it.src}-${i}`} className={it.span}>
                <button
                  onClick={() => setActive(it.src)}
                  className="group relative h-full w-full overflow-hidden rounded-sm"
                >
                  <img src={it.src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-clay/0 group-hover:bg-clay/25 transition-colors duration-500" />
                </button>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute top-6 right-6 rounded-full bg-ivory/10 p-3 text-ivory hover:bg-ivory/20"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={active}
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SiteLayout>
  );
}
