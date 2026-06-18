import Link from "next/link";
import { RPS_CORE_ADDRESS } from "@/lib/contracts";
import { shortAddress } from "@/lib/rps";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-xs text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span>
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Foreseen · Celo mainnet (chainId 42220) · skill-based mind-sport ·
          real CELO stakes
        </span>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-4">
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
            title="Open RPSCore on Celoscan"
            className="focus-ring rounded font-mono transition-colors hover:text-oracle-cyan"
          >
            {shortAddress(RPS_CORE_ADDRESS)} ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
