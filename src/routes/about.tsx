import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import aboutHero from "@/assets/about-hero.jpg";
import ritual1 from "@/assets/ritual-1.jpg";
import ritual2 from "@/assets/ritual-2.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Agniveda" },
      { name: "description", content: "The story of Agniveda: an ancient Ayurvedic craft, reimagined for modern sacred living." },
      { property: "og:title", content: "About — Agniveda" },
      { property: "og:description", content: "An ancient Ayurvedic craft, reimagined for modern sacred living." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "Origins", title: "A craft older than memory", body: "For thousands of years, incense has marked the moments that matter — prayer, healing, gathering." },
  { year: "Today", title: "Sourced from artisanal workshops", body: "We partner with families in South India who roll every stick by hand using halmaddi, resins and pure oils." },
  { year: "Tomorrow", title: "A slow, sacred future", body: "We are growing slowly, with intention — never with speed, never with shortcuts." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative isolate min-h-[80svh] flex items-end overflow-hidden">
        <img src={aboutHero} alt="A single incense stick on a stone mantle" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/30 via-ivory/40 to-ivory" />
        <div className="container-luxe relative z-10 pb-24 pt-40">
          <Reveal>
            <p className="text-xs tracking-luxe uppercase text-foreground/70">Our Story</p>
            <h1 className="mt-5 font-display text-5xl md:text-7xl max-w-3xl text-balance">
              An ancient ritual, made again — by hand, with patience.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="py-32 md:py-40">
        <div className="container-luxe grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">Founder’s note</p>
            <p className="mt-6 font-display text-3xl md:text-4xl leading-snug italic text-balance">
              “We started Agniveda because we missed the smell of our grandmother’s home. That quiet, sacred smoke that meant the day had begun.”
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Agniveda was born from a longing to bring the slow, sacred mornings of Indian homes into a modern,
              international life. Every blend is sourced directly from artisanal workshops in South India, where
              halmaddi resin, sandalwood and botanical oils are still rolled by hand onto bamboo cores.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We refuse charcoal, synthetic fillers and artificial fragrance. What we offer instead is patience —
              the long, fragrant pause that turns a room into a ritual.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 md:py-40 bg-cream/60 border-y border-border/60">
        <div className="container-luxe">
          <Reveal>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">Indian heritage, modern hands.</h2>
          </Reveal>
          <Stagger className="mt-16 grid md:grid-cols-3 gap-10">
            {timeline.map((t) => (
              <StaggerItem key={t.year}>
                <div className="relative pl-6 border-l border-gold/60">
                  <p className="text-xs tracking-luxe uppercase text-clay">{t.year}</p>
                  <h3 className="mt-3 font-display text-2xl">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-32 md:py-40">
        <div className="container-luxe grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <img src={ritual2} alt="Artisan rolling incense by hand" loading="lazy" className="rounded-sm w-full h-full object-cover aspect-[4/5]" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">Craftsmanship</p>
            <h2 className="mt-5 font-display text-4xl md:text-5xl">Rolled by hand. Cured by time.</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Each stick is hand-rolled, slowly cured, and bundled with natural twine. The process cannot be hurried —
              halmaddi must rest, and oils must settle. The result is a fragrance that unfolds in layers, never all at once.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 md:py-40 bg-clay text-ivory">
        <div className="container-luxe text-center">
          <Reveal>
            <p className="font-display text-3xl md:text-5xl italic leading-snug max-w-3xl mx-auto text-balance">
              “Where there is fragrance, there is presence. Where there is presence, there is the divine.”
            </p>
          </Reveal>
        </div>
      </section>

      <img src={ritual1} alt="" hidden />
    </SiteLayout>
  );
}
