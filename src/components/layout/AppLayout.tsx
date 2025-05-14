import type React from "react";
import Navbar from "./Navbar";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 lg:py-10"> {/* Use container and adjust padding */}
          {children}
      </main>
       <Toaster /> {/* Ensure Toaster is included */}
      {/* Optional Simple Footer */}
       {/* <footer className="py-4 border-t-2 border-foreground bg-muted mt-auto">
           <p className="text-center text-sm text-muted-foreground">
               © {new Date().getFullYear()} FinTrack Pro. (Demo)
           </p>
       </footer> */}
    </div>
  );
}
