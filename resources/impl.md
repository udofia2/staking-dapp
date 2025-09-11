import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useStaking } from '../hooks/useStaking';
import { useUserData } from '../hooks/useUserData';
import { formatTokenAmount } from '../utils/formatting';
import { AlertTriangle } from 'lucide-react';
import { InfoTooltip } from './ui/info-tooltip';

export function WithdrawForm() {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  
  const { withdraw, isPending } = useStaking();
  const { stakedAmount, canWithdraw, isLoading } = useUserData();

  const hasStake = parseFloat(stakedAmount) > 0;
  const hasInsufficientStake = withdrawAmount && parseFloat(stakedAmount) < parseFloat(withdrawAmount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!withdrawAmount || !canWithdraw) return;
    
    await withdraw(withdrawAmount);
    setWithdrawAmount('');
  };

  const setMaxAmount = () => {
    setWithdrawAmount(stakedAmount);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Withdraw</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Withdraw Tokens
          <InfoTooltip 
            content="Withdraw your staked tokens after the lock period has ended. You can only withdraw if your tokens are unlocked."
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="withdraw-amount">Amount to Withdraw</Label>
              <InfoTooltip 
                content="Enter the amount of staked tokens you want to withdraw. Must be less than or equal to your staked amount."
                side="right"
              />
            </div>
            <div className="flex space-x-2">
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.0"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                disabled={!canWithdraw}
                step="0.000001"
                min="0"
              />
              <Button
                type="button"
                variant="outline"
                onClick={setMaxAmount}
                disabled={!hasStake || !canWithdraw}
              >
                Max
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Staked: {formatTokenAmount(stakedAmount)} MTK</span>
              <InfoTooltip 
                content="Your current staked token balance available for withdrawal"
                side="left"
              />
            </div>
            {hasInsufficientStake && (
              <p className="text-sm text-destructive">
                Amount exceeds staked balance
              </p>
            )}
          </div>

          {!canWithdraw && hasStake && (
            <div className="flex items-center gap-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <p className="text-sm text-orange-700 dark:text-orange-400">
                Your tokens are still locked. Wait for the lock period to end.
              </p>
              <InfoTooltip 
                content="Tokens must remain staked for the minimum lock duration before they can be withdrawn normally."
                side="top"
              />
            </div>
          )}

          <Button 
            type="submit"
            disabled={
              isPending || 
              !canWithdraw || 
              !withdrawAmount || 
              hasInsufficientStake ||
              parseFloat(withdrawAmount) <= 0
            }
            className="w-full"
            variant={canWithdraw ? "default" : "outline"}
          >
            {canWithdraw ? 'Withdraw Tokens' : 'Withdraw Locked'}
            {isPending && '...'}
          </Button>

          {!hasStake && (
            <p className="text-sm text-muted-foreground text-center">
              No tokens staked to withdraw
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}