
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
  LayoutGrid, // Dashboard
  Landmark, // Expenses (can also be Investments or Budget)
  TrendingUp, // Investments
  ShieldAlert, // Emergency Fund
  FileText, // Tax Planner
  Lightbulb, // AI Assistant
  PiggyBank // Savings Goals
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useWallet } from '@/contexts/WalletContext';

const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Icon mapping helper
const iconMap: { [key: string]: React.ElementType } = {
  LayoutGrid,
  Wallet, // For Budget
  Landmark, // For Expenses
  PiggyBank, // For Savings Goals
  TrendingUp, // For Investments
  ShieldAlert, // For Emergency Fund
  FileText, // For Tax Planner
  Lightbulb, // For AI Assistant
};

const getIcon = (iconName: string | undefined): React.ElementType | null => {
  if (!iconName) return null;
  return iconMap[iconName] || CircleDollarSign; // Default icon if not found
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
      { href: "/emergency-fund", label: "Emergency", iconName: "ShieldAlert" },
      { href: "/tax-planner", label: "Tax", iconName: "FileText" },
      { href: "/ai-assistant", label: "AI Assistant", iconName: "Lightbulb" },
    ];

    const socialMediaLinks = [
        { href: "#", label: "Twitter", icon: Twitter },
        { href: "#", label: "Facebook", icon: Facebook },
        { href: "#", label: "Instagram", icon: Instagram },
    ];

    // For the bottom boxed navigation links
    const boxedNavLinkClasses = (href: string) => {
      const isActive = pathname === href;
      return cn(
        "px-3 py-2 text-sm font-medium transition-all duration-150 ease-in-out no-underline",
        isActive
          ? "text-primary border-b-2 border-primary font-semibold"
          : "text-foreground/70 hover:text-primary"
      );
    };
    
    // For mobile sheet navigation links
    const mobileNavLinkClasses = (href: string) => {
      const isActive = pathname === href;
      return cn(
        "block px-3 py-2 rounded-md text-base font-medium transition-colors",
        isActive
          ? "bg-accent/10 text-accent font-semibold"
          : "text-foreground/80 hover:bg-muted hover:text-foreground"
      );
    }

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
        toast({ title: "Signed Out", description: "You have been successfully signed out." });
    };

  return (
     <header className="w-full bg-background">
      <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Row */}
        <div className="flex h-10 items-center justify-between">
          {/* Col 1: Logo & Wallet Info (if auth) */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2 no-underline shrink-0">
               <CircleDollarSign className="h-7 w-7 text-brand-dark" />
               <span className="font-sans text-xl font-bold text-brand-dark">Fin.Co</span>
            </Link>
            {isAuthenticated && (
               <div className="hidden sm:flex items-center space-x-2 text-xs text-foreground/70">
                  <Wallet className="h-4 w-4" />
                  <span>{formatCurrency(walletBalance)}</span>
                  <Lock className="h-4 w-4 ml-1" />
                  <span>{formatCurrency(totalLockedFunds)}</span>
               </div>
             )}
          </div>

          {/* Col 3 & 4: Auth buttons / Sign Out */}
          <div className="flex items-center space-x-3">
             {isAuthenticated ? (
               <>
                 <Button variant="outline" size="sm" className="retro-button !border-foreground/30 !text-foreground/80 hover:!bg-muted hover:!border-foreground !px-3 !py-1.5 text-sm" onClick={handleSignOut}>
                     <LogOut className="mr-1.5 h-4 w-4"/> Sign Out
                 </Button>
               </>
             ) : (
               <>
                 <Link href="/login" passHref className="no-underline">
                    <Button variant="ghost" size="sm" className="text-foreground/80 hover:text-primary hover:bg-transparent px-3 text-sm py-1.5">Log In</Button>
                 </Link>
                 <Link href="/get-started" passHref className="no-underline">
                    <Button variant="primary" size="sm" className="retro-button !bg-primary hover:!bg-primary/90 !text-primary-foreground !px-3 !py-1.5 text-sm">Get Started</Button>
                 </Link>
               </>
             )}
              {/* Mobile Navigation Trigger - Stays in Top Row */}
              <div className="md:hidden ml-2 flex items-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                       variant="outline"
                       size="icon"
                       className="retro-button !shadow-none h-8 w-8 !border-foreground/30 !text-foreground/80 hover:!bg-muted"
                     >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle Menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                     side="left"
                     className="w-[280px] retro-window !rounded-none !p-0 !border-foreground bg-card"
                  >
                      <div className="retro-window-header p-3 flex items-center justify-between !bg-background !border-b !border-border">
                         <SheetTitle className="flex items-center gap-2">
                              <CircleDollarSign className="h-6 w-6 text-brand-dark" />
                              <span className="text-lg font-sans font-semibold text-brand-dark">Fin.Co</span>
                         </SheetTitle>
                         <div className="retro-window-controls">
                             <SheetClose asChild>
                               <Button variant="ghost" size="icon" className="h-7 w-7 p-0 !shadow-none !border-none !bg-destructive/80 !text-destructive-foreground hover:!bg-destructive/90">
                                  <X className="h-4 w-4"/>
                                  <span className="sr-only">Close</span>
                               </Button>
                             </SheetClose>
                         </div>
                      </div>
                     <nav className="grid gap-2 text-base font-medium p-4 retro-window-content !border-t-0 !border-foreground">
                       {isAuthenticated && (
                         <div className="mb-4 p-2 border-b border-dashed">
                           <div className="flex items-center space-x-2 text-sm text-foreground/90">
                              <Wallet className="h-4 w-4" />
                              <span>Wallet: {formatCurrency(walletBalance)}</span>
                           </div>
                           <div className="flex items-center space-x-2 text-sm text-foreground/90 mt-1">
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
                       <div className="border-t border-border mt-4 pt-4 space-y-3">
                          {isAuthenticated ? (
                              <SheetClose asChild>
                                  <Button variant="outline" className="w-full retro-button !border-destructive/50 !text-destructive hover:!bg-destructive/10" onClick={handleSignOut}>
                                       <LogOut className="mr-2 h-4 w-4"/> Sign Out
                                  </Button>
                              </SheetClose>
                          ) : (
                              <>
                                  <SheetClose asChild>
                                   <Link href="/login" passHref className="no-underline">
                                      <Button variant="outline" className="w-full retro-button">Log In</Button>
                                   </Link>
                                  </SheetClose>
                                  <SheetClose asChild>
                                   <Link href="/get-started" passHref className="no-underline">
                                      <Button variant="primary" className="w-full retro-button">Get Started</Button>
                                   </Link>
                                  </SheetClose>
                              </>
                          )}
                          <div className="flex justify-center space-x-4 pt-4">
                              {socialMediaLinks.map((link) => {
                                const SocialIcon = link.icon;
                                return (
                                  <Link key={link.label} href={link.href} aria-label={link.label} className="text-foreground/60 hover:text-primary transition-colors no-underline">
                                      <SocialIcon className="h-5 w-5"/>
                                  </Link>
                                );
                              })}
                          </div>
                       </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
          </div>
        </div>

        {/* Bottom Row - Boxed Sticky Navigation (Desktop Only) */}
        <div className="hidden md:block sticky top-0 z-40 bg-background mt-2">
           <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between border border-border rounded-md shadow-sm bg-background px-2 lg:px-3 py-1.5">
              {/* Col 2: Nav Links */}
              <nav className="flex items-center space-x-1 lg:space-x-2">
                {navLinks.map(link => (
                  <Link key={link.href} href={link.href} className={boxedNavLinkClasses(link.href)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              {/* Col 3: Social Media Icons */}
              <div className="flex items-center space-x-2.5">
                 {socialMediaLinks.map((link) => {
                    const SocialIcon = link.icon;
                    return (
                      <Link key={link.label} href={link.href} aria-label={link.label} className="text-foreground/60 hover:text-primary transition-colors no-underline">
                          <SocialIcon className="h-4 w-4"/>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
