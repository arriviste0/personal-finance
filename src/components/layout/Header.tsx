
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    Sparkles, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, X, CircleDollarSign,
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
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Asterisk: Sparkles, // Using Sparkles as a fallback for Asterisk
    MailIcon, Phone, MessageCircle, Send
};

const getIcon = (iconName?: string, props?: any): React.JSX.Element | null => {
    if (!iconName) return null;
    const IconComponent = iconComponents[iconName] || iconComponents['Asterisk']; // Fallback to Sparkles if icon not found
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

  const isAuthenticated = status === "authenticated";
  const isLoadingSession = status === "loading";

  // Navigation links for the Wzuh-style landing page header (Top Pill Bar if landing)
  const wzLandingPageNavLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#how-it-works", label: "How it Works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#contact", label: "Contact" },
  ];

  // Main navigation links for the authenticated app (second row) - consistent across all pages
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


  if (!isMounted) {
    // Basic skeleton for SSR to avoid layout shifts, matching the two-row structure
    return (
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        <div className="bg-wz-green py-3" style={{ height: `64px` }}>
          {/* Placeholder for top pill bar area */}
        </div>
        <div className="bg-nav-secondary h-10 sticky top-[64px] z-30 shadow-md">
          {/* Placeholder for second nav bar area */}
        </div>
      </header>
    );
  }

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top Row - Pill Bar (Wzuh Style - consistent for all pages) */}
      <div className="py-3"> {/* Green bg provided by AppLayout for all pages */}
        <div className="container-default">
          <div className={cn(
            "bg-white rounded-full border border-gray-300/80 shadow-lg px-4 sm:px-6 py-2 flex items-center justify-between"
          )}>
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("Sparkles", { className: "h-7 w-7 text-wz-pink" })}
              <span className="font-heading text-xl font-bold text-wz-text-dark">FinCo</span>
            </Link>

            {/* Desktop Landing Page Specific Navigation Links (Wzuh Style) - ONLY for landing page */}
            {isLandingPage && (
                <nav className="hidden md:flex items-center space-x-1">
                {wzLandingPageNavLinks.map((link) => {
                  // Note: active state for these anchor links might be tricky without more complex logic
                  const isActive = pathname === link.href || (link.href.includes("#") && pathname + location.hash === link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-wz-text-dark hover:bg-gray-100 hover:text-wz-pink px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 no-underline",
                        isActive && "bg-gray-100 text-wz-pink"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            )}


            {/* Right Side: Auth Buttons & Mobile Menu Trigger */}
            <div className="flex items-center space-x-2">
              {!isAuthenticated && !isLoadingSession ? (
                <>
                  <Button
                    asChild
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm hover:ring-1 hover:ring-wz-border-dark hover:ring-offset-1 hover:ring-offset-white"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    className="btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm"
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
                        {getIcon("LogOut", {className: "mr-1.5 h-3.5 w-3.5"})} Sign Out
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
                        <span className="text-lg font-heading font-semibold text-wz-text-dark">FinCo</span>
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
                        {/* Landing Page Links for Mobile (Wzuh Style) - if on landing page */}
                        {isLandingPage && wzLandingPageNavLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href.includes("#") && pathname + location.hash === link.href);
                            return (
                             <SheetClose key={`${link.label}-mobile-landing`} asChild>
                                <Link
                                    href={link.href}
                                    className={cn(
                                    "flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors whitespace-nowrap no-underline",
                                    isActive
                                        ? "bg-wz-pink/20 text-wz-pink font-semibold"
                                        : "text-wz-text-dark hover:bg-wz-pink/20"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </SheetClose>
                            );
                        })}
                        {/* Main App Nav Links for Mobile (these are always primary in sheet for non-landing) */}
                         <div className={cn(isLandingPage && wzLandingPageNavLinks.length > 0 && "border-t-2 border-wz-border-dark/20 mt-3 pt-3", "space-y-1")}>
                            {mainAppNavLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <SheetClose key={`${link.href}-mobile-app`} asChild>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                            "flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors whitespace-nowrap no-underline",
                                            isActive
                                                ? "bg-nav-secondary-fg/10 text-nav-secondary-fg-hover font-semibold" // More generic active for sheet
                                                : "text-wz-text-dark hover:bg-nav-secondary-fg/10" // Generic default/hover for sheet
                                            )}
                                        >
                                            {getIcon(link.iconName, {className: cn("mr-2 h-5 w-5", isActive ? "text-nav-secondary-fg-hover" : "text-wz-text-dark/80")})}
                                            {link.label}
                                        </Link>
                                    </SheetClose>
                                );
                            })}
                        </div>

                       <div className="border-t-2 border-wz-border-dark/20 mt-4 pt-4 space-y-2">
                        {isAuthenticated ? (
                            <SheetClose asChild>
                                <Button
                                onClick={handleSignOut}
                                className="w-full btn-wz btn-wz-pink/80 text-sm shadow-wz-hard-sm"
                                >
                                {getIcon("LogOut", {className: "mr-2 h-4 w-4"})} Sign Out
                                </Button>
                            </SheetClose>
                        ) : (
                          <>
                            <SheetClose asChild>
                              <Button className="w-full btn-wz btn-wz-pink text-sm shadow-wz-hard-sm !py-1.5 !px-4 whitespace-nowrap" asChild>
                                <Link href="/login">Log In</Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button className="w-full btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm" asChild>
                                <Link href="/get-started">Get Started</Link>
                              </Button>
                            </SheetClose>
                          </>
                        )}
                      </div>
                       {/* Social Media in Mobile Menu */}
                        <div className="border-t-2 border-wz-border-dark/20 mt-4 pt-4 flex justify-around items-center">
                            {socialMediaLinks.map((sLink) => {
                               return (
                                 <SheetClose key={`${sLink.label}-mobile-social`} asChild>
                                    <Link href={sLink.href} aria-label={sLink.label} className="text-wz-text-dark/70 hover:text-wz-pink transition-colors no-underline">
                                        {getIcon(sLink.iconName, {className: "h-6 w-6"})}
                                    </Link>
                                 </SheetClose>
                               );
                            })}
                        </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row - Dark Sticky Navigation Bar - Consistent Across All Pages */}
      <div
        className={cn(
          "bg-nav-secondary shadow-md h-10", // Fixed height h-10 (40px)
          `sticky top-[64px] z-30` // Stick below the top row pill bar area (assuming top area is ~64px high)
        )}
      >
        <div className="container-default flex h-full items-stretch">
          <nav className="flex items-stretch h-full overflow-x-auto whitespace-nowrap flex-grow">
            {mainAppNavLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div // This parent div is mainly for the border-r separator
                  key={link.href}
                  className={cn(
                    "h-full flex flex-1 items-center justify-center",
                    index < mainAppNavLinks.length - 1 ? "border-r border-nav-secondary-fg/20" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center w-full h-full px-5 text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-secondary-active-border focus-visible:ring-offset-1 focus-visible:ring-offset-nav-secondary",
                      isActive
                        ? "text-nav-secondary-fg-hover border-b-2 border-nav-secondary-active-border font-semibold"
                        : "text-nav-secondary-fg hover:text-nav-secondary-fg-hover"
                    )}
                  >
                    {/* {getIcon(link.iconName, {className: cn("mr-2 h-4 w-4", isActive ? "text-nav-secondary-fg-hover" : "text-nav-secondary-fg/80")})} */}
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
          <div className="hidden md:flex items-center space-x-5 px-8 border-l border-nav-secondary-fg/20">
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
