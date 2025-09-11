import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useStaking } from '../hooks/useStaking';
import { useTokenApproval } from '../hooks/useTokenApproval';
import { useUserData } from '../hooks/useUserData';
import { formatTokenAmount } from '../utils/formatting';
import { InfoTooltip } from './ui/info-tooltip';

export function StakingForm() {
  const [stakeAmount, setStakeAmount] = useState('');
  
  const { stake, isPending: isStaking } = useStaking();
  const { approveToken, isApproving } = useTokenApproval();
  const { tokenBalance, allowance } = useUserData();

  const needsApproval = stakeAmount && parseFloat(allowance) < parseFloat(stakeAmount);
  const hasInsufficientBalance = stakeAmount && parseFloat(tokenBalance) < parseFloat(stakeAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stakeAmount) return;

    if (needsApproval) {
      await approveToken(stakeAmount);
    } else {
      await stake(stakeAmount);
      setStakeAmount('');
    }
  };

  const setMaxAmount = () => {
    setStakeAmount(tokenBalance);
  };

    return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Stake Tokens
          <InfoTooltip 
            content="Stake your MTK tokens to earn rewards. You'll need to approve the contract first if this is your first time staking."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="stake-amount">Amount to Stake</Label>
              <InfoTooltip 
                content="Enter the amount of MTK tokens you want to stake. You can click 'Max' to stake your entire balance."
                side="right"
              />
            </div>
            <div className="flex space-x-2">
              <Input
                id="stake-amount"
                type="number"
                placeholder="0.0"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                step="0.000001"
                min="0"
              />
              <Button
                type="button"
                variant="outline"
                onClick={setMaxAmount}
                disabled={!tokenBalance || parseFloat(tokenBalance) === 0}
              >
                Max
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Balance: {formatTokenAmount(tokenBalance)} MTK</span>
              <InfoTooltip 
                content="Your current MTK token balance available for staking"
                side="left"
              />
            </div>
            {hasInsufficientBalance && (
              <p className="text-sm text-destructive">
                Insufficient balance
              </p>
            )}
          </div>

          <Button 
            type="submit"
            disabled={
              isStaking || 
              isApproving || 
              !stakeAmount || 
              hasInsufficientBalance ||
              parseFloat(stakeAmount) <= 0
            }
            className="w-full"
          >
            {needsApproval ? 'Approve Tokens' : 'Stake Tokens'}
            {(isStaking || isApproving) && '...'}
          </Button>

          {needsApproval && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <InfoTooltip 
                content="Token approval is a one-time transaction that allows the staking contract to transfer your tokens when you stake."
                side="top"
              />
              <p className="text-sm text-blue-700 dark:text-blue-400">
                You need to approve tokens before staking
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}