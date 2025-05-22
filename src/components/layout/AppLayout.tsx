
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext';
import { Wallet } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";


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
    <div className={cn("flex min-h-screen flex-col", isLandingPage ? "bg-wz-light-bg" : "bg-background")}>
      {/* The div wrapping Header now controls its background for the landing page */}
      <div className={cn(isLandingPage ? 'bg-wz-green' : 'bg-transparent')}>
        <Header />
      </div>
      <main
        className={cn(
          "flex-1",
          isLandingPage ? "pt-0" : "container-default py-6 md:py-8 lg:py-10" // Remove top padding for landing page main
        )}
      >
          {children}
      </main>
      {!isLandingPage && (
        <footer className="border-t border-border bg-muted py-3 text-center text-sm text-muted-foreground">
          <div className="container-default flex items-center justify-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Current Wallet Balance: <strong>{formatCurrency(walletBalance)}</strong></span>
          </div>
        </footer>
      )}
      <Toaster />
    </div>
  );
}
