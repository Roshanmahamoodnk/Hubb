import { useSyncExternalStore } from "react";
import { flavorById } from "@/lib/catalog";

export const tasteMemoryKey = "hubb-last-flavor";
export const tasteMemoryEvent = "hubb:taste-saved";

export function readSavedFlavorId() {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(tasteMemoryKey);
  return saved && flavorById(saved) ? saved : null;
}

export function rememberFlavor(flavorId: string | null) {
  if (typeof window === "undefined") return;
  if (flavorId) window.localStorage.setItem(tasteMemoryKey, flavorId);
  else window.localStorage.removeItem(tasteMemoryKey);
  window.dispatchEvent(new CustomEvent(tasteMemoryEvent, { detail: flavorId }));
}

const subscribeToTaste = (onStoreChange: () => void) => {
  window.addEventListener(tasteMemoryEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(tasteMemoryEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
};

export function useSavedFlavorId() {
  return useSyncExternalStore(subscribeToTaste, readSavedFlavorId, () => null);
}
