import { formatEther } from "viem";

/** CELO amount from wei, trimmed to a sensible number of decimals. */
export function formatCelo(wei: bigint, decimals = 3): string {
  const n = Number(formatEther(wei));
  if (n === 0) return "0";
  return n.toLocaleString("en-US", { maximumFractionDigits: decimals });
}

/** Compact integer, e.g. 12_400 -> "12.4K". */
export function compact(n: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

/** Percentage with one decimal, e.g. 64.2 -> "64.2%". */
export function pct(n: number): string {
  return `${n.toLocaleString("en-US", { maximumFractionDigits: 1 })}%`;
}

/** Ordinal rank label, e.g. 1 -> "1st", 2 -> "2nd". */
export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}
