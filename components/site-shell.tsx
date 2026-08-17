"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { flavorById, formatSar } from "@/lib/catalog";
import { useCart } from "@/components/cart-provider";
import { ExperienceLayer } from "@/components/experience-layer";
import { useLanguage } from "@/lib/language";

const navigation = [
  { href: "/shop", en: "Shop", ar: "تسوّق" },
  { href: "/how-it-works", en: "How it works", ar: "كيف تطقّها" },
  { href: "/taste-lab", en: "Taste Lab", ar: "مختبر النكهة" },
  { href: "/films", en: "Films", ar: "أفلام" },
  { href: "/story", en: "Our Story", ar: "قصتنا" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
      <CartDrawer />
      <CartNotice />
      <ExperienceLayer />
    </>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const { language, toggleLanguage } = useLanguage();
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
          <span>الطعم في اللب</span><i>✦</i><span>THE TASTE IS IN THE KERNEL</span><i>✦</i>
          <span>PACKED IN RIYADH · HALAL</span><i>✦</i><span>معبّأ في الرياض · حلال</span><i>✦</i>
          <span>0.05 MPa</span><i>✦</i><span>اللب متبّل أصلًا</span><i>✦</i>
          <span>الطعم في اللب</span><i>✦</i><span>THE TASTE IS IN THE KERNEL</span><i>✦</i>
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
          <button className="language-link" type="button" onClick={toggleLanguage} aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}>
            {language === "ar" ? "EN" : "ع"}
          </button>
          <Link className="account-link" href="/account" aria-label="Account">◎</Link>
          <button className="cart-trigger" data-cursor="BAG" onClick={() => setOpen(true)} aria-label={`Open bag, ${count} items`}>
            BAG <motion.span key={count} initial={{ scale: 1.45 }} animate={{ scale: 1 }}>{String(count).padStart(2, "0")}</motion.span>
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
            <Link href="/saudi-sunflower-seeds" onClick={() => setMenuOpen(false)}><span>06</span><b>دليل الحب</b><small>SEED GUIDE</small></Link>
            <Link href="/journal" onClick={() => setMenuOpen(false)}><span>07</span><b>المجلة</b><small>JOURNAL</small></Link>
            <Link href="/account" onClick={() => setMenuOpen(false)}><span>08</span><b>حسابي</b><small>FIRST CRACK CLUB</small></Link>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function CartDrawer() {
  const { lines, subtotal, savings, isOpen, setOpen, setQuantity, remove } = useCart();
  const { t } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, setOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button className="drawer-scrim" aria-label="Close bag" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside ref={drawerRef} className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping bag" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <div className="drawer-head"><p>حقيبتك <span>YOUR BAG</span></p><button ref={closeRef} onClick={() => setOpen(false)}>CLOSE ×</button></div>
            {lines.length === 0 ? (
              <div className="empty-cart"><span>◒</span><h2>{t("ما في طقّات بعد.", "NO CRACKS YET.")}</h2><p>{t("ابدأ بنكهتك الأولى.", "Start with your first flavor.")}</p><Link href="/shop" onClick={() => setOpen(false)}>{t("تسوّق الخط ↗", "SHOP THE LINE ↗")}</Link></div>
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
                <div className="drawer-total">{savings > 0 ? <div className="drawer-saving"><span>FULL-SET SAVING</span><b>− {formatSar(savings)}</b></div> : null}<div><span>SUBTOTAL</span><b>{formatSar(subtotal)}</b></div><small>VAT included. Delivery is calculated at checkout.</small><Link href="/cart" onClick={() => setOpen(false)}>GO TO BAG <span>↗</span></Link></div>
              </>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function CartNotice() {
  const { notice, clearNotice, setOpen } = useCart();
  const product = notice?.productId ? flavorById(notice.productId) : null;

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(clearNotice, 4200);
    return () => window.clearTimeout(timer);
  }, [notice, clearNotice]);

  return (
    <AnimatePresence>
      {notice ? (
        <motion.aside className="cart-notice" key={notice.key} initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }} role="status" aria-live="polite">
          {product ? <img src={product.image} alt="" /> : <span className="notice-seven">7</span>}
          <div><b lang="ar">تمت الإضافة.</b><p>{notice.labelAr} · {notice.labelEn}</p><small>Keep looking. Your bag is right here.</small></div>
          <div className="notice-actions"><button onClick={clearNotice}>KEEP LOOKING</button><button onClick={() => { clearNotice(); setOpen(true); }}>VIEW BAG ↗</button></div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="global-footer">
      <div className="footer-statement"><img src="/brand/hubb-logo.webp" alt="HUBB حُبّ" /><h2>{t("الطعم في اللب.", "THE TASTE IS")}<br /><span>{t("في كل طقّة.", "IN THE KERNEL.")}</span></h2></div>
      <div className="footer-grid">
        <div><p>EXPLORE</p>{navigation.map((item) => <Link href={item.href} key={item.href}>{item.en}</Link>)}<Link href="/journal">Journal</Link></div>
        <div><p>COMMERCE</p><Link href="/cart">Bag</Link><Link href="/account">Account</Link><Link href="/policies/shipping">Shipping & returns</Link></div>
        <div><p>DISCOVER</p><Link href="/saudi-sunflower-seeds">Saudi seed guide</Link><Link href="/how-it-works">How to crack</Link><Link href="/journal/how-to-eat-sunflower-seeds">The clean crack</Link></div>
        <div className="footer-newsletter"><p>FIRST CRACK CLUB</p><h3>نكهتك قبل الكل.</h3><span>New drops. Short notes. No noise.</span><Link href="/account">JOIN THE CLUB ↗</Link></div>
      </div>
      <div className="footer-legal"><span>© 2026 HUBB · PACKED IN RIYADH</span><span>ARABIC-FIRST · HALAL · ROZANA MILL</span><span><Link href="/policies/privacy">PRIVACY</Link> · <Link href="/policies/terms">TERMS</Link></span></div>
    </footer>
  );
}
