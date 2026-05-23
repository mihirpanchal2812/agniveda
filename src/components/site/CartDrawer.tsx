import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export function CartDrawer() {
  const { open, setOpen, detailed, subtotal, count, setQty, remove, whatsappUrl, clear } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-[61] h-full w-full max-w-md bg-background border-l border-border flex flex-col"
          >
            <header className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">Your ritual</p>
                <h2 className="font-display text-2xl">Cart {count > 0 && <span className="text-clay">· {count}</span>}</h2>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close cart" className="p-2 hover:text-clay">
                <X className="h-5 w-5" strokeWidth={1.2} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {detailed.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                  <ShoppingBag className="h-10 w-10 text-clay" strokeWidth={1} />
                  <p className="font-display text-xl">Your cart is quiet.</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Add a fragrance to begin your ritual.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {detailed.map(({ product, qty, lineTotal }) => (
                    <li key={product.slug} className="flex gap-4 py-5">
                      <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-sand">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[10px] tracking-luxe uppercase text-muted-foreground">{product.category}</p>
                            <h3 className="font-display text-lg leading-tight">{product.name}</h3>
                          </div>
                          <button onClick={() => remove(product.slug)} className="text-muted-foreground hover:text-clay text-xs" aria-label="Remove">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button onClick={() => setQty(product.slug, qty - 1)} className="p-2 hover:text-clay" aria-label="Decrease">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs">{qty}</span>
                            <button onClick={() => setQty(product.slug, qty + 1)} className="p-2 hover:text-clay" aria-label="Increase">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm">{formatPrice(lineTotal)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {detailed.length > 0 && (
              <div className="border-t border-border p-6 space-y-4 bg-cream/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-luxe uppercase text-muted-foreground">Subtotal</span>
                  <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Shipping & taxes confirmed on WhatsApp. You'll be taken to a pre-filled message — just tap send.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 w-full rounded-full bg-foreground px-8 py-4 text-xs tracking-luxe uppercase text-background transition hover:bg-clay"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.4} />
                  Checkout via WhatsApp
                </a>
                <button onClick={clear} className="w-full text-[10px] tracking-luxe uppercase text-muted-foreground hover:text-clay">
                  Clear cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
