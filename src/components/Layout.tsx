import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-emerald-500/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-primary/5 to-secondary/10"></div>
      </div>
      
      <header className="relative z-10 glass-effect border-b border-primary/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-white">
              Staking DApp
            </h1>
          </div>
          <ConnectButton />
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="relative z-10 glass-effect border-t border-primary/20 mt-auto backdrop-blur-md">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-muted-foreground">
            &copy; 2024 Staking DApp. Built with 
            <span className="gradient-primary bg-clip-text text-transparent font-semibold"> React + TypeScript + Viem + RainbowKit</span>
          </p>
        </div>
      </footer>
    </div>
  );
}