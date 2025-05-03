import type { Metadata } from "next";
import { Quicksand } from "next/font/google"; // Import Quicksand
import "./globals.css";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";

// Configure Quicksand font
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand", // Define CSS variable
  weight: ['400', '500', '700'], // Choose appropriate weights
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
          quicksand.variable // Apply font variable
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
