import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useUserData } from '../hooks/useUserData';
import { useStaking } from '../hooks/useStaking';
import { formatTokenAmount, formatTimeRemaining } from '../utils/formatting';
import { Clock, Coins, TrendingUp } from 'lucide-react';
import { InfoTooltip } from './ui/info-tooltip';

export function UserPosition() {
  const { stakedAmount, pendingRewards, timeUntilUnlock, canWithdraw, isLoading } = useUserData();
  const { claimRewards, isPending } = useStaking();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Position</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasStake = parseFloat(stakedAmount) > 0;
  const hasRewards = parseFloat(pendingRewards) > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-primary" />
          Your Position
          <InfoTooltip 
            content="Overview of your current staking position including staked amount, pending rewards, and lock status."
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="group p-5 rounded-xl bg-gradient-to-r from-blue-50/80 to-cyan-50/80 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200/50 dark:border-blue-800/30 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                <Coins className="h-4 w-4" />
                Staked Amount
              </div>
              <InfoTooltip 
                content="Total amount of tokens you have staked in the protocol"
                side="left"
              />
            </div>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 tracking-tight">
              {formatTokenAmount(stakedAmount)} MTK
            </p>
          </div>

          <div className="group p-5 rounded-xl bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200/50 dark:border-green-800/30 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
                <TrendingUp className="h-4 w-4" />
                Pending Rewards
              </div>
              <InfoTooltip 
                content="Rewards earned but not yet claimed. You can claim these at any time."
                side="left"
              />
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 tracking-tight">
              {formatTokenAmount(pendingRewards)} MTK
            </p>
          </div>

          <div className="group p-5 rounded-xl bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-orange-950/20 dark:to-amber-950/20 border border-orange-200/50 dark:border-orange-800/30 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-medium text-orange-700 dark:text-orange-300">
                <Clock className="h-4 w-4" />
                Lock Status
              </div>
              <InfoTooltip 
                content="Shows whether your tokens are still locked or available for withdrawal"
                side="left"
              />
            </div>
            <p className={`text-xl font-bold tracking-tight ${canWithdraw ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
              {canWithdraw ? 'Unlocked ✓' : formatTimeRemaining(timeUntilUnlock)}
            </p>
          </div>
        </div>

        {hasStake && (
          <div className="pt-4 border-t">
            <Button 
              onClick={claimRewards}
              disabled={isPending || !hasRewards}
              className="w-full"
              variant={hasRewards ? "default" : "outline"}
            >
              {hasRewards ? 'Claim Rewards' : 'No Rewards Available'}
              {isPending && '...'}
            </Button>
          </div>
        )}

        {!hasStake && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center">
              No active stake position. Start staking to earn rewards!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}