
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    CircleDollarSign, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X,
    LayoutGrid, ListChecks, Target, ShieldAlert, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    TrendingUp, Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, User as UserIcon,
    Package, BrainCircuit, CheckCircle, DollarSign, CreditCard, Activity,
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Settings, Users2, BookOpen, Server, Rocket, Award,
    Mail as MailIcon, Phone, MessageCircle, Send
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

// Helper to get icon components by name
const iconComponents: { [key: string]: React.ElementType } = {
    CircleDollarSign, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X,
    LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit, ShieldCheck,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign, CreditCard, Activity,
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Asterisk: Sparkles, // Using Sparkles as a fallback for Asterisk
    MailIcon, Phone, MessageCircle, Send
};

const getIcon = (iconName?: string, props?: any): React.JSX.Element | null => {
  if (!iconName) return null;
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found, defaulting to Sparkles.`);
    return <Sparkles {...props} />;
  }
  return <IconComponent {...props} />;
};


export default function Header() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { walletBalance, totalLockedFunds } = useWallet();

  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthenticated = status === 'authenticated';
  const isLoadingSession = status === 'loading';
  const isLandingPage = pathname === '/';

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", iconName: "LayoutGrid" },
    { href: "/budget", label: "Budget", iconName: "Wallet" },
    { href: "/expenses", label: "Expenses", iconName: "ListChecks" },
    { href: "/savings-goals", label: "Goals", iconName: "Target" },
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
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  if (!isMounted) {
    // Basic skeleton to prevent layout shift during hydration
    return (
        <header className="w-full">
            <div className="bg-header-top h-12"></div>
            <div className="bg-nav-secondary h-10"></div>
        </header>
    );
  }

  return (
    <header className="w-full">
      {/* Top Row - Consistent for all pages */}
      <div className="bg-header-top">
        <div className="container-default flex h-12 items-center justify-between border-b border-header-top-border">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("CircleDollarSign", { className: "h-7 w-7 text-header-top-fg" })}
              <span className="font-heading text-xl font-bold text-header-top-fg">Fin.Co</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-3 text-xs text-header-top-fg/90">
                <div className="flex items-center space-x-1">
                  {getIcon("Wallet", { className: "h-3.5 w-3.5" })}
                  <span>Wallet: {formatCurrency(walletBalance)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getIcon("Lock", { className: "h-3.5 w-3.5" })}
                  <span>Locked: {formatCurrency(totalLockedFunds)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!isAuthenticated && !isLoadingSession && (
              <>
                <Link href="/login" className="text-sm font-medium text-header-top-fg hover:text-header-top-fg/80 px-3 py-1.5 whitespace-nowrap no-underline">
                  Log In
                </Link>
                <Button asChild variant="ghost" className="bg-white text-header-top-bg hover:bg-white/90 rounded-md px-3 py-1.5 text-sm font-semibold !shadow-none !border-transparent whitespace-nowrap">
                  <Link href="/get-started">Get Started</Link>
                </Button>
              </>
            )}
            {isAuthenticated && (
               <Button onClick={handleSignOut} variant="ghost" className="text-header-top-fg hover:bg-white/20 hover:rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap no-underline">
                <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
              </Button>
            )}
            <div className="md:hidden"> {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-header-top-fg hover:bg-header-top-fg/10 h-8 w-8">
                    {getIcon("Menu", { className: "h-5 w-5" })}
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
                        {getIcon("X", { className: "h-4 w-4" })}
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <nav className="grid gap-1 p-3">
                    {isAuthenticated && (
                      <div className="mb-3 p-2 border-b border-dashed border-header-bottom-fg/20 text-header-bottom-fg">
                        <div className="flex items-center space-x-2 text-sm">
                          {getIcon("Wallet", { className: "h-4 w-4"})}
                          <span>Wallet: {formatCurrency(walletBalance)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          {getIcon("Lock", { className: "h-4 w-4"})}
                          <span>Locked: {formatCurrency(totalLockedFunds)}</span>
                        </div>
                      </div>
                    )}
                    {navLinks.map(link => {
                      const isActive = pathname === link.href;
                      return (
                        <SheetClose key={`${link.href}-mobile`} asChild>
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
                      <div className="flex justify-center space-x-4 mb-3">
                        {socialMediaLinks.map((sLink) => (
                           <Link key={`${sLink.label}-mobile-social`} href={sLink.href} aria-label={sLink.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                            {getIcon(sLink.iconName, { className: "h-6 w-6"})}
                           </Link>
                        ))}
                      </div>
                      {!isAuthenticated && !isLoadingSession ? (
                        <>
                          <SheetClose asChild>
                             <Link href="/login" passHref className="no-underline">
                                <Button variant="outline" className="w-full text-header-bottom-fg border-header-bottom-fg/50 hover:bg-white hover:text-primary py-2 text-sm font-medium whitespace-nowrap">Log In</Button>
                              </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/get-started" passHref className="no-underline">
                              <Button variant="default" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md py-2 text-sm font-semibold !border-transparent !shadow-none whitespace-nowrap">
                                Get Started
                              </Button>
                            </Link>
                          </SheetClose>
                        </>
                      ) : isAuthenticated && (
                        <SheetClose asChild>
                           <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 border-destructive/50 whitespace-nowrap" onClick={handleSignOut}>
                            {getIcon("LogOut", { className: "mr-2 h-4 w-4" })} Sign Out
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

      {/* Second Row (Sticky Navigation) - Consistent for all pages */}
      <div className={cn("sticky top-0 z-30 bg-nav-secondary shadow-md", isLandingPage ? "md:top-0" : "md:top-[48px]")}>
        <div className="container-default flex h-10 items-center justify-between">
          <nav className="flex items-stretch h-full overflow-x-auto whitespace-nowrap">
            {navLinks.map((link, index) => {
              const isActive = pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/'); // More robust active check
              return (
                <div
                  key={link.href}
                  className={cn(
                    "h-full flex items-center",
                    index < navLinks.length - 1 ? "border-r border-nav-secondary-fg/20" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 h-full text-sm transition-colors no-underline",
                      isActive
                        ? "text-nav-secondary-fg-hover border-b-2 border-nav-secondary-active-border font-medium"
                        : "text-nav-secondary-fg hover:text-nav-secondary-fg-hover"
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
          {/* Social media icons can be placed here if needed, or kept in footer/mobile menu only */}
        </div>
      </div>
    </header>
  );
}
