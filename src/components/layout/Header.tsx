'use client';

import Link from "next/link";
import { CircleDollarSign, Menu, X, Banknote, LogOut } from "lucide-react"; // Added LogOut
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react'; // Import useSession and signOut

export default function Header() {
    const { toast } = useToast();
    const { data: session, status } = useSession(); // Get session status

    const handleLinkAccount = () => {
        toast({
            title: "Bank Account Linking (Placeholder)",
            description: "This would normally launch a secure bank linking process.",
        });
    };

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' }); // Redirect to home page after sign out
    };

  return (
     <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground">
      <div className="container flex h-12 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
           <CircleDollarSign className="h-6 w-6 text-primary-foreground" />
           <span className="font-sans text-xl font-medium">FinTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-4 text-base md:flex items-center"> {/* Added items-center */}
          {status === 'authenticated' && (
             <>
                 <Link href="/dashboard" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">
                    Dashboard
                 </Link>
                 <Link href="/budget" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">
                    Budget
                 </Link>
                 <Link href="/expenses" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">
                    Expenses
                 </Link>
                 <Link href="/savings-goals" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">
                    Savings Goals
                 </Link>
                 <Link href="/investments" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">
                    Investments
                 </Link>
                  <Link href="/emergency-fund" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">
                    Emergency Fund
                 </Link>
                  <Link href="/tax-planner" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">
                    Tax Planner
                 </Link>
                 <Link href="/ai-assistant" className="font-medium text-yellow-300 transition-colors hover:text-yellow-200 hover:underline underline-offset-2">
                    AI Assistant
                 </Link>
                 <Button variant="secondary" size="sm" className="retro-button" onClick={handleSignOut}>
                     <LogOut className="mr-1 h-4 w-4"/> Sign Out
                 </Button>
             </>
          )}
           {status === 'unauthenticated' && (
               <>
                  {/* Maybe show simplified nav or just auth buttons */}
                   <Link href="/#features" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">Features</Link>
                   <Link href="/#pricing" className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2">Pricing</Link>
                   <div className="flex items-center gap-2 ml-auto"> {/* Use ml-auto to push auth buttons right */}
                      <Link href="/login" passHref>
                         <Button variant="secondary" size="sm" className="retro-button">Login</Button>
                      </Link>
                      <Link href="/get-started" passHref>
                         <Button variant="outline" size="sm" className="retro-button !border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10">Sign Up</Button>
                      </Link>
                   </div>
               </>
            )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                 variant="outline"
                 size="icon"
                 className="retro-button border-primary-foreground text-primary-foreground hover:bg-primary/80 !shadow-none h-8 w-8"
               >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
               className="w-[250px] retro-window !rounded-none !border-foreground !shadow-[4px_4px_0px_0px_hsl(var(--foreground))] !p-0"
            >
                <div className="retro-window-header !bg-secondary !text-secondary-foreground">
                   <SheetTitle> {/* Added SheetTitle for accessibility */}
                        <span className="text-lg font-sans font-medium">Menu</span>
                   </SheetTitle>
                   <div className="retro-window-controls">
                       <span className="!border-secondary-foreground !bg-secondary"></span>
                       <span className="!border-secondary-foreground !bg-secondary"></span>
                       <SheetClose asChild>
                         <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                            <X className="h-3 w-3"/>
                            <span className="sr-only">Close</span>
                         </Button>
                       </SheetClose>
                   </div>
                </div>
               <nav className="grid gap-4 text-lg font-medium p-4 retro-window-content">
                 <Link
                  href="/"
                  className="flex items-center gap-3 text-lg font-medium mb-2"
                >
                  <CircleDollarSign className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-sans">FinTrack</span>
                </Link>
                {status === 'authenticated' ? (
                     <>
                        <Link href="/dashboard" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                          Dashboard
                        </Link>
                         <Link href="/budget" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                          Budget
                         </Link>
                         <Link href="/expenses" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                          Expenses
                         </Link>
                         <Link href="/savings-goals" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                          Savings Goals
                         </Link>
                         <Link href="/investments" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                          Investments
                         </Link>
                         <Link href="/emergency-fund" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                          Emergency Fund
                         </Link>
                         <Link href="/tax-planner" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                          Tax Planner
                         </Link>
                         <Link href="/ai-assistant" className="text-accent hover:underline hover:text-accent/80 underline-offset-2">
                          AI Assistant
                         </Link>
                         <Button variant="accent" className="w-full retro-button" onClick={handleLinkAccount}>
                             <Banknote className="mr-2 h-4 w-4"/> Link Bank Account
                         </Button>
                          <Button variant="destructive" size="sm" className="retro-button mt-4" onClick={handleSignOut}>
                             <LogOut className="mr-2 h-4 w-4"/> Sign Out
                         </Button>
                    </>
                 ) : (
                     <>
                         <Link href="/#features" className="text-foreground hover:underline hover:text-primary underline-offset-2">Features</Link>
                         <Link href="/#pricing" className="text-foreground hover:underline hover:text-primary underline-offset-2">Pricing</Link>
                         <div className="flex flex-col gap-3 mt-4">
                            <Link href="/login" passHref>
                                <Button variant="primary" className="w-full retro-button">Login</Button>
                            </Link>
                             <Link href="/get-started" passHref>
                                <Button variant="secondary" className="w-full retro-button">Sign Up</Button>
                            </Link>
                         </div>
                     </>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
