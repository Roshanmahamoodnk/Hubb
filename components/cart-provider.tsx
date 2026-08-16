"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { flavorById } from "@/lib/catalog";

export type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "hubb-cart-v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);

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
      setOpen(true);
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
    const subtotal = lines.reduce((total, line) => {
      const product = flavorById(line.productId);
      return total + (product?.priceSar ?? 0) * line.quantity;
    }, 0);

    return {
      lines,
      count,
      subtotal,
      add,
      setQuantity,
      remove,
      clear: () => setLines([]),
      isOpen,
      setOpen,
    };
  }, [isOpen, lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
