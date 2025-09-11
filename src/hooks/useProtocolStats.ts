import { useReadContract } from "wagmi";
import { STAKING_CONTRACT_ADDRESS, STAKING_ABI } from "../config/contracts";
import { formatEther } from "viem";
import type { ProtocolStats } from "../types/contracts";
import { useStakingEvents } from "./useStakingEvents";

export function useProtocolStats(): ProtocolStats & { isLoading: boolean } {
  const {
    data: totalStaked,
    isLoading: totalStakedLoading,
    refetch: refetchTotalStaked,
  } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: "totalStaked",
    query: {
      refetchInterval: 45000,
    },
  });

  const {
    data: currentRewardRate,
    isLoading: rewardRateLoading,
    refetch: refetchRewardRate,
  } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: "currentRewardRate",
    query: {
      refetchInterval: 45000,
    },
  });

  const { data: initialApr, isLoading: initialAprLoading } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: "initialApr",
    query: {
      refetchInterval: 300000,
    },
  });

  const { data: minLockDuration, isLoading: minLockLoading } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: "minLockDuration",
    query: {
      refetchInterval: 300000,
    },
  });

  useStakingEvents({
    onProtocolStatsChange: () => {
      refetchTotalStaked();
      refetchRewardRate();
    },
  });

  return {
    totalStaked: totalStaked ? formatEther(totalStaked) : "0",
    currentRewardRate: currentRewardRate ? currentRewardRate.toString() : "0",
    initialApr: initialApr ? initialApr.toString() : "0",
    minLockDuration: minLockDuration ? minLockDuration.toString() : "0",
    isLoading:
      totalStakedLoading ||
      rewardRateLoading ||
      initialAprLoading ||
      minLockLoading,
  };
}
