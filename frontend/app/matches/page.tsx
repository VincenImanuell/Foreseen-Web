import { Header } from "@/components/Header";
import { OpenMatches } from "@/components/OpenMatches";
import { PageIntro } from "@/components/PageIntro";
import { SiteFooter } from "@/components/SiteFooter";

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
        <PageIntro
          eyebrow="Live lobby"
          title="Open matches"
          body="Matches currently waiting for a challenger, read live from Celo mainnet through @foreseen/sdk. Scout an opener before you decide to take the seat."
          chips={["Celo mainnet", "Wallet-free read", "SDK powered"]}
        />

        <OpenMatches />
      </div>

      <SiteFooter />
    </main>
  );
}
