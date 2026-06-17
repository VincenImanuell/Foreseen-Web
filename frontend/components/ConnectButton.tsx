"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { celo } from "@/lib/chain";
import { shortAddress } from "@/lib/rps";
import { useMounted } from "./useMounted";

export function ConnectButton() {
  const mounted = useMounted();
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  if (!mounted) {
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
        onClick={() => switchChain({ chainId: celo.id })}
      >
        Switch to Celo
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="badge flex items-center gap-1.5 bg-oracle-cyan/15 text-oracle-cyan">
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-oracle-cyan" />
        Celo
      </span>
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
