
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
  Sparkles,
  X,
  LayoutGrid,
  ListChecks,
  Target,
  ShieldAlert,
  FileText,
  Lightbulb,
  PiggyBank,
  Landmark,
  HandCoins,
  TrendingUp,
  MessageCircle, // For footer
  Send, // For footer
  Phone, // For footer
  Mail as MailIcon, // For footer
  Users,
  Briefcase,
  Zap,
  Star,
  ArrowRight,
  Receipt,
  BarChart3,
  User as UserIcon,
  Package,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  Award,
  Home,
  Info,
  Settings,
  Users2,
  BookOpen,
  Server,
  Rocket,
  CheckCircle,
  DollarSign,
  CreditCard,
  Activity,
  BarChartBig,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  AppleIcon as Apple,
  Store,
  Asterisk // For Chorke logo placeholder
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

// Helper to get icon components by name
const getIcon = (iconName?: string, props?: any) => {
  const icons: { [key: string]: React.ElementType } = {
    CircleDollarSign, Menu, LogOut, Wallet, Lock, Twitter, Facebook, Instagram, Sparkles, X, LayoutGrid, ListChecks, Target, TrendingUp, ShieldAlert, FileText, Lightbulb, PiggyBank, Landmark, HandCoins, Users, Briefcase, Zap, Star, ArrowRight, Receipt, BarChart3, UserIcon, Package, BrainCircuit, ShieldCheck, Award, ChevronRight, MessageCircle, Send, Phone, MailIcon, Home, Info, Settings, Users2, BookOpen, Server, Rocket, CheckCircle, CreditCard, Activity, DollarSign, BarChartBig, ChevronDown, ChevronLeft, ChevronUp, Apple, Store, Asterisk
  };
  if (!iconName) return null;
  const IconComponent = icons[iconName];
  return IconComponent ? <IconComponent {...props} /> : <Sparkles {...props} />; // Default to Sparkles if not found
};


export default function Header() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { walletBalance, totalLockedFunds } = useWallet();

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

  const wzLandingPageNavLinks = [
    { href: "#services", label: "Services" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
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
    // Wzuh-inspired landing page header
    return (
      <header className="w-full relative z-50"> {/* Ensure header is above other content */}
        <div className="container-default py-3">
          <div className="bg-white rounded-full border border-gray-300 shadow-lg px-4 sm:px-6 py-2 flex items-center justify-between w-full max-w-5xl mx-auto">
            <Link href="/" className="flex items-center space-x-2 no-underline">
              <Sparkles className="h-7 w-7 text-wz-pink" />
              <span className="text-xl font-bold text-wz-text-dark font-sans">FinCo</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {wzLandingPageNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 text-sm font-semibold text-wz-text-dark hover:bg-gray-100 hover:rounded-full transition-colors duration-150 no-underline",
                    pathname === link.href ? "bg-gray-100 rounded-full" : ""
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              {!isAuthenticated && !isLoadingSession && (
                <>
                  <Button asChild className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap hover:ring-1 hover:ring-wz-border-dark hover:ring-offset-1 hover:ring-offset-white">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild className="btn-wz btn-wz-outline-dark text-sm !py-1.5 !px-4 whitespace-nowrap">
                    <Link href="/get-started">Get Started</Link>
                  </Button>
                </>
              )}
              {isAuthenticated && (
                 <Button onClick={handleSignOut} className="btn-wz btn-wz-pink text-sm !py-1.5 !px-4 whitespace-nowrap">
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
                      <SheetTitle className="flex items-center gap-2 text-wz-text-dark font-sans">
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
                      {wzLandingPageNavLinks.map((link) => (
                        <SheetClose key={`${link.href}-mobile-wz`} asChild>
                          <Link href={link.href} className="block rounded-lg px-3 py-2 text-wz-text-dark hover:bg-wz-pink/10 no-underline font-medium">
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                      <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
                        {!isAuthenticated && !isLoadingSession && (
                          <>
                             <SheetClose asChild>
                               <Button asChild className="w-full btn-wz btn-wz-pink text-sm py-2">
                                <Link href="/login">Log In</Link>
                              </Button>
                            </SheetClose>
                            <SheetClose asChild>
                              <Button asChild className="w-full btn-wz btn-wz-outline-dark text-sm py-2">
                                <Link href="/get-started">Get Started</Link>
                              </Button>
                            </SheetClose>
                          </>
                        )}
                        {isAuthenticated && (
                          <SheetClose asChild>
                            <Button onClick={handleSignOut} className="w-full btn-wz btn-wz-pink text-sm py-2">
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
      </header>
    );
  }

  // Podportal Inspired Header for Internal App Pages
  return (
    <header className="w-full">
      {/* Top Row */}
      <div className="bg-header-top">
        <div className="container-default flex h-12 items-center justify-between border-b border-header-top-border">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="flex items-center space-x-2 no-underline shrink-0">
              {getIcon("CircleDollarSign", { className: "h-7 w-7 text-header-top-fg" })}
              <span className="font-heading text-xl font-bold text-header-top-fg">FinCo</span>
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

          <div className="flex items-stretch h-full text-sm ml-auto">
             {!isAuthenticated && !isLoadingSession && (
              <div className="flex items-stretch h-full">
                <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                   <Link
                    href="/login"
                    className="flex items-center justify-center w-full h-full px-4 text-sm font-medium text-header-top-fg hover:bg-white hover:text-header-top-bg hover:rounded-md whitespace-nowrap no-underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-header-top"
                  >
                    Log In
                  </Link>
                </div>
                <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                   <Button asChild variant="ghost" className="p-0 w-full h-full rounded-none">
                    <Link
                      href="/get-started"
                      className="w-full h-full flex items-center justify-center bg-white text-header-top-bg hover:bg-blue-700 hover:text-white rounded-md px-3 py-1.5 text-sm font-semibold !shadow-none !border-transparent whitespace-nowrap no-underline transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-header-top"
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
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
            {/* Mobile Menu Trigger */}
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
                      <span className="text-lg font-heading font-semibold text-header-top-fg">FinCo</span>
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
                      const IconComp = getIcon(link.iconName);
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
                            {IconComp && <IconComp className="mr-2 h-4 w-4" />}
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                     <div className="border-t border-header-bottom-border mt-4 pt-4 space-y-3">
                       <div className="flex justify-center space-x-5 mb-3">
                        {socialMediaLinks.map((sLink) => {
                           const SocialIcon = getIcon(sLink.iconName);
                           return (
                             <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                                {SocialIcon && <SocialIcon className="h-6 w-6"/>}
                             </Link>
                           );
                        })}
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
                                className="w-full bg-white text-blue-700 hover:bg-blue-700 hover:text-white rounded-md py-2 text-sm font-semibold !border-transparent !shadow-none whitespace-nowrap"
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

      {/* Bottom Row (Sticky Navigation for Internal Pages) */}
      <div className="hidden md:block sticky top-0 z-30 bg-header-bottom shadow-sm">
        <div className="container-default flex items-stretch justify-between h-14 border-x border-b border-header-bottom-border rounded-b-md">
          <nav className="flex flex-grow items-stretch h-full">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              // const IconComp = getIcon(link.iconName); // Not used for desktop bottom bar labels

              return (
                <div // Cell wrapper
                  key={link.href}
                  className={cn(
                    "h-full flex flex-1 items-center justify-center",
                     index < navLinks.length - 1 ? "border-r border-header-bottom-border" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center justify-center w-full h-full px-5 py-2 text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-header-bottom whitespace-nowrap",
                      isActive
                        ? "bg-white text-primary rounded-md shadow-sm font-semibold"
                        : "text-header-bottom-fg/80 hover:bg-white hover:text-header-bottom-fg hover:rounded-md hover:shadow-sm"
                    )}
                  >
                    {/* {IconComp && <IconComp className="mr-2 h-4 w-4" />} */}
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>
          <div className="flex items-center space-x-5 pl-8 pr-4 py-3 border-l border-header-bottom-border h-full">
            {socialMediaLinks.map((sLink) => {
               const SocialIcon = getIcon(sLink.iconName);
               return (
                 <Link key={sLink.label} href={sLink.href} aria-label={sLink.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                    {SocialIcon && <SocialIcon className="h-6 w-6"/>}
                 </Link>
               );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
