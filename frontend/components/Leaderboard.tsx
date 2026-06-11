"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { dominantMove, MOVE_NAME, type PlayerStats } from "@foreseen/sdk";
import { type Address, getAddress } from "viem";
import { foreseen } from "@/lib/sdk";
import { shortAddress } from "@/lib/rps";

const ZERO = "0x0000000000000000000000000000000000000000";
/** How many recent matches to scan for players. Keeps RPC load bounded. */
const SCAN_LIMIT = 80;

type Row = {
  address: Address;
  stats: PlayerStats;
  /** 0..1 over decided (non-draw) matches. */
  winRate: number;
  favorite: string;
};

/**
 * Build the leaderboard entirely through `@foreseen/sdk`: walk recent matches to
 * collect players, then pull each player's tamper-proof on-chain stats and rank
 * by wins. No local ABIs, no direct contract calls — this is the SDK dogfooding.
 */
async function buildLeaderboard(): Promise<Row[]> {
  const next = await foreseen.nextMatchId();
  const players = new Set<string>();

  let scanned = 0;
  for (let id = next - 1n; id >= 0n && scanned < SCAN_LIMIT; id--, scanned++) {
    const m = await foreseen.getMatch(id);
    for (const p of [m.playerA, m.playerB]) {
      if (p && p.toLowerCase() !== ZERO) players.add(getAddress(p));
    }
  }

  const rows = await Promise.all(
    [...players].map(async (address): Promise<Row> => {
      const stats = await foreseen.getPlayerStats(address as Address);
      const decided = Number(stats.wins + stats.losses);
      const dom = dominantMove(stats.moveCount);
      return {
        address: address as Address,
        stats,
        winRate: decided === 0 ? 0 : Number(stats.wins) / decided,
        favorite: dom ? (MOVE_NAME[dom] ?? "—") : "—",
      };
    }),
  );

  return rows
    .filter((r) => r.stats.totalMatches > 0n)
    .sort(
      (a, b) =>
        Number(b.stats.wins - a.stats.wins) ||
        b.winRate - a.winRate ||
        Number(b.stats.totalMatches - a.stats.totalMatches),
    );
}

const MEDAL = ["🥇", "🥈", "🥉"];

export function Leaderboard() {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["sdk-leaderboard"],
    queryFn: buildLeaderboard,
    staleTime: 30_000,
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/60 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-oracle-cyan">
          🏆 Ranked by wins
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg border border-white/10 px-2.5 py-1 text-[11px] text-slate-400 transition hover:text-white disabled:opacity-50"
        >
          {isFetching ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {isLoading && (
        <div className="py-10 text-center text-sm text-slate-500">
          Reading the chain via <code className="text-oracle-cyan">@foreseen/sdk</code>…
        </div>
      )}

      {isError && (
        <div className="py-10 text-center text-sm text-rose-300">
          Couldn&apos;t read on-chain stats right now. Try refresh.
        </div>
      )}

      {!isLoading && !isError && data && data.length === 0 && (
        <div className="py-10 text-center text-sm text-slate-400">
          No revealed matches yet. Be the first to leave a record on-chain.
        </div>
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                <th className="pb-2 pr-2 font-medium">#</th>
                <th className="pb-2 pr-2 font-medium">Player</th>
                <th className="pb-2 pr-2 text-right font-medium">W–L–D</th>
                <th className="pb-2 pr-2 text-right font-medium">Win%</th>
                <th className="hidden pb-2 pr-2 text-right font-medium sm:table-cell">
                  Favorite
                </th>
                <th className="pb-2 text-right font-medium">Matches</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.map((r, i) => (
                <tr key={r.address} className="text-slate-200">
                  <td className="py-2.5 pr-2 font-mono text-slate-400">
                    {MEDAL[i] ?? i + 1}
                  </td>
                  <td className="py-2.5 pr-2">
                    <Link
                      href={`/player/${r.address}`}
                      className="font-mono text-xs text-slate-300 hover:text-oracle-cyan"
                      title="View scouting report"
                    >
                      {shortAddress(r.address)} 🔍
                    </Link>
                  </td>
                  <td className="py-2.5 pr-2 text-right font-mono text-xs">
                    <span className="text-emerald-300">{r.stats.wins.toString()}</span>
                    <span className="text-slate-600">–</span>
                    <span className="text-rose-300">{r.stats.losses.toString()}</span>
                    <span className="text-slate-600">–</span>
                    <span className="text-slate-400">{r.stats.draws.toString()}</span>
                  </td>
                  <td className="py-2.5 pr-2 text-right font-mono text-oracle-gold">
                    {Math.round(r.winRate * 100)}%
                  </td>
                  <td className="hidden py-2.5 pr-2 text-right text-xs text-slate-400 sm:table-cell">
                    {r.favorite}
                  </td>
                  <td className="py-2.5 text-right font-mono text-xs text-slate-500">
                    {r.stats.totalMatches.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-[11px] leading-snug text-slate-600">
        Stats are read directly from <code>RPSStats</code> on Celo mainnet through
        the published <code className="text-slate-400">@foreseen/sdk</code> client —
        no backend, no indexer. Scans the most recent {SCAN_LIMIT} matches for
        players.
      </p>
    </div>
  );
}
