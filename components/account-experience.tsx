"use client";

import { FormEvent, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function AccountExperience() {
  const client = getSupabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { if (!client) return; client.auth.getUser().then(({ data }) => setUser(data.user)); const { data } = client.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null)); return () => data.subscription.unsubscribe(); }, [client]);
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!client) { setStatus("A dedicated HUBB Supabase project must be connected before accounts can go live."); return; } const form = new FormData(event.currentTarget); const email = String(form.get("email")); const password = String(form.get("password")); setBusy(true); setStatus(""); const result = mode === "signup" ? await client.auth.signUp({ email, password }) : await client.auth.signInWithPassword({ email, password }); setBusy(false); setStatus(result.error?.message || (mode === "signup" ? "Check your email to confirm your First Crack Club account." : "Welcome back.")); };
  if (user) return <main className="page-main account-page"><header><p>FIRST CRACK CLUB · نادي القرمشة الأولى</p><h1>WELCOME<br /><em>BACK.</em></h1></header><section className="account-card"><span>ACTIVE MEMBER</span><h2>{user.email}</h2><p>Orders, launch drops and saved flavor preferences will live here when commerce is connected.</p><button onClick={() => client?.auth.signOut()}>SIGN OUT ↗</button></section></main>;
  return <main className="page-main account-page"><header><p>FIRST CRACK CLUB · نادي القرمشة الأولى</p><h1>GET THE DROP<br /><em>BEFORE THE FEED.</em></h1><blockquote>Early flavors. Saved orders. Real film from the next shoot.</blockquote></header><section className="account-auth"><div><p>{mode === "signin" ? "MEMBER SIGN IN" : "CREATE ACCOUNT"}</p><h2>{mode === "signin" ? "رجعت لنا؟" : "أهلًا بك في النادي"}</h2><form onSubmit={submit}><label>EMAIL<input type="email" name="email" autoComplete="email" required placeholder="you@example.com" /></label><label>PASSWORD<input type="password" name="password" minLength={8} autoComplete={mode === "signin" ? "current-password" : "new-password"} required placeholder="8+ characters" /></label><button disabled={busy}>{busy ? "CONNECTING…" : mode === "signin" ? "SIGN IN ↗" : "JOIN THE CLUB ↗"}</button></form>{status && <p className="form-status">{status}</p>}<button className="mode-switch" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "NEW HERE? CREATE ACCOUNT" : "ALREADY A MEMBER? SIGN IN"}</button></div><aside><span>MEMBER SIGNAL 01</span><h3>Save the flavor that feels like you.</h3><span>MEMBER SIGNAL 02</span><h3>See every order and reorder in one crack.</h3><span>MEMBER SIGNAL 03</span><h3>Enter new drops before they go public.</h3></aside></section></main>;
}
