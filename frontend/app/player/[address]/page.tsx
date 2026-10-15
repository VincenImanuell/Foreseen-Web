import Link from "next/link";
import { Header } from "@/components/Header";
import { PageIntro } from "@/components/PageIntro";
import { ScoutCard } from "@/components/ScoutCard";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "CELO Scouting report — Foreseen on CELO mainnet",
  description:
    "Read any CELO player's on-chain Rock Paper Scissors history from CELO mainnet (chainId 42220) — distribution, tells and the move that beats their habit — via @foreseen/sdk.",
  keywords: ["CELO", "scouting report", "foreseen", "CELO mainnet", "chainId 42220", "@foreseen/sdk", "commit-reveal"],
};

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;
  return (
    <main aria-label="CELO player scouting report — CELO mainnet">
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-4">
          <Link
            href="/leaderboard"
            className="focus-ring rounded text-xs text-slate-400 transition-colors hover:text-white"
          >
            ← Leaderboard
          </Link>
        </div>

        <PageIntro
          eyebrow="CELO opponent read"
          title="CELO scouting report"
          body="Everything CELO mainnet reveals about this player: read the pattern on-chain, then pick the move that beats their habit, or bluff against it."
          chips={["Move distribution", "Win/loss tells", "Suggested counter", "CELO mainnet · chainId 42220"]}
        />

        <ScoutCard address={address} />
      </div>

      <SiteFooter />
    </main>
  );
}
