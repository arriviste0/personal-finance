
import type React from "react";
import Header from "./Header";
// import { Toaster } from "@/components/ui/toaster"; // Toaster moved to RootLayout

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 lg:py-10">
          {children}
      </main>
       {/* <Toaster /> */} {/* Toaster moved to RootLayout */}
    </div>
  );
}
