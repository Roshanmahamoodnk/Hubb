"use client";

import Link from "next/link";
import { useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/components/cart-provider";
import { flavors, formatSar } from "@/lib/catalog";

const questions = [
  { en: "Choose the energy.", ar: "اختر الطاقة.", options: [{ label: "CLEAN & EASY", scores: [0, 0, 0, 0, 0, 0, 0] }, { label: "BRIGHT & LOUD", scores: [1, 4, 2, 1, 0, 2, 0] }, { label: "DARK & FOCUSED", scores: [1, 0, 0, 1, 3, 1, 4] }] },
  { en: "Where are you cracking?", ar: "أين ستكون القرمشة؟", options: [{ label: "MATCH NIGHT", scores: [4, 2, 4, 2, 0, 0, 1] }, { label: "MAJLIS", scores: [2, 1, 1, 4, 4, 0, 1] }, { label: "CAFE / STUDY", scores: [1, 1, 0, 1, 2, 4, 4] }] },
  { en: "How much heat?", ar: "كم مستوى الحرارة؟", options: [{ label: "ZERO", scores: [2, 2, 0, 1, 2, 3, 3] }, { label: "A WARM HUM", scores: [1, 1, 2, 4, 1, 1, 1] }, { label: "MAKE IT HIT", scores: [0, 0, 5, 2, 0, 0, 0] }] },
  { en: "Pick a finish.", ar: "اختر النهاية.", options: [{ label: "SALTY", scores: [4, 4, 3, 2, 0, 1, 0] }, { label: "AROMATIC", scores: [1, 2, 1, 4, 5, 4, 3] }, { label: "ROASTED", scores: [4, 1, 2, 3, 5, 2, 5] }] },
];

export function TasteLab() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>(Array(7).fill(0));
  const { add } = useCart();
  const resultIndex = useMemo(() => scores.indexOf(Math.max(...scores)), [scores]);
  const result = flavors[resultIndex < 0 ? 0 : resultIndex];
  const answer = (next: number[]) => { setScores((current) => current.map((value, index) => value + next[index])); setStep((value) => value + 1); };
  const reset = () => { setStep(0); setScores(Array(7).fill(0)); };
  return (
    <main className="page-main taste-lab-page" style={{ "--result": result.color } as CSSProperties}>
      <div className="lab-intro"><span>TASTE LAB / مختبر النكهة</span><h1>FOUR QUESTIONS.<br /><em>ONE CRACK.</em></h1><p>No horoscope. No filler. Just the flavor profile that fits your heat, roast and ritual.</p></div>
      <div className="lab-machine">
        <div className="lab-progress">{questions.map((_, index) => <i key={index} className={index < step ? "is-done" : index === step ? "is-active" : ""} />)}</div>
        <AnimatePresence mode="wait">
          {step < questions.length ? <motion.section key={step} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
            <span>0{step + 1} / 04</span><h2 lang="ar">{questions[step].ar}</h2><h3>{questions[step].en}</h3><div>{questions[step].options.map((option, index) => <button onClick={() => answer(option.scores)} key={option.label}><i>0{index + 1}</i><b>{option.label}</b><span>↗</span></button>)}</div>
          </motion.section> : <motion.section className="lab-result" key="result" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }}>
            <div><span>YOUR CRACK IS</span><h2>{result.ar}</h2><h3>{result.en}</h3><p>{result.noteEn}</p><div><button onClick={() => add(result.id)}>ADD TO BAG <b>{formatSar(result.priceSar)}</b></button><Link href={`/flavors/${result.id}`}>ENTER THE FLAVOR ↗</Link></div><button className="lab-reset" onClick={reset}>RETAKE ↻</button></div><img src={result.image} alt={`Your flavor is ${result.en}`} />
          </motion.section>}
        </AnimatePresence>
      </div>
    </main>
  );
}
