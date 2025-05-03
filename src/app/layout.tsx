import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google"; // Import Press Start 2P font
import "./globals.css";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "@/components/ui/toaster";

// Configure Press Start 2P font
const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400", // Press Start 2P only has regular weight
  variable: "--font-press-start", // Define CSS variable (ensure this matches tailwind.config and globals.css)
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
          "min-h-screen bg-background text-foreground font-mono", // Use mono font family
          pressStart2P.variable // Apply font variable
        )}
      >
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
