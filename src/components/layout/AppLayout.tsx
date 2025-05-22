
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from "next/link"; // Added Link import
import { Sparkles } from "lucide-react"; // Added Sparkles import

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  // Define header heights
  const topRowHeightPx = 64; // Approx for py-3 wrapper + py-2 on pill
  const secondNavHeightPx = 40; // Approx for h-10
  const totalHeaderHeightPx = isLandingPage ? topRowHeightPx : topRowHeightPx + secondNavHeightPx;


  return (
    <div className={cn("flex min-h-screen flex-col", isLandingPage ? "bg-wz-green" : "bg-background")}>
      <div className={cn(isLandingPage ? 'bg-wz-green' : 'bg-transparent')}>
        <Header />
      </div>
      <main
        className={cn(
          "flex-1 w-full",
          isLandingPage ? "pt-0" : "container-default py-6 md:py-8 lg:py-10"
        )}
        style={{ paddingTop: isLandingPage ? `${topRowHeightPx}px` : `${totalHeaderHeightPx}px` }}
      >
          {children}
      </main>
       {!isLandingPage && ( // Standard footer for internal pages
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
                  <div className="flex items-center space-x-6">
                  <Link href="/terms" className="text-xs text-wz-text-light/70 hover:text-wz-pink transition-colors no-underline">
                      Terms & Agreements
                  </Link>
                  <Link href="/privacy" className="text-xs text-wz-text-light/70 hover:text-wz-pink transition-colors no-underline">
                      Privacy Policy
                  </Link>
                  </div>
              </div>
            </div>
          </footer>
        )}
      {/* Toaster is now in RootLayout so it's available for landing page toasts too */}
    </div>
  );
}
