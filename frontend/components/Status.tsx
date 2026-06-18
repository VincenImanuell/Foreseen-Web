"use client";

export type TxStatus =
  | { kind: "idle" }
  | { kind: "pending"; msg: string }
  | { kind: "success"; msg: string }
  | { kind: "error"; msg: string };

export function shortError(e: unknown): string {
  const raw = e instanceof Error ? e.message : String(e);
  // viem errors are verbose; surface the first meaningful CELO-relevant line.
  if (/User rejected|rejected the request/i.test(raw)) return "Rejected in wallet — CELO tx cancelled.";
  if (/insufficient funds/i.test(raw)) return "Insufficient CELO for bet + gas on CELO mainnet. Top up your CELO wallet.";
  const firstLine = raw.split("\n")[0];
  return firstLine.length > 140 ? firstLine.slice(0, 140) + "…" : firstLine;
}

export function StatusBanner({ status }: { status: TxStatus }) {
  if (status.kind === "idle") return null;
  const styles: Record<string, string> = {
    pending: "bg-oracle-cyan/10 text-oracle-cyan border-oracle-cyan/30",
    success: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    error: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  };
  return (
    <div
      role={status.kind === "error" ? "alert" : "status"}
      aria-live={status.kind === "error" ? "assertive" : "polite"}
      className={`mt-3 animate-slideUp rounded-xl border px-3 py-2 text-sm ${styles[status.kind]}`}
    >
      {status.kind === "pending" && "⏳ "}
      {status.kind === "success" && "✓ "}
      {status.kind === "error" && "⚠ "}
      {status.msg}
    </div>
  );
}
