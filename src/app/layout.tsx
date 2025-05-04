'use client';

import type { Metadata } from "next";
import { Quicksand } from "next/font/google"; // Import Quicksand font
import "./globals.css";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
// import { Toaster } from "@/components/ui/toaster"; // Removed from here

// Configure Quicksand font
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans", // Define CSS variable for sans-serif font
});

export const metadata: Metadata = {
  title: "FinTrack Pro", // Updated title
  description:
    "Your modern finance companion for savings goals, budgeting, tax planning, expense tracking, and AI insights.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply Quicksand font variable to the body */}
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
           quicksand.variable
        )}
      >
        {/* Wrap children with AppLayout which now includes the Toaster */}
        <AppLayout>{children}</AppLayout>
         {/* <Toaster /> // Removed from here */}
      </body>
    </html>
  );
}


