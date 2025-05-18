'use client';

import React, { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
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
    Users,
    FileText,
    Settings,
    Bell,
    Briefcase,
    Target as TargetIcon, // Renamed to avoid conflict with savings target
    BarChart2,
    PieChart as PieChartIcon,
    ListChecks
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

// Mock data - this should ideally come from a backend or state management
const walletBalance = 12500.75;
const lockedInGoals = 5750.00;
const monthlyBudgetTotal = 2000;
const monthlyExpensesTotal = 1650.50;
const emergencyFund = { current: 4500, target: 15000, idealMonths: 6 };
const investmentTotal = 18200;

const goalsData = [
  { name: "Dream Vacation", current: 750, target: 2000, icon: <PiggyBank className="h-5 w-5 text-primary" /> },
  { name: "New Laptop", current: 300, target: 1200, icon: <TargetIcon className="h-5 w-5 text-secondary" /> },
];

const investmentBreakdownData = [
    { name: 'Stocks', value: 12500, fill: 'hsl(var(--chart-1))' },
    { name: 'Mutual Funds', value: 3200, fill: 'hsl(var(--chart-2))' },
    { name: 'Crypto', value: 2500, fill: 'hsl(var(--chart-4))' },
];

const cashFlowData = [
    { month: 'Jan', income: 4000, expenses: 2200 },
    { month: 'Feb', income: 4100, expenses: 2300 },
    { month: 'Mar', income: 3900, expenses: 2100 },
    { month: 'Apr', income: 4200, expenses: 2400 },
];
const cashFlowConfig: ChartConfig = {
    income: { label: "Income", color: "hsl(var(--chart-2))" },
    expenses: { label: "Expenses", color: "hsl(var(--chart-3))" },
};

const recentTransactions = [
    { id: "t1", date: "2024-07-28", description: "Grocery Shopping", amount: -75.50, category: "Food" },
    { id: "t2", date: "2024-07-27", description: "Salary Deposit", amount: 2500.00, category: "Income" },
    { id: "t3", date: "2024-07-26", description: "Restaurant", amount: -42.10, category: "Food" },
];

const financialHealthScore = 78; // Out of 100
const aiInsights = [
    "You're trending high on 'Dining Out' this month. Consider cooking at home more often.",
    "Good job on consistently contributing to your 'Dream Vacation' goal!",
    "Your emergency fund is currently at 45% of your 6-month target. Keep contributing!",
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isLinkBankModalOpen, setIsLinkBankModalOpen] = useState(false);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const handleLinkBankAccount = () => {
    setIsLinkBankModalOpen(false);
    toast({
      title: "Bank Linking Initiated (Demo)",
      description: "In a real app, this would start the Plaid Link flow.",
    });
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Welcome back, {session?.user?.name || 'User'}!</h1>
          <p className="text-muted-foreground">Here's your financial overview for today.</p>
        </div>
        <Button variant="destructive" size="sm" className="retro-button" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Current Wallet Balance <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="retro-card-content">
            <div className="text-2xl font-bold text-brand-green">{formatCurrency(walletBalance)}</div>
            <p className="text-xs text-muted-foreground">Total liquid funds available.</p>
          </CardContent>
        </Card>
        <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Funds Locked in Goals <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="retro-card-content">
            <div className="text-2xl font-bold text-brand-orange">{formatCurrency(lockedInGoals)}</div>
            <p className="text-xs text-muted-foreground">Allocated to your savings goals.</p>
          </CardContent>
        </Card>
        <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Monthly Budget <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="retro-card-content">
            <div className="text-lg font-bold">{formatCurrency(monthlyExpensesTotal)} / <span className="text-sm text-muted-foreground">{formatCurrency(monthlyBudgetTotal)}</span></div>
            <Progress value={(monthlyExpensesTotal/monthlyBudgetTotal)*100} className="h-2 my-1 retro-progress" indicatorClassName="!bg-secondary" />
            <Link href="/budget" className="text-xs text-primary hover:underline">View Budget</Link>
          </CardContent>
        </Card>
        <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Investment Snapshot <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="retro-card-content">
            <div className="text-2xl font-bold text-brand-blue">{formatCurrency(investmentTotal)}</div>
            <Link href="/investments" className="text-xs text-primary hover:underline">View Portfolio</Link>
          </CardContent>
        </Card>
         <Card className="retro-card">
          <CardHeader className="retro-card-header pb-2 !bg-transparent">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Net Worth (Est.) <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="retro-card-content">
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(walletBalance + investmentTotal - 0 /* assuming no debt */)}</div>
            <p className="text-xs text-muted-foreground">Overall financial standing.</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3 mt-6">
        {/* Left Column: Cash Flow & Recent Transactions */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent">
              <CardTitle className="flex items-center"><BarChart2 className="mr-2 h-5 w-5 text-primary" />Monthly Cash Flow</CardTitle>
            </CardHeader>
            <CardContent className="retro-card-content h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                  <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}
                    formatter={(value: number, name: string) => [formatCurrency(value), name.charAt(0).toUpperCase() + name.slice(1)]}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                  <Bar dataKey="income" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent">
              <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5 text-primary" />Recent Transactions</CardTitle>
              <Link href="/expenses" className="text-xs text-primary hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="retro-card-content p-0">
              <div className="space-y-0">
                {recentTransactions.slice(0, 5).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                        {tx.amount > 0 ? <TrendingUp className="h-4 w-4 text-green-600" /> : <TrendingUp className="h-4 w-4 text-red-600 transform rotate-180" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                        <span className={`text-sm font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                        </span>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Goals, Emergency, AI Insights */}
        <div className="space-y-6">
          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent">
              <CardTitle className="flex items-center"><TargetIcon className="mr-2 h-5 w-5 text-primary" />Savings Goals Progress</CardTitle>
                 <Link href="/savings-goals" className="text-xs text-primary hover:underline">Manage Goals</Link>
            </CardHeader>
            <CardContent className="retro-card-content space-y-4">
              {goalsData.map((goal) => (
                <div key={goal.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-medium">{goal.icon} {goal.name}</div>
                    <span className="text-xs text-muted-foreground">{formatCurrency(goal.current)} / {formatCurrency(goal.target)}</span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-2 retro-progress" indicatorClassName="!bg-primary" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent">
              <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5 text-brand-orange" />Emergency Fund</CardTitle>
                 <Link href="/emergency-fund" className="text-xs text-primary hover:underline">Manage Fund</Link>
            </CardHeader>
            <CardContent className="retro-card-content">
              <div className="text-center mb-2">
                <p className="text-2xl font-bold">{formatCurrency(emergencyFund.current)}</p>
                <p className="text-xs text-muted-foreground">Target: {formatCurrency(emergencyFund.target)} ({emergencyFund.idealMonths} months coverage)</p>
              </div>
              <Progress value={(emergencyFund.current / emergencyFund.target) * 100} className="h-3 retro-progress" indicatorClassName="!bg-brand-orange" />
            </CardContent>
          </Card>
          
          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent">
              <CardTitle className="flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent" />AI Assistant Insights</CardTitle>
              <Link href="/ai-assistant" className="text-xs text-primary hover:underline">Ask AI</Link>
            </CardHeader>
            <CardContent className="retro-card-content space-y-2">
                <div className="flex items-center justify-between text-sm mb-2">
                    <span>Financial Health Score:</span>
                    <Badge variant={financialHealthScore > 75 ? "secondary" : financialHealthScore > 50 ? "default" : "destructive"} className="retro-badge">
                        {financialHealthScore}/100
                    </Badge>
                </div>
              {aiInsights.slice(0,2).map((insight, index) => (
                <p key={index} className="text-xs text-muted-foreground border-l-2 border-accent pl-2 py-1 bg-accent/10 rounded-r-sm">
                  {insight}
                </p>
              ))}
            </CardContent>
          </Card>

           <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-transparent">
                <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5 text-primary" />Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="retro-card-content grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => router.push('/expenses')}><PlusCircle className="mr-1 h-3 w-3" />Log Expense</Button>
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => router.push('/budget')}><CreditCard className="mr-1 h-3 w-3" />Adjust Budget</Button>
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => router.push('/savings-goals')}><PiggyBank className="mr-1 h-3 w-3" />New Goal</Button>
                <Button variant="outline" size="sm" className="retro-button w-full" onClick={() => setIsLinkBankModalOpen(true)}><Landmark className="mr-1 h-3 w-3" />Link Bank</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Link Bank Account Modal Placeholder */}
      <Dialog open={isLinkBankModalOpen} onOpenChange={setIsLinkBankModalOpen}>
        <DialogContent className="retro-window sm:max-w-md">
          <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
            <DialogTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />Link Your Bank Account</DialogTitle>
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
          <DialogContent className="retro-window-content !border-t-0 pt-6 pb-4 space-y-4">
            <DialogDescription className="text-muted-foreground text-sm">
              Securely connect your bank to automatically import transactions and balances.
              FinTrack Pro uses industry-standard encryption and partners with trusted aggregators.
            </DialogDescription>
            <p className="text-xs text-muted-foreground/80">
              (This is a placeholder. In a real application, a service like Plaid or Yodlee would handle this.)
            </p>
            <Button className="w-full retro-button" variant="primary" onClick={handleLinkBankAccount}>
              <PlusCircle className="mr-2 h-4 w-4" /> Connect Account (Demo)
            </Button>
          </DialogContent>
          <DialogFooter className="retro-window-content !border-t-2 !pt-3 !pb-3 !flex !justify-end">
            <DialogClose asChild>
              <Button variant="secondary" className="retro-button">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
