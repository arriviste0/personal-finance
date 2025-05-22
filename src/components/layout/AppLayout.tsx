
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from "next/link"; // Added import
import { Sparkles } from "lucide-react"; // Added import
import { Toaster } from "@/components/ui/toaster";
import { useWallet } from '@/contexts/WalletContext'; 

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const { walletBalance } = useWallet();

  // Define header heights
  const wzuhHeaderPillAreaHeightPx = 88; 
  const internalTopRowHeightPx = 48; // h-12
  const internalSecondNavHeightPx = 40; // h-10
  const internalTotalHeaderHeightPx = internalTopRowHeightPx + internalSecondNavHeightPx;

  const mainContentPaddingTop = isLandingPage ? `0px` : `${internalTotalHeaderHeightPx}px`;


  return (
    <div className={cn("flex min-h-screen flex-col bg-background")}>
      <div className={cn(isLandingPage ? 'bg-wz-green' : 'bg-header-top')}>
        <Header />
      </div>
      <main
        className={cn(
          "flex-1 w-full",
           isLandingPage ? "pt-0 pb-0" : "container-default py-6 md:py-8 lg:py-10" 
        )}
        style={{ paddingTop: mainContentPaddingTop }}
      >
          {children}
      </main>
      {!isLandingPage && ( // Conditionally render footer for non-landing pages
       <footer className="bg-wz-text-dark text-wz-text-light/80 py-8 border-t-4 border-wz-pink rounded-t-2xl">
          <div className="container-default">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-wz-text-light/70">
                © {new Date().getFullYear()} FinCo. All Rights Reserved.
                </p>
                <Link href="/" className="flex items-center space-x-2 no-underline">
                  <Sparkles className="h-7 w-7 text-wz-pink" />
                  <span className="text-2xl font-bold font-heading text-wz-text-light">FinCo</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-wz-text-light/70">Wallet: {walletBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
            </div>
          </div>
        </footer>
      )}
      <Toaster />
    </div>
  );
}

