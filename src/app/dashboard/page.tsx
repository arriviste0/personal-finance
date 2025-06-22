'use client';

import React, { useMemo } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import {
    DollarSign,
    CreditCard,
    Landmark,
    ShieldCheck,
    Lock,
    ArrowRight,
    Briefcase,
    Lightbulb,
    PlusCircle,
    Target as TargetIcon,
    TrendingUp,
    Wallet,
    ListChecks,
    X,
    AlertTriangle,
    ShieldAlert,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
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
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import { useExpenses } from '@/hooks/use-expenses';
import { useInvestments } from '@/hooks/use-investments';
import { useGoals } from '@/hooks/use-goals';
import { useEmergencyFund } from '@/hooks/use-emergency-fund';
import { Skeleton } from '@/components/ui/skeleton';

const chartColors = [
    "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
    "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--muted))",
];

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLinkBankModalOpen, setIsLinkBankModalOpen] = React.useState(false);

  // Fetch real data
  const { data: userData, isLoading: isLoadingUser } = useUser();
  const { data: expenses = [], isLoading: isLoadingExpenses } = useExpenses();
  const { data: investments = [], isLoading: isLoadingInvestments } = useInvestments();
  const { data: goals = [], isLoading: isLoadingGoals } = useGoals();
  const { data: emergencyFund, isLoading: isLoadingEmergencyFund } = useEmergencyFund();

  const isLoading = isLoadingUser || isLoadingExpenses || isLoadingInvestments || isLoadingGoals || isLoadingEmergencyFund;

  // Memoize calculations
  const investmentTotal = useMemo(() => investments.reduce((sum, inv) => sum + inv.value, 0), [investments]);
  const goalsTotal = useMemo(() => goals.reduce((sum, goal) => sum + goal.currentAmount, 0), [goals]);
  const emergencyFundCurrent = emergencyFund?.currentAmount || 0;
  const emergencyFundTarget = emergencyFund?.targetAmount || 15000;
  const totalLockedFunds = goalsTotal + emergencyFundCurrent;
  const walletBalance = userData?.walletBalance || 0;
  const netWorth = walletBalance + totalLockedFunds + investmentTotal;

  const recentTransactions = useMemo(() => 
      [...expenses]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4), 
    [expenses]);
    
  const investmentPieData = useMemo(() => investments.filter(item => item.value > 0).map((item, index) => ({
    name: item.ticker || item.name,
    value: item.value,
    fill: chartColors[index % chartColors.length],
  })), [investments]);

  const activeGoals = useMemo(() => goals.filter(g => !g.isComplete).slice(0, 2), [goals]);

  const formatCurrency = (amount: number, showSign = false) => {
    const sign = amount < 0 ? "-" : (showSign && amount > 0 ? "+" : "");
    return `${sign}$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
        <div>
          <h1 className="text-3xl font-semibold font-heading">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userData?.name || 'User'}! Here’s your financial overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/expenses')} className="hover:bg-primary/10 hover:text-primary">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Button>
          <Button variant="primary" onClick={() => router.push('/savings-goals')}>
            New Goal
          </Button>
        </div>
      </div>

      {/* Top summary cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
                <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="h-4 w-4" />Net Worth (Est.)</CardTitle>
                <div className="retro-window-controls"><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 pt-4">
                {isLoading ? <Skeleton className="h-8 w-40" /> : <div className="text-3xl font-bold">{formatCurrency(netWorth)}</div>}
                <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
            </CardContent>
        </Card>
        <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground">
                <CardTitle className="flex items-center gap-2 text-base"><Wallet className="h-4 w-4" />Wallet Balance</CardTitle>
                <div className="retro-window-controls"><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 pt-4">
                {isLoading ? <Skeleton className="h-8 w-32" /> : <div className="text-3xl font-bold">{formatCurrency(walletBalance)}</div> }
                <p className="text-xs text-muted-foreground mt-1">Available to spend</p>
            </CardContent>
        </Card>
        <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
                <CardTitle className="flex items-center gap-2 text-base"><Lock className="h-4 w-4" />Funds in Goals</CardTitle>
                <div className="retro-window-controls"><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 pt-4">
                {isLoading ? <Skeleton className="h-8 w-28" /> : <div className="text-3xl font-bold">{formatCurrency(totalLockedFunds)}</div> }
                <p className="text-xs text-muted-foreground mt-1">Allocated to goals</p>
            </CardContent>
        </Card>
        <Card className="retro-card">
            <CardHeader className="retro-card-header">
                <CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="h-4 w-4" />Financial Health</CardTitle>
                <div className="retro-window-controls"><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 pt-4">
                <div className="text-3xl font-bold">Good</div>
                <p className="text-xs text-muted-foreground mt-1">Based on your activity</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Transactions */}
          <Card className="retro-card">
            <CardHeader className="retro-card-header">
              <CardTitle className="text-xl">Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities.</CardDescription>
               <div className="retro-window-controls"><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 p-0">
               {isLoadingExpenses ? (
                   <div className="p-4 space-y-3">
                       {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                   </div>
               ) : recentTransactions.length > 0 ? (
                    <div className="space-y-1">
                        {recentTransactions.map((tx, index) => (
                        <React.Fragment key={tx._id.toString()}>
                            <div className="flex items-center p-3">
                                <div className="p-2 bg-muted rounded-none border-2 border-foreground">
                                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-sm font-medium leading-none">{tx.description}</p>
                                    <p className="text-sm text-muted-foreground">{tx.category}</p>
                                </div>
                                <div className={cn("ml-auto font-medium", tx.amount > 0 ? 'text-green-500' : 'text-foreground')}>
                                    {formatCurrency(tx.amount, true)}
                                </div>
                            </div>
                            {index < recentTransactions.length - 1 && <Separator className="bg-foreground/20" />}
                        </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center p-8">No recent transactions.</p>
                )}
            </CardContent>
            <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
              <Button variant="outline" className="w-full group" onClick={() => router.push('/expenses')}>
                View All Transactions <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>

           {/* Investment Portfolio */}
          <Card className="retro-card">
              <CardHeader className="retro-card-header">
                <CardTitle className="text-xl">Investment Portfolio</CardTitle>
                <CardDescription>A glance at your asset allocation.</CardDescription>
                <div className="retro-window-controls"><span></span><span></span></div>
              </CardHeader>
              <CardContent className="retro-card-content !border-t-0 h-[350px]">
                {isLoadingInvestments ? <Skeleton className="h-full w-full" /> : investmentPieData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie dataKey="value" nameKey="name" data={investmentPieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2}>
                        {investmentPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill}/>
                        ))}
                        </Pie>
                        <RechartsTooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} 
                            contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--foreground))', fontFamily: 'var(--font-sans)', fontSize: '12px', boxShadow: 'none' }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend iconType="square" wrapperStyle={{ fontSize: '12px', paddingTop: '15px', fontFamily: 'var(--font-sans)' }}/>
                    </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                        <Briefcase className="h-10 w-10 mb-2"/>
                        <p>No investments tracked yet.</p>
                    </div>
                )}
              </CardContent>
              <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
                <Button variant="outline" className="w-full group" onClick={() => router.push('/investments')}>
                  <Briefcase className="mr-2 h-4 w-4" /> Manage Investments <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <Card className="retro-card">
            <CardHeader className="retro-card-header">
              <CardTitle className="text-xl">Quick Actions</CardTitle>
              <div className="retro-window-controls"><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 p-3 space-y-2">
                <Button variant="default" className="w-full justify-start text-base" onClick={() => router.push('/budget')}>
                    <CreditCard className="mr-3 h-5 w-5 text-muted-foreground" /> Manage Budget
                </Button>
                <Button variant="default" className="w-full justify-start text-base" onClick={() => router.push('/savings-goals')}>
                    <TargetIcon className="mr-3 h-5 w-5 text-muted-foreground" /> View Savings Goals
                </Button>
                <Button variant="default" className="w-full justify-start text-base" onClick={() => router.push('/ai-assistant')}>
                    <Lightbulb className="mr-3 h-5 w-5 text-muted-foreground" /> AI Savings Assistant
                </Button>
                <Button variant="default" className="w-full justify-start text-base" onClick={() => setIsLinkBankModalOpen(true)}>
                    <Landmark className="mr-3 h-5 w-5 text-muted-foreground" /> Link Bank Account
                </Button>
            </CardContent>
          </Card>
          
          {/* Savings Goals */}
          <Card className="retro-card">
            <CardHeader className="retro-card-header">
              <CardTitle className="text-xl">Top Savings Goals</CardTitle>
              <div className="retro-window-controls"><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 pt-4 space-y-4">
               {isLoadingGoals ? (
                  <div className="space-y-4"> <Skeleton className="h-10 w-full" /> <Skeleton className="h-10 w-full" /> </div>
               ) : activeGoals.length > 0 ? (
                  activeGoals.map((goal) => (
                    <div key={goal._id.toString()} className="space-y-2">
                      <div className="flex justify-between items-baseline text-sm">
                        <span className="font-medium text-foreground/90">{goal.name}</span>
                        <span className="text-xs text-muted-foreground">{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
                      </div>
                      <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="retro-progress h-3" />
                    </div>
                  ))
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No active savings goals.</p>
                )}
            </CardContent>
            <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
              <Button variant="outline" className="w-full group" onClick={() => router.push('/savings-goals')}>
                View All Goals <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
          
          {/* Emergency Fund */}
          <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
              <CardTitle className="flex items-center gap-2 text-base"><ShieldAlert className="h-5 w-5" />Emergency Fund</CardTitle>
               <div className="retro-window-controls"><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span></div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 pt-4 space-y-2">
                {isLoadingEmergencyFund ? <div className="space-y-2"><Skeleton className="h-7 w-3/4 mx-auto" /><Skeleton className="h-3 w-1/2 mx-auto"/><Skeleton className="h-3 w-full"/></div> : (
                    <>
                        <div className="text-center space-y-1">
                        <p className="text-2xl font-bold text-foreground">{formatCurrency(emergencyFundCurrent)}</p>
                        <p className="text-xs text-muted-foreground mb-2">Target: {formatCurrency(emergencyFundTarget)}</p>
                        </div>
                        <Progress value={emergencyFundTarget > 0 ? (emergencyFundCurrent / emergencyFundTarget) * 100 : 0} className="retro-progress h-3" indicatorClassName="!bg-accent" />
                        {emergencyFundTarget > 0 && emergencyFundCurrent < emergencyFundTarget && (
                        <div className="text-xs text-center mt-2 text-destructive flex items-center justify-center gap-1">
                            <AlertTriangle className="h-3 w-3"/>
                            <span>Needs attention!</span>
                        </div>
                        )}
                    </>
                )}
            </CardContent>
            <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
              <Button variant="outline" className="w-full group" onClick={() => router.push('/emergency-fund')}>
                Manage Fund <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

       {/* Link Bank Modal */}
      <Dialog open={isLinkBankModalOpen} onOpenChange={setIsLinkBankModalOpen}>
        <DialogContent className="retro-window sm:max-w-md">
          <DialogHeader className="retro-window-header">
            <DialogTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />Link Bank Account</DialogTitle>
            <div className="retro-window-controls"><span></span><span></span></div>
          </DialogHeader>
           <DialogDescription className="retro-window-content !border-t-0 !pt-2">
              This is a demo. No real bank connection will be made. This functionality is not yet implemented.
            </DialogDescription>
          <div className="py-4 px-4 space-y-2 retro-window-content !border-t-0">
                <Label htmlFor="mock-balance">Mock Bank Balance ($)</Label>
                <Input id="mock-balance" type="number" placeholder="e.g., 50000" className="retro-input" disabled/>
            </div>
          <DialogFooter className="retro-window-content !border-t-2 !flex-col sm:!flex-row sm:!justify-between gap-2">
             <DialogClose asChild>
              <Button variant="secondary" className="w-full sm:w-auto">Cancel</Button>
             </DialogClose>
            <Button className="w-full sm:w-auto" variant="primary" disabled>
              <PlusCircle className="mr-2 h-4 w-4" /> Connect & Sync (Demo)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
