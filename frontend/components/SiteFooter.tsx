import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-xs text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span>
          Foreseen · Celo mainnet · skill-based mind-sport, not gambling · real
          CELO stakes
        </span>
        <nav className="flex items-center gap-4">
          <Link href="/play" className="hover:text-oracle-cyan">
            Arena
          </Link>
          <Link href="/matches" className="hover:text-oracle-cyan">
            Matches
          </Link>
          <Link href="/leaderboard" className="hover:text-oracle-cyan">
            Leaderboard
          </Link>
        </nav>
      </div>
    </footer>
  );
}
