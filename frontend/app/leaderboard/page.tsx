import { Header } from "@/components/Header";
import { Leaderboard } from "@/components/Leaderboard";
import { PageIntro } from "@/components/PageIntro";
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
        <PageIntro
          eyebrow="Player signal"
          title="Leaderboard"
          body="Every revealed match writes a tamper-proof record on-chain. This board ranks players by wins, read live from Celo mainnet through the published @foreseen/sdk client."
          chips={["Ranked by wins", "On-chain stats", "No indexer"]}
        />

        <Leaderboard />
      </div>

      <SiteFooter />
    </main>
  );
}
