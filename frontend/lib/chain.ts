import { defineChain } from "viem";

const rpcUrl =
  process.env.NEXT_PUBLIC_CELO_RPC ?? "https://forno.celo.org";

/**
 * CELO mainnet (chainId 42220) — the Foreseen contracts are deployed and live here.
 * Override RPC with NEXT_PUBLIC_CELO_RPC env var; default is forno.celo.org (free public CELO RPC).
 * Block explorer: celoscan.io — use for verifying CELO txs and contract state.
 * Defined by hand (rather than importing from viem/chains) so the CELO config never
 * drifts with the installed viem version. sourceId=1 indicates CELO L2 is settled to Ethereum.
 */
export const celo = defineChain({
  id: 42220,
  name: "CELO",
  nativeCurrency: { name: "CELO", symbol: "CELO", decimals: 18 },
  rpcUrls: {
    default: { http: [rpcUrl] },
  },
  blockExplorers: {
    default: {
      name: "Celoscan",
      url: "https://celoscan.io",
    },
  },
  testnet: false,
  sourceId: 1,
});
