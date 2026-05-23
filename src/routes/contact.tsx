import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Instagram, Mail, MapPin, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { FloatingInput } from "./index";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Agniveda" },
      { name: "description", content: "Reach the Agniveda atelier. We answer slowly, with care." },
      { property: "og:title", content: "Contact — Agniveda" },
      { property: "og:description", content: "Reach the Agniveda atelier." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="pt-40 pb-16">
        <div className="container-luxe">
          <Reveal>
            <p className="text-xs tracking-luxe uppercase text-muted-foreground">Contact</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-3xl">Let's stay in touch.</h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground">
              Questions about a fragrance, wholesale, or a bespoke order? Send us a note — we read every message and reply within two working days.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-luxe grid md:grid-cols-2 gap-16">
          <Reveal>
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-8"
            >
              <FloatingInput name="name" label="Your name" />
              <FloatingInput name="email" label="Email address" type="email" />
              <FloatingInput name="message" label="Your note" textarea />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs tracking-luxe uppercase text-background transition hover:bg-clay"
              >
                Send note
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
              {sent && (
                <p className="font-display italic text-clay text-lg">Thank you. We will reply within a few days.</p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div className="aspect-[4/3] rounded-sm border border-border bg-cream relative overflow-hidden">
                <div className="absolute inset-0 bg-grain opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <div>
                    <MapPin className="mx-auto h-6 w-6 text-clay" strokeWidth={1.2} />
                    <p className="mt-3 font-display text-xl">The Agniveda Atelier</p>
                    <p className="mt-1 text-sm text-muted-foreground">Bengaluru · Karnataka · India</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-xs tracking-luxe uppercase text-muted-foreground">Email</p>
                  <p className="mt-2 flex items-center gap-2"><Mail className="h-4 w-4" /> hello@agniveda.co</p>
                </div>
                <div>
                  <p className="text-xs tracking-luxe uppercase text-muted-foreground">Instagram</p>
                  <p className="mt-2 flex items-center gap-2"><Instagram className="h-4 w-4" /> @agniveda</p>
                </div>
              </div>

              <div className="rounded-sm border border-border bg-cream/60 p-8">
                <p className="text-xs tracking-luxe uppercase text-muted-foreground">Common questions</p>
                <p className="mt-3 text-sm">Wondering about shipping, burn time, or ingredients?</p>
                <Link to="/faq" className="mt-4 inline-block text-xs tracking-luxe uppercase underline-luxe">
                  Read the FAQ
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
