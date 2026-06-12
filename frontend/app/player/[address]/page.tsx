import Link from "next/link";
import { Header } from "@/components/Header";
import { PageIntro } from "@/components/PageIntro";
import { ScoutCard } from "@/components/ScoutCard";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Scouting report — Foreseen",
  description:
    "Read any player's on-chain Rock Paper Scissors history — distribution, tells and the move that beats their habit — via @foreseen/sdk.",
};

export default function PlayerPage({
  params,
}: {
  params: { address: string };
}) {
  return (
    <main>
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-4">
          <Link
            href="/leaderboard"
            className="text-xs text-slate-400 hover:text-white"
          >
            ← Leaderboard
          </Link>
        </div>

        <PageIntro
          eyebrow="Opponent read"
          title="Scouting report"
          body="Everything the chain reveals about this player: read the pattern, then pick the move that beats their habit, or bluff against it."
          chips={["Move distribution", "Win/loss tells", "Suggested counter"]}
        />

        <ScoutCard address={params.address} />
      </div>

      <SiteFooter />
    </main>
  );
}
