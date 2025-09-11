import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useProtocolStats } from '../hooks/useProtocolStats';
import { formatTokenAmount, formatApr } from '../utils/formatting';
import { BarChart3, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { InfoTooltip } from './ui/info-tooltip';

export function ProtocolStats() {
  const { totalStaked, currentRewardRate, initialApr, minLockDuration, isLoading } = useProtocolStats();

  const formatLockDuration = (seconds: string): string => {
    const days = Math.floor(parseInt(seconds) / (24 * 3600));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Protocol Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-6 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    {
      title: 'Total Value Locked',
      value: `${formatTokenAmount(totalStaked)} MTK`,
      icon: DollarSign,
      color: 'text-blue-600',
      info: 'Total amount of tokens currently staked in the protocol'

    },
    {
      title: 'Current APR',
      value: formatApr(currentRewardRate),
      icon: TrendingUp,
      color: 'text-green-600',
      info: 'Current Annual Percentage Rate - decreases by 0.5% for every 1,000 tokens staked'
    },
    {
      title: 'Initial APR',
      value: formatApr(initialApr),
      icon: BarChart3,
      color: 'text-purple-600',
      info: 'Starting APR when no tokens are staked - minimum APR is capped at 10%'
    },
    {
      title: 'Lock Duration',
      value: formatLockDuration(minLockDuration),
      icon: Clock,
      color: 'text-orange-600',
      info: 'Minimum time tokens must remain staked before withdrawal'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Protocol Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative p-6 rounded-xl border bg-gradient-to-br from-background to-muted/20 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Icon className="h-5 w-5" />
                    {stat.title}
                  </div>
                  <InfoTooltip content={stat.info} />
                </div>
                <p className={`text-3xl font-bold ${stat.color} tracking-tight`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/10 dark:to-purple-950/10 border border-primary/10">
          <div className="flex items-center gap-2 mb-3">
            <h4 className="text-base font-semibold text-foreground">Protocol Features</h4>
            <InfoTooltip 
              side="bottom"
              content={
                <div className="space-y-2">
                  <p><strong>Key Features:</strong></p>
                  <p>• Dynamic APR based on total value locked</p>
                  <p>• Per-minute reward calculations</p>
                  <p>• Emergency withdrawal with 50% penalty</p>
                  <p>• Minimum 1-day lock period for security</p>
                </div>
              }
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Advanced staking protocol with dynamic rewards and flexible withdrawal options.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}