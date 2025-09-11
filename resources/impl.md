const stake = useCallback(async (amount: string) => {
    try {
      await writeContract({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'stake',
        args: [parseEther(amount)],
      });
      // Toast handled by event listener
    } catch (error: any) {
      toast.error('Stake failed: ' + error.message);
    }
  }, [writeContract]);

  const withdraw = useCallback(async (amount: string) => {
    try {
      await writeContract({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'withdraw',
        args: [parseEther(amount)],
      });
      // Toast handled by event listener
    } catch (error: any) {
      toast.error('Withdraw failed: ' + error.message);
    }
  }, [writeContract]);

  const claimRewards = useCallback(async () => {
    try {
      await writeContract({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'claimRewards',
      });
      // Toast handled by event listener
    } catch (error: any) {
      toast.error('Claim failed: ' + error.message);
    }
  }, [writeContract]);

  const emergencyWithdraw = useCallback(async () => {
    try {
      await writeContract({
        address: STAKING_CONTRACT_ADDRESS,
        abi: STAKING_ABI,
        functionName: 'emergencyWithdraw',
      });
      // Toast handled by event listener
    } catch (error: any) {
      toast.error('Emergency withdraw failed: ' + error.message);
    }
  }, [writeContract]);