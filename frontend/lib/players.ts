import type { Address } from "viem";
import { rpsCore } from "./contracts";
import { ZERO_ADDRESS } from "./rps";
import { publicClient } from "./publicClient";

/**
 * Discover every address that has ever played Foreseen.
 *
 * RPSStats/RPSRanked keep per-player stats in mappings with no on-chain
 * enumeration, so the only way to build a leaderboard is to find the players
 * first. We do that by reading the match log: `nextMatchId` bounds the id space,
 * and each match records `playerA` (creator) and `playerB` (joiner). Scanning
 * `getMatch` over that range — instead of `getLogs` — keeps us off RPC log-range
 * limits and reuses the multicall batching already configured on the client.
 */

/** Max matches to scan, newest-first, so a long-lived contract can't unbound the read. */
const MAX_MATCHES = 2_000;
/** Matches per multicall chunk, to stay under a single eth_call gas ceiling. */
const CHUNK = 400;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

export async function discoverPlayers(
  client = publicClient,
): Promise<Address[]> {
  const next = await client.readContract({
    ...rpsCore,
    functionName: "nextMatchId",
  });

  const total = Number(next);
  if (total === 0) return [];

  const start = Math.max(0, total - MAX_MATCHES);
  const ids = Array.from({ length: total - start }, (_, i) => BigInt(start + i));

  const players = new Set<string>();
  for (const ids_ of chunk(ids, CHUNK)) {
    const results = await client.multicall({
      contracts: ids_.map((id) => ({
        ...rpsCore,
        functionName: "getMatch" as const,
        args: [id] as const,
      })),
      allowFailure: true,
    });

    for (const res of results) {
      if (res.status !== "success" || !res.result) continue;
      const m = res.result as { playerA: Address; playerB: Address };
      if (m.playerA && m.playerA !== ZERO_ADDRESS) players.add(m.playerA.toLowerCase());
      if (m.playerB && m.playerB !== ZERO_ADDRESS) players.add(m.playerB.toLowerCase());
    }
  }

  return Array.from(players) as Address[];
}
