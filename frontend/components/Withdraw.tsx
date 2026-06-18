"use client";

import { useState } from "react";
import { formatEther } from "viem";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { rpsCore } from "@/lib/contracts";
import { shortError, StatusBanner, type TxStatus } from "./Status";

export function Withdraw({ onChanged }: { onChanged?: () => void }) {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();
  const [status, setStatus] = useState<TxStatus>({ kind: "idle" });

  const { data: pending, refetch } = useReadContract({
    ...rpsCore,
    functionName: "pendingWithdrawals",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 8_000 },
  });

  const amount = (pending as bigint | undefined) ?? 0n;
  const busy = status.kind === "pending";

  async function handleWithdraw() {
    if (!publicClient) return;
    try {
      setStatus({ kind: "pending", msg: "Confirm CELO withdrawal in your wallet…" });
      const hash = await writeContractAsync({
        ...rpsCore,
        functionName: "withdraw",
      });
      await publicClient.waitForTransactionReceipt({ hash });
      setStatus({ kind: "success", msg: "CELO withdrawn to your wallet." });
      refetch();
      onChanged?.();
    } catch (e) {
      setStatus({ kind: "error", msg: shortError(e) });
    }
  }

  if (!isConnected) return null;

  return (
    <div className="card" aria-busy={busy} role="region" aria-label="CELO claimable balance and withdrawal">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="eyebrow mb-1">Claimable balance</div>
          <div className="font-display text-2xl font-bold text-oracle-gold">
            <span className="tabular-nums">{formatEther(amount)}</span>{" "}
            <span className="text-base font-medium">CELO</span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {amount === 0n
              ? "No CELO pending on CELO mainnet — win a match to earn CELO."
              : "CELO winnings, draw refunds & cancelled CELO bets collect here."}
          </p>
        </div>
        <button
          type="button"
          className="btn-gold"
          disabled={amount === 0n || busy}
          aria-label={`Withdraw ${formatEther(amount)} CELO to wallet`}
          onClick={handleWithdraw}
        >
          {busy ? "Working…" : "Withdraw"}
        </button>
      </div>
      <StatusBanner status={status} />
    </div>
  );
}
