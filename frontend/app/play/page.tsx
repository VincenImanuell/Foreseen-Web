"use client";

import { useAccount } from "wagmi";
import { CreateMatch } from "@/components/CreateMatch";
import { Header } from "@/components/Header";
import { MatchList } from "@/components/MatchList";
import { SiteFooter } from "@/components/SiteFooter";
import { Withdraw } from "@/components/Withdraw";
import { useMatches } from "@/components/useMatches";
import { useMounted } from "@/components/useMounted";
import { useMiniPay } from "@/components/useMiniPay";
import { shortAddress } from "@/lib/rps";

const PHASES = [
  ["1 · Matchmake", "Open a CELO match or join one. CELO bets are escrowed on-chain — no move yet."],
  ["2 · Scout", "Read opponent CELO on-chain history from RPSStats. 90s scouting window before commit."],
  ["3 · Commit", "Seal your CELO move as keccak256 hash. Neither side can see the other's throw on CELO."],
  ["4 · Reveal", "Both reveal within 90s on CELO. RPSCore settles & releases CELO to winner."],
];

const ARENA_STATS = [
  ["Network", "CELO mainnet · 42220"],
  ["Windows", "90s scout + 90s reveal"],
  ["Game", "Skill (no RNG)"],
];

const TABLE_RULES = [
  "Match the CELO stake exactly to join on CELO mainnet.",
  "Scout the CELO on-chain history before committing your move.",
  "Reveal before the CELO deadline or forfeit the pot.",
];

const SESSION_CHECKS = [
  "Use the wallet that opened or joined the CELO match.",
  "Keep your CELO reveal salt in this browser session — it cannot be recovered.",
  "Confirm you are on CELO mainnet (chainId 42220) before every wallet action.",
];

export default function Play() {
  const mounted = useMounted();
  const { address, isConnected } = useAccount();
  const { entries, refetch, isLoading } = useMatches();
  const { isMiniPay } = useMiniPay();

  return (
    <main aria-label="CELO Arena — play Foreseen on CELO mainnet">
      <Header />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <section className="mb-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="eyebrow">Live CELO arena</div>
              <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                The CELO arena
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">
                Matchmake on CELO → scout opponent history → commit blind → reveal on CELO.
                No RNG, no house — pure skill. Stakes are real CELO on chainId 42220 — play responsibly.
              </p>
            </div>
            <div className="surface-soft p-4" aria-label="CELO session check">
              <div className="eyebrow">Session check</div>
              <div className="mt-2 rounded-xl border border-white/10 bg-void/35 px-3 py-2">
                <div className="text-[11px] text-slate-500">Wallet</div>
                <div className="mt-1 font-mono text-xs text-slate-300">
                  {mounted && isConnected && address
                    ? shortAddress(address)
                    : isMiniPay
                    ? "MiniPay connecting…"
                    : "Not connected"}
                </div>
              </div>
              <ul role="list" className="mt-3 space-y-2 text-sm text-slate-300">
                {SESSION_CHECKS.map((check) => (
                  <li key={check}>• {check}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 surface-soft p-4" aria-label="CELO match table rules">
            <div className="eyebrow">Table rules</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {TABLE_RULES.map((rule) => (
                <div
                  key={rule}
                  className="rounded-xl border border-white/10 bg-void/35 px-3 py-2 text-sm text-slate-300"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {ARENA_STATS.map(([label, value]) => (
              <div key={label} className="stat-card">
                <div className="text-xs text-slate-500">{label}</div>
                <div className="mt-1 font-display text-lg font-bold">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-4">
            {PHASES.map(([t, d], index) => (
              <div
                key={t}
                className="rounded-xl border border-white/10 bg-panel/60 p-3"
              >
                <div className="mb-2 grid h-7 w-7 place-items-center rounded-full border border-oracle-cyan/20 bg-oracle-cyan/10 font-mono text-[11px] font-bold text-oracle-cyan">
                  {index + 1}
                </div>
                <div className="text-xs font-semibold text-oracle-cyan">{t}</div>
                <div className="mt-1 text-[11px] leading-snug text-slate-400">
                  {d}
                </div>
              </div>
            ))}
          </div>
        </section>

        {mounted && isConnected && (
          <div className="mb-8">
            <Withdraw onChanged={refetch} />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
          <div className="space-y-6">
            <CreateMatch onChanged={refetch} />
          </div>
          <MatchList entries={entries} onChanged={refetch} isLoading={isLoading} />
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
