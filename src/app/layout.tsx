'use client';

import type {Metadata} from 'next';
import {Inter} from 'next/font/google'; // Import Inter font
import './globals.css';
import {cn} from '@/lib/utils';
import AppLayout from '@/components/layout/AppLayout';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Define CSS variable for sans-serif font
});

export const metadata: Metadata = {
  title: 'FinTrack Pro', // Updated title
  description:
    'Your modern finance companion for savings goals, budgeting, tax planning, expense tracking, and AI insights.', // Updated description
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
          'min-h-screen bg-background text-foreground font-sans antialiased',
          inter.variable
        )}
      >
        {/* Wrap children with AppLayout which now includes the Toaster */}
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}


