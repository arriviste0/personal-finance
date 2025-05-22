
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext'; // Added to show wallet info here if needed
import { Wallet } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";


interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  // const { walletBalance } = useWallet(); // Wallet context can be used here if footer needs it

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className={cn("flex min-h-screen flex-col", isLandingPage ? "bg-wz-light-bg" : "bg-background")}>
      <div className={cn(isLandingPage ? 'bg-wz-green' : 'bg-transparent')}>
        <Header />
      </div>
      <main
        className={cn(
          "flex-1",
          isLandingPage ? "pt-0 pb-0" : "container-default py-6 md:py-8 lg:py-10" // Remove all padding for landing page main
        )}
      >
          {children}
      </main>
      {/* Footer is now part of page.tsx for landing, and potentially part of AppLayout for internal pages if needed */}
       {!isLandingPage && (
        <footer className="border-t border-border bg-muted py-3 text-center text-sm text-muted-foreground">
          <div className="container-default flex items-center justify-center gap-2">
            {/* Wallet icon and balance can be shown here for internal pages */}
            {/* <Wallet className="h-4 w-4" />
            <span>Current Wallet: <strong>{formatCurrency(walletBalance)}</strong></span> */}
             <span>© {new Date().getFullYear()} Fin.Co Internal.</span>
          </div>
        </footer>
      )}
      <Toaster />
    </div>
  );
}
