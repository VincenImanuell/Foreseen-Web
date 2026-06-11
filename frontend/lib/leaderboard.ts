import type { Address } from "viem";
import { rpsRanked, rpsStats } from "./contracts";
import { toRpsStats } from "./rps";
import { Rank, toRpsProgress } from "./ranked";
import { discoverPlayers } from "./players";
import { publicClient } from "./publicClient";

/** One ranked row in the leaderboard, flattened from RPSStats + RPSRanked. */
export type LeaderboardEntry = {
  address: Address;
  totalMatches: number;
  wins: number;
  losses: number;
  draws: number;
  winRatePct: number;
  currentRank: Rank;
  peakRank: Rank;
  streak: number;
  longestStreak: number;
};

export type SortKey = "wins" | "winRate" | "streak" | "rank" | "matches";

/** Min matches a player needs before win-rate sorting trusts them (anti-noise). */
const WIN_RATE_MIN_MATCHES = 5;

/**
 * Build the full leaderboard: discover players, then batch-read each player's
 * behavioral stats and ranked progress in a single multicall. Returns rows for
 * everyone with at least one recorded match, unsorted (call {@link sortEntries}).
 */
export async function fetchLeaderboard(
  client = publicClient,
): Promise<LeaderboardEntry[]> {
  const players = await discoverPlayers(client);
  if (players.length === 0) return [];

  // 3 reads per player, kept in a stable order so we can stride the results.
  const contracts = players.flatMap((player) => [
    { ...rpsStats, functionName: "getStats" as const, args: [player] as const },
    { ...rpsStats, functionName: "winRateBps" as const, args: [player] as const },
    { ...rpsRanked, functionName: "getProgress" as const, args: [player] as const },
  ]);

  const results = await client.multicall({ contracts, allowFailure: true });

  const entries: LeaderboardEntry[] = [];
  players.forEach((address, i) => {
    const statsRes = results[i * 3];
    const rateRes = results[i * 3 + 1];
    const progRes = results[i * 3 + 2];
    if (statsRes?.status !== "success" || !statsRes.result) return;

    const s = toRpsStats(statsRes.result);
    const totalMatches = Number(s.totalMatches);
    if (totalMatches === 0) return; // never actually played

    const winRatePct =
      rateRes?.status === "success" ? Number(rateRes.result) / 100 : 0;
    const prog =
      progRes?.status === "success" && progRes.result
        ? toRpsProgress(progRes.result)
        : null;

    entries.push({
      address,
      totalMatches,
      wins: Number(s.wins),
      losses: Number(s.losses),
      draws: Number(s.draws),
      winRatePct,
      currentRank: prog?.currentRank ?? Rank.Bronze,
      peakRank: prog?.peakRank ?? Rank.Bronze,
      streak: prog ? Number(prog.streak) : 0,
      longestStreak: prog ? Number(prog.longestStreak) : 0,
    });
  });

  return entries;
}

/** Sort a copy of the entries by the chosen column (always descending). */
export function sortEntries(
  entries: LeaderboardEntry[],
  key: SortKey,
): LeaderboardEntry[] {
  const rows = [...entries];
  switch (key) {
    case "winRate":
      return rows.sort((a, b) => {
        const aOk = a.totalMatches >= WIN_RATE_MIN_MATCHES;
        const bOk = b.totalMatches >= WIN_RATE_MIN_MATCHES;
        if (aOk !== bOk) return aOk ? -1 : 1;
        return b.winRatePct - a.winRatePct || b.wins - a.wins;
      });
    case "streak":
      return rows.sort(
        (a, b) => b.longestStreak - a.longestStreak || b.streak - a.streak,
      );
    case "rank":
      return rows.sort((a, b) => b.peakRank - a.peakRank || b.wins - a.wins);
    case "matches":
      return rows.sort((a, b) => b.totalMatches - a.totalMatches);
    case "wins":
    default:
      return rows.sort(
        (a, b) =>
          b.wins - a.wins ||
          b.winRatePct - a.winRatePct ||
          b.totalMatches - a.totalMatches,
      );
  }
}
