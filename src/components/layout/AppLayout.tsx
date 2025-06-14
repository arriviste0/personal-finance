
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useWallet } from '@/contexts/WalletContext';
import { useState, useEffect, useCallback } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const SCROLL_THRESHOLD = 10; // Pixels to scroll before background changes

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const { walletBalance } = useWallet();

  const [isScrolled, setIsScrolled] = useState(false);

  const landingPageHeaderAreaHeightPx = 68;
  const internalTopRowHeightPx = 48;
  const internalSecondNavHeightPx = 40;
  const internalTotalHeaderHeightPx = internalTopRowHeightPx + internalSecondNavHeightPx;

  const mainContentPaddingTop = isLandingPage
    ? `${landingPageHeaderAreaHeightPx}px`
    : `${internalTotalHeaderHeightPx}px`;

  const handleScroll = useCallback(() => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);

  useEffect(() => {
    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call on mount to check initial scroll position
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Ensure isScrolled is reset if navigating from landing to internal page
      setIsScrolled(false);
    }
  }, [isLandingPage, handleScroll]);


  return (
    <div className={cn("flex min-h-screen flex-col", isLandingPage ? "bg-wz-light-bg" : "bg-background")}>
      {/* This div provides the backdrop for the header area */}
      <div className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-in-out',
         isLandingPage
            ? isScrolled ? 'bg-transparent' : 'bg-wz-green'
            : 'bg-black' // For internal pages
        )}
      >
        <Header />
      </div>
      <main
        className={cn(
          "flex-1 w-full",
          isLandingPage ? "" : "container-default pb-6 md:pb-8 lg:pb-10"
        )}
        style={{ paddingTop: mainContentPaddingTop }}
      >
        {children}
      </main>
      {!isLandingPage && (
        <footer className="bg-black text-white/80 py-6 border-t-2 border-gray-700 mt-auto">
          <div className="container-default">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-white/70 font-sans">
                © {new Date().getFullYear()} FinCo. All Rights Reserved.
              </p>
              <Link href="/" className="flex items-center space-x-2 no-underline">
                <Sparkles className="h-7 w-7 text-pink-500" />
                <span className="text-2xl font-bold font-heading text-white">FinCo</span>
              </Link>
              <div className="flex items-center space-x-6">
                <Link href="/terms" className="text-xs text-white/70 hover:text-pink-500 transition-colors no-underline font-sans">
                  Terms & Agreements
                </Link>
                <Link href="/privacy" className="text-xs text-white/70 hover:text-pink-500 transition-colors no-underline font-sans">
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
