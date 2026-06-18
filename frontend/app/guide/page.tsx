import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

const SECTIONS = [
  {
    title: "CELO Player Flow",
    items: [
      "Open or join a CELO table on CELO mainnet (chainId 42220) before choosing a move.",
      "Scout the opponent's revealed CELO on-chain history — move distribution and tells.",
      "Commit a sealed CELO move and keep the salt safe in your browser.",
      "Reveal before the CELO deadline and withdraw claimable CELO funds.",
    ],
  },
  {
    title: "CELO Builder Flow",
    items: [
      "Use @foreseen/sdk for CELO scouting, dashboards, and agent workflows on CELO mainnet.",
      "Keep CELO write clients in trusted runtimes — never expose keys in browser code.",
      "Use Celo Sepolia (chainId 44787) for funded test matches — free faucet at faucet.celo.org.",
      "Prefer join-only agents for honest CELO liquidity — do not manufacture fake volume.",
      "For MiniPay on CELO: detect window.ethereum.isMiniPay and auto-connect — no manual wallet step.",
    ],
  },
  {
    title: "CELO Safety Flow",
    items: [
      "Never commit CELO private keys, seed phrases, or live CELO reveal salts.",
      "Show CELO stake, pot, network (chainId 42220), and deadlines near wallet actions.",
      "Do not manufacture fake CELO usage, fake downloads, or bot-vs-bot CELO volume.",
      "Keep CELO contract changes separate from frontend and CELO SDK updates.",
      "Verify CELO network in wallet before every mainnet transaction (chainId 42220).",
    ],
  },
];

export const metadata = {
  title: "CELO Guide — Foreseen on CELO mainnet",
  description:
    "Player, builder, and safety guide for Foreseen's commit-reveal Rock Paper Scissors on CELO mainnet (chainId 42220). Includes MiniPay integration and @foreseen/sdk builder patterns.",
  keywords: ["CELO", "guide", "foreseen", "rock paper scissors", "MiniPay", "onchain game", "chainId 42220", "@foreseen/sdk", "commit-reveal", "CELO mainnet", "soulbound rank", "RPSCore"],
};

export default function GuidePage() {
  return (
    <main aria-label="Foreseen CELO guide — CELO mainnet commit-reveal RPS">
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
