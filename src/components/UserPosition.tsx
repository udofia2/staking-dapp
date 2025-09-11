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
          <div className="group p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/30 hover:shadow-xl hover:neon-glow transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Coins className="h-5 w-5" />
                Staked Amount
              </div>
              <InfoTooltip 
                content="Total amount of tokens you have staked in the protocol"
                side="left"
              />
            </div>
            <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent tracking-tight">
              {formatTokenAmount(stakedAmount)} MTK
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent border border-emerald-500/20 hover:border-emerald-500/30 hover:shadow-xl hover:success-glow transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-5 w-5" />
                Pending Rewards
              </div>
              <InfoTooltip 
                content="Rewards earned but not yet claimed. You can claim these at any time."
                side="left"
              />
            </div>
            <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {formatTokenAmount(pendingRewards)} MTK
            </p>
          </div>

          <div className="group p-6 rounded-2xl bg-gradient-to-br from-secondary/10 via-cyan-500/5 to-transparent border border-secondary/20 hover:border-secondary/30 hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                <Clock className="h-5 w-5" />
                Lock Status
              </div>
              <InfoTooltip 
                content="Shows whether your tokens are still locked or available for withdrawal"
                side="left"
              />
            </div>
            <p className={`text-2xl font-bold tracking-tight ${canWithdraw ? 'text-emerald-600 dark:text-emerald-400' : 'text-secondary'}`}>
              {canWithdraw ? 'Unlocked ✓' : formatTimeRemaining(timeUntilUnlock)}
            </p>
          </div>
        </div>

        {hasStake && (
          <div className="pt-6 border-t border-primary/10">
            <Button 
              onClick={claimRewards}
              disabled={isPending || !hasRewards}
              className={`w-full h-12 text-lg font-semibold transition-all duration-300 ${
                hasRewards 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/25' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
              variant={hasRewards ? "default" : "outline"}
            >
              {hasRewards ? '🎉 Claim Rewards' : 'No Rewards Available'}
              {isPending && '...'}
            </Button>
          </div>
        )}

        {!hasStake && (
          <div className="pt-6 border-t border-border/50">
            <div className="text-center p-6 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 border border-dashed border-muted-foreground/20">
              <p className="text-muted-foreground font-medium">
                No active stake position. Start staking to earn rewards! 🚀
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
