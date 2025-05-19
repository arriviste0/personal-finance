
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
  LayoutGrid,
  Landmark,
  TrendingUp,
  ShieldAlert,
  FileText,
  Lightbulb,
  Settings,
  Users,
  User, // Keep User if used, remove if not
  DollarSign, // Keep if used for other things
  PiggyBank, // Added back as it was in the original navLinks
  X,
  CreditCard,
  Home,
  PieChart as IconPieChart, // Aliased to avoid conflict if PieChart component is used
  HelpCircle,
  Info,
  AtSign,
  KeyRound,
  MailIcon,
  LockIcon,
  UserPlus,
  ShoppingBag,
  BookOpen,
  BarChart3,
  BriefcaseIcon,
  Receipt,
  Settings2,
  Percent,
  MessageSquare,
  LifeBuoy,
  Newspaper,
  InfoIcon,
  Phone,
  UserCircle2,
  Search,
  Bell,
  MessageCircleMore,
  ArrowRight, // Ensure ArrowRight is imported if used
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

// Helper function to get icon components by name string
const iconMap: { [key: string]: React.ElementType } = {
  LayoutGrid,
  Wallet,
  Landmark,
  PiggyBank,
  TrendingUp,
  ShieldAlert,
  FileText,
  Lightbulb,
  Settings,
  Twitter,
  Facebook,
  Instagram,
  X,
  LogOut,
  CreditCard, // Added from ServiceCard
  Home, // Added from ServiceCard
  IconPieChart, // Added from ServiceCard
  HelpCircle, // Added from ServiceCard
  Info, // Added from ServiceCard
  AtSign, // Added from ServiceCard
  User, // Added from ServiceCard
  DollarSign, // Keep, might be used
};

const getIcon = (iconName?: string): React.ElementType | null => {
  if (!iconName) return null;
  const IconComponent = iconMap[iconName];
  return IconComponent || DollarSign; // Default icon if not found
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
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <header className="w-full">
      {/* Top Row */}
      <div className="bg-header-top text-header-top-fg">
        <div className="container mx-auto flex h-12 items-center justify-between px-4 md:px-6 border-b border-header-top-border">
          {/* Left side: Logo + Wallet Info (if authenticated) */}
          <div className="flex items-center space-x-3">
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

          {/* Right side: Auth + Mobile Menu */}
          <div className="flex items-stretch h-full text-sm"> {/* Ensures children can stretch */}
            {isAuthenticated ? (
              <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="flex w-full h-full items-center justify-center px-4 font-medium no-underline transition-colors duration-150 text-header-top-fg hover:bg-white hover:text-header-top-bg hover:rounded-md"
                >
                  <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                  <Link
                    href="/login"
                    className={cn(
                      "flex w-full h-full items-center justify-center px-4 no-underline transition-colors duration-150 whitespace-nowrap",
                      "text-sm font-medium text-header-top-fg hover:bg-white hover:text-header-top-bg hover:rounded-md"
                    )}
                  >
                    Log In
                  </Link>
                </div>
                <div className="flex-1 flex items-center justify-center border-l border-header-top-border">
                  <Button
                    asChild
                    variant="ghost"
                    className="p-0 w-full h-full rounded-none"
                  >
                    <Link
                      href="/get-started"
                      className={cn(
                        "flex w-full h-full items-center justify-center text-xs font-semibold no-underline transition-colors duration-150 whitespace-nowrap",
                        "bg-white text-header-top-bg rounded-md hover:bg-gray-100 px-3 py-1.5"
                      )}
                    >
                      Get Started
                    </Link>
                  </Button>
                </div>
              </>
            )}
             {/* Mobile Menu Trigger - always part of the flex layout */}
            <div className="flex items-center justify-center border-l border-header-top-border md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-header-top-fg hover:bg-header-top-fg/10 h-full w-10 rounded-none px-2"
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
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </SheetClose>
                  </SheetHeader>
                  <nav className="grid gap-1 text-base font-medium p-3">
                    {isAuthenticated && (
                      <div className="mb-3 p-2 border-b border-dashed border-header-bottom-fg/20">
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
                      const isActive = pathname === link.href;
                      return (
                        <SheetClose key={`${link.href}-mobile`} asChild>
                          <Link
                            href={link.href}
                            className={cn(
                              "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                              isActive
                                ? "bg-white text-primary font-semibold shadow-sm"
                                : "text-header-bottom-fg/90 hover:bg-white/70 hover:text-header-bottom-fg"
                            )}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                    <div className="border-t border-header-bottom-border mt-4 pt-4 space-y-3">
                      <div className="flex justify-center space-x-4 mb-3">
                        {socialMediaLinks.map((link) => {
                          const SocialIcon = getIcon(link.iconName);
                          return (
                            <Link key={link.label} href={link.href} aria-label={link.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                              {SocialIcon && <SocialIcon className="h-6 w-6" />}
                            </Link>
                          );
                        })}
                      </div>
                      {isAuthenticated ? (
                        <SheetClose asChild>
                           <Button variant="outline" className="w-full retro-button text-destructive hover:bg-destructive/10 border-destructive/50 whitespace-nowrap" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                          </Button>
                        </SheetClose>
                      ) : (
                        <>
                          <SheetClose asChild>
                            <Link href="/login" passHref className="no-underline">
                              <Button variant="outline" className="w-full text-header-bottom-fg border-header-bottom-fg/50 hover:bg-header-bottom-fg/5 py-2 text-xs whitespace-nowrap">Log In</Button>
                            </Link>
                          </SheetClose>
                          <SheetClose asChild>
                            <Link href="/get-started" passHref className="no-underline">
                              <Button
                                variant="default"
                                className="w-full bg-white text-header-top-bg hover:bg-gray-100 rounded-md py-2 text-xs font-semibold !border-transparent !shadow-none whitespace-nowrap"
                              >
                                Get Started
                              </Button>
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
        <div className="container mx-auto flex items-stretch justify-between h-14 border-x border-b border-header-bottom-border rounded-b-md bg-header-bottom">
          {/* Main Navigation Links */}
          <nav className="flex flex-grow items-stretch h-full">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              // const IconComponent = getIcon(link.iconName); // Icons removed from bottom bar

              return (
                <div // This parent div is mainly for the border-r separator and flex-1
                  key={link.href}
                  className={cn(
                    "h-full flex flex-1 items-center justify-center", // flex-1 makes each cell take equal width
                    index < navLinks.length -1 ? "border-r border-header-bottom-border" : ""
                  )}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex w-full h-full items-center justify-center px-5 py-2 text-sm font-medium no-underline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-header-bottom whitespace-nowrap", // Base styles, padding, and focus on the Link
                      isActive
                        ? "bg-white text-primary rounded-md shadow-sm font-semibold" // Active state: white bg, primary text, rounded, shadow
                        : "text-header-bottom-fg/80 hover:bg-white hover:text-header-bottom-fg hover:rounded-md hover:shadow-sm" // Default and Hover state
                    )}
                  >
                    {/* {IconComponent && <IconComponent className="mr-2 h-4 w-4" />} */}
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-5 px-8 py-3 border-l border-header-bottom-border h-full">
            {socialMediaLinks.map((link) => {
              const SocialIcon = getIcon(link.iconName);
              return (
                <Link key={link.label} href={link.href} aria-label={link.label} className="text-header-bottom-fg/70 hover:text-primary transition-colors no-underline">
                  {SocialIcon && <SocialIcon className="h-6 w-6" />}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

