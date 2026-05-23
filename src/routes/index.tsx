import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Leaf, Flame, Sparkles, Hand, Mountain, MoveDown } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SmokeAmbient } from "@/components/site/SmokeAmbient";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { products, formatPrice } from "@/lib/products";
import heroImg from "@/assets/hero-smoke.jpg";
import ritual1 from "@/assets/ritual-1.jpg";
import ritual2 from "@/assets/ritual-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agniveda — Divine. Timeless. Pure." },
      {
        name: "description",
        content:
          "Premium handcrafted, charcoal-free Ayurvedic incense imported from India. A sacred ritual reimagined for modern homes.",
      },
      { property: "og:title", content: "Agniveda — Divine. Timeless. Pure." },
      { property: "og:description", content: "Premium handcrafted Ayurvedic incense from India." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <Philosophy />
      <Featured />
      <RitualStory />
      <WhyAgniveda />
      <GalleryPreview />
      <Testimonials />
      <Instagram />
      <Newsletter />
    </SiteLayout>
  );
}

/* ---------- 1. HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden flex items-center justify-center text-center"
    >
      <motion.img
        src={heroImg}
        alt="Incense smoke drifting against a warm sandalwood backdrop"
        width={1920}
        height={1080}
        style={{ scale: imgScale }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/40 to-ivory" />
      <SmokeAmbient />

      <motion.div style={{ y, opacity }} className="relative z-10 container-luxe py-24">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-luxe uppercase text-foreground/70"
        >
          Ayurvedic · Handcrafted in India · Shipped Globally
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-5xl sm:text-7xl md:text-8xl leading-[1.02] text-balance"
        >
          Divine.
          <span className="block italic text-clay/90">Timeless.</span>
          <span className="block">Pure.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mx-auto mt-8 max-w-xl text-base sm:text-lg text-foreground/75 leading-relaxed text-pretty"
        >
          Premium handcrafted incense rooted in Indian tradition and crafted for modern sacred living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs tracking-luxe uppercase text-background transition-all hover:bg-clay"
          >
            Explore Collection
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border border-foreground/30 bg-transparent px-8 py-4 text-xs tracking-luxe uppercase text-foreground transition-all hover:border-foreground hover:bg-foreground/5"
          >
            Discover Rituals
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/60"
      >
        <span className="text-[10px] tracking-luxe uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <MoveDown className="h-4 w-4" strokeWidth={1.2} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- 2. PHILOSOPHY ---------- */
function Philosophy() {
  const items = [
    { icon: Hand, title: "Handcrafted in India", body: "Hand-rolled by artisans whose craft has been passed through generations." },
    { icon: Leaf, title: "Charcoal-Free Blends", body: "No black soot, no synthetic fillers. Just botanicals, resins and intention." },
    { icon: Mountain, title: "Ayurvedic Aromas", body: "Compositions inspired by ancient Vedic traditions of healing through scent." },
    { icon: Sparkles, title: "Rituals for Modern Homes", body: "Slow, sensory moments designed to ground you in your day." },
  ];
  return (
    <section className="py-32 md:py-40">
      <div className="container-luxe">
        <Reveal>
          <div className="max-w-2xl">
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">Our Philosophy</p>
            <h2 className="mt-5 font-display text-4xl md:text-5xl leading-tight text-balance">
              An ancient ritual, made for the quiet of your own home.
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-cream">
                <Icon className="h-5 w-5 text-clay" strokeWidth={1.2} />
              </div>
              <h3 className="mt-6 font-display text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- 3. FEATURED ---------- */
function Featured() {
  return (
    <section className="py-32 md:py-40 bg-cream/60 border-y border-border/60">
      <div className="container-luxe">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground">The Collection</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">Featured Fragrances</h2>
            </div>
            <Link to="/shop" className="text-xs tracking-luxe uppercase underline-luxe">
              View all
            </Link>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className="group block hover-lift"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-sand">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-gold/20 via-transparent to-transparent" />
                </div>
                <div className="mt-6">
                  <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">
                    {p.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-foreground/80">{formatPrice(p.price)}</span>
                    <span className="text-xs tracking-luxe uppercase underline-luxe">View</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- 4. SACRED RITUAL STORY ---------- */
function RitualStory() {
  const blocks = [
    {
      kicker: "Meditation",
      title: "Begin in stillness.",
      body: "A single Nag Champa stick, lit at dawn, marks the boundary between sleep and waking — a quiet invitation to arrive.",
      image: ritual1,
      reverse: false,
    },
    {
      kicker: "Evening Ritual",
      title: "Soften the room as the day ends.",
      body: "Lavender and sandalwood slow the breath, dim the senses, and prepare the body for the rest of evening.",
      image: ritual2,
      reverse: true,
    },
  ];
  return (
    <section className="py-32 md:py-40">
      <div className="container-luxe space-y-32">
        {blocks.map((b) => (
          <Reveal key={b.kicker}>
            <div
              className={`grid items-center gap-12 md:gap-20 md:grid-cols-2 ${
                b.reverse ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <img src={b.image} alt={b.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="max-w-md">
                <p className="text-xs tracking-luxe uppercase text-clay">{b.kicker}</p>
                <h3 className="mt-5 font-display text-4xl md:text-5xl leading-tight text-balance">
                  {b.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-muted-foreground">{b.body}</p>
                <div className="mt-8 h-px w-24 bg-gold/70" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- 5. WHY AGNIVEDA ---------- */
function WhyAgniveda() {
  const feats = [
    { icon: Hand, title: "Handmade craftsmanship", body: "Each stick rolled by hand, never machine-pressed." },
    { icon: Flame, title: "Long-lasting aroma", body: "Slow-burning sticks that linger in the room for hours." },
    { icon: Leaf, title: "Charcoal-free", body: "Clean botanical bases that won’t blacken your walls." },
    { icon: Mountain, title: "Imported from India", body: "Sourced directly from artisanal workshops." },
    { icon: Sparkles, title: "Natural ingredients", body: "Resins, oils, flowers and barks. Nothing synthetic." },
    { icon: Hand, title: "Ayurvedic tradition", body: "Compositions guided by centuries-old wisdom." },
  ];
  return (
    <section className="py-32 md:py-40 bg-cream/60 border-y border-border/60">
      <div className="container-luxe">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">Why Agniveda</p>
            <h2 className="mt-5 font-display text-4xl md:text-5xl text-balance">
              Six promises in every bundle.
            </h2>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {feats.map(({ icon: Icon, title, body }) => (
            <StaggerItem key={title}>
              <div className="group h-full rounded-sm border border-border bg-background p-8 hover-lift">
                <Icon className="h-6 w-6 text-clay" strokeWidth={1.2} />
                <h3 className="mt-6 font-display text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- 6. GALLERY ---------- */
function GalleryPreview() {
  const imgs = [
    { src: gallery1, h: "row-span-2" },
    { src: gallery2, h: "" },
    { src: gallery3, h: "" },
    { src: gallery4, h: "row-span-2" },
  ];
  return (
    <section className="py-32 md:py-40">
      <div className="container-luxe">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs tracking-luxe uppercase text-muted-foreground">Gallery</p>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">A study in smoke.</h2>
            </div>
            <Link to="/gallery" className="text-xs tracking-luxe uppercase underline-luxe">
              View gallery
            </Link>
          </div>
        </Reveal>

        <Stagger className="mt-16 grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[260px]">
          {imgs.map((i, idx) => (
            <StaggerItem key={idx} className={i.h}>
              <div className="group relative h-full w-full overflow-hidden rounded-sm">
                <img
                  src={i.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
                />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- 7. TESTIMONIALS ---------- */
function Testimonials() {
  const quotes = [
    { q: "It transformed my morning practice. The Nag Champa is unlike anything I've found in the West.", a: "Priya M., Mumbai" },
    { q: "Calm, clean, and impossibly elegant. The Sandalwood is now a ritual in our home.", a: "Anders L., Copenhagen" },
    { q: "Charcoal-free really does make a difference. The room feels softer afterwards.", a: "Naomi K., Brooklyn" },
  ];
  return (
    <section className="relative py-32 md:py-40 bg-clay text-ivory overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-grain" />
      <div className="container-luxe relative">
        <Reveal>
          <p className="text-xs tracking-luxe uppercase text-ivory/60 text-center">Testimonials</p>
        </Reveal>
        <Stagger className="mt-16 grid gap-10 md:grid-cols-3">
          {quotes.map((t, i) => (
            <StaggerItem key={i}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-sm border border-ivory/15 bg-ivory/5 backdrop-blur-sm p-8"
              >
                <p className="font-display text-2xl italic leading-snug text-balance">“{t.q}”</p>
                <p className="mt-8 text-xs tracking-luxe uppercase text-ivory/60">{t.a}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- 8. INSTAGRAM ---------- */
function Instagram() {
  const imgs = [gallery1, gallery2, gallery3, gallery4, ritual1, ritual2];
  return (
    <section className="py-32 md:py-40">
      <div className="container-luxe">
        <Reveal>
          <div className="text-center">
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">Follow</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">@agniveda.us</h2>
            <p className="mt-4 mx-auto max-w-md text-sm text-muted-foreground">
              Quiet rituals, sacred objects, and the slow craft behind every blend.
            </p>
          </div>
        </Reveal>
        <Stagger className="mt-14 grid grid-cols-2 md:grid-cols-6 gap-3" stagger={0.06}>
          {imgs.map((src, i) => (
            <StaggerItem key={i}>
              <a href="#" className="group relative block aspect-square overflow-hidden rounded-sm">
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-clay/0 group-hover:bg-clay/30 transition-colors duration-500" />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- 9. NEWSLETTER ---------- */
function Newsletter() {
  return (
    <section className="py-32 md:py-40 bg-cream/60 border-t border-border/60">
      <div className="container-luxe grid md:grid-cols-2 gap-16">
        <Reveal>
          <p className="text-xs tracking-luxe uppercase text-muted-foreground">Stay in touch</p>
          <h2 className="mt-5 font-display text-4xl md:text-5xl text-balance">
            Letters from the workshop.
          </h2>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            New blends, seasonal rituals, and quiet notes from India — sent rarely, never in haste.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const f = e.currentTarget;
              f.querySelector("[data-success]")?.classList.remove("hidden");
              f.reset();
            }}
          >
            <FloatingInput name="name" label="Your name" />
            <FloatingInput name="email" label="Email address" type="email" />
            <FloatingInput name="message" label="A short note (optional)" textarea />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs tracking-luxe uppercase text-background transition-all hover:bg-clay"
            >
              Subscribe
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
            <p data-success className="hidden text-sm text-clay font-display italic">
              Thank you. A quiet welcome will arrive in your inbox.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function FloatingInput({
  name,
  label,
  type = "text",
  textarea = false,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "peer w-full border-0 border-b border-border bg-transparent pt-6 pb-2 text-base text-foreground placeholder-transparent outline-none transition focus:border-clay";
  return (
    <div className="relative">
      {textarea ? (
        <textarea name={name} id={name} placeholder={label} rows={3} className={cls} />
      ) : (
        <input name={name} id={name} type={type} placeholder={label} className={cls} />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-1 text-xs tracking-luxe uppercase text-muted-foreground transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-xs peer-focus:tracking-luxe peer-focus:uppercase peer-focus:text-clay"
      >
        {label}
      </label>
    </div>
  );
}
