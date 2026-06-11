import { Header } from "@/components/Header";
import { OpenMatches } from "@/components/OpenMatches";

export const metadata = {
  title: "Open matches — Foreseen",
  description:
    "Live lobby of Rock Paper Scissors matches waiting for an opponent on Celo mainnet, read via @foreseen/sdk.",
};

export default function MatchesPage() {
  return (
    <main>
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <section className="mb-6">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Open matches
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Matches currently waiting for a challenger, read live from Celo mainnet
            through <code className="text-oracle-cyan">@foreseen/sdk</code>. Scout an
            opener before you decide to take the seat.
          </p>
        </section>

        <OpenMatches />
      </div>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        Foreseen · Celo mainnet · skill-based mind-sport, not gambling · real CELO
        stakes
      </footer>
    </main>
  );
}
