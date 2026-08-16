import type { Metadata } from "next";
import Link from "next/link";
import { journalPosts } from "@/lib/journal";

export const metadata: Metadata = { title: "The Crack Journal", description: "Sunflower-seed guides, Saudi snack rituals and the craft behind a clean crack.", alternates: { canonical: "/journal" } };
export default function JournalPage() { return <main className="page-main journal-page"><header><p>THE CRACK JOURNAL · مجلة حُبّ</p><h1>READ THE<br /><em>RITUAL.</em></h1></header><div className="journal-index">{journalPosts.map((post, index) => <Link href={`/journal/${post.slug}`} key={post.slug}><span>0{index + 1}</span><div><p>{post.eyebrow}</p><h2>{post.titleAr}</h2><h3>{post.title}</h3><blockquote>{post.excerpt}</blockquote></div><small>{post.readingTime}<br />READ ↗</small></Link>)}</div></main>; }
