import { Foreseen } from "@foreseen/sdk";
import { RPS_CORE_ADDRESS, RPS_STATS_ADDRESS } from "./contracts";

const rpcUrl = process.env.NEXT_PUBLIC_CELO_RPC ?? "https://forno.celo.org";

/**
 * Read-only Foreseen SDK client for CELO mainnet (chainId 42220) — the very same `@foreseen/sdk`
 * published to npm. Powers the SDK-driven CELO leaderboard and scouting reads.
 * RPC defaults to forno.celo.org; override with NEXT_PUBLIC_CELO_RPC env var.
 * Addresses are taken from the app's CELO contract config so they never drift from
 * the rest of the CELO dapp.
 */
export const foreseen = new Foreseen({
  network: "celo",
  rpcUrl,
  coreAddress: RPS_CORE_ADDRESS,
  statsAddress: RPS_STATS_ADDRESS,
});
