import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import only Inter font
import "./globals.css";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Define CSS variable for sans-serif font
});

// Removed Press Start 2P font import

export const metadata: Metadata = {
  title: "FinTrack",
  description:
    "Your personal finance companion for savings goals, budgeting, and tax planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply Inter font variable to the body */}
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
           inter.variable
           // Removed Press Start 2P variable
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
