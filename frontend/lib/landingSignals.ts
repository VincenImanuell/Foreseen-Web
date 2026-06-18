export const TRUST_PROOFS = [
  ["No RNG", "Outcomes come from sealed CELO player choices, not random numbers."],
  ["No house", "The CELO contract escrows peer-to-peer stakes and settles the table on CELO mainnet."],
  ["Public reads", "CELO player tendencies stay visible through tamper-proof on-chain history."],
] as const;

export const BUILDER_SIGNALS = [
  "Use @foreseen/sdk for read-only CELO scouting dashboards.",
  "Build join-only agents for real player-created CELO matches on chainId 42220.",
  "Keep CELO keys and commit salts outside source control.",
] as const;
