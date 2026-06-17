# Foreseen — Frontend

Playable on-chain Rock Paper Scissors on **Celo mainnet**. Built with Next.js
(App Router), wagmi + viem. Connects to the live, verified `RPSCore` contract —
no backend, no database, no API keys.

## What you can do

- Connect any injected wallet (MetaMask, **MiniPay**, Rabby, …)
- Open a match: pick a move in secret (commit) and stake CELO
- Join an open lobby by matching the bet
- Reveal your move; the contract settles automatically and pays the winner
- Claim the pot if an opponent fails to reveal in time
- Withdraw winnings, draw refunds and cancelled bets (pull-payment)

> Commit-reveal: your move is sent as `keccak256(address, move, salt)`. The salt
> is stored in your browser's `localStorage` — you need it to reveal, so reveal
> from the same browser (or copy the salt) before the 5-minute window closes.

## Run locally

Requires Node 18+.

```bash
cd frontend
cp .env.example .env.local      # optional — defaults already point at mainnet
npm install                     # or: pnpm install
npm run dev
```

Open http://localhost:3000.

You'll need a wallet on **Celo mainnet** (chain id `42220`) with CELO for stake
and gas. To play a full match end-to-end yourself, open a match in one wallet
and join from a second wallet/browser.

## Deploy to Vercel (free, no card)

1. Push this repo to GitHub (already done for Foreseen).
2. On vercel.com → **Add New → Project → Import** your GitHub repo.
3. Set **Root Directory** to `frontend` (important — the repo is a monorepo).
4. Framework preset auto-detects **Next.js**. Leave build/output defaults.
5. (Optional) add env vars from `.env.example` if you want to override the
   contract address or RPC. The defaults work without any.
6. Deploy. Every push to `main` redeploys automatically.

## Configuration

All env vars are public (no secrets):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_RPS_CORE_ADDRESS` | `0x4DFc92FF97378D0F5E82d44EB968cb7793C5b90e` | RPSCore on Celo mainnet |
| `NEXT_PUBLIC_RPS_STATS_ADDRESS` | `0x0f5F94A4f5C72CAc4D6E69a6DD89341c7b1a475A` | RPSStats on Celo mainnet |
| `NEXT_PUBLIC_RPS_RANKED_ADDRESS` | `0x8230D28C9a8Fbda2490F830c6cBc1cE3056096cb` | RPSRanked on Celo mainnet |
| `NEXT_PUBLIC_CELO_RPC` | `https://forno.celo.org` | Public Celo mainnet RPC |

## Notes

- Mainnet uses real CELO. Keep stake, pot, deadlines, and withdrawal state
  visible near wallet actions.
- The contract addresses above are the live v2 system. If you redeploy, update
  `NEXT_PUBLIC_RPS_CORE_ADDRESS` and `NEXT_PUBLIC_RPS_STATS_ADDRESS` together.
