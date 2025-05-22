
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
  const isLandingPage = pathname === '/';

  // Calculate total header height
  // Top bar: h-12 (48px)
  // Second nav bar: h-10 (40px)
  // Total = 88px
  const headerHeightPx = 88;


  return (
    <div className={cn("flex min-h-screen flex-col", isLandingPage ? "bg-wz-light-bg" : "bg-background")}>
      <Header /> {/* Header is now self-contained with its two rows */}
      <main
        className={cn(
          "flex-1 w-full",
          isLandingPage ? "pt-0 pb-0" : `container-default py-6 md:py-8 lg:py-10 pt-[${headerHeightPx}px]`
        )}
        style={!isLandingPage ? { paddingTop: `${headerHeightPx}px` } : {}} // Apply top padding dynamically for non-landing pages
      >
          {children}
      </main>
       {!isLandingPage && (
        <footer className="border-t border-border bg-muted py-3 text-center text-sm text-muted-foreground">
          <div className="container-default">
             <span>© {new Date().getFullYear()} Fin.Co Internal.</span>
          </div>
        </footer>
      )}
      <Toaster />
    </div>
  );
}
