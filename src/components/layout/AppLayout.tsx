
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useWallet } from '@/contexts/WalletContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const { walletBalance } = useWallet(); // Assuming you might want walletBalance in the internal page footer too

  // Define header heights for consistent main content padding
  const landingPageHeaderAreaHeightPx = 88; // Approx height for the pill bar area
  const internalTopRowHeightPx = 48; // h-12 for internal top bar
  const internalSecondNavHeightPx = 40; // h-10 for internal second nav bar
  const internalTotalHeaderHeightPx = internalTopRowHeightPx + internalSecondNavHeightPx;

  const mainContentPaddingTop = isLandingPage 
    ? `${landingPageHeaderAreaHeightPx}px` 
    : `${internalTotalHeaderHeightPx}px`;

  return (
    <div className={cn("flex min-h-screen flex-col", isLandingPage ? "bg-wz-light-bg" : "bg-background")}>
      {/* This div provides the green backdrop for the landing page header's pill bar,
          and the pink backdrop for the internal pages' top header bar. */}
      <div className={cn(isLandingPage ? 'bg-wz-green' : 'bg-wz-pink')}>
        <Header />
      </div>
      <main
        className={cn(
          "flex-1 w-full",
          isLandingPage ? "pb-0" : "container-default py-6 md:py-8 lg:py-10" 
        )}
        style={{ paddingTop: mainContentPaddingTop }}
      >
          {children}
      </main>
      {/* Conditionally render footer: Landing page has its own, internal pages use this one */}
      {!isLandingPage && ( 
       <footer className="bg-wz-text-dark text-wz-text-light/80 py-6 border-t-4 border-wz-pink rounded-t-2xl">
          <div className="container-default">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-wz-text-light/70 font-sans">
                © {new Date().getFullYear()} FinCo. All Rights Reserved.
                </p>
                <Link href="/" className="flex items-center space-x-2 no-underline">
                  <Sparkles className="h-7 w-7 text-wz-pink" />
                  <span className="text-2xl font-bold font-heading text-wz-text-light">FinCo</span>
                </Link>
                <div className="flex items-center space-x-6">
                    <Link href="/terms" className="text-xs text-wz-text-light/70 hover:text-wz-pink transition-colors no-underline font-sans">
                        Terms & Agreements
                    </Link>
                    <Link href="/privacy" className="text-xs text-wz-text-light/70 hover:text-wz-pink transition-colors no-underline font-sans">
                        Privacy Policy
                    </Link>
                </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
