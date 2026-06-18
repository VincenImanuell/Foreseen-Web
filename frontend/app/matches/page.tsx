import { Header } from "@/components/Header";
import { OpenMatches } from "@/components/OpenMatches";
import { PageIntro } from "@/components/PageIntro";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Open matches — Foreseen on CELO",
  description:
    "Live lobby of Rock Paper Scissors matches waiting for an opponent on CELO mainnet, read via @foreseen/sdk.",
  keywords: ["CELO", "open matches", "foreseen", "celo mainnet", "rock paper scissors lobby"],
};

export default function MatchesPage() {
  return (
    <main aria-label="Open CELO matches lobby">
      <Header />

      <div className="mx-auto max-w-3xl px-4 py-8">
        <PageIntro
          eyebrow="Live CELO lobby"
          title="Open CELO matches"
          body="CELO matches currently waiting for a challenger, read live from CELO mainnet (chainId 42220) through @foreseen/sdk. Scout an opener's CELO history before you decide to take the seat."
          chips={["CELO mainnet", "chainId 42220", "Wallet-free read", "SDK powered"]}
        />

        <OpenMatches />
      </div>

      <SiteFooter />
    </main>
  );
}
