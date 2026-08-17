"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type BrowserConnection = EventTarget & { saveData?: boolean };

export function useCinemaPolicy() {
  const reducedMotion = Boolean(useReducedMotion());
  const [isMobile, setIsMobile] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 720px)");
    const connection = (navigator as Navigator & { connection?: BrowserConnection }).connection;
    const sync = () => {
      setIsMobile(mobileQuery.matches);
      setSaveData(Boolean(connection?.saveData));
    };
    sync();
    mobileQuery.addEventListener("change", sync);
    connection?.addEventListener("change", sync);
    return () => {
      mobileQuery.removeEventListener("change", sync);
      connection?.removeEventListener("change", sync);
    };
  }, []);

  return { reducedMotion, isMobile, saveData };
}

export function formatFilmTime(value: number) {
  const seconds = Math.max(0, Math.floor(value));
  return `00:${String(seconds).padStart(2, "0")}`;
}
