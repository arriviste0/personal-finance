import type { Metadata } from "next";
import { VT323 } from "next/font/google"; // Import VT323 font
import "./globals.css";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";

// Configure VT323 font
const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323", // Define CSS variable
  weight: ['400'], // VT323 only has 400 weight
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
          vt323.variable // Apply font variable
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
