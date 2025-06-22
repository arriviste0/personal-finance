
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google'; // Import Poppins
import './globals.css';
import { cn } from '@/lib/utils';
import AppLayout from '@/components/layout/AppLayout';
import SessionProvider from '@/providers/SessionProvider';
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from '@/providers/QueryProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Initialize Poppins
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Specify weights you need
  variable: '--font-heading',
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
          inter.variable,
          poppins.variable // Add Poppins variable
        )}
      >
         <SessionProvider>
           <QueryProvider>
              <AppLayout>{children}</AppLayout>
              <Toaster />
           </QueryProvider>
         </SessionProvider>
      </body>
    </html>
  );
}
