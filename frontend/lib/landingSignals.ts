export const TRUST_PROOFS = [
  ["No RNG", "Outcomes come from sealed player choices, not random numbers."],
  ["No house", "The contract escrows peer-to-peer stakes and settles the table."],
  ["Public reads", "Player tendencies stay visible through on-chain history."],
] as const;

export const BUILDER_SIGNALS = [
  "Use @foreseen/sdk for read-only scouting dashboards.",
  "Build join-only agents for real player-created matches.",
  "Keep keys and commit salts outside source control.",
] as const;
