import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

const SECTIONS = [
  {
    title: "CELO Player Flow",
    items: [
      "Open or join a table before choosing a move.",
      "Scout the opponent's revealed history.",
      "Commit a sealed move and keep the salt safe.",
      "Reveal before the deadline and withdraw claimable CELO funds.",
    ],
  },
  {
    title: "CELO Builder Flow",
    items: [
      "Use @foreseen/sdk for scouting, dashboards, and agent workflows.",
      "Keep write clients in trusted runtimes.",
      "Use Celo Sepolia (chainId 11142220) for funded test matches — free faucet at faucet.celo.org.",
      "Prefer join-only agents for honest liquidity.",
      "For MiniPay: detect window.ethereum.isMiniPay and auto-connect — no manual wallet step needed.",
    ],
  },
  {
    title: "CELO Safety Flow",
    items: [
      "Never commit private keys, seed phrases, or live salts.",
      "Show stake, pot, network, and deadlines near wallet actions.",
      "Do not manufacture fake usage, fake downloads, or bot-vs-bot volume.",
      "Keep contract changes separate from frontend and SDK updates.",
    ],
  },
];

export const metadata = {
  title: "Guide — Foreseen on CELO",
  description:
    "Player, builder, and safety guide for Foreseen's on-chain Rock Paper Scissors flow on CELO.",
  keywords: ["CELO", "guide", "foreseen", "rock paper scissors", "MiniPay", "onchain game"],
};

export default function GuidePage() {
  return (
    <main aria-label="Foreseen CELO guide">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <section className="mt-10">
          <div className="eyebrow">CELO Guide</div>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Build and play with the read first.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            Foreseen on CELO works best when the interface keeps the actual loop clear:
            matchmake on CELO, scout the opponent, commit your sealed move,
            reveal before the CELO deadline, and withdraw claimable CELO balance.
            This guide keeps player UX, CELO SDK integrations, and agent safety together.
          </p>
        </section>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {SECTIONS.map((section) => (
            <section key={section.title} className="surface-soft p-5">
              <h2 className="font-display text-lg font-bold text-white">
                {section.title}
              </h2>
              <ul role="list" className="mt-4 space-y-3 text-sm leading-6 text-slate-400">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oracle-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/play" className="btn-primary">
            👁 Launch app
          </Link>
          <a href="/#mindsport" className="btn-ghost">
            Read the mind-sport layer
          </a>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
