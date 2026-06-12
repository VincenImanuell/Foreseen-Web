import { Header } from "@/components/Header";
import { Leaderboard } from "@/components/Leaderboard";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Leaderboard — Foreseen",
  description:
    "On-chain Rock Paper Scissors rankings, read live from Celo mainnet via the @foreseen/sdk client.",
};

export default function LeaderboardPage() {
  return (
    <main>
      <Header />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <section className="mb-6">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Leaderboard
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">
            Every revealed match writes a tamper-proof record on-chain. This board
            ranks players by wins, read live from Celo mainnet through the published{" "}
            <code className="text-oracle-cyan">@foreseen/sdk</code> — the same client
            anyone can <code>npm install</code> to build on Foreseen.
          </p>
        </section>

        <Leaderboard />
      </div>

      <SiteFooter />
    </main>
  );
}
