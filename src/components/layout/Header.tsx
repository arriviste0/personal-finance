
'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
    Sparkles, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, X, Search, ChevronDown,
    LayoutGrid, ListChecks, Target, ShieldAlert, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit, ShieldCheck,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, DollarSign as DollarSignIcon, CreditCard, Activity,
    BarChartBig, ChevronLeft, ChevronUp, Mail as MailIcon, Phone, MessageCircle, Send, TrendingUp
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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

  // Define iconComponents and getIcon helper inside the component
  const iconComponents: { [key: string]: React.ElementType } = {
    CircleDollarSign: DollarSignIcon, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X, Search, ChevronDown,
    LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, ShieldCheck, FileText, Lightbulb, PiggyBank, Landmark, HandCoins,
    Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit,
    Award, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, CreditCard, Activity,
    BarChartBig, ChevronLeft, ChevronUp, MailIcon, Phone, MessageCircle, Send,
    Asterisk: Sparkles, // Fallback for Asterisk
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
    // Consistent skeleton for two-row header
    return (
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        <div className={cn(isLandingPage ? 'bg-wz-green py-3' : "bg-header-top h-12 border-b border-header-top-border")}>
            {/* Skeleton for top bar */}
        </div>
        {!isLandingPage && <div className="bg-nav-secondary h-10 sticky top-[48px] z-30 shadow-md"></div>}
      </header>
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
              <span className="font-heading text-xl font-bold text-wz-text-dark">FinCo</span>
            </Link>

            {/* Desktop Wzuh Landing Page Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {wzLandingPageNavLinks.map((link) => {
                const isActiveLink = pathname === link.href || (pathname === '/' && typeof window !== 'undefined' && link.href.includes(window.location.hash));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-wz-text-dark hover:bg-gray-100 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors duration-150 no-underline",
                      isActiveLink && "bg-gray-200 text-wz-pink"
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
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm hover:ring-1 hover:ring-wz-border-dark hover:ring-offset-1 hover:ring-offset-white"
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button
                    asChild
                    className="btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm border-wz-border-dark"
                  >
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </>
              ) : (
                 <Button
                    onClick={handleSignOut}
                    className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap shadow-wz-hard-sm"
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
                         const isActiveAppPage = pathname === link.href || (pathname === '/' && typeof window !== 'undefined' && link.href.includes(window.location.hash));
                        return (
                         <SheetClose key={`${link.label}-mobile-landing`} asChild>
                            <Link
                                href={link.href}
                                className={cn(
                                "flex items-center px-3 py-2.5 rounded-md text-base font-medium transition-colors whitespace-nowrap no-underline",
                                isActiveAppPage
                                    ? "bg-wz-pink/20 text-wz-pink font-semibold"
                                    : "text-wz-text-dark hover:bg-wz-pink/20"
                                )}
                            >
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
                              <Button className="w-full btn-wz bg-white text-wz-text-dark hover:bg-gray-200 text-sm !py-2 whitespace-nowrap shadow-wz-hard-sm border-wz-border-dark" asChild>
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

  // INTERNAL PAGES HEADER (Podportal Style - Two-Tiered, Top bar Pink, Second bar Dark)
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-40">
      {/* Top Row - Background provided by AppLayout */}
      <div className="h-12"> {/* Top bar itself is transparent to show AppLayout's pink */}
        <div className="container-default flex items-center h-full">
          {/* Left: Logo & Wallet Info */}
          <div className="flex items-center space-x-3 mr-auto"> {/* mr-auto to push auth to right */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              {getIcon("Sparkles", { className: "h-7 w-7 text-wz-pink"})}
              <span className="font-heading text-xl font-bold text-wz-text-dark">Fin.Co</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-xs text-wz-text-dark flex items-center">
                  {getIcon("Wallet", {className: "mr-1 h-3.5 w-3.5"})}
                  <span className="font-medium">Wallet:</span> {formatCurrency(walletBalance)}
                </div>
                <div className="text-xs text-wz-text-dark flex items-center">
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
                     <Link href="/login" className="w-full h-full flex items-center justify-center px-4 text-wz-text-light hover:text-wz-text-light/80 text-sm font-medium whitespace-nowrap no-underline">
                        Log In
                     </Link>
                  </div>
                  <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                     <Button asChild variant="default" className="btn-wz bg-wz-purple text-wz-pink hover:bg-white hover:text-wz-pink rounded-md px-3 py-1.5 text-sm font-semibold shadow-wz-hard-sm whitespace-nowrap w-full h-full !rounded-none !border-0 !shadow-none">
                        <Link href="/get-started">Get Started</Link>
                     </Button>
                  </div>
               </div>
            ) : (
              <div className="flex items-stretch h-full border-l border-header-top-border">
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full h-full text-wz-text-light hover:bg-white/20 hover:text-wz-text-dark px-4 text-sm font-medium rounded-none whitespace-nowrap"
                >
                  {getIcon("LogOut", { className: "mr-1.5 h-4 w-4" })} Sign Out
                </Button>
              </div>
            )}
            {/* Mobile Menu Trigger for Internal Pages */}
            <div className="md:hidden flex items-stretch h-full border-l border-header-top-border">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-wz-text-dark hover:bg-white/20 h-full w-12 rounded-none">
                    {getIcon("Menu", { className: "h-5 w-5" })}
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0 border-r-2 border-header-bottom-border shadow-lg">
                  <SheetHeader className="p-4 border-b-2 border-header-bottom-border bg-wz-pink flex flex-row justify-between items-center">
                    <SheetTitle className="flex items-center gap-2 text-left">
                      {getIcon("Sparkles", { className: "h-6 w-6 text-wz-text-dark"})}
                      <span className="text-lg font-heading font-semibold text-wz-text-dark">Fin.Co</span>
                    </SheetTitle>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 p-0 text-wz-text-dark/80 hover:bg-white/20 rounded-full">
                        {getIcon("X", { className: "h-4 w-4" })}
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <nav className="grid gap-1 p-3 bg-header-bottom"> {/* Beige background for links area */}
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
                                ? "bg-white text-wz-pink font-semibold shadow-sm"
                                : "text-wz-pink hover:bg-white/70 hover:text-pink-700"
                            )}
                          >
                            {getIcon(link.iconName, {className: cn("mr-2 h-5 w-5", isActive ? "text-wz-pink" : "text-wz-pink/70 group-hover:text-pink-700")})}
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                    <div className="border-t-2 border-header-bottom-border/20 mt-4 pt-4 space-y-2">
                      {!isAuthenticated && !isLoadingSession ? (
                        <>
                          <SheetClose asChild>
                            <Button className="w-full btn-wz bg-white text-wz-text-dark border-wz-border-dark hover:bg-gray-100 !py-2 text-sm font-medium shadow-wz-hard-sm whitespace-nowrap" asChild>
                              <Link href="/login">Log In</Link>
                            </Button>
                          </SheetClose>
                          <SheetClose asChild>
                            <Button className="w-full btn-wz bg-wz-purple text-wz-pink hover:bg-white hover:text-wz-pink border-wz-border-dark !py-2 text-sm font-semibold shadow-wz-hard-sm whitespace-nowrap" asChild>
                              <Link href="/get-started">Get Started</Link>
                            </Button>
                          </SheetClose>
                        </>
                      ) : (
                        <SheetClose asChild>
                          <Button
                            onClick={handleSignOut}
                            className="w-full btn-wz bg-white text-wz-text-dark hover:bg-white/20 !py-2 text-sm font-medium border-wz-border-dark shadow-wz-hard-sm whitespace-nowrap"
                          >
                            {getIcon("LogOut", {className: "mr-2 h-4 w-4"})} Sign Out
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                     <div className="border-t-2 border-header-bottom-border/20 mt-4 pt-4 flex justify-around items-center">
                        {socialMediaLinks.map((sLink) => {
                          const SocialIcon = getIcon(sLink.iconName, {className: "h-6 w-6"});
                          return (
                            <SheetClose key={`${sLink.label}-mobile-social`} asChild>
                                <Link href={sLink.href} aria-label={sLink.label} className="text-wz-pink hover:text-pink-400 transition-colors no-underline">
                                    {SocialIcon}
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

      {/* Second Row - Sticky Navigation (Gumroad Category Style) */}
      <div className="bg-nav-secondary shadow-md h-10 sticky top-[48px] z-30"> {/* sticky top value should be height of top bar */}
        <div className="container-default flex h-full items-stretch">
          <nav className="flex items-stretch h-full overflow-x-auto whitespace-nowrap flex-grow scrollbar-hide">
            {mainAppNavLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <div // This parent div is mainly for the border-r separator
                  key={link.href}
                  className={cn(
                    "h-full flex flex-1 items-center justify-center",
                    index < mainAppNavLinks.length - 1 ? "border-r border-nav-secondary-active-border/10" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center w-full h-full px-3 py-2 text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nav-secondary-active-border focus-visible:ring-offset-1 focus-visible:ring-offset-nav-secondary",
                      isActive
                        ? "bg-white text-wz-pink font-semibold" // Active state for internal pages
                        : "text-wz-pink hover:bg-white hover:text-pink-700"
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
           <div className="hidden md:flex items-center space-x-4 pl-6 pr-4 border-l border-nav-secondary-active-border/10">
             {socialMediaLinks.map((sLink) => {
               const SocialIcon = getIcon(sLink.iconName, {className: "h-6 w-6"});
                return (
                  <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-wz-pink hover:text-pink-400 transition-colors no-underline">
                     {SocialIcon}
                  </Link>
                );
             })}
           </div>
        </div>
      </div>
    </header>
  );
}

