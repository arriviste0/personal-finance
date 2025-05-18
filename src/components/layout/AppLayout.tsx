
'use client'; // Add this if not already present, for usePathname

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation'; // Import usePathname
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main
        className={cn(
          "flex-1",
          isLandingPage ? "" : "container mx-auto px-4", // Remove container for landing page
          isLandingPage ? "pb-6 md:pb-8 lg:pb-10" : "py-6 md:py-8 lg:py-10" // Remove top padding for landing page
        )}
      >
          {children}
      </main>
    </div>
  );
}
