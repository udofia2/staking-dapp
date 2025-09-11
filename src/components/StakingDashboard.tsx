import { useAccount } from 'wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { StakingForm } from './StakingForm';
import { UserPosition } from './UserPosition';
import { WithdrawForm } from './WithdrawForm';
import { EmergencyWithdraw } from './EmergencyWithdraw';
import { ProtocolStats } from './ProtocolStats';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';
import { InfoTooltip } from './ui/info-tooltip';

export function StakingDashboard() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="relative min-h-[60vh]">
        {/* Gradient background */}
        <div className="absolute inset-0 gradient-radial opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-[60vh] space-y-6">
          <Card className="w-full max-w-md glass-effect border-primary/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 gradient-primary bg-clip-text text-transparent">
                <Wallet className="h-6 w-6 text-primary" />
                Connect Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Connect your wallet to start staking and earning rewards
              </p>
              <ConnectButton />
            </CardContent>
          </Card>
          
          {/* Show protocol stats even when not connected */}
          <div className="w-full max-w-2xl">
            <ProtocolStats />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="relative space-y-8">
      {/* Premium gradient background */}
      <div className="absolute inset-0 gradient-radial opacity-30 pointer-events-none"></div>
      
      <div className="relative space-y-8">
        {/* Protocol Overview */}
        <ProtocolStats />

        {/* Main Dashboard */}
        <Tabs defaultValue="stake" className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-effect border-primary/20 shadow-lg">
          <TabsTrigger 
            value="stake" 
            className="    data-[state=active]:!bg-gradient-to-r 
              data-[state=active]:!from-blue-500 
              data-[state=active]:!to-cyan-500 
              data-[state=active]:!text-white 
              data-[state=active]:!border-blue-400/40 
              data-[state=active]:shadow-lg 
              data-[state=active]:shadow-blue-500/30
            "
          >
            Stake
          </TabsTrigger>
          <TabsTrigger 
            value="position" 
             className="
                data-[state=active]:!bg-gradient-to-r 
                data-[state=active]:!from-indigo-500 
                data-[state=active]:!to-blue-600 
                data-[state=active]:!text-white 
                data-[state=active]:!border-indigo-400/40 
                data-[state=active]:shadow-lg 
                data-[state=active]:shadow-indigo-500/30
              "
          >
            Position
          </TabsTrigger>
          <TabsTrigger 
            value="withdraw" 
            className="data-[state=active]:!bg-gradient-to-r data-[state=active]:!from-amber-500 data-[state=active]:!to-amber-600 data-[state=active]:!text-black data-[state=active]:!border-amber-500/30 data-[state=active]:shadow-lg data-[state=active]:shadow-amber-500/20"
          >
            Withdraw
          </TabsTrigger>
          <TabsTrigger 
            value="emergency" 
            className="data-[state=active]:!bg-gradient-to-r data-[state=active]:!from-destructive data-[state=active]:!to-red-600 data-[state=active]:!text-white data-[state=active]:!border-destructive/30 data-[state=active]:shadow-lg data-[state=active]:shadow-destructive/20"
          >
            Emergency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stake" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StakingForm />
            <UserPosition />
          </div>
        </TabsContent>

        <TabsContent value="position" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserPosition />
            <Card className="border-2 border-dashed border-muted-foreground/20 bg-gradient-to-br from-background via-muted/10 to-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Staking Overview
                  <InfoTooltip 
                    content={
                      <div className="space-y-2">
                        <p><strong>How it works:</strong></p>
                        <p>• Stake tokens to earn dynamic APR rewards</p>
                        <p>• APR starts at 250% and decreases with TVL</p>
                        <p>• Rewards calculated per minute</p>
                        <p>• Minimum 1-day lock period</p>
                        <p>• Claim rewards anytime</p>
                      </div>
                    }
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">Lock Period</span>
                    <span className="text-sm">1 Day</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">Reward Calculation</span>
                    <span className="text-sm">Per Minute</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">Emergency Penalty</span>
                    <span className="text-sm text-destructive font-semibold">50%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="withdraw" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WithdrawForm />
            <UserPosition />
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EmergencyWithdraw />
            <UserPosition />
          </div>
        </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}