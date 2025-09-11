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
            const gradientClasses = [
              'bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border-primary/20 hover:border-primary/30 hover:neon-glow',
              'bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border-emerald-500/20 hover:border-emerald-500/30 hover:success-glow',
              'bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-transparent border-purple-500/20 hover:border-purple-500/30',
              'bg-gradient-to-br from-secondary/15 via-secondary/5 to-transparent border-secondary/20 hover:border-secondary/30'
            ];
            
            return (
              <div key={index} className={`group relative p-6 rounded-2xl border hover:shadow-2xl transition-all duration-500 backdrop-blur-sm ${gradientClasses[index]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
                    <div className={`p-2 rounded-lg ${stat.color === 'text-blue-600' ? 'bg-primary/20' : stat.color === 'text-green-600' ? 'bg-emerald-500/20' : stat.color === 'text-purple-600' ? 'bg-purple-500/20' : 'bg-secondary/20'}`}>
                      <Icon className={`h-5 w-5 ${stat.color === 'text-blue-600' ? 'text-primary' : stat.color === 'text-green-600' ? 'text-emerald-600' : stat.color === 'text-purple-600' ? 'text-purple-600' : 'text-secondary'}`} />
                    </div>
                    {stat.title}
                  </div>
                  <InfoTooltip content={stat.info} />
                </div>
                <p className={`text-4xl font-bold tracking-tight ${
                  stat.color === 'text-blue-600' ? 'text-primary' : 
                  stat.color === 'text-green-600' ? 'text-emerald-600' : 
                  stat.color === 'text-purple-600' ? 'text-purple-600' : 
                  'text-secondary'
                }`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/5 to-emerald-500/10 border border-primary/20 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold">✨</span>
            </div>
            <h4 className="text-lg font-bold gradient-primary bg-clip-text text-white p-1">Protocol Features</h4>
            <InfoTooltip 
              side="bottom"
              variant="premium"
              size="md"
              content={
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-semibold">🚀 Key Features:</span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <p>✨ Dynamic APR based on total value locked</p>
                    <p>⏱️ Per-minute reward calculations</p>
                    <p>🚨 Emergency withdrawal with 50% penalty</p>
                    <p>🔒 Minimum 1-day lock period for security</p>
                    <p>💎 Premium staking experience</p>
                  </div>
                </div>
              }
            />
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Advanced staking protocol with dynamic rewards and flexible withdrawal options. 
            Experience the future of DeFi staking with our premium features.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}