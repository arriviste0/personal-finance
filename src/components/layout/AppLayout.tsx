<<<<<<< HEAD

'use client'; // Add this if not already present, for usePathname

import type React from "react";
import Header from "./Header";
import { usePathname } from 'next/navigation'; // Import usePathname
import { cn } from '@/lib/utils';
=======
import type React from "react";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
>>>>>>> deaed6c2b62230c74a89b23bbff50f9822168177

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col bg-background">
<<<<<<< HEAD
      <Header />
      <main
        className={cn(
          "flex-1",
          isLandingPage ? "" : "container mx-auto px-4", // Remove container for landing page
          isLandingPage ? "pb-6 md:pb-8 lg:pb-10" : "py-6 md:py-8 lg:py-10" // Remove top padding for landing page
        )}
      >
=======
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 lg:py-10"> {/* Use container and adjust padding */}
>>>>>>> deaed6c2b62230c74a89b23bbff50f9822168177
          {children}
      </main>
    </div>
  );
}
