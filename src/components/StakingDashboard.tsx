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
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Wallet className="h-6 w-6" />
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
    );
  }


  return (
    <div className="space-y-8">
      {/* Protocol Overview */}
      <ProtocolStats />

      {/* Main Dashboard */}
      <Tabs defaultValue="stake" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stake">Stake</TabsTrigger>
          <TabsTrigger value="position">Position</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
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
  );
}