
'use client';

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";


interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  // Total header height: Approx 64px for top pill bar area + 40px for second nav = 104px
  const headerHeightPx = 104;

  return (
    <div className={cn("flex min-h-screen flex-col")}>
      <div className="bg-wz-green"> {/* This green background is for the area behind the top pill bar */}
        <Header />
      </div>
      <main
        className={cn(
          "flex-1 w-full",
          "container-default py-6 md:py-8 lg:py-10" // Consistent padding for all pages
        )}
        style={{ paddingTop: `${headerHeightPx}px` }} // Apply top padding dynamically for all pages
      >
          {children}
      </main>
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
      <Toaster />
    </div>
  );
}
