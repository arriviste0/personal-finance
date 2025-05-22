
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    Sparkles, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, X, CircleDollarSign,
    LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, ShieldCheck, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign as DollarSignIcon, CreditCard, Activity,
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Search, MailIcon, Phone, MessageCircle, Send
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
import { Input } from "@/components/ui/input";

// Icon mapping should be outside the component or memoized if inside
const iconComponents: { [key: string]: React.ElementType } = {
    CircleDollarSign, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X,
    LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, ShieldCheck, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign: DollarSignIcon, CreditCard, Activity,
    BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Search, MailIcon, Phone, MessageCircle, Send,
    Asterisk: Sparkles, // Fallback
};

const getIcon = (iconName?: string, props?: any): React.JSX.Element | null => {
    if (!iconName) return null;
    const IconComponent = iconComponents[iconName] || iconComponents['Asterisk'];
    return <IconComponent {...props} />;
};

const wzLandingPageNavLinks = [
  { href: "/#services", label: "Services", iconName: "Package" },
  { href: "/#how-it-works", label: "How it Works", iconName: "Settings" },
  { href: "/#pricing", label: "Pricing", iconName: "DollarSign" },
  { href: "/#contact", label: "Contact", iconName: "MailIcon" },
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


export default function Header() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { walletBalance, totalLockedFunds } = useWallet();

  const isAuthenticated = status === "authenticated";
  const isLoadingSession = status === "loading";

  const isLandingPage = pathname === '/';

  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    // Consistent skeleton for two-row header
    const topBarHeight = isLandingPage ? 'py-3' : 'h-12'; // Matches actual heights
    const secondNavBarHeight = isLandingPage ? 'h-0' : 'h-10'; // No second bar for landing page skeleton, adjust if it has one

    return (
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        <div className={cn(topBarHeight, isLandingPage ? 'bg-wz-green' : "bg-header-top border-b border-header-top-border")}>
          {/* Placeholder for top bar area */}
        </div>
        {!isLandingPage && <div className={cn(secondNavBarHeight, "bg-nav-secondary sticky z-30 shadow-md")} style={{top: isLandingPage ? '0px' : '48px'}}></div>}
      </header>
    );
  } // <<<<< ENSURE THIS CLOSING BRACE IS PRESENT AND CORRECT

  // WZUH STYLE LANDING PAGE HEADER (Displayed only on landing page)
  if (isLandingPage) {
    return (
      <header className="w-full py-3 fixed top-0 left-0 right-0 z-50"> {/* Green bg provided by AppLayout */}
        <div className="container-default">
          <div className="bg-white rounded-full border border-gray-300/80 shadow-lg px-4 sm:px-6 py-2 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("Sparkles", { className: "h-7 w-7 text-wz-pink" })}
              <span className="font-heading text-xl font-bold text-wz-text-dark">FinCo</span>
            </Link>

            {/* Desktop Wzuh Landing Page Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {wzLandingPageNavLinks.map((link) => {
                const isActive = pathname + (typeof window !== 'undefined' ? window.location.hash : '') === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-wz-text-dark hover:bg-gray-100 hover:rounded-full px-3 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 no-underline",
                      isActive && "bg-gray-100 text-wz-pink"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side: Auth Buttons & Mobile Menu Trigger for Wzuh Landing */}
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
                 <Button
                    onClick={handleSignOut}
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-5 whitespace-nowrap shadow-wz-hard-sm"
                  >
                    {getIcon("LogOut", {className: "mr-1.5 h-3.5 w-3.5"})} Sign Out
                  </Button>
              )}
              {/* Mobile Menu Trigger for Wzuh Landing */}
              <div className="md:hidden ml-auto">
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
                      {wzLandingPageNavLinks.map((link) => {
                        const isActiveLink = pathname + (typeof window !== 'undefined' ? window.location.hash : '') === link.href;
                        return (
                         <SheetClose key={`${link.label}-mobile-landing`} asChild>
                            <Link
                                href={link.href}
                                className={cn(
                                "flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors whitespace-nowrap no-underline",
                                isActiveLink
                                    ? "bg-wz-pink/20 text-wz-pink font-semibold"
                                    : "text-wz-text-dark hover:bg-wz-pink/20"
                                )}
                            >
                               {getIcon(link.iconName, { className: cn("mr-2 h-5 w-5", isActiveLink ? "text-wz-pink" : "text-wz-text-dark/70") })}
                                {link.label}
                            </Link>
                        </SheetClose>
                        );
                      })}
                       <div className="border-t-2 border-wz-border-dark/20 mt-4 pt-4 space-y-2">
                        {!isAuthenticated && !isLoadingSession ? (
                          <>
                            <SheetClose asChild>
                              <Button className="w-full btn-wz btn-wz-pink text-sm shadow-wz-hard-sm !py-2" asChild>
                                <Link href="/login">Log In</Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button className="w-full btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-2 whitespace-nowrap shadow-wz-hard-sm" asChild>
                                <Link href="/get-started">Get Started</Link>
                              </Button>
                            </SheetClose>
                          </>
                        ) : (
                            <SheetClose asChild>
                                <Button
                                onClick={handleSignOut}
                                className="w-full btn-wz btn-wz-pink/80 text-sm shadow-wz-hard-sm !py-2"
                                >
                                {getIcon("LogOut", {className: "mr-2 h-4 w-4"})} Sign Out
                                </Button>
                            </SheetClose>
                        )}
                      </div>
                       <div className="mt-6 p-3 border-t-2 border-wz-border-dark/20">
                          <h3 className="text-sm font-semibold text-wz-gray-text mb-3 px-1">App Pages</h3>
                          {mainAppNavLinks.map((link) => {
                            const isActiveAppPage = pathname === link.href;
                            return (
                              <SheetClose key={`${link.href}-mobile-app`} asChild>
                                <Link
                                  href={link.href}
                                  className={cn(
                                    "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap no-underline",
                                    isActiveAppPage
                                      ? "bg-gray-200 text-wz-text-dark font-semibold"
                                      : "text-wz-text-dark/80 hover:bg-gray-100"
                                  )}
                                >
                                  {getIcon(link.iconName, { className: cn("mr-2 h-4 w-4", isActiveAppPage ? "text-wz-pink" : "text-wz-text-dark/60")})}
                                  {link.label}
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
      </header>
    );
  }

  // GUMROAD/PODPORTAL STYLE INTERNAL HEADER (Two-Tiered) for all other pages
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top Row */}
      <div className="bg-header-top h-12 border-b border-header-top-border">
        <div className="container-default flex items-center justify-between h-full">
          {/* Left: Logo & Wallet Info */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("CircleDollarSign", { className: "h-7 w-7 text-header-top-fg"})}
              <span className="font-heading text-xl font-bold text-header-top-fg">Fin.Co</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-xs text-header-top-fg/80 flex items-center">
                  {getIcon("Wallet", {className: "mr-1 h-3.5 w-3.5"})}
                  <span className="font-medium">Wallet:</span> {formatCurrency(walletBalance)}
                </div>
                <div className="text-xs text-header-top-fg/80 flex items-center">
                  {getIcon("Lock", {className: "mr-1 h-3.5 w-3.5"})}
                  <span className="font-medium">Locked:</span> {formatCurrency(totalLockedFunds)}
                </div>
              </div>
            )}
          </div>

          {/* Right: Auth Buttons & Mobile Menu Trigger */}
          <div className="flex items-stretch h-full text-sm">
            {!isAuthenticated && !isLoadingSession ? (
                <div className="flex items-stretch h-full">
                    <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                        <Link href="/login" className="w-full h-full flex items-center justify-center px-4 text-header-top-fg hover:bg-white/10 hover:text-header-top-fg text-sm font-medium whitespace-nowrap no-underline hover:rounded-md">
                            Log In
                        </Link>
                    </div>
                    <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                         <Button asChild variant="ghost" className="w-full h-full bg-white text-header-top-bg hover:bg-gray-100 rounded-none px-4 text-sm font-semibold !shadow-none !border-transparent whitespace-nowrap">
                            <Link href="/get-started">Get Started</Link>
                        </Button>
                    </div>
                </div>
            ) : (
              <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full h-full text-header-top-fg hover:bg-white/10 hover:text-header-top-fg px-4 text-sm font-medium rounded-none whitespace-nowrap"
                >
                  {getIcon("LogOut", { className: "mr-1.5 h-4 w-4" })} Sign Out
                </Button>
              </div>
            )}
            <div className="md:hidden flex items-stretch h-full border-l border-header-top-border">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-header-top-fg hover:bg-white/10 h-full w-12 rounded-none">
                    {getIcon("Menu", { className: "h-5 w-5" })}
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-header-bottom p-0 border-r-2 border-header-bottom-border shadow-lg">
                  <SheetHeader className="p-4 border-b-2 border-header-bottom-border bg-header-top flex flex-row justify-between items-center">
                    <SheetTitle className="flex items-center gap-2 text-left">
                      {getIcon("CircleDollarSign", { className: "h-6 w-6 text-header-top-fg"})}
                      <span className="text-lg font-heading font-semibold text-header-top-fg">Fin.Co</span>
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0 text-header-top-fg/80 hover:bg-white/20 rounded-full">
                        {getIcon("X", { className: "h-4 w-4" })}
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <nav className="grid gap-1 p-3">
                    {isAuthenticated && (
                      <div className="px-3 py-2.5 space-y-1 border-b border-header-bottom-border/20 mb-2">
                          <div className="text-xs text-header-bottom-fg/80"><span className="font-medium">Wallet:</span> {formatCurrency(walletBalance)}</div>
                          <div className="text-xs text-header-bottom-fg/80"><span className="font-medium">Locked:</span> {formatCurrency(totalLockedFunds)}</div>
                      </div>
                    )}
                    {mainAppNavLinks.map((link) => {
                       const isActive = pathname === link.href;
                      return (
                        <SheetClose key={`${link.href}-mobile-app`} asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors whitespace-nowrap no-underline",
                              isActive
                                ? "bg-white text-primary font-semibold shadow-sm"
                                : "text-header-bottom-fg/80 hover:bg-white/70 hover:text-header-bottom-fg"
                            )}
                          >
                            {getIcon(link.iconName, {className: cn("mr-2 h-5 w-5", isActive ? "text-primary" : "text-header-bottom-fg/70 group-hover:text-header-bottom-fg")})}
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                    <div className="border-t-2 border-header-bottom-border/20 mt-4 pt-4 space-y-2">
                      {!isAuthenticated && !isLoadingSession ? (
                        <>
                          <SheetClose asChild>
                            <Button className="w-full text-header-bottom-fg bg-header-bottom hover:bg-white/70 border-2 border-header-bottom-border rounded-md py-2 text-sm font-medium !shadow-none" asChild>
                              <Link href="/login">Log In</Link>
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-md py-2 text-sm font-semibold !shadow-none" asChild>
                              <Link href="/get-started">Get Started</Link>
                            </Button>
                          </SheetClose>
                        </>
                      ) : (
                        <SheetClose asChild>
                          <Button
                            onClick={handleSignOut}
                            className="w-full text-destructive-foreground bg-destructive hover:bg-destructive/90 rounded-md py-2 text-sm font-medium !shadow-none"
                          >
                            {getIcon("LogOut", {className: "mr-2 h-4 w-4"})} Sign Out
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                    <div className="border-t-2 border-header-bottom-border/20 mt-4 pt-4 flex justify-around items-center">
                        {socialMediaLinks.map((sLink) => (
                            <SheetClose key={`${sLink.label}-mobile-social`} asChild>
                                <Link href={sLink.href} aria-label={sLink.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
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

      {/* Second Row - Sticky Navigation (Gumroad Category Style) */}
       <div className="bg-nav-secondary shadow-md h-10 sticky top-[48px] z-30"> {/* Assuming top bar is h-12 (48px) */}
        <div className="container-default flex h-full items-stretch">
          <nav className="flex items-stretch h-full overflow-x-auto whitespace-nowrap flex-grow">
            {mainAppNavLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.href}
                  className={cn(
                    "h-full flex-1 flex items-center justify-center",
                    index < mainAppNavLinks.length -1 ? "border-r border-nav-secondary-fg/20" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center w-full h-full px-5 text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-secondary-active-border focus-visible:ring-offset-1 focus-visible:ring-offset-nav-secondary",
                      isActive
                        ? "bg-white text-nav-secondary-bg font-semibold shadow-sm"
                        : "text-nav-secondary-fg hover:bg-white hover:text-nav-secondary-bg hover:shadow-sm"
                    )}
                  >
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
             )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

    