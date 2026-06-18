import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { celo } from "./chain";

/**
 * wagmi config for CELO mainnet. We use the `injected` connector only — it covers MetaMask,
 * MiniPay (CELO's wallet, detectable via `window.ethereum.isMiniPay`), and any
 * EIP-1193 browser wallet, with zero external accounts or WalletConnect project
 * ids required (keeps the demo free & signup-less).
 *
 * MiniPay auto-connects the wallet — see `useMiniPay` hook in components/.
 */
export const wagmiConfig = createConfig({
  chains: [celo],
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [celo.id]: http(),
  },
  ssr: true,
  // CELO mainnet — chainId 42220 is the only supported network
  multiInjectedProviderDiscovery: false,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
