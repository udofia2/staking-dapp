import { useReadContract, useAccount } from 'wagmi';
import { STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from '../config/contracts';

export function useContractValidation() {
  const { address, isConnected, chain } = useAccount();

  // Check contract addresses are set
  const hasValidAddresses = !!(STAKING_CONTRACT_ADDRESS && TOKEN_CONTRACT_ADDRESS);

  // Test staking contract
  const { data: stakingName, error: stakingError, isLoading: stakingLoading } = useReadContract({
    address: STAKING_CONTRACT_ADDRESS,
    abi: [{ 
      type: 'function', 
      name: 'totalStaked', 
      inputs: [], 
      outputs: [{ type: 'uint256' }], 
      stateMutability: 'view' 
    }],
    functionName: 'totalStaked',
    query: { enabled: hasValidAddresses }
  });

  // Test token contract
  const { data: tokenName, error: tokenError, isLoading: tokenLoading } = useReadContract({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: [{ 
      type: 'function', 
      name: 'name', 
      inputs: [], 
      outputs: [{ type: 'string' }], 
      stateMutability: 'view' 
    }],
    functionName: 'name',
    query: { enabled: hasValidAddresses }
  });

  // Validation results
  const validation = {
    hasValidAddresses,
    stakingContractActive: !stakingError && stakingName !== undefined,
    tokenContractActive: !tokenError && tokenName !== undefined,
    isLoading: stakingLoading || tokenLoading,
    errors: {
      staking: stakingError?.message,
      token: tokenError?.message,
    },
    contractAddresses: {
      staking: STAKING_CONTRACT_ADDRESS,
      token: TOKEN_CONTRACT_ADDRESS,
    },
    network: chain?.name,
    chainId: chain?.id,
    userConnected: isConnected,
    userAddress: address,
  };

  return validation;
}