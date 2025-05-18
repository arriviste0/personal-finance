
'use client';

import React, { useState } from 'react';
// import { useSession, signOut } from 'next-auth/react'; // Session-based logic commented out
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from "recharts";
import {
    DollarSign,
    CreditCard,
    Landmark,
    ShieldAlert,
    Activity,
    PlusCircle,
    TrendingUp,
    PiggyBank,
    Lightbulb,
    LogOut,
    Loader2,
    Target as TargetIcon,
    BarChart2,
    ListChecks,
    Wallet,
    Lock,
    AlertTriangle,
    ArrowRight,
    X,
    Star // Added Star icon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext'; // Import useWallet

// Mock data - some will be replaced by WalletContext
// const walletBalance = 12500.75; // From context
// const lockedInGoals = 5750.00; // From context
const monthlyBudgetTotal = 2000;
const monthlyExpensesTotal = 1650.50;
const financialHealthScore = 78; // Out of 100

const emergencyFundData = { current: 4500, target: 15000, idealMonths: 6 }; // Part of this 'current' will come from context
const investmentTotal = 18200; // This would ideally come from investment tracking system

const goalsData = [
  { id: "1", name: "Dream Vacation", current: 750, target: 2000, icon: <PiggyBank className="h-5 w-5 text-brand-orange" /> },
  { id: "2", name: "New Laptop", current: 300, target: 1200, icon: <TargetIcon className="h-5 w-5 text-brand-blue" /> },
  // Emergency fund goal will be handled by the emergency fund section primarily
];

const cashFlowData = [
    { month: 'Jan', income: 4000, expenses: 2200 },
    { month: 'Feb', income: 4100, expenses: 2300 },
    { month: 'Mar', income: 3900, expenses: 2100 },
    { month: 'Apr', income: 4200, expenses: 2400 },
    { month: 'May', income: 4300, expenses: 2350 },
    { month: 'Jun', income: 4000, expenses: 2500 },
];
const cashFlowConfig: ChartConfig = {
    income: { label: "Income", color: "hsl(var(--chart-2))" },
    expenses: { label: "Expenses", color: "hsl(var(--chart-3))" },
};

const recentTransactions = [
    { id: "t1", date: "2024-07-28", description: "Grocery Shopping", amount: -75.50, category: "Food" },
    { id: "t2", date: "2024-07-27", description: "Salary Deposit", amount: 2500.00, category: "Income" },
    { id: "t3", date: "2024-07-26", description: "Restaurant - Dinner Out", amount: -42.10, category: "Food" },
    { id: "t4", date: "2024-07-25", description: "Online Course Subscription", amount: -29.99, category: "Education" },
    { id: "t5", date: "2024-07-24", description: "Concert Tickets", amount: -150.00, category: "Entertainment" },
];

const aiInsights = [
    "You're trending high on 'Dining Out' this month. Consider cooking at home more often to save an estimated $50.",
    "Good job on consistently contributing to your 'Dream Vacation' goal! You're on track.",
    "Your emergency fund is currently at 30% of your 6-month target. Consider prioritizing this.",
    "Consider allocating a small portion of your wallet balance to your 'New Laptop' goal to reach it faster."
];

export default function DashboardPage() {
  // const { data: session, status } = useSession(); // Commented out
  const router = useRouter();
  const { toast } = useToast();
  const [isLinkBankModalOpen, setIsLinkBankModalOpen] = useState(false);
  const { walletBalance, totalLockedFunds, allocations } = useWallet();

  const netWorth = walletBalance + totalLockedFunds + investmentTotal; // Example calculation using wallet context

  const emergencyFundCurrent = allocations['emergencyFund']?.amount || 0;
  const emergencyFundTarget = allocations['emergencyFund']?.target || emergencyFundData.target;


  const formatCurrency = (amount: number, showSign = false) => {
    const sign = amount < 0 ? "-" : (showSign ? "+" : "");
    return `${sign}$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // const handleSignOut = async () => { // Commented out
  //   await signOut({ redirect: true, callbackUrl: '/' });
  // };

  const handleLinkBankAccount = () => {
    setIsLinkBankModalOpen(false);
    toast({
      title: "Bank Linking Initiated (Demo)",
      description: "In a real app, this would start the Plaid Link flow.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome to FinTrack Pro! Your financial command center.</p>
        </div>
        {/* {session ? ( // Commented out session-based button
            <Button variant="destructive" size="sm" className="retro-button" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
        ) : ( */}
            <Link href="/login" passHref className="no-underline">
                 <Button variant="primary" size="sm" className="retro-button">
                    Log In
                 </Button>
            </Link>
        {/* )} */}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent items-center justify-between flex-row">
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Wallet className="h-5 w-5 text-brand-green" /> Current Wallet</CardTitle>
             <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="retro-card-content pt-2">
            <div className="text-3xl font-bold text-brand-green">{formatCurrency(walletBalance)}</div>
            <p className="text-xs text-muted-foreground">Available liquid funds.</p>
          </CardContent>
        </Card>
        <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent items-center justify-between flex-row">
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Lock className="h-5 w-5 text-brand-orange" /> Funds Locked</CardTitle>
            <PiggyBank className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="retro-card-content pt-2">
            <div className="text-3xl font-bold text-brand-orange">{formatCurrency(totalLockedFunds)}</div>
            <p className="text-xs text-muted-foreground">Allocated to savings goals.</p>
          </CardContent>
        </Card>
        <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent items-center justify-between flex-row">
            <CardTitle className="text-base font-semibold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-purple-600" />Net Worth</CardTitle>
             <Landmark className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="retro-card-content pt-2">
            <div className="text-3xl font-bold text-purple-600">{formatCurrency(netWorth)}</div>
            <p className="text-xs text-muted-foreground">Overall financial standing (est.).</p>
          </CardContent>
        </Card>
         <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent items-center justify-between flex-row">
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent" />Financial Health</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="retro-card-content pt-2">
            <div className={cn("text-3xl font-bold", financialHealthScore > 75 ? "text-brand-green" : financialHealthScore > 50 ? "text-yellow-500" : "text-red-500")}>
                {financialHealthScore}/100
            </div>
            <Progress value={financialHealthScore} className="h-2 my-1 retro-progress" indicatorClassName={cn(financialHealthScore > 75 ? "!bg-brand-green" : financialHealthScore > 50 ? "!bg-yellow-500" : "!bg-red-500")} />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left Column (takes 2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent flex-row items-center justify-between">
              <CardTitle className="flex items-center text-lg"><BarChart2 className="mr-2 h-5 w-5 text-primary" />Monthly Cash Flow</CardTitle>
            </CardHeader>
            <CardContent className="retro-card-content h-[300px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontFamily: 'var(--font-sans)' }}
                    formatter={(value: number, name: string) => [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                    cursor={{fill: 'hsl(var(--muted)/0.5)'}}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                  <Bar dataKey="income" fill={cashFlowConfig.income.color} radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expenses" fill={cashFlowConfig.expenses.color} radius={[4, 4, 0, 0]} barSize={20}/>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent flex-row items-center justify-between">
              <CardTitle className="flex items-center text-lg"><ListChecks className="mr-2 h-5 w-5 text-primary" />Recent Transactions</CardTitle>
              <Link href="/expenses" className="text-xs text-primary hover:underline flex items-center gap-1 no-underline">View All <ArrowRight className="h-3 w-3"/></Link>
            </CardHeader>
            <CardContent className="retro-card-content p-0">
              <div className="space-y-0">
                {recentTransactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                        {tx.amount > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingUp className="h-4 w-4 text-red-600 transform " />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.category} &bull; {tx.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(tx.amount, true)}
                    </span>
                  </div>
                ))}
                 {recentTransactions.length === 0 && <p className="p-4 text-sm text-muted-foreground text-center">No transactions yet.</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent flex-row items-center justify-between">
              <CardTitle className="flex items-center text-lg"><TargetIcon className="mr-2 h-5 w-5 text-primary" />Savings Goals</CardTitle>
              <Link href="/savings-goals" className="text-xs text-primary hover:underline flex items-center gap-1 no-underline">Manage <ArrowRight className="h-3 w-3"/></Link>
            </CardHeader>
            <CardContent className="retro-card-content space-y-4 pt-4">
              {goalsData.map((goal) => {
                const allocatedAmount = allocations[goal.id]?.amount || 0;
                return (
                <div key={goal.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-medium">{goal.icon} {goal.name}</div>
                    <span className="text-xs text-muted-foreground">{formatCurrency(allocatedAmount)} / {formatCurrency(goal.target)}</span>
                  </div>
                  <Progress value={(allocatedAmount / goal.target) * 100} className="h-2.5 retro-progress" indicatorClassName={cn(allocatedAmount >= goal.target ? "!bg-brand-green" : "!bg-primary")} />
                </div>
              )})}
              {goalsData.length === 0 && <p className="text-sm text-muted-foreground text-center">No savings goals set yet.</p>}
            </CardContent>
          </Card>

          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent flex-row items-center justify-between">
              <CardTitle className="flex items-center text-lg"><ShieldAlert className="mr-2 h-5 w-5 text-brand-orange" />Emergency Fund</CardTitle>
              <Link href="/emergency-fund" className="text-xs text-primary hover:underline flex items-center gap-1 no-underline">Details <ArrowRight className="h-3 w-3"/></Link>
            </CardHeader>
            <CardContent className="retro-card-content pt-4">
              <div className="text-center mb-2">
                <p className="text-2xl font-bold">{formatCurrency(emergencyFundCurrent)}</p>
                <p className="text-xs text-muted-foreground">Target: {formatCurrency(emergencyFundTarget)} ({emergencyFundData.idealMonths} months coverage)</p>
              </div>
              <Progress value={(emergencyFundCurrent / emergencyFundTarget) * 100} className="h-3 retro-progress" indicatorClassName="!bg-brand-orange" />
              {emergencyFundCurrent < emergencyFundTarget && (
                <div className="text-xs text-center mt-2 text-red-500 flex items-center justify-center gap-1">
                    <AlertTriangle className="h-3 w-3"/>
                    <span>Needs attention! Your fund is below target.</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="retro-card bg-accent/10 border-accent">
            <CardHeader className="retro-card-header !bg-transparent flex-row items-center justify-between">
              <CardTitle className="flex items-center text-lg text-accent"><Lightbulb className="mr-2 h-5 w-5" />AI Insights</CardTitle>
               <Link href="/ai-assistant" className="text-xs text-accent hover:underline flex items-center gap-1 no-underline">Ask AI <ArrowRight className="h-3 w-3"/></Link>
            </CardHeader>
            <CardContent className="retro-card-content space-y-2.5 pt-3">
              {aiInsights.slice(0,3).map((insight, index) => (
                <p key={index} className="text-xs text-accent-foreground/90 border-l-2 border-accent pl-2 py-1">
                  {insight}
                </p>
              ))}
            </CardContent>
          </Card>

           <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent">
                <CardTitle className="flex items-center text-lg"><Activity className="mr-2 h-5 w-5 text-primary" />Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="retro-card-content grid grid-cols-2 gap-3 pt-4">
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => router.push('/expenses')}><PlusCircle className="mr-1.5 h-4 w-4" />Log Expense</Button>
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => router.push('/budget')}><CreditCard className="mr-1.5 h-4 w-4" />Budgeting</Button>
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => router.push('/savings-goals')}><PiggyBank className="mr-1.5 h-4 w-4" />New Goal</Button>
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => setIsLinkBankModalOpen(true)}><Landmark className="mr-1.5 h-4 w-4" />Link Bank</Button>
                <Button variant="outline" size="sm" className="retro-button w-full col-span-2 border-accent text-accent hover:border-accent hover:bg-accent/10">
                    <Star className="mr-1.5 h-4 w-4" />Upgrade to Premium
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Link Bank Account Modal Placeholder */}
      <Dialog open={isLinkBankModalOpen} onOpenChange={setIsLinkBankModalOpen}>
        <DialogContent className="retro-window sm:max-w-md">
          <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
            <DialogTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />Link Bank Account</DialogTitle>
             <div className="retro-window-controls">
                <span className="!bg-primary !border-primary-foreground"></span>
                <span className="!bg-primary !border-primary-foreground"></span>
                <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                        <X className="h-3 w-3" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogClose>
            </div>
          </DialogHeader>
          <DialogDescription className="p-4 retro-window-content !border-t-0 space-y-3">
              <p className="text-muted-foreground text-sm">
              Securely connect your bank to automatically import transactions and balances.
              FinTrack Pro uses industry-standard encryption and partners with trusted aggregators.
            </p>
            <p className="text-xs text-muted-foreground/80">
              (This is a placeholder. In a real application, a service like Plaid or Yodlee would handle this.)
            </p>
          </DialogDescription>
          <DialogFooter className="retro-window-content !border-t-2 !pt-3 !pb-3 flex-col sm:flex-row sm:justify-between gap-2">
            <Button className="w-full sm:w-auto retro-button" variant="primary" onClick={handleLinkBankAccount}>
              <PlusCircle className="mr-2 h-4 w-4" /> Connect (Demo)
            </Button>
            <DialogClose asChild>
              <Button variant="secondary" className="w-full sm:w-auto retro-button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

