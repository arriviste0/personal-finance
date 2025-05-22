
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    CircleDollarSign, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X,
    LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, User as UserIcon,
    Package, BrainCircuit, ShieldCheck, // Added ShieldCheck here
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign as DollarSignIcon, CreditCard, Activity, // Renamed DollarSign to avoid conflict with local var
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Mail as MailIcon, Phone, MessageCircle, Send
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
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign: DollarSignIcon, CreditCard, Activity, // Use aliased DollarSignIcon
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Asterisk: Sparkles, // Using Sparkles as a fallback for Asterisk
    MailIcon, Phone, MessageCircle, Send
};

const getIcon = (iconName?: string, props?: any): React.JSX.Element | null => {
  if (!iconName) return null;
  const IconComponent = iconComponents[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in iconComponents map, defaulting to Sparkles.`);
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

  const wzLandingPageNavLinks = [
    { href: "#services", label: "Services", iconName: "LayoutGrid" },
    { href: "#how-it-works", label: "How it Works", iconName: "Settings" },
    { href: "#pricing", label: "Pricing", iconName: "DollarSign" },
    { href: "#contact", label: "Contact", iconName: "MailIcon" },
  ];

  const mainAppNavLinks = [
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

  if (!isMounted && !isLandingPage) { // Only return skeleton for non-landing pages
    return (
        <header className="w-full">
            <div className="bg-header-top h-12"></div>
            <div className="bg-nav-secondary h-10"></div>
        </header>
    );
  }
  if (!isMounted && isLandingPage) {
     return (
        <header className="w-full py-3 bg-wz-green">
            <div className="container-default">
                <div className="h-12"></div> {/* Placeholder for pill navbar height */}
            </div>
        </header>
     )
  }


  // Landing Page Header Style (Wzuh inspired)
  if (isLandingPage) {
    return (
      <header className="w-full py-3 bg-wz-green sticky top-0 z-50">
        <div className="container-default">
          <div className="bg-white rounded-full border border-gray-300 shadow-lg px-4 sm:px-6 py-2 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("Sparkles", { className: "h-7 w-7 text-wz-pink"})}
              <span className="font-heading text-xl font-bold text-wz-text-dark">FinCo</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {wzLandingPageNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-semibold text-wz-text-dark hover:bg-gray-100 hover:rounded-full transition-colors duration-150 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons & Mobile Menu Trigger */}
            <div className="flex items-center space-x-2">
              {!isAuthenticated && !isLoadingSession && (
                <>
                  <Button
                    asChild
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap hover:ring-1 hover:ring-wz-border-dark hover:ring-offset-1 hover:ring-offset-white"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    className="btn-wz btn-wz-outline-dark text-sm !py-1.5 !px-4 whitespace-nowrap hidden sm:inline-flex"
                  >
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </>
              )}
              {isAuthenticated && (
                <Button
                  onClick={handleSignOut}
                  className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap"
                >
                  <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
                </Button>
              )}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-wz-text-dark hover:bg-gray-100 h-9 w-9 rounded-full">
                      {getIcon("Menu", { className: "h-5 w-5"})}
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] bg-wz-light-bg p-0 border-r">
                     <SheetHeader className="p-4 border-b bg-wz-light-bg">
                       <SheetTitle className="flex items-center gap-2">
                         {getIcon("Sparkles", { className: "h-6 w-6 text-wz-pink"})}
                         <span className="text-lg font-heading font-semibold text-wz-text-dark">FinCo</span>
                       </SheetTitle>
                        <SheetClose asChild>
                            <Button variant="ghost" size="icon" className="absolute right-3 top-3 h-7 w-7 p-0 text-wz-text-dark/80 hover:bg-gray-100 rounded-full">
                                {getIcon("X", { className: "h-4 w-4"})}
                                <span className="sr-only">Close</span>
                            </Button>
                        </SheetClose>
                     </SheetHeader>
                    <nav className="grid gap-1 p-3">
                       {wzLandingPageNavLinks.map(link => (
                        <SheetClose key={`${link.label}-mobile-wz`} asChild>
                          <Link
                            href={link.href}
                            className="flex items-center px-3 py-2.5 rounded-md text-base font-medium text-wz-text-dark hover:bg-gray-200/70 no-underline"
                          >
                            {getIcon(link.iconName, {className: "mr-2 h-4 w-4"})}
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                       <div className="border-t mt-4 pt-4 space-y-2">
                        {!isAuthenticated && !isLoadingSession ? (
                          <>
                            <SheetClose asChild>
                                <Link href="/login" passHref className="no-underline">
                                  <Button className="w-full btn-wz btn-wz-pink text-sm">Log In</Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link href="/get-started" passHref className="no-underline">
                                <Button className="w-full btn-wz btn-wz-outline-dark text-sm">Get Started</Button>
                              </Link>
                            </SheetClose>
                          </>
                        ) : (
                          <SheetClose asChild>
                             <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 border-destructive/50" onClick={handleSignOut}>
                              {getIcon("LogOut", { className: "mr-2 h-4 w-4"})} Sign Out
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
      </header>
    );
  }

  // Default App Header (Podportal inspired)
  return (
    <header className="w-full">
      {/* Top Row */}
      <div className="bg-header-top">
        <div className="container-default flex h-12 items-center justify-between px-4 md:px-6 border-b border-header-top-border">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("CircleDollarSign", { className: "h-6 w-6 text-header-top-fg"})}
              <span className="font-heading text-xl font-bold text-header-top-fg">Fin.Co</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-3 text-xs text-header-top-fg/90">
                <div className="flex items-center space-x-1">
                  {getIcon("Wallet", { className: "h-3.5 w-3.5"})}
                  <span>Wallet: {formatCurrency(walletBalance)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {getIcon("Lock", { className: "h-3.5 w-3.5"})}
                  <span>Locked: {formatCurrency(totalLockedFunds)}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!isAuthenticated && !isLoadingSession && (
              <div className="flex items-stretch h-full text-sm">
                 <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                    <Link
                        href="/login"
                        className="w-full h-full flex items-center justify-center px-4 text-header-top-fg font-medium hover:bg-white hover:text-header-top-bg whitespace-nowrap no-underline transition-colors"
                    >
                        Log In
                    </Link>
                 </div>
                 <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                    <Button asChild className="w-full h-full bg-white text-header-top-bg hover:bg-gray-100 rounded-none !shadow-none !border-transparent font-medium whitespace-nowrap">
                        <Link href="/get-started">Get Started</Link>
                    </Button>
                 </div>
              </div>
            )}
            {isAuthenticated && (
               <Button onClick={handleSignOut} variant="ghost" className="text-header-top-fg hover:bg-white/20 hover:text-header-top-fg rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap no-underline">
                <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
              </Button>
            )}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-header-top-fg hover:bg-header-top-fg/10 h-8 w-8">
                    {getIcon("Menu", { className: "h-5 w-5"})}
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-header-bottom p-0 border-r border-header-bottom-border">
                   <SheetHeader className="p-4 border-b border-header-bottom-border bg-header-top">
                    <SheetTitle className="flex items-center gap-2">
                      {getIcon("CircleDollarSign", { className: "h-6 w-6 text-header-top-fg"})}
                      <span className="text-lg font-heading font-semibold text-header-top-fg">Fin.Co</span>
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="absolute right-3 top-3 h-7 w-7 p-0 text-header-top-fg/80 hover:bg-header-top-fg/10">
                        {getIcon("X", { className: "h-4 w-4"})}
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
                    {mainAppNavLinks.map(link => {
                      const isActive = pathname === link.href;
                      return (
                        <SheetClose key={`${link.href}-mobile-app`} asChild>
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
                    <div className="border-t border-header-bottom-border mt-4 pt-4 space-y-2">
                       <div className="flex justify-center space-x-4 mb-3">
                        {socialMediaLinks.map((sLink) => {
                           return (
                             <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                                {getIcon(sLink.iconName, {className: "h-6 w-6"})}
                             </Link>
                           );
                        })}
                      </div>
                      {!isAuthenticated && !isLoadingSession ? (
                        <>
                          <SheetClose asChild>
                             <Link href="/login" passHref className="no-underline">
                                <Button className="w-full bg-header-top text-header-top-fg hover:bg-header-top/90 py-2 text-sm font-medium whitespace-nowrap rounded-md border-0 shadow-none">Log In</Button>
                              </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/get-started" passHref className="no-underline">
                              <Button className="w-full bg-white text-header-top-bg hover:bg-gray-100 rounded-md py-2 text-sm font-semibold border-0 shadow-none whitespace-nowrap">
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

      {/* Second Row (Sticky Navigation) */}
       <div className="sticky top-0 md:top-[48px] z-30 bg-nav-secondary shadow-md">
         <div className="container-default flex h-10 items-center justify-between">
           <nav className="flex items-stretch h-full overflow-x-auto whitespace-nowrap flex-grow">
            {mainAppNavLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.href}
                  className={cn(
                    "h-full flex flex-1 items-center justify-center", // flex-1 for equal width cells
                    index < mainAppNavLinks.length -1 ? "border-r border-nav-secondary-fg/20" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center w-full h-full px-5 py-2 text-sm font-medium no-underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-secondary-active-border focus-visible:ring-offset-1 focus-visible:ring-offset-nav-secondary",
                      isActive
                        ? "bg-white text-nav-secondary-bg font-semibold" // Active state: white bg, dark text
                        : "text-nav-secondary-fg hover:bg-white hover:text-nav-secondary-bg" // Default and Hover state
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
           <div className="hidden md:flex items-center space-x-4 px-8 py-3 border-l border-nav-secondary-fg/20">
            {socialMediaLinks.map((sLink) => {
               return (
                 <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-nav-secondary-fg hover:text-nav-secondary-fg-hover transition-colors no-underline">
                    {getIcon(sLink.iconName, {className: "h-6 w-6"})}
                 </Link>
               );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
