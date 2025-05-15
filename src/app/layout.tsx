
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import AppLayout from '@/components/layout/AppLayout';
import SessionProvider from '@/providers/SessionProvider';
import { Toaster } from "@/components/ui/toaster"; // Moved Toaster here for global access

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'FinTrack Pro',
  description:
    'Your modern finance companion for savings goals, budgeting, tax planning, expense tracking, and AI insights.',
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
          'min-h-screen bg-background text-foreground font-sans antialiased',
          inter.variable
        )}
      >
         <SessionProvider>
            <AppLayout>{children}</AppLayout>
            <Toaster /> {/* Toaster at the root level */}
         </SessionProvider>
      </body>
    </html>
  );
}
