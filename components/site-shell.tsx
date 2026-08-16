"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { flavorById, formatSar } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";

const navigation = [
  { href: "/shop", en: "Shop", ar: "تسوّق" },
  { href: "/taste-lab", en: "Taste Lab", ar: "مختبر النكهة" },
  { href: "/story", en: "Our Story", ar: "قصتنا" },
  { href: "/journal", en: "Journal", ar: "المجلة" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <CartDrawer />
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="signal-strip" aria-hidden="true">
        <div>
          <span>النكهة في اللُّب</span><i>✦</i><span>FLAVOR IN THE KERNEL</span><i>✦</i>
          <span>7 FLAVORS · ONE CRACK</span><i>✦</i><span>٧ نكهات · قرمشة واحدة</span><i>✦</i>
          <span>النكهة في اللُّب</span><i>✦</i><span>FLAVOR IN THE KERNEL</span><i>✦</i>
        </div>
      </div>
      <header className={`global-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="global-logo" href="/" aria-label="HUBB home">
          <img src="/brand/hubb-logo.webp" alt="HUBB حُبّ" />
        </Link>

        <nav className="global-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link className={pathname === item.href ? "is-active" : ""} href={item.href} key={item.href}>
              <b>{item.ar}</b><small>{item.en}</small>
            </Link>
          ))}
        </nav>

        <div className="global-actions">
          <Link className="language-link" href={pathname.startsWith("/en") ? "/" : "/en"}>
            {pathname.startsWith("/en") ? "ع" : "EN"}
          </Link>
          <Link className="account-link" href="/account" aria-label="Account">◎</Link>
          <button className="cart-trigger" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
            BAG <span>{String(count).padStart(2, "0")}</span>
          </button>
          <button className="menu-trigger" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle menu">
            <span /><span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav className="mobile-menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            {navigation.map((item, index) => (
              <Link href={item.href} key={item.href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span><b>{item.ar}</b><small>{item.en}</small></Link>
            ))}
            <Link href="/saudi-sunflower-seeds" onClick={() => setMenuOpen(false)}><span>05</span><b>دليل الحب</b><small>SEED GUIDE</small></Link>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function CartDrawer() {
  const { lines, subtotal, isOpen, setOpen, setQuantity, remove } = useCart();
  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button className="drawer-scrim" aria-label="Close bag" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="drawer-head"><p>حقيبتك <span>YOUR BAG</span></p><button onClick={() => setOpen(false)}>CLOSE ×</button></div>
            {lines.length === 0 ? (
              <div className="empty-cart"><span>◒</span><h2>NO CRACKS YET.</h2><p>ابدأ بنكهتك الأولى.</p><Link href="/shop" onClick={() => setOpen(false)}>SHOP ALL 7 ↗</Link></div>
            ) : (
              <>
                <div className="drawer-lines">
                  {lines.map((line) => {
                    const item = flavorById(line.productId);
                    if (!item) return null;
                    return (
                      <article key={line.productId} style={{ "--item-color": item.color } as CSSProperties}>
                        <img src={item.image} alt={`${item.ar} ${item.en}`} />
                        <div><span>{item.number}/07</span><h3>{item.ar}</h3><p>{item.en} · {item.weightGrams} G</p><b>{formatSar(item.priceSar * line.quantity)}</b>
                          <div className="qty-control"><button onClick={() => setQuantity(item.id, line.quantity - 1)}>−</button><span>{line.quantity}</span><button onClick={() => setQuantity(item.id, line.quantity + 1)}>+</button><button className="remove-line" onClick={() => remove(item.id)}>REMOVE</button></div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <div className="drawer-total"><div><span>SUBTOTAL</span><b>{formatSar(subtotal)}</b></div><small>VAT and delivery are calculated at checkout.</small><Link href="/cart" onClick={() => setOpen(false)}>GO TO BAG <span>↗</span></Link></div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-statement"><img src="/brand/hubb-logo.webp" alt="HUBB حُبّ" /><h2>ONE CRACK.<br /><span>SEVEN WORLDS.</span></h2></div>
      <div className="footer-grid">
        <div><p>EXPLORE</p>{navigation.map((item) => <Link href={item.href} key={item.href}>{item.en}</Link>)}</div>
        <div><p>COMMERCE</p><Link href="/cart">Bag</Link><Link href="/account">Account</Link><Link href="/policies/shipping">Shipping & returns</Link></div>
        <div><p>DISCOVER</p><Link href="/saudi-sunflower-seeds">Saudi seed guide</Link><Link href="/journal/how-to-eat-sunflower-seeds">How to crack</Link><Link href="/journal/saudi-match-night-snack-ritual">Match-night ritual</Link></div>
        <div className="footer-newsletter"><p>FIRST CRACK CLUB</p><h3>نكهتك قبل الكل.</h3><span>Early drops, real product films and launch news.</span><Link href="/account">JOIN THE CLUB ↗</Link></div>
      </div>
      <div className="footer-legal"><span>© 2026 HUBB · SAUDI ARABIA</span><span>ARABIC-FIRST · HUMAN-MADE</span><span><Link href="/policies/privacy">PRIVACY</Link> · <Link href="/policies/terms">TERMS</Link></span></div>
    </footer>
  );
}
