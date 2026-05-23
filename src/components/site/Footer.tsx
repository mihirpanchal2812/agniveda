import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-cream">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="font-display text-3xl">AGNIVEDA</div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Divine. Timeless. Pure. Premium handcrafted incense imported from India,
            crafted for modern sacred living.
          </p>
          <p className="mt-8 font-display text-xl italic text-foreground/80">
            “The fragrance always remains in the hand that gives the rose.”
          </p>
        </div>

        <div>
          <div className="text-xs tracking-luxe uppercase text-muted-foreground">Explore</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/about" className="underline-luxe">About</Link></li>
            <li><Link to="/shop" className="underline-luxe">Shop</Link></li>
            <li><Link to="/gallery" className="underline-luxe">Gallery</Link></li>
            <li><Link to="/faq" className="underline-luxe">FAQ</Link></li>
            <li><Link to="/contact" className="underline-luxe">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs tracking-luxe uppercase text-muted-foreground">Follow</div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <a href="https://www.instagram.com/agniveda.us/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-clay transition-colors">
                <Instagram className="h-4 w-4" /> @agniveda.us
              </a>
            </li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@agniveda.co</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container-luxe py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Agniveda. All rights reserved.</span>
          <span className="tracking-luxe uppercase">Handcrafted in India · Shipped worldwide</span>
        </div>
      </div>
    </footer>
  );
}
