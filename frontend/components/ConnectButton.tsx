"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { celo } from "@/lib/chain";
import { shortAddress } from "@/lib/rps";
import { useMounted } from "./useMounted";
import { useMiniPay } from "./useMiniPay";

export function ConnectButton() {
  const mounted = useMounted();
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending, error, reset } = useConnect();
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
      <div className="flex flex-col items-end gap-1">
        <button
          type="button"
          className="btn-primary"
          disabled={!injected}
          aria-busy={isPending}
          aria-label={isPending ? "Connecting CELO wallet…" : "Connect CELO wallet"}
          onClick={() => {
            if (isPending) { reset(); return; }
            injected && connect({ connector: injected });
          }}
        >
          {isPending ? "Connecting… (click to cancel)" : "Connect Wallet"}
        </button>
        {isPending && (
          <p className="text-xs text-slate-400">
            Check your wallet extension for a pending request.
          </p>
        )}
        {error && !isPending && (
          <p className="text-xs text-red-400" role="alert">
            {error.message.includes("User rejected") ? "Connection rejected." : error.message}
          </p>
        )}
      </div>
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
        title={`Disconnect CELO wallet ${shortAddress(address)}`}
        aria-label={`Disconnect CELO wallet ${shortAddress(address)} from CELO mainnet`}
      >
        {shortAddress(address)}
      </button>
    </div>
  );
}
