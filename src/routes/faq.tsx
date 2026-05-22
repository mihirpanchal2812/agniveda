import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Agniveda" },
      { name: "description", content: "Answers to common questions about Agniveda incense — ingredients, burn time, shipping and more." },
      { property: "og:title", content: "FAQ — Agniveda" },
      { property: "og:description", content: "Common questions about Agniveda incense." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

const faqs = [
  { q: "Are the incense sticks charcoal-free?", a: "Yes. Every Agniveda blend is made on a clean botanical base. We never use charcoal, which is why our smoke is softer and our walls stay clean." },
  { q: "Where are the products made?", a: "Each stick is hand-rolled in artisanal workshops in South India, using traditional methods passed through generations." },
  { q: "Are the ingredients natural?", a: "Yes. We use halmaddi resin, sandalwood, natural essential oils, dried flowers and tree resins. Nothing synthetic." },
  { q: "How long does each incense stick burn?", a: "Most sticks burn gently for 40–60 minutes, depending on the blend and the airflow of the room." },
  { q: "Which fragrance is best for meditation?", a: "We recommend Nag Champa or Sandalwood for meditation — both are grounding, contemplative and rooted in temple tradition." },
  { q: "Do you ship internationally?", a: "Yes, Agniveda ships worldwide. Shipping times vary by region; checkout will show estimated delivery for your country." },
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-16">
        <div className="container-luxe">
          <Reveal>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">FAQ</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-3xl">Slow answers to common questions.</h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-40">
        <div className="container-luxe max-w-3xl">
          <div className="border-t border-border">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-border"
    >
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between py-8 text-left"
      >
        <span className="font-display text-2xl md:text-3xl pr-8 text-balance">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4 }}>
          <Plus className="h-5 w-5" strokeWidth={1.2} />
        </motion.span>
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
            <p className="pb-8 pr-12 text-base leading-relaxed text-muted-foreground">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
