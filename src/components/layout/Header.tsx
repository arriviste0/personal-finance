
'use client';

import Link from "next/link";
import {
  CircleDollarSign,
  Menu,
  LogOut,
  Wallet,
  Lock,
  Twitter,
  Facebook,
  Instagram,
  Sparkles, // Wzuh logo icon
  X,
  LayoutGrid, // For Dashboard service card
  ListChecks, // For Expenses service card
  Target,     // For Savings Goals service card
  TrendingUp, // For Investments service card
  ShieldAlert, // For Emergency Fund service card
  FileText,   // For Tax Planner service card
  Lightbulb,  // For AI Assistant service card
  // PiggyBank, // Already there, good for Savings Goals
  // Landmark, // Already there, good for Investments or general finance
  // HandCoins, // Could be used for Budgeting if Wallet icon is for general wallet
  // ArrowRight, // General purpose
  // User, // For Auth
  // Mail, // For Auth/Contact
  // KeyRound, // For Auth
  // Store, // For App store links
  // Apple, // For App store links
  // Palette, // For general design
  // BarChart3, // For general analytics
  // Award, // For achievements
  // Asterisk // Chorke logo placeholder
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';
import React from "react";

// Helper function to get icon component by name string
const getIcon = (iconName?: string, props?: any) => {
  if (!iconName) return null;
  const icons: { [key: string]: React.ElementType } = {
    CircleDollarSign,
    Menu,
    LogOut,
    Wallet,
    Lock,
    Twitter,
    Facebook,
    Instagram,
    Sparkles,
    X,
    LayoutGrid,
    ListChecks,
    Target,
    TrendingUp,
    ShieldAlert,
    FileText,
    Lightbulb,
    // Add other icons used in navLinks here if necessary
  };
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent {...props} /> : null;
};


export default function Header() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { walletBalance, totalLockedFunds } = useWallet();

  const isAuthenticated = status === 'authenticated';
  const isLoadingSession = status === 'loading';
  const isLandingPage = pathname === '/';

  // Wzuh-inspired landing page navigation
  const wzuhNavLinks = [
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ];

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", iconName: "LayoutGrid" },
    { href: "/budget", label: "Budget", iconName: "Wallet" }, // Using Wallet icon for budget
    { href: "/expenses", label: "Expenses", iconName: "ListChecks" }, // Changed from Landmark
    { href: "/savings-goals", label: "Goals", iconName: "Target" }, // Changed from PiggyBank
    { href: "/investments", label: "Invest", iconName: "TrendingUp" },
    { href: "/emergency-fund", label: "Safety", iconName: "ShieldAlert" },
    { href: "/tax-planner", label: "Taxes", iconName: "FileText" },
    { href: "/ai-assistant", label: "AI", iconName: "Lightbulb" },
  ];

  const socialMediaLinks = [
    { href: "#", label: "Twitter", iconName: "Twitter" },
    { href: "#", label: "Facebook", iconName: "Facebook" },
    { href: "#", label: "Instagram", iconName: "Instagram" },
  ];

  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  if (isLandingPage) {
    // Wzuh-inspired Landing Page Header
    return (
      <header className="sticky top-0 z-50 w-full bg-wz-light-bg shadow-sm">
        <div className="container-default flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 no-underline">
            <Sparkles className="h-7 w-7 text-wz-pink" />
            <span className="text-2xl font-bold text-wz-text-dark font-heading">FinCo</span>
          </Link>
          <nav className="hidden items-center space-x-6 md:flex">
            {wzuhNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-wz-text-dark hover:text-wz-pink transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-3">
            {!isAuthenticated && !isLoadingSession && (
              <>
                <Button asChild className="btn-wz btn-wz-outline-dark text-sm">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="btn-wz btn-wz-pink text-sm">
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </>
            )}
            {isAuthenticated && (
               <Button onClick={handleSignOut} className="btn-wz btn-wz-pink text-sm">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            )}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-wz-text-dark hover:bg-wz-pink/10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-wz-light-bg p-0">
                  <SheetHeader className="p-4 border-b border-gray-200">
                    <SheetTitle className="flex items-center gap-2 text-wz-text-dark font-heading">
                      <Sparkles className="h-6 w-6 text-wz-pink" />
                      FinCo
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="absolute right-3 top-3 h-7 w-7 p-0 text-wz-gray-text hover:bg-gray-100">
                        <X className="h-4 w-4" />
                         <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <nav className="grid gap-2 p-4">
                    {wzuhNavLinks.map((link) => (
                      <SheetClose key={`${link.href}-mobile`} asChild>
                        <Link href={link.href} className="block rounded-lg px-3 py-2 text-wz-text-dark hover:bg-wz-pink/10 no-underline font-medium">
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
                      {!isAuthenticated && !isLoadingSession && (
                        <>
                           <SheetClose asChild>
                              <Link href="/login" passHref className="no-underline">
                                 <Button variant="outline" className="w-full btn-wz btn-wz-outline-dark text-sm">Log In</Button>
                              </Link>
                            </SheetClose>
                          <SheetClose asChild>
                            <Button asChild className="w-full btn-wz btn-wz-pink text-sm">
                              <Link href="/get-started">Get Started</Link>
                            </Button>
                          </SheetClose>
                        </>
                      )}
                      {isAuthenticated && (
                        <SheetClose asChild>
                          <Button onClick={handleSignOut} className="w-full btn-wz btn-wz-pink text-sm">
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Podportal Inspired Header for Internal App Pages
  return (
    <header className="w-full">
      {/* Top Row */}
      <div className="bg-header-top">
        <div className="container mx-auto flex h-12 items-center justify-between px-4 md:px-6 border-b border-header-top-border">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 no-underline shrink-0">
              {getIcon("CircleDollarSign", { className: "h-7 w-7 text-header-top-fg" })}
              <span className="font-heading text-xl font-bold text-header-top-fg">Fin.Co</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-3 text-xs text-header-top-fg/90">
                <div className="flex items-center space-x-1">
                  {getIcon("Wallet", { className: "h-3.5 w-3.5" })}
                  <span>{formatCurrency(walletBalance)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getIcon("Lock", { className: "h-3.5 w-3.5" })}
                  <span>{formatCurrency(totalLockedFunds)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-stretch h-full text-sm ml-auto">
            {!isAuthenticated && !isLoadingSession && (
              <>
                 <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                  <Link
                    href="/login"
                    className="flex items-center justify-center w-full h-full px-4 text-sm font-medium text-header-top-fg hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-header-top no-underline transition-colors duration-150 whitespace-nowrap hover:rounded-md"
                  >
                    Log In
                  </Link>
                </div>
                <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                   <Button asChild variant="ghost" className="p-0 w-full h-full rounded-none">
                    <Link
                      href="/get-started"
                      className="w-full h-full flex items-center justify-center bg-white text-header-top-bg hover:bg-blue-500 hover:text-white rounded-md px-3 py-1.5 text-sm font-semibold !shadow-none !border-transparent whitespace-nowrap no-underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-header-top"
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              </>
            )}
            {isAuthenticated && (
              <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full h-full flex items-center justify-center px-4 text-header-top-fg text-sm font-medium hover:bg-white/20 hover:rounded-md whitespace-nowrap no-underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-header-top"
                >
                  <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
                </Button>
              </div>
            )}
             <div className="flex items-center justify-center border-l border-header-top-border md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-header-top-fg hover:bg-header-top-fg/10 h-full w-10 rounded-none px-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-header-bottom p-0 border-r border-header-bottom-border">
                  <SheetHeader className="p-4 border-b border-header-bottom-border bg-header-top">
                    <SheetTitle className="flex items-center gap-2">
                      {getIcon("CircleDollarSign", { className: "h-6 w-6 text-header-top-fg" })}
                      <span className="text-lg font-heading font-semibold text-header-top-fg">Fin.Co</span>
                    </SheetTitle>
                     <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="absolute right-3 top-3 h-7 w-7 p-0 text-header-top-fg/80 hover:bg-header-top-fg/10">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </SheetClose>
                  </SheetHeader>
                  <nav className="grid gap-1 text-base font-medium p-3">
                    {isAuthenticated && (
                      <div className="mb-3 p-2 border-b border-dashed border-header-bottom-fg/20">
                        <div className="flex items-center space-x-2 text-sm text-header-bottom-fg/90">
                          {getIcon("Wallet", { className: "h-4 w-4"})}
                          <span>Wallet: {formatCurrency(walletBalance)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-header-bottom-fg/90 mt-1">
                          {getIcon("Lock", { className: "h-4 w-4"})}
                          <span>Locked: {formatCurrency(totalLockedFunds)}</span>
                        </div>
                      </div>
                    )}
                    {navLinks.map(link => {
                      const isActive = pathname === link.href;
                      return (
                        <SheetClose key={`${link.href}-mobile-internal`} asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap no-underline",
                              isActive
                                ? "bg-white text-primary font-semibold shadow-sm"
                                : "text-header-bottom-fg/90 hover:bg-white/70 hover:text-header-bottom-fg"
                            )}
                          >
                            {getIcon(link.iconName, { className: "mr-2 h-4 w-4" })}
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                     <div className="border-t border-header-bottom-border mt-4 pt-4 space-y-3">
                       <div className="flex justify-center space-x-5 mb-3">
                        {socialMediaLinks.map((sLink) => (
                           <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                              {getIcon(sLink.iconName, { className: "h-6 w-6"})}
                           </Link>
                        ))}
                      </div>
                      {!isAuthenticated && !isLoadingSession ? (
                        <>
                          <SheetClose asChild>
                            <Link href="/login" passHref className="no-underline">
                              <Button variant="outline" className="w-full text-header-bottom-fg border-header-bottom-fg/50 hover:bg-white hover:text-blue-700 py-2 text-sm font-medium whitespace-nowrap">Log In</Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/get-started" passHref className="no-underline">
                              <Button
                                variant="default"
                                className="w-full bg-white text-blue-700 hover:bg-blue-500 hover:text-white rounded-md py-2 text-sm font-semibold !border-transparent !shadow-none whitespace-nowrap"
                              >
                                Get Started
                              </Button>
                            </Link>
                          </SheetClose>
                        </>
                      ) : isAuthenticated && (
                        <SheetClose asChild>
                           <Button variant="outline" className="w-full retro-button text-destructive hover:bg-destructive/10 border-destructive/50 whitespace-nowrap" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row (Sticky Navigation) */}
      <div className="hidden md:block sticky top-0 z-30 bg-header-bottom shadow-sm">
        <div className="container mx-auto flex items-stretch justify-between h-14 border-x border-b border-header-bottom-border rounded-b-md">
          <nav className="flex flex-grow items-stretch h-full">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.href}
                  className={cn(
                    "h-full flex flex-1 items-center justify-center", // Make each cell flex-1
                    index < navLinks.length -1 ? "border-r border-header-bottom-border" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center w-full h-full px-5 py-2 text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-header-bottom whitespace-nowrap",
                      isActive
                        ? "bg-white text-primary shadow-sm font-semibold" // Removed rounded-md from active for sharp rect
                        : "text-header-bottom-fg/80 hover:bg-white hover:text-header-bottom-fg hover:shadow-sm" // Removed hover:rounded-md
                    )}
                  >
                    {getIcon(link.iconName, { className: "mr-2 h-4 w-4" })}
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
          <div className="flex items-center space-x-5 px-8 py-3 border-l border-header-bottom-border h-full">
            {socialMediaLinks.map((sLink) => (
               <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                  {getIcon(sLink.iconName, { className: "h-6 w-6"})}
               </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
