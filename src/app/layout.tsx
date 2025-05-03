import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Import Inter font
import "./globals.css";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Define CSS variable
});


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
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable // Apply font variable
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
