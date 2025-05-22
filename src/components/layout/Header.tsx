
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    Sparkles, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, X, CircleDollarSign, // Added CircleDollarSign
    LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, ShieldCheck, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign as DollarSignIcon, CreditCard, Activity,
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Asterisk,
    MailIcon, Phone, MessageCircle, Send
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

// Define a mapping for icon names to components
const iconComponents: { [key: string]: React.ElementType } = {
    CircleDollarSign, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X,
    LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, ShieldCheck, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign: DollarSignIcon, CreditCard, Activity,
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Asterisk,
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

  const wzLandingPageNavLinks = [
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
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

  const isLandingPage = pathname === '/';

  // Height constants for dynamic padding calculation in AppLayout
  const topRowHeightClass = "h-16"; // Corresponds to py-3 on wrapper + py-2 on pill approx 64px
  const secondNavHeightClass = "h-10"; // 40px

  if (!isMounted) {
    return (
      <header className={cn("w-full fixed top-0 left-0 right-0 z-50")}>
        <div className={cn("bg-wz-green", topRowHeightClass)}></div>
        <div className={cn("bg-nav-secondary", secondNavHeightClass, `sticky top-[4rem]`)}></div>
      </header>
    );
  }

  return (
    <header className={cn("w-full fixed top-0 left-0 right-0 z-50", isLandingPage && "bg-wz-green")}>
      {/* Top Pill Bar - Wzuh Style */}
      <div className={cn("py-3", topRowHeightClass)}>
        <div className="container-default">
          <div className={cn(
            "flex items-center justify-between",
            "bg-white rounded-full border border-gray-300/80 shadow-lg px-4 sm:px-6 py-2"
          )}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("Sparkles", { className: "h-7 w-7 text-wz-pink" })}
              <span className="font-heading text-xl font-bold text-wz-text-dark">Fin.Co</span>
            </Link>

            {/* Desktop Navigation Links for Landing Page */}
            <nav className="hidden md:flex items-center space-x-1">
              {wzLandingPageNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-wz-text-dark hover:bg-gray-100/80 hover:text-wz-pink px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side: Auth Buttons & Mobile Menu Trigger */}
            <div className="flex items-center space-x-2">
              {!isAuthenticated && !isLoadingSession ? (
                <>
                  <Button
                    asChild
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-5 whitespace-nowrap shadow-wz-hard-sm hover:ring-1 hover:ring-wz-border-dark hover:ring-offset-1 hover:ring-offset-white"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    className="btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-1.5 !px-5 whitespace-nowrap shadow-wz-hard-sm"
                  >
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </>
              ) : (
                 <div className="hidden md:flex items-center space-x-3">
                    <div className="text-xs text-wz-text-dark/80">
                        <span className="font-medium">Wallet:</span> {formatCurrency(walletBalance)}
                    </div>
                     <div className="text-xs text-wz-text-dark/80">
                        <span className="font-medium">Locked:</span> {formatCurrency(totalLockedFunds)}
                    </div>
                    <Button
                        onClick={handleSignOut}
                        variant="outline"
                        size="sm"
                        className="btn-wz btn-wz-outline-dark !py-1.5 !px-4 text-xs shadow-wz-hard-sm"
                    >
                        <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out
                    </Button>
                 </div>
              )}
              {/* Mobile Menu Trigger */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-wz-text-dark hover:bg-gray-100/80 h-9 w-9 rounded-full">
                      {getIcon("Menu", { className: "h-5 w-5" })}
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] bg-wz-light-bg p-0 border-r-2 border-wz-border-dark shadow-wz-hard">
                    <SheetHeader className="p-4 border-b-2 border-wz-border-dark bg-wz-light-bg flex flex-row justify-between items-center">
                      <SheetTitle className="flex items-center gap-2 text-left">
                        {getIcon("Sparkles", { className: "h-6 w-6 text-wz-pink" })}
                        <span className="text-lg font-heading font-semibold text-wz-text-dark">Fin.Co</span>
                      </SheetTitle>
                       <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 p-0 text-wz-text-dark/80 hover:bg-wz-pink/20 rounded-full">
                            {getIcon("X", { className: "h-4 w-4" })}
                            <span className="sr-only">Close</span>
                        </Button>
                       </SheetClose>
                    </SheetHeader>
                    <nav className="grid gap-1 p-3">
                       {/* Wallet Info in Mobile Menu if Authenticated */}
                        {isAuthenticated && (
                            <div className="px-3 py-2.5 space-y-1 border-b border-wz-border-dark/20 mb-2">
                                <div className="text-xs text-wz-text-dark/80">
                                    <span className="font-medium">Wallet:</span> {formatCurrency(walletBalance)}
                                </div>
                                <div className="text-xs text-wz-text-dark/80">
                                    <span className="font-medium">Locked:</span> {formatCurrency(totalLockedFunds)}
                                </div>
                            </div>
                        )}
                        {/* Landing Page Links for Mobile */}
                        {wzLandingPageNavLinks.map((link) => (
                             <SheetClose key={`${link.label}-mobile-landing`} asChild>
                                <Link
                                    href={link.href}
                                    className={cn(
                                    "flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors whitespace-nowrap no-underline",
                                    pathname === link.href
                                        ? "bg-wz-pink/20 text-wz-pink font-semibold"
                                        : "text-wz-text-dark hover:bg-wz-pink/20"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </SheetClose>
                        ))}
                        {/* Main App Nav Links for Mobile (if user is authenticated, these are primary) */}
                         <div className="border-t-2 border-wz-border-dark/20 mt-3 pt-3 space-y-1">
                            {mainAppNavLinks.map((link) => (
                                <SheetClose key={`${link.href}-mobile-app`} asChild>
                                <Link
                                    href={link.href}
                                    className={cn(
                                    "flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors whitespace-nowrap no-underline",
                                    pathname === link.href
                                        ? "bg-wz-pink/20 text-wz-pink font-semibold"
                                        : "text-wz-text-dark hover:bg-wz-pink/20"
                                    )}
                                >
                                    {getIcon(link.iconName, {className: "mr-2 h-5 w-5"})}
                                    {link.label}
                                </Link>
                                </SheetClose>
                            ))}
                        </div>

                       <div className="border-t-2 border-wz-border-dark/20 mt-4 pt-4 space-y-2">
                        {isAuthenticated && (
                            <SheetClose asChild>
                                <Button
                                onClick={handleSignOut}
                                className="w-full btn-wz btn-wz-pink/80 text-sm shadow-wz-hard-sm"
                                >
                                <LogOut className="mr-2 h-4 w-4" /> Sign Out
                                </Button>
                            </SheetClose>
                        )}
                        {!isAuthenticated && !isLoadingSession && (
                          <>
                            <SheetClose asChild>
                              <Button className="w-full btn-wz btn-wz-pink text-sm shadow-wz-hard-sm" asChild>
                                <Link href="/login">Log In</Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button className="w-full btn-wz bg-white text-wz-text-dark hover:bg-gray-200 shadow-wz-hard-sm text-sm" asChild>
                                <Link href="/get-started">Get Started</Link>
                              </Button>
                            </SheetClose>
                          </>
                        )}
                      </div>
                       {/* Social Media in Mobile Menu */}
                        <div className="border-t-2 border-wz-border-dark/20 mt-4 pt-4 flex justify-around items-center">
                            {socialMediaLinks.map((sLink) => (
                                <SheetClose key={`${sLink.label}-mobile-social`} asChild>
                                    <Link href={sLink.href} aria-label={sLink.label} className="text-wz-text-dark/70 hover:text-wz-pink transition-colors no-underline">
                                        {getIcon(sLink.iconName, {className: "h-6 w-6"})}
                                    </Link>
                                </SheetClose>
                            ))}
                        </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Dark Sticky Navigation Bar */}
      <div className={cn(
          "bg-nav-secondary shadow-md",
          secondNavHeightClass,
          `sticky top-[4rem] z-30` // Assuming topRowHeightClass is h-16 (4rem)
        )}>
        <div className="container-default flex h-full items-stretch justify-between">
          <nav className="flex items-stretch h-full overflow-x-auto whitespace-nowrap flex-grow">
            {mainAppNavLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div // Cell container for border
                  key={link.href}
                  className={cn(
                    "h-full flex flex-1 items-center justify-center",
                    index < mainAppNavLinks.length ? "border-r border-nav-secondary-fg/20" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center w-full h-full px-5 text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-secondary-active-border focus-visible:ring-offset-1 focus-visible:ring-offset-nav-secondary",
                      isActive
                        ? "bg-white text-nav-secondary-bg font-semibold"
                        : "text-nav-secondary-fg hover:bg-white hover:text-nav-secondary-bg"
                    )}
                  >
                    {/* Optional: {getIcon(link.iconName, { className: "mr-2 h-4 w-4" })} */}
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center space-x-5 px-8 border-l border-nav-secondary-fg/20">
            {socialMediaLinks.map((sLink) => (
               <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-nav-secondary-fg hover:text-nav-secondary-fg-hover transition-colors no-underline">
                  {getIcon(sLink.iconName, {className: "h-6 w-6"})}
               </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
