"use client";

import { useQuery } from "@tanstack/react-query";
import { MOVE_NAME, type Move } from "@foreseen/sdk";
import { type Address, getAddress, isAddress } from "viem";
import { foreseen } from "@/lib/sdk";
import { shortAddress } from "@/lib/rps";

const MOVE_EMOJI: Record<number, string> = { 1: "🪨", 2: "📄", 3: "✂️" };

function moveLabel(m: Move | null): string {
  return m ? `${MOVE_EMOJI[m] ?? ""} ${MOVE_NAME[m] ?? "—"}`.trim() : "—";
}

function Bar({ label, emoji, pct }: { label: string; emoji: string; pct: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span>
          {emoji} {label}
        </span>
        <span className="font-mono text-slate-400">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-oracle-purple to-oracle-cyan transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Tell({ when, move }: { when: string; move: Move | null }) {
  return (
    <div className="rounded-lg border border-white/10 bg-void/40 px-3 py-2 text-xs text-slate-300">
      After a {when}:{" "}
      {move ? (
        <span className="font-semibold text-oracle-gold">{moveLabel(move)}</span>
      ) : (
        <span className="italic text-slate-500">no pattern yet</span>
      )}
    </div>
  );
}

/**
 * Full scouting report for one address, read through `@foreseen/sdk`'s
 * `analyzeOpponent` — the same call a bot or another dapp would make. Pure
 * read, no wallet needed.
 */
export function ScoutCard({ address }: { address: string }) {
  const valid = isAddress(address);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["scout", address.toLowerCase()],
    queryFn: () => foreseen.analyzeOpponent(getAddress(address) as Address),
    enabled: valid,
    staleTime: 30_000,
  });

  if (!valid) {
    return (
      <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.04] p-6 text-sm text-rose-200">
        <span className="font-mono">{address}</span> is not a valid address.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-oracle-cyan/20 bg-oracle-cyan/[0.04] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-oracle-cyan">
          🔍 Scouting report
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          {shortAddress(getAddress(address) as Address)}
          <a
            href={`https://celoscan.io/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-oracle-cyan"
          >
            ↗
          </a>
        </div>
      </div>

      {isLoading && (
        <div className="py-10 text-center text-sm text-slate-500">
          Reading on-chain history via <code className="text-oracle-cyan">@foreseen/sdk</code>…
        </div>
      )}

      {isError && (
        <div className="py-10 text-center text-sm text-rose-300">
          Couldn&apos;t read this player&apos;s history right now. Try again.
        </div>
      )}

      {!isLoading && !isError && data && (
        <div className="space-y-5">
          {Number(data.stats.totalMatches) === 0 ? (
            <p className="text-sm text-slate-400">
              No revealed matches yet — a blank slate. No tells to read; their first
              throws here are pure guesswork.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-emerald-300">{data.stats.wins.toString()}W</span>
                <span className="text-rose-300">{data.stats.losses.toString()}L</span>
                <span className="text-slate-400">{data.stats.draws.toString()}D</span>
                <span className="font-mono text-oracle-gold">
                  {Math.round(data.winRate * 100)}% win
                </span>
                <span className="ml-auto text-xs text-slate-500">
                  {data.stats.totalMatches.toString()} revealed
                </span>
              </div>

              <div className="space-y-2">
                <Bar label="Rock" emoji="🪨" pct={data.distribution.rock} />
                <Bar label="Paper" emoji="📄" pct={data.distribution.paper} />
                <Bar label="Scissors" emoji="✂️" pct={data.distribution.scissors} />
              </div>

              <div className="space-y-1.5">
                <Tell when="win" move={data.tells.afterWin} />
                <Tell when="loss" move={data.tells.afterLoss} />
                <Tell when="draw" move={data.tells.afterDraw} />
              </div>

              <div className="rounded-xl border border-oracle-gold/25 bg-oracle-gold/[0.05] px-4 py-3 text-sm">
                <span className="text-slate-400">Favorite throw: </span>
                <span className="font-semibold">{moveLabel(data.dominantMove)}</span>
                {data.suggestedCounter && (
                  <>
                    <span className="text-slate-400"> · counter with </span>
                    <span className="font-semibold text-oracle-gold">
                      {moveLabel(data.suggestedCounter)}
                    </span>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <p className="mt-4 text-[11px] leading-snug text-slate-600">
        Read live from <code>RPSStats</code> on Celo mainnet via{" "}
        <code className="text-slate-400">@foreseen/sdk</code> — distribution, tells
        and suggested counter come straight from the package&apos;s{" "}
        <code>analyzeOpponent</code>.
      </p>
    </div>
  );
}
