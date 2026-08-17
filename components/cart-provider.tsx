"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { flavorById, starterBundle } from "@/lib/catalog";

export type CartLine = { productId: string; quantity: number };
export type CartNotice = {
  key: number;
  productId?: string;
  labelEn: string;
  labelAr: string;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  savings: number;
  add: (productId: string, quantity?: number) => void;
  addLines: (lines: CartLine[]) => void;
  addBundle: (productIds: string[]) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  notice: CartNotice | null;
  clearNotice: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "hubb-cart-v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [notice, setNotice] = useState<CartNotice | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      // Rehydrate the device-local convenience cart after the first client render.
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setLines(parsed.filter((line): line is CartLine => Boolean(line && typeof line.productId === "string" && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 20)));
        }
      }
    } catch {
      // The cart remains usable in memory when storage is unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(lines));
    } catch {
      // Browser storage is only a convenience, never the order source of truth.
    }
  }, [hydrated, lines]);

  const value = useMemo<CartContextValue>(() => {
    const add = (productId: string, quantity = 1) => {
      setLines((current) => {
        const existing = current.find((line) => line.productId === productId);
        if (existing) {
          return current.map((line) =>
            line.productId === productId
              ? { ...line, quantity: Math.min(20, line.quantity + quantity) }
              : line,
          );
        }
        return [...current, { productId, quantity: Math.max(1, Math.min(20, quantity)) }];
      });
      const product = flavorById(productId);
      setNotice({
        key: Date.now(),
        productId,
        labelEn: product?.en ?? "Flavor",
        labelAr: product?.ar ?? "نكهة",
      });
    };

    const addLines = (incoming: CartLine[]) => {
      setLines((current) => {
        const quantities = new Map(current.map((line) => [line.productId, line.quantity]));
        incoming.forEach(({ productId, quantity }) => {
          if (!flavorById(productId) || !Number.isInteger(quantity) || quantity < 1) return;
          quantities.set(productId, Math.min(20, (quantities.get(productId) ?? 0) + quantity));
        });
        return Array.from(quantities, ([productId, quantity]) => ({ productId, quantity }));
      });
      setNotice({ key: Date.now(), labelEn: "Your last crack", labelAr: "طلبك السابق" });
    };

    const addBundle = (productIds: string[]) => {
      setLines((current) => {
        const quantities = new Map(current.map((line) => [line.productId, line.quantity]));
        productIds.forEach((productId) => {
          quantities.set(productId, Math.min(20, (quantities.get(productId) ?? 0) + 1));
        });
        return Array.from(quantities, ([productId, quantity]) => ({ productId, quantity }));
      });
      setNotice({ key: Date.now(), labelEn: starterBundle.en, labelAr: starterBundle.ar });
    };

    const setQuantity = (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setLines((current) => current.filter((line) => line.productId !== productId));
        return;
      }
      setLines((current) =>
        current.map((line) =>
          line.productId === productId ? { ...line, quantity: Math.min(20, quantity) } : line,
        ),
      );
    };

    const remove = (productId: string) =>
      setLines((current) => current.filter((line) => line.productId !== productId));

    const count = lines.reduce((total, line) => total + line.quantity, 0);
    const grossSubtotal = lines.reduce((total, line) => {
      const product = flavorById(line.productId);
      return total + (product?.priceSar ?? 0) * line.quantity;
    }, 0);
    const fullSets = lines.length ? Math.min(...starterBundle.flavorIds.map((id) => lines.find((line) => line.productId === id)?.quantity ?? 0)) : 0;
    const savings = fullSets * (starterBundle.compareAtSar - starterBundle.priceSar);
    const subtotal = grossSubtotal - savings;

    return {
      lines,
      count,
      subtotal,
      savings,
      add,
      addLines,
      addBundle,
      setQuantity,
      remove,
      clear: () => setLines([]),
      isOpen,
      setOpen,
      notice,
      clearNotice: () => setNotice(null),
    };
  }, [isOpen, lines, notice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
