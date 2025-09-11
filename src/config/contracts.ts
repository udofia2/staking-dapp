export const STAKING_CONTRACT_ADDRESS = import.meta.env
  .VITE_STAKING_CONTRACT as `0x${string}`;
export const TOKEN_CONTRACT_ADDRESS = import.meta.env
  .VITE_TOKEN_CONTRACT as `0x${string}`;

export const STAKING_ABI = [
  {
    type: "function",
    name: "stake",
    inputs: [{ name: "_amount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [{ name: "_amount", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimRewards",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "emergencyWithdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getUserDetails",
    inputs: [{ name: "_user", type: "address" }],
    outputs: [
      {
        type: "tuple",
        components: [
          { name: "stakedAmount", type: "uint256" },
          { name: "lastStakeTimestamp", type: "uint256" },
          { name: "pendingRewards", type: "uint256" },
          { name: "timeUntilUnlock", type: "uint256" },
          { name: "canWithdraw", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalStaked",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "currentRewardRate",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialApr",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "minLockDuration",
    inputs: [],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setInitialApr",
    inputs: [{ name: "_newApr", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMinLockDuration",
    inputs: [{ name: "_newDuration", type: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  // Events
  {
    type: "event",
    name: "Staked",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
      { name: "newTotalStaked", type: "uint256", indexed: false },
      { name: "currentRewardRate", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "Withdrawn",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
      { name: "newTotalStaked", type: "uint256", indexed: false },
      { name: "currentRewardRate", type: "uint256", indexed: false },
      { name: "rewardsAccrued", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "RewardsClaimed",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
      { name: "newPendingRewards", type: "uint256", indexed: false },
      { name: "totalStaked", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "EmergencyWithdrawn",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "penalty", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
      { name: "newTotalStaked", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "RewardRateUpdated",
    inputs: [
      { name: "oldRate", type: "uint256", indexed: false },
      { name: "newRate", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
      { name: "totalStaked", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "InitialAprUpdated",
    inputs: [
      { name: "oldApr", type: "uint256", indexed: false },
      { name: "newApr", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
  {
    type: "event",
    name: "MinLockDurationUpdated",
    inputs: [
      { name: "oldDuration", type: "uint256", indexed: false },
      { name: "newDuration", type: "uint256", indexed: false },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
] as const;

export const TOKEN_ABI = [
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allowance",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
  },
] as const;
