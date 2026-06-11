// Read-side ABI for RPSRanked (on-chain ranked progression: streaks, rank tiers,
// streak multiplier). Hand-trimmed to the view functions + events the leaderboard
// needs, so the bundle never ships the write path. Matches contracts/src/RPSRanked.sol.

export const rpsRankedAbi = [
  {
    type: "function",
    name: "getProgress",
    inputs: [{ name: "player", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct RPSRanked.Progress",
        components: [
          { name: "streak", type: "uint64", internalType: "uint64" },
          { name: "longestStreak", type: "uint64", internalType: "uint64" },
          { name: "wins", type: "uint64", internalType: "uint64" },
          { name: "losses", type: "uint64", internalType: "uint64" },
          { name: "draws", type: "uint64", internalType: "uint64" },
          { name: "rankReached", type: "uint32[5]", internalType: "uint32[5]" },
          { name: "currentRank", type: "uint8", internalType: "enum RPSRanked.Rank" },
          { name: "peakRank", type: "uint8", internalType: "enum RPSRanked.Rank" },
          { name: "active", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "rankOf",
    inputs: [{ name: "player", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint8", internalType: "enum RPSRanked.Rank" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "streakOf",
    inputs: [{ name: "player", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "multiplierBps",
    inputs: [{ name: "player", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "RankedRecorded",
    inputs: [
      { name: "player", type: "address", indexed: true, internalType: "address" },
      { name: "result", type: "uint8", indexed: false, internalType: "enum RPSRanked.Result" },
      { name: "streak", type: "uint64", indexed: false, internalType: "uint64" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RankChanged",
    inputs: [
      { name: "player", type: "address", indexed: true, internalType: "address" },
      { name: "oldRank", type: "uint8", indexed: false, internalType: "enum RPSRanked.Rank" },
      { name: "newRank", type: "uint8", indexed: false, internalType: "enum RPSRanked.Rank" },
      { name: "streak", type: "uint64", indexed: false, internalType: "uint64" },
    ],
    anonymous: false,
  },
] as const;
