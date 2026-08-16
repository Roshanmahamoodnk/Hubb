"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const hadController = Boolean(navigator.serviceWorker.controller);
    let refreshing = false;
    const refreshForUpdate = () => {
      if (!hadController || refreshing) return;
      refreshing = true;
      window.location.reload();
    };
    const register = () => {
      void navigator.serviceWorker.register("/sw.js")
        .then((registration) => registration.update())
        .catch(() => undefined);
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
    navigator.serviceWorker.addEventListener("controllerchange", refreshForUpdate);
    return () => {
      window.removeEventListener("load", register);
      navigator.serviceWorker.removeEventListener("controllerchange", refreshForUpdate);
    };
  }, []);
  return null;
}

function ReadyCue() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="site-ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 8 }} role="status" aria-live="polite">
          <i aria-hidden="true" /><small>READY TO CRACK · جاهز</small>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function PointerHalo() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 520, damping: 42, mass: 0.25 });
  const y = useSpring(rawY, { stiffness: 520, damping: 42, mass: 0.25 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const sync = () => setEnabled(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor]") : null;
      setLabel(target?.dataset.cursor ?? "");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;
  return (
    <motion.div className={`pointer-halo ${visible ? "is-visible" : ""} ${label ? "is-labelled" : ""}`} style={{ x, y }} aria-hidden="true">
      <span>{label}</span>
    </motion.div>
  );
}

function ScrollSignal() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-signal" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

function InstallPrompt() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [iosHelp, setIosHelp] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    if (standalone) return;
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const iosSync = window.setTimeout(() => setIsIos(ios), 0);
    const dismissedAt = Number(window.localStorage.getItem("hubb-install-dismissed") || 0);
    const recentlyDismissed = Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000;
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
      if (!recentlyDismissed) window.setTimeout(() => setShow(true), 4500);
    };
    const onInstalled = () => { setShow(false); setPrompt(null); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (ios && !recentlyDismissed) window.setTimeout(() => setShow(true), 6000);
    return () => {
      window.clearTimeout(iosSync);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = async () => {
    if (prompt) {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      setShow(choice.outcome !== "accepted");
      setPrompt(null);
      return;
    }
    if (isIos) setIosHelp(true);
  };

  const dismiss = () => {
    window.localStorage.setItem("hubb-install-dismissed", String(Date.now()));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.aside className="install-prompt" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} role="status">
          <button className="install-close" onClick={dismiss} aria-label="Dismiss install prompt">×</button>
          <img src="/icons/hubb-192.png" alt="" />
          <div><b>خلّ حُبّ قريب.</b><span>KEEP HUBB CLOSE</span>{iosHelp ? <small>Tap Share, then “Add to Home Screen”.</small> : <small>Your flavors and bag, one tap away.</small>}</div>
          <button className="install-action" onClick={install}>{iosHelp ? "GOT IT" : "ADD"}</button>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

export function ExperienceLayer() {
  return (
    <>
      <ServiceWorkerRegister />
      <ReadyCue />
      <PointerHalo />
      <ScrollSignal />
      <InstallPrompt />
    </>
  );
}
