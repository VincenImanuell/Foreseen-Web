import { Foreseen } from "@foreseen/sdk";
import { RPS_CORE_ADDRESS, RPS_STATS_ADDRESS } from "./contracts";

const rpcUrl = process.env.NEXT_PUBLIC_CELO_RPC ?? "https://forno.celo.org";

/**
 * Read-only Foreseen SDK client (no private key) — the very same `@foreseen/sdk`
 * published to npm. Powers the SDK-driven leaderboard and scouting reads.
 * Addresses are taken from the app's contract config so they never drift from
 * the rest of the dapp.
 */
export const foreseen = new Foreseen({
  network: "celo",
  rpcUrl,
  coreAddress: RPS_CORE_ADDRESS,
  statsAddress: RPS_STATS_ADDRESS,
});
