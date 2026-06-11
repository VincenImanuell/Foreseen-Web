// Ranked-progression decoding + tier metadata, mirroring contracts/src/RPSRanked.sol.
// The streak thresholds here MUST match the on-chain constants so the UI labels a
// player with the exact tier the contract would.

export enum Rank {
  Bronze = 0,
  Silver = 1,
  Gold = 2,
  Platinum = 3,
  Legend = 4,
}

export type RankMeta = {
  rank: Rank;
  label: string;
  emoji: string;
  /** Tailwind/CSS color used for the badge accent. */
  color: string;
  /** Win streak required to reach this tier (matches RPSRanked thresholds). */
  minStreak: number;
};

export const RANKS: RankMeta[] = [
  { rank: Rank.Bronze, label: "Bronze", emoji: "🥉", color: "#cd7f32", minStreak: 0 },
  { rank: Rank.Silver, label: "Silver", emoji: "🥈", color: "#c0c0c0", minStreak: 5 },
  { rank: Rank.Gold, label: "Gold", emoji: "🥇", color: "#f5c451", minStreak: 10 },
  { rank: Rank.Platinum, label: "Platinum", emoji: "💎", color: "#37e6ff", minStreak: 20 },
  { rank: Rank.Legend, label: "Legend", emoji: "👑", color: "#7c5cff", minStreak: 50 },
];

export function rankMeta(rank: Rank): RankMeta {
  return RANKS[rank] ?? RANKS[0];
}

export function rankLabel(rank: Rank): string {
  return rankMeta(rank).label;
}

// ---- Progress shape decoded from RPSRanked.getProgress() -------------------

export type RpsProgress = {
  streak: bigint;
  longestStreak: bigint;
  wins: bigint;
  losses: bigint;
  draws: bigint;
  rankReached: [bigint, bigint, bigint, bigint, bigint];
  currentRank: Rank;
  peakRank: Rank;
  active: boolean;
};

/** Normalize the struct viem returns from getProgress(). */
export function toRpsProgress(raw: any): RpsProgress {
  return {
    streak: BigInt(raw.streak),
    longestStreak: BigInt(raw.longestStreak),
    wins: BigInt(raw.wins),
    losses: BigInt(raw.losses),
    draws: BigInt(raw.draws),
    rankReached: [
      BigInt(raw.rankReached[0]),
      BigInt(raw.rankReached[1]),
      BigInt(raw.rankReached[2]),
      BigInt(raw.rankReached[3]),
      BigInt(raw.rankReached[4]),
    ],
    currentRank: Number(raw.currentRank) as Rank,
    peakRank: Number(raw.peakRank) as Rank,
    active: Boolean(raw.active),
  };
}

/** Streak payout multiplier as a human label, e.g. "1.25x". Mirrors multiplierBps. */
export function multiplierLabel(bps: bigint | number): string {
  const x = Number(bps) / 10_000;
  return `${x.toFixed(x % 1 === 0 ? 0 : 2)}x`;
}
