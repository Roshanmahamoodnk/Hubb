"use client";

import { HowToCrack } from "@/components/how-to-crack";
import { ProcessChapter } from "@/components/process-chapter";
import { ComparisonGrid } from "@/components/comparison-grid";
import { HubbFaq } from "@/components/hubb-faq";
import { ChannelStory } from "@/components/channel-story";
import { useLanguage } from "@/lib/language";
import { PROCESS } from "@/lib/catalog";

export function HowItWorksExperience() {
  const { t } = useLanguage();
  return (
    <main className="page-main how-page">
      <header className="how-hero">
        <p>{t("كيف تطقّها", "HOW TO CRACK")}</p>
        <h1>{PROCESS.heroAr}<br /><em>{PROCESS.heroEn}</em></h1>
        <blockquote>{PROCESS.promiseAr} / {PROCESS.promiseEn}</blockquote>
      </header>
      <HowToCrack />
      <ProcessChapter />
      <ComparisonGrid />
      <ChannelStory />
      <HubbFaq />
    </main>
  );
}
