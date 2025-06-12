
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X, Search, ChevronDown,
    LayoutGrid, ListChecks, Target as TargetIcon, ShieldAlert, ShieldCheck, FileText, Lightbulb, PiggyBank, Landmark, HandCoins, TrendingUp,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, CreditCard, Activity,
    BarChartBig, ChevronLeft, ChevronUp, MailIcon, Phone, MessageCircle, Send,
    DollarSign as DollarSignLucide, CircleDollarSign
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

  const iconComponents: { [key: string]: React.ElementType } = {
    CircleDollarSign, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X, Search, ChevronDown,
    LayoutGrid, ListChecks, Target: TargetIcon, ShieldAlert, ShieldCheck, FileText, Lightbulb, PiggyBank, Landmark, HandCoins, TrendingUp,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, CreditCard, Activity,
    BarChartBig, ChevronLeft, ChevronUp, MailIcon, Phone, MessageCircle, Send,
    DollarSign: DollarSignLucide,
    Asterisk: Sparkles, // Fallback icon
  };

  const getIcon = (iconName?: string, props?: any): React.JSX.Element | null => {
    if (!iconName) return null;
    const IconComponent = iconComponents[iconName] || iconComponents['Asterisk'];
    return <IconComponent {...props} />;
  };

  const wzLandingPageNavLinks = [
    { href: "/#services", label: "Services" },
    { href: "/#how-it-works", label: "How it Works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#contact", label: "Contact" },
  ];

  const mainAppNavLinks = [
    { href: "/dashboard", label: "Dashboard", iconName: "LayoutGrid" },
    { href: "/budget", label: "Budget", iconName: "Wallet" },
    { href: "/expenses", label: "Expenses", iconName: "Receipt" },
    { href: "/savings-goals", label: "Goals", iconName: "PiggyBank" },
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
    // Skeleton for initial load (Gumroad style - black header)
    const skeletonTopBarHeight = "h-12"; // 48px
    const skeletonSecondBarHeight = "h-10"; // 40px
    return (
      <div className="w-full fixed top-0 left-0 right-0 z-50 bg-black">
        <div className={cn(skeletonTopBarHeight, "bg-black")}>
          <div className="container-default h-full flex items-center justify-between">
            <div className="h-8 w-24 bg-gray-700/50 rounded-md animate-pulse"></div> {/* Logo area */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="h-8 w-20 bg-gray-700/50 rounded-md animate-pulse"></div> {/* Wallet info */}
              <div className="h-8 w-24 bg-gray-700/50 rounded-md animate-pulse"></div> {/* Auth buttons */}
            </div>
            <div className="md:hidden h-8 w-8 bg-gray-700/50 rounded-full animate-pulse"></div> {/* Mobile menu */}
          </div>
        </div>
        {/* Second bar skeleton only if not landing page */}
        <div className={cn("bg-black sticky top-[48px] z-30 shadow-md border-t border-gray-700", skeletonSecondBarHeight, isLandingPage ? "hidden" : "block")}>
          <div className="container-default h-full flex items-center">
            <div className="h-6 w-full bg-gray-800/50 rounded-none animate-pulse"></div> {/* Nav links area */}
          </div>
        </div>
      </div>
    );
  }


  if (isLandingPage) {
    // WZUH STYLE LANDING PAGE HEADER (White pill on green backdrop from AppLayout)
    return (
      <header className="w-full py-3 fixed top-0 left-0 right-0 z-50 bg-transparent"> {/* Transparent to show AppLayout's green */}
        <div className="container-default">
          <div className="bg-white rounded-full border border-gray-300/80 shadow-lg px-4 sm:px-6 py-2 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("Sparkles", { className: "h-7 w-7 text-wz-pink" })}
              <span className="font-heading text-xl font-bold text-wz-text-dark">Fin.Co</span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {wzLandingPageNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-wz-text-dark hover:bg-gray-100 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-150 no-underline inline-flex items-center justify-center",
                    pathname === link.href && "bg-gray-200 text-wz-pink"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Auth Buttons & Mobile Menu Trigger */}
            <div className="flex items-center space-x-2">
              {!isAuthenticated && !isLoadingSession ? (
                <>
                  <Link
                    href="/login"
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm hover:ring-1 hover:ring-wz-border-dark hover:ring-offset-1 hover:ring-offset-white no-underline inline-flex items-center justify-center"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/get-started"
                    className="btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm no-underline inline-flex items-center justify-center"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                 <Button
                    onClick={handleSignOut}
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm"
                  >
                    {getIcon("LogOut", {className: "mr-1.5 h-3.5 w-3.5"})} Sign Out
                  </Button>
              )}
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
                       <div className="border-t-2 border-wz-border-dark/20 mt-4 pt-4 space-y-2">
                        {!isAuthenticated && !isLoadingSession ? (
                          <>
                            <SheetClose asChild>
                              <Link
                                href="/login"
                                className="btn-wz btn-wz-pink shadow-wz-hard-sm w-full !py-2 text-sm font-medium whitespace-nowrap no-underline flex items-center justify-center"
                              >
                                {getIcon("LogIn", {className: "mr-2 h-4 w-4"})}Log In
                              </Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link
                                href="/get-started"
                                className="btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-2 whitespace-nowrap shadow-wz-hard-sm border-wz-border-dark no-underline flex items-center justify-center"
                              >
                                Get Started
                              </Link>
                            </SheetClose>
                          </>
                        ) : (
                            <SheetClose asChild>
                                <Button
                                onClick={handleSignOut}
                                variant="default"
                                className="w-full btn-wz btn-wz-pink/80 text-sm shadow-wz-hard-sm !py-2 flex items-center justify-center"
                                >
                                {getIcon("LogOut", {className: "mr-2 h-4 w-4"})} Sign Out
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
  } else {
    // GUMROAD STYLE HEADER FOR INTERNAL PAGES (Black, White, Pink accents)
    return (
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        {/* Top Row - Black Background */}
        <div className="h-12 bg-black">
          <div className="container-default flex items-center h-full justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2 no-underline">
                {getIcon("Sparkles", { className: "h-7 w-7 text-white"})}
                <span className="font-heading text-xl font-bold text-white">Fin.Co</span>
              </Link>
              {isAuthenticated && (
                <div className="hidden md:flex items-center space-x-3">
                  <div className="text-xs text-white flex items-center">
                    {getIcon("Wallet", {className: "mr-1 h-3.5 w-3.5"})}
                    <span className="font-medium">Wallet:</span> {formatCurrency(walletBalance)}
                  </div>
                  <div className="text-xs text-white flex items-center">
                    {getIcon("Lock", {className: "mr-1 h-3.5 w-3.5"})}
                    <span className="font-medium">Locked:</span> {formatCurrency(totalLockedFunds)}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-stretch h-full text-sm">
              {!isAuthenticated && !isLoadingSession ? (
                <div className="flex items-center h-full space-x-0 sm:space-x-0"> {/* Adjusted spacing */}
                    <Link
                      href="/login"
                      className="h-full flex items-center px-3 sm:px-4 text-white hover:bg-pink-500 hover:text-white text-sm font-medium whitespace-nowrap no-underline transition-colors"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/get-started"
                      className="h-full flex items-center justify-center bg-pink-500 text-black hover:bg-black hover:text-white rounded-none px-3 sm:px-4 text-sm font-semibold shadow-sm whitespace-nowrap no-underline transition-colors"
                    >
                      Get Started
                    </Link>
                </div>
              ) : (
                <div className="flex items-stretch h-full">
                   <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    className="w-full h-full text-white hover:bg-gray-700 hover:text-white px-4 text-sm font-medium rounded-none whitespace-nowrap no-underline flex items-center justify-center"
                  >
                    {getIcon("LogOut", { className: "mr-1.5 h-4 w-4" })} Sign Out
                  </Button>
                </div>
              )}
              <div className="md:hidden flex items-stretch h-full border-l border-gray-700">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700 h-full w-12 rounded-none">
                      {getIcon("Menu", { className: "h-5 w-5" })}
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] p-0 bg-black border-r-2 border-gray-700 shadow-lg">
                    <SheetHeader className="p-4 border-b-2 border-gray-700 bg-black flex flex-row justify-between items-center">
                      <SheetTitle className="flex items-center gap-2 text-left">
                        {getIcon("Sparkles", { className: "h-6 w-6 text-white"})}
                        <span className="text-lg font-heading font-semibold text-white">Fin.Co</span>
                      </SheetTitle>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 p-0 text-gray-400 hover:bg-gray-700 hover:text-white rounded-full">
                          {getIcon("X", { className: "h-4 w-4" })}
                          <span className="sr-only">Close</span>
                        </Button>
                      </SheetClose>
                    </SheetHeader>
                    <nav className="grid gap-1 p-3">
                      {isAuthenticated && (
                        <div className="px-3 py-2.5 space-y-1 border-b border-gray-700 mb-2">
                          <div className="text-xs text-gray-300"><span className="font-medium">Wallet:</span> {formatCurrency(walletBalance)}</div>
                          <div className="text-xs text-gray-300"><span className="font-medium">Locked:</span> {formatCurrency(totalLockedFunds)}</div>
                        </div>
                      )}
                      {mainAppNavLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                          <SheetClose key={`${link.href}-mobile-app`} asChild>
                            <Link
                              href={link.href}
                              className={cn(
                                "flex items-center px-3 py-2.5 rounded-none text-base font-medium transition-colors whitespace-nowrap no-underline",
                                isActive
                                  ? "bg-neutral-800 text-blue-400 font-semibold" // Active style from image
                                  : "text-white hover:bg-pink-500 hover:text-white"
                              )}
                            >
                              {getIcon(link.iconName, { className: cn("mr-2 h-5 w-5", isActive ? "text-blue-400" : "text-gray-400 group-hover:text-white") })}
                              {link.label}
                            </Link>
                          </SheetClose>
                        );
                      })}
                      <div className="border-t-2 border-gray-700 mt-4 pt-4 space-y-2">
                         <div className="flex justify-around items-center mb-3 px-3">
                            {socialMediaLinks.map((sLink) => (
                              <SheetClose key={`${sLink.label}-mobile-social-internal`} asChild>
                                <Link href={sLink.href} aria-label={sLink.label} className="text-white hover:text-gray-300 transition-colors no-underline">
                                  {getIcon(sLink.iconName, { className: "h-6 w-6" })}
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        {!isAuthenticated && !isLoadingSession ? (
                          <>
                            <SheetClose asChild>
                              <Link
                                href="/login"
                                className="w-full flex items-center justify-center text-white hover:bg-pink-500 hover:text-white rounded-none py-2 text-sm font-medium whitespace-nowrap no-underline"
                              >
                                {getIcon("LogIn", {className: "mr-2 h-4 w-4"})}Log In
                              </Link>
                            </SheetClose>
                            <SheetClose asChild>
                              <Link
                                href="/get-started"
                                className="w-full flex items-center justify-center bg-pink-500 text-black hover:bg-black hover:text-white rounded-none py-2 text-sm font-semibold whitespace-nowrap no-underline shadow-sm"
                              >
                                Get Started
                              </Link>
                            </SheetClose>
                          </>
                        ) : (
                          <SheetClose asChild>
                            <Button
                              onClick={handleSignOut}
                              variant="ghost"
                              className="w-full text-white hover:bg-gray-800 rounded-none py-2 text-sm font-medium whitespace-nowrap border border-gray-700 no-underline flex items-center justify-center"
                            >
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

        {/* Second Nav Row - Black Background, White text */}
        <div className="bg-black h-10 shadow-md sticky top-[48px] z-30 border-t border-gray-700">
          <div className="container-default flex h-full items-stretch justify-between">
            <nav className="flex items-stretch h-full overflow-x-auto whitespace-nowrap flex-grow scrollbar-hide">
              {mainAppNavLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <div
                    key={link.href}
                    className={cn(
                      "h-full flex flex-1 items-center justify-center",
                       index < mainAppNavLinks.length -1 ? "border-r border-gray-700/50" : ""
                    )}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-center w-full h-full text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-1 focus-visible:ring-offset-black px-3 py-2 rounded-none",
                        isActive
                          ? "bg-neutral-800 text-blue-400" // Active style from image
                          : "text-white hover:bg-pink-500 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </nav>
            <div className="hidden md:flex items-center space-x-4 pl-6 pr-4 border-l border-gray-700/50">
              {socialMediaLinks.map((sLink) => (
                  <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-white hover:text-gray-300 transition-colors no-underline">
                     {getIcon(sLink.iconName, { className: "h-5 w-5" })}
                  </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
