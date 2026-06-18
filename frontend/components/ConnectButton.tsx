"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { celo } from "@/lib/chain";
import { shortAddress } from "@/lib/rps";
import { useMounted } from "./useMounted";
import { useMiniPay } from "./useMiniPay";

export function ConnectButton() {
  const mounted = useMounted();
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { isMiniPay } = useMiniPay();

  if (!mounted) {
    return <div className="h-9 w-32 animate-pulse rounded-xl bg-white/5" />;
  }

  // MiniPay auto-connects — no manual connect button needed.
  if (!isConnected && isMiniPay) {
    return <div className="h-9 w-32 animate-pulse rounded-xl bg-white/5" />;
  }

  if (!isConnected) {
    const injected = connectors[0];
    return (
      <button
        type="button"
        className="btn-primary"
        disabled={!injected || isPending}
        aria-busy={isPending}
        aria-label={isPending ? "Connecting CELO wallet…" : "Connect CELO wallet"}
        onClick={() => injected && connect({ connector: injected })}
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
      </button>
    );
  }

  if (chainId !== celo.id) {
    return (
      <button
        type="button"
        className="btn-gold"
        aria-label="Switch wallet to CELO mainnet (chainId 42220)"
        onClick={() => switchChain({ chainId: celo.id })}
      >
        Switch to CELO
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isMiniPay ? (
        <span className="badge flex items-center gap-1.5 bg-emerald-500/15 text-emerald-300">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          MiniPay
        </span>
      ) : (
        <span
          title="Connected to CELO mainnet (chainId 42220)"
          className="badge flex items-center gap-1.5 bg-oracle-cyan/15 text-oracle-cyan"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-oracle-cyan" />
          CELO
        </span>
      )}
      <button
        type="button"
        className="btn-ghost font-mono"
        onClick={() => disconnect()}
        title={`Disconnect ${shortAddress(address)}`}
      >
        {shortAddress(address)}
      </button>
    </div>
  );
}
