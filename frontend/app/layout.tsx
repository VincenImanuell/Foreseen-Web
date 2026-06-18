import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  themeColor: "#0a0a14",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Foreseen — Rock Paper Scissors on CELO",
  description:
    "A skill-based mind-sport on CELO mainnet. Matchmake, scout your opponent's on-chain history, then commit blind. A game of reading, not luck — not gambling.",
  icons: { icon: "/foreseen-eye.svg" },
  manifest: "/manifest.json",
  keywords: ["CELO", "CELO mainnet", "celo", "rock paper scissors", "onchain game", "web3 game", "minipay", "foreseen", "commit reveal", "chainId 42220", "soulbound rank", "commit-reveal RPS", "CELO RPS", "on-chain mind-sport"],
  twitter: {
    card: "summary_large_image",
    title: "Foreseen · CELO RPS — commit-reveal mind-sport",
    description: "Scout CELO on-chain history, commit blind, reveal and settle on CELO mainnet (chainId 42220). Real stakes, soulbound ranks.",
  },
  openGraph: {
    title: "Foreseen — Rock Paper Scissors on CELO",
    description: "A skill-based mind-sport on CELO mainnet. Scout opponents, commit blind, reveal and settle on-chain.",
    siteName: "Foreseen",
    type: "website",
  },
  other: {
    "talentapp:project_verification":
      "3c9a7c6f8b2b452cc43e9747638a3a2bf2d89c1bf79c1edd7cd40de285d851501d1271adc668cea4cebe5ab8526ad7cf1571a3e4cb114bbf54ed5685b5723035",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
