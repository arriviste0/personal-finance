
'use client';

import Link from "next/link";
import {
  CircleDollarSign,
  Menu,
  X,
  LogOut,
  Wallet,
  Lock,
  Twitter,
  Facebook,
  Instagram,
  LayoutGrid,
  Landmark,
  TrendingUp,
  ShieldAlert,
  FileText,
  Lightbulb,
  PiggyBank,
  Settings,
  Users,
  Mail,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetHeader, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';

const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function Header() {
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const pathname = usePathname();
    const { walletBalance, totalLockedFunds } = useWallet();

    const isAuthenticated = status === 'authenticated';

    const navLinks = [
      { href: "/dashboard", label: "Dashboard", iconName: "LayoutGrid" },
      { href: "/budget", label: "Budget", iconName: "Wallet" },
      { href: "/expenses", label: "Expenses", iconName: "Landmark" },
      { href: "/savings-goals", label: "Savings Goals", iconName: "PiggyBank" },
      { href: "/investments", label: "Investments", iconName: "TrendingUp" },
      { href: "/emergency-fund", label: "Emergency Fund", iconName: "ShieldAlert" },
      { href: "/tax-planner", label: "Tax Planner", iconName: "FileText" },
      { href: "/ai-assistant", label: "AI Assistant", iconName: "Lightbulb" },
    ];

    const socialMediaLinks = [
        { href: "#", label: "Twitter", icon: Twitter },
        { href: "#", label: "Facebook", icon: Facebook },
        { href: "#", label: "Instagram", icon: Instagram },
    ];
    
    const iconMap: { [key: string]: React.ElementType } = {
      LayoutGrid, Wallet, Landmark, PiggyBank, TrendingUp, ShieldAlert, FileText, Lightbulb, Settings, Users, Mail, Briefcase, CircleDollarSign, LogOut, Menu, X, Lock, Twitter, Facebook, Instagram
    };

    const getIcon = (iconName?: string): React.ElementType | null => {
        if (!iconName) return CircleDollarSign; // Default icon
        return iconMap[iconName] || CircleDollarSign;
    };

    const bottomBarLinkClasses = (href: string) => {
      const isActive = pathname === href;
      return cn(
        "text-sm font-medium text-header-bottom-fg/80 hover:text-primary transition-colors px-3 py-2",
        isActive && "text-primary font-semibold bg-white rounded-md shadow-sm",
        !isActive && "hover:bg-white hover:text-header-bottom-fg hover:rounded-md hover:shadow-sm"
      );
    };

    const mobileNavLinkClasses = (href: string) => {
      const isActive = pathname === href;
      return cn(
        "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "text-header-bottom-fg/90 hover:bg-header-bottom-fg/5"
      );
    }

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
        toast({ title: "Signed Out", description: "You have been successfully signed out." });
    };

  return (
     <header className="w-full">
      {/* Top Row */}
      <div className="bg-header-top">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-12 items-center justify-between border-b border-header-top-border">
          {/* Left: Logo & Wallet Info (if auth) */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 no-underline shrink-0">
               <CircleDollarSign className="h-7 w-7 text-header-top-fg" />
               <span className="font-heading text-xl font-bold text-header-top-fg">Fin.Co</span>
            </Link>
            {isAuthenticated && (
               <div className="hidden sm:flex items-center space-x-3 text-xs text-header-top-fg/80">
                  <div className="flex items-center space-x-1">
                    <Wallet className="h-3.5 w-3.5" />
                    <span>{formatCurrency(walletBalance)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>{formatCurrency(totalLockedFunds)}</span>
                  </div>
               </div>
             )}
          </div>

          {/* Right: Auth buttons / Sign Out & Mobile Menu Trigger */}
          <div className="flex items-center space-x-2">
             {isAuthenticated ? (
               <>
                 <Button variant="ghost" size="sm" className="text-header-top-fg hover:bg-header-top-fg/10 hover:text-header-top-fg px-3 py-1.5 text-sm" onClick={handleSignOut}>
                     <LogOut className="mr-1.5 h-4 w-4"/> Sign Out
                 </Button>
               </>
             ) : (
               <>
                 <Link href="/login" passHref className="no-underline">
                   <Button variant="link" size="sm" className="text-header-top-fg hover:text-header-top-fg/80 px-3 py-1.5 text-sm font-medium">Log In</Button>
                 </Link>
                 <Link href="/get-started" passHref className="no-underline">
                    <Button variant="default" size="sm" className="bg-white text-header-top-bg hover:bg-white/90 rounded-md px-3 py-1.5 text-sm font-semibold !shadow-none !border-transparent">Get Started</Button>
                 </Link>
               </>
             )}
              {/* Mobile Navigation Trigger */}
              <div className="md:hidden flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                       variant="ghost"
                       size="icon"
                       className="text-header-top-fg hover:bg-header-top-fg/10 h-8 w-8"
                     >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                     side="left"
                     className="w-[280px] bg-header-bottom p-0 border-r border-header-bottom-border"
                  >
                     <SheetHeader className="p-4 border-b border-header-bottom-border bg-header-top">
                         <SheetTitle className="flex items-center gap-2">
                              <CircleDollarSign className="h-6 w-6 text-header-top-fg" />
                              <span className="text-lg font-heading font-semibold text-header-top-fg">Fin.Co</span>
                         </SheetTitle>
                         <SheetClose asChild>
                           <Button variant="ghost" size="icon" className="absolute right-4 top-3.5 h-7 w-7 p-0 text-header-top-fg/80 hover:bg-header-top-fg/10">
                              <X className="h-4 w-4"/>
                              <span className="sr-only">Close</span>
                           </Button>
                         </SheetClose>
                      </SheetHeader>
                     <nav className="grid gap-2 text-base font-medium p-4">
                       {isAuthenticated && (
                         <div className="mb-4 p-2 border-b border-dashed border-header-bottom-fg/20">
                           <div className="flex items-center space-x-2 text-sm text-header-bottom-fg/90">
                              <Wallet className="h-4 w-4" />
                              <span>Wallet: {formatCurrency(walletBalance)}</span>
                           </div>
                           <div className="flex items-center space-x-2 text-sm text-header-bottom-fg/90 mt-1">
                              <Lock className="h-4 w-4" />
                              <span>Locked: {formatCurrency(totalLockedFunds)}</span>
                           </div>
                         </div>
                       )}
                       {navLinks.map(link => {
                          const Icon = getIcon(link.iconName);
                          return (
                            <SheetClose key={link.href} asChild>
                                <Link href={link.href} className={mobileNavLinkClasses(link.href)}>
                                  {Icon && <Icon className="mr-2 h-4 w-4 inline-block" />}
                                  {link.label}
                                </Link>
                            </SheetClose>
                          );
                       })}
                       <div className="border-t border-header-bottom-border mt-4 pt-4 space-y-3">
                          <div className="flex justify-center space-x-4 mb-3">
                              {socialMediaLinks.map((link) => {
                                const SocialIcon = link.icon;
                                return (
                                  <Link key={link.label} href={link.href} aria-label={link.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                                      <SocialIcon className="h-5 w-5"/>
                                  </Link>
                                );
                              })}
                          </div>
                          {isAuthenticated ? (
                              <SheetClose asChild>
                                  <Button variant="outline" className="w-full btn-outline text-destructive hover:bg-destructive/10 border-destructive/50" onClick={handleSignOut}>
                                       <LogOut className="mr-2 h-4 w-4"/> Sign Out
                                  </Button>
                              </SheetClose>
                          ) : (
                              <>
                                  <SheetClose asChild>
                                   <Link href="/login" passHref className="no-underline">
                                      <Button variant="outline" className="w-full btn-outline text-header-bottom-fg">Log In</Button>
                                   </Link>
                                  </SheetClose>
                                  <SheetClose asChild>
                                   <Link href="/get-started" passHref className="no-underline">
                                      <Button variant="primary" className="w-full btn-primary bg-primary text-primary-foreground">Get Started</Button>
                                   </Link>
                                  </SheetClose>
                              </>
                          )}
                       </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
          </div>
        </div>
      </div>

        {/* Bottom Row - Boxed Sticky Navigation (Desktop Only) */}
        <div className="hidden md:block sticky top-0 z-30 bg-header-bottom shadow-sm">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 border-x border-b border-header-bottom-border rounded-b-md bg-header-bottom">
              <nav className="flex items-center h-full">
                {navLinks.map((link, index) => (
                  <div key={link.href} className={cn("h-full flex items-center", index < navLinks.length ? "border-r border-header-bottom-border" : "")}>
                    <Link href={link.href} className={bottomBarLinkClasses(link.href)}>
                      {link.label}
                    </Link>
                  </div>
                ))}
              </nav>
              <div className="flex items-center space-x-3 px-4 h-full border-l border-header-bottom-border">
                 {socialMediaLinks.map((link) => {
                    const SocialIcon = link.icon;
                    return (
                      <Link key={link.label} href={link.href} aria-label={link.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                          <SocialIcon className="h-5 w-5"/>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
    </header>
  );
}
