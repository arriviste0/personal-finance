
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext'; // Assuming this is still relevant for internal pages
import { Wallet } from 'lucide-react'; // Assuming this is still relevant for internal pages
import { Toaster } from "@/components/ui/toaster";


interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const { walletBalance } = useWallet(); // Keep for internal pages

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className={cn("flex min-h-screen flex-col", isLandingPage ? "bg-wz-light-bg" : "bg-background")}>
      <Header />
      <main
        className={cn(
          "flex-1",
          // Landing page sections handle their own container/padding
          // Internal pages use the consistent container and padding
          isLandingPage ? "" : "container mx-auto px-4 py-6 md:py-8 lg:py-10"
        )}
      >
          {children}
      </main>
      {!isLandingPage && ( // Standard footer for internal pages
        <footer className="border-t border-border bg-muted py-3 text-center text-sm text-muted-foreground">
          <div className="container mx-auto flex items-center justify-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>Current Wallet Balance: <strong>{formatCurrency(walletBalance)}</strong></span>
          </div>
        </footer>
      )}
      {/* Toaster is now here so it's available for the entire app */}
      <Toaster />
    </div>
  );
}
