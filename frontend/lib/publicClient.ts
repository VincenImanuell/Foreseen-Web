import { createPublicClient, http } from "viem";
import { celo } from "./chain";

/**
 * A read-only viem client for the leaderboard and player pages.
 *
 * The play flow uses wagmi (wallet-bound), but the leaderboard is a public,
 * signed-out view: anyone can browse the standings without connecting a wallet.
 * Multicall batching is enabled so reading stats for hundreds of players collapses
 * into a handful of RPC round-trips.
 */
export const publicClient = createPublicClient({
  chain: celo,
  transport: http(),
  batch: {
    multicall: { wait: 16, batchSize: 1024 },
  },
});
