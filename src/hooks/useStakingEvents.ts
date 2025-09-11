// import { useEffect, useCallback } from 'react';
import { useWatchContractEvent, useAccount } from 'wagmi';
import { STAKING_CONTRACT_ADDRESS, STAKING_ABI } from '../config/contracts';
import { toast } from 'sonner';
import { formatEther } from 'viem';

interface UseStakingEventsProps {
  onUserStakingChange?: () => void;
  onProtocolStatsChange?: () => void;
}

export function useStakingEvents({ onUserStakingChange, onProtocolStatsChange }: UseStakingEventsProps = {}) {
  const { address } = useAccount();

  useWatchContractEvent({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    eventName: 'Staked',
    onLogs(logs) {
      logs.forEach((log) => {
        const { user, amount } = log.args;
        const isCurrentUser = user?.toLowerCase() === address?.toLowerCase();
        
        if (isCurrentUser) {
          toast.success(`Successfully staked ${parseFloat(formatEther(amount || 0n)).toFixed(4)} MTK`);
          onUserStakingChange?.();
        }
        onProtocolStatsChange?.();
      });
    },
  });

  useWatchContractEvent({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    eventName: 'Withdrawn',
    onLogs(logs) {
      logs.forEach((log) => {
        const { user, amount } = log.args;
        const isCurrentUser = user?.toLowerCase() === address?.toLowerCase();
        
        if (isCurrentUser) {
          toast.success(`Successfully withdrew ${parseFloat(formatEther(amount || 0n)).toFixed(4)} MTK`);
          onUserStakingChange?.();
        }
        onProtocolStatsChange?.();
      });
    },
  });

  useWatchContractEvent({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    eventName: 'RewardsClaimed',
    onLogs(logs) {
      logs.forEach((log) => {
        const { user, amount } = log.args;
        const isCurrentUser = user?.toLowerCase() === address?.toLowerCase();
        
        if (isCurrentUser) {
          toast.success(`Claimed ${parseFloat(formatEther(amount || 0n)).toFixed(4)} MTK rewards`);
          onUserStakingChange?.();
        }
      });
    },
  });

  useWatchContractEvent({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    eventName: 'EmergencyWithdraw',
    onLogs(logs) {
      logs.forEach((log) => {
        const { user, amount } = log.args;
        const isCurrentUser = user?.toLowerCase() === address?.toLowerCase();
        
        if (isCurrentUser) {
          toast.warning(`Emergency withdrawal: ${parseFloat(formatEther(amount || 0n)).toFixed(4)} MTK`);
          onUserStakingChange?.();
        }
        onProtocolStatsChange?.();
      });
    },
  });

  return null;
}