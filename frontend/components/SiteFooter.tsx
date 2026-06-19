import Link from "next/link";
import { RPS_CORE_ADDRESS, RPS_STATS_ADDRESS } from "@/lib/contracts";
import { shortAddress } from "@/lib/rps";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-xs text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span>
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Foreseen · CELO mainnet · chainId 42220 · commit-reveal RPS ·
          real CELO stakes · soulbound ranks · no house
        </span>
        <nav aria-label="CELO Foreseen footer navigation" className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/play" className="focus-ring rounded transition-colors hover:text-oracle-cyan">
            Arena
          </Link>
          <Link href="/matches" className="focus-ring rounded transition-colors hover:text-oracle-cyan">
            Matches
          </Link>
          <Link href="/leaderboard" className="focus-ring rounded transition-colors hover:text-oracle-cyan">
            Leaderboard
          </Link>
          <Link href="/guide" className="focus-ring rounded transition-colors hover:text-oracle-cyan">
            Guide
          </Link>
          <a
            href={`https://celoscan.io/address/${RPS_CORE_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            title="Open RPSCore on Celoscan (CELO mainnet)"
            aria-label="View RPSCore CELO contract on Celoscan"
            className="focus-ring rounded font-mono transition-colors hover:text-oracle-cyan"
          >
            RPSCore {shortAddress(RPS_CORE_ADDRESS)} ↗
          </a>
          <a
            href={`https://celoscan.io/address/${RPS_STATS_ADDRESS}`}
            target="_blank"
            rel="noreferrer"
            title="Open RPSStats on Celoscan (CELO mainnet)"
            aria-label="View RPSStats CELO contract on Celoscan"
            className="focus-ring rounded font-mono transition-colors hover:text-oracle-cyan"
          >
            RPSStats {shortAddress(RPS_STATS_ADDRESS)} ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
