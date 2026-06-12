"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Mode, type MatchView } from "@foreseen/sdk";
import { formatEther } from "viem";
import { foreseen } from "@/lib/sdk";
import { shortAddress } from "@/lib/rps";

function fmtCelo(wei: bigint): string {
  const s = formatEther(wei);
  // Trim to 4 decimals max, drop trailing zeros.
  const n = Number(s);
  return n.toLocaleString(undefined, { maximumFractionDigits: 4 });
}

function LobbySkeleton() {
  return (
    <div className="space-y-2 py-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="h-11 animate-pulse rounded-xl bg-white/[0.06]" />
      ))}
    </div>
  );
}

/**
 * Live lobby of matches waiting for an opponent, read through `@foreseen/sdk`'s
 * `getOpenMatches`. Wallet-free: anyone can watch the table fill. To actually
 * join, head to the app.
 */
export function OpenMatches() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["open-matches"],
    queryFn: () => foreseen.getOpenMatches({ limit: 20 }),
    staleTime: 10_000,
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/60 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-oracle-cyan">
          ⚔️ Waiting for an opponent
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="focus-ring rounded-lg border border-white/10 px-2.5 py-1 text-[11px] text-slate-400 transition hover:text-white disabled:opacity-50"
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {isLoading && (
        <LobbySkeleton />
      )}

      {isError && (
        <div className="py-10 text-center text-sm text-rose-300">
          Couldn&apos;t read open matches right now. Try refresh.
        </div>
      )}

      {!isLoading && !isError && data && data.length === 0 && (
        <div className="py-10 text-center text-sm text-slate-400">
          No open matches right now. Open one in the app to get the board moving.
        </div>
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <ul className="space-y-2">
          {data.map((m: MatchView) => (
            <li
              key={m.id.toString()}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-void/40 px-3 py-2.5"
            >
              <span className="font-mono text-[11px] text-slate-500">
                #{m.id.toString()}
              </span>
              <Link
                href={`/player/${m.playerA}`}
                className="font-mono text-xs text-slate-300 hover:text-oracle-cyan"
                title="Scout the opener"
              >
                {shortAddress(m.playerA)} 🔍
              </Link>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  m.mode === Mode.Ranked
                    ? "bg-oracle-gold/15 text-oracle-gold"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {m.mode === Mode.Ranked ? "ranked" : "casual"}
              </span>
              <span className="ml-auto font-mono text-sm text-emerald-300">
                {fmtCelo(m.bet)} CELO
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-4 flex items-center justify-between text-[11px] text-slate-600">
        <span>
          Read live via <code className="text-slate-400">@foreseen/sdk</code>{" "}
          <code>getOpenMatches</code>.
        </span>
        <Link href="/play" className="text-oracle-cyan hover:underline">
          Join in the app →
        </Link>
      </p>
    </div>
  );
}
