"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { flavorById, formatSar } from "@/lib/catalog";

export function CartPage() {
  const { lines, subtotal, savings, setQuantity, remove } = useCart();
  return <main className="page-main cart-page"><header><p>YOUR BAG · حقيبتك</p><h1>THE CRACK<br /><em>LINE-UP.</em></h1></header>{lines.length === 0 ? <section className="cart-empty"><span>◒</span><h2>THE BAG IS QUIET.</h2><p>اختر أول نكهة وابدأ القرمشة.</p><Link href="/shop">SHOP THE LINE ↗</Link></section> : <div className="cart-layout"><section className="cart-list">{lines.map((line) => { const item = flavorById(line.productId); if (!item) return null; return <article key={line.productId}><img src={item.image} alt={item.en} /><div><span>{item.number}/07 · {item.sku}</span><h2>{item.ar}</h2><h3>{item.en}</h3><p>{item.weightGrams}G · {item.moodEn}</p><div className="qty-control"><button onClick={() => setQuantity(item.id, line.quantity - 1)}>−</button><b>{line.quantity}</b><button onClick={() => setQuantity(item.id, line.quantity + 1)}>+</button><button onClick={() => remove(item.id)}>REMOVE</button></div></div><strong>{formatSar(item.priceSar * line.quantity)}</strong></article>; })}</section><aside className="cart-summary"><p>ORDER SIGNAL</p>{savings > 0 ? <div className="cart-saving"><span>Seven-box saving</span><b>− {formatSar(savings)}</b></div> : null}<div><span>Subtotal</span><b>{formatSar(subtotal)}</b></div><div><span>Delivery</span><b>AT CHECKOUT</b></div><div className="cart-total"><span>TOTAL</span><b>{formatSar(subtotal)}</b></div><small>VAT included. No payment is captured until the secure commerce backend and payment provider are connected.</small><Link href="/checkout">CONTINUE TO CHECKOUT ↗</Link><Link href="/shop">← KEEP EXPLORING</Link></aside></div>}</main>;
}
