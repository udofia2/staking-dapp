import { useReadContract, useAccount } from "wagmi";
import {
  STAKING_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
  STAKING_ABI,
  TOKEN_ABI,
} from "../config/contracts";
import { formatEther } from "viem";
import type { UserData } from "../types/contracts";
import { useStakingEvents } from "./useStakingEvents";
import { useContractValidation } from "./useContractValidation";

console.log("staking contract ", STAKING_CONTRACT_ADDRESS);
export function useUserData(): UserData & { isLoading: boolean, debug?: any } {
  const { address } = useAccount();
  const validation = useContractValidation();

  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    error: userDetailsError,
    refetch: refetchUserDetails,
  } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: STAKING_ABI,
    functionName: "getUserDetails",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && validation.stakingContractActive,
      refetchInterval: 30000,
      retry: 3,
    },
  });
  // console.log("user details", userDetails);
  const {
    data: tokenBalance,
    isLoading: balanceLoading,
    error: balanceError,
    refetch: refetchTokenBalance,
  } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && validation.tokenContractActive,
      refetchInterval: 30000,
      retry: 3,
    },
  });
  // console.log("token balance", tokenBalance);
  const {
    data: allowance,
    isLoading: allowanceLoading,
    error: allowanceError,
    refetch: refetchAllowance,
  } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: TOKEN_ABI,
    functionName: "allowance",
    args: address ? [address, STAKING_CONTRACT_ADDRESS] : undefined,
    query: {
      enabled: !!address && validation.tokenContractActive,
      refetchInterval: 60000,
      retry: 3,
    },
  });

  useStakingEvents({
    onUserStakingChange: () => {
      refetchUserDetails();
      refetchTokenBalance();
      refetchAllowance();
    },
  });

  // Debug logging
  console.log("=== CONTRACT DEBUG ===");
  console.log("Validation:", validation);
  console.log("User Details:", {
    data: userDetails,
    loading: userDetailsLoading,
    error: userDetailsError?.message,
  });
  console.log("Token Balance:", {
    data: tokenBalance,
    loading: balanceLoading,
    error: balanceError?.message,
  });
  console.log("Allowance:", {
    data: allowance,
    loading: allowanceLoading,
    error: allowanceError?.message,
  });
  console.log("User Address:", address);
  console.log("Contract Addresses:", {
    staking: STAKING_CONTRACT_ADDRESS,
    token: TOKEN_CONTRACT_ADDRESS,
  });

  return {
    stakedAmount: userDetails ? formatEther(userDetails.stakedAmount) : "0",
    pendingRewards: userDetails ? formatEther(userDetails.pendingRewards) : "0",
    timeUntilUnlock: userDetails ? Number(userDetails.timeUntilUnlock) : 0,
    canWithdraw: userDetails ? userDetails.canWithdraw : false,
    tokenBalance: tokenBalance ? formatEther(tokenBalance) : "0",
    allowance: allowance ? formatEther(allowance) : "0",
    isLoading: userDetailsLoading || balanceLoading || allowanceLoading,
    debug: {
      validation,
      errors: {
        userDetails: userDetailsError?.message,
        tokenBalance: balanceError?.message,
        allowance: allowanceError?.message,
      },
      rawData: {
        userDetails,
        tokenBalance,
        allowance,
      },
    },
  };
}
