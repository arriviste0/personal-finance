import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google"; // Import Inter and Press Start 2P fonts
import "./globals.css";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";

// Configure Inter font for body text
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Define CSS variable for sans-serif
});

// Configure Press Start 2P font for headings
const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400", // Press Start 2P only supports 400 weight
  variable: "--font-heading", // Define CSS variable for heading font
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased", // Use sans font family as default
           inter.variable, // Apply Inter font variable
           pressStart2P.variable // Apply Press Start 2P font variable
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
