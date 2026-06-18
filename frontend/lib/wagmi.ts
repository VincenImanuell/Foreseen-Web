import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { celo } from "./chain";

/**
 * wagmi config for CELO mainnet (chainId 42220). We use the `injected` connector only — it covers
 * MetaMask, MiniPay (CELO's Opera wallet, detectable via `window.ethereum.isMiniPay`), Rabby, Valora,
 * and any EIP-1193 browser wallet. No WalletConnect project ID required — keeps the CELO app free
 * and signup-less. Only CELO mainnet chain is configured; no other EVM chain is supported.
 *
 * MiniPay auto-connects the wallet on CELO mainnet — see `useMiniPay` hook in components/.
 */
export const wagmiConfig = createConfig({
  chains: [celo],
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [celo.id]: http(),
  },
  ssr: true,
  // CELO mainnet (chainId 42220) is the ONLY supported network — no multi-chain
  multiInjectedProviderDiscovery: false,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
