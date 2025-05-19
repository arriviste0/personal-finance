
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const { walletBalance } = useWallet();

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main
        className={cn(
          "flex-1",
          // Apply container and padding consistently now that header is uniform
          "container mx-auto px-4",
          isLandingPage ? "pt-6 md:pt-8 lg:pt-10 pb-6 md:pb-8 lg:pb-10" : "py-6 md:py-8 lg:py-10"
        )}
      >
          {children}
      </main>
      {/* Footer can remain conditional or be styled consistently */}
      {!isLandingPage && (
        <footer className="border-t border-border bg-muted py-3 text-center text-sm text-muted-foreground">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Current Wallet Balance: <strong>{formatCurrency(walletBalance)}</strong></span>
          </div>
        </footer>
      )}
    </div>
  );
}
