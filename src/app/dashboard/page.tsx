
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
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
    Settings,
    Target as TargetIcon,
    ListChecks,
    Lock,
    AlertTriangle,
    ArrowRight,
    Briefcase, 
    Zap, 
    Star,
    X,
    BarChart3, 
    Receipt, 
    Users 
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
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext';

const investmentPieData = [
    { name: 'Stocks', value: 4000, fill: 'hsl(var(--chart-1))' },
    { name: 'ETFs', value: 3000, fill: 'hsl(var(--chart-2))' },
    { name: 'Crypto', value: 2000, fill: 'hsl(var(--chart-3))' },
    { name: 'Bonds', value: 1000, fill: 'hsl(var(--chart-5))' },
];

const budgetSnapshotData = [
    { category: 'Food & Groceries', spent: 450, budget: 600, color: 'bg-green-500' },
    { category: 'Transportation', spent: 150, budget: 200, color: 'bg-blue-500' },
    { category: 'Entertainment', spent: 280, budget: 300, color: 'bg-yellow-500' },
    { category: 'Utilities', spent: 180, budget: 200, color: 'bg-purple-500' },
];


const recentTransactions = [
    { id: "t1", date: "2024-07-28", description: "Grocery Shopping", amount: -75.50, category: "Food" },
    { id: "t2", date: "2024-07-27", description: "Salary Deposit", amount: 2500.00, category: "Income" },
    { id: "t3", date: "2024-07-26", description: "Restaurant - Dinner Out", amount: -42.10, category: "Food" },
    { id: "t4", date: "2024-07-25", description: "Online Course Subscription", amount: -29.99, category: "Education" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLinkBankModalOpen, setIsLinkBankModalOpen] = useState(false);
  const { walletBalance, totalLockedFunds, allocations, setInitialWalletBalance } = useWallet();
  const [mockBankBalance, setMockBankBalance] = useState('');


  const investmentTotal = 12000; 
  const netWorth = walletBalance + totalLockedFunds + investmentTotal;
  const emergencyFundAllocation = allocations['emergencyFund'];
  const emergencyFundCurrent = emergencyFundAllocation?.amount || 0;
  const emergencyFundTarget = emergencyFundAllocation?.target || 5000;

  const formatCurrency = (amount: number, showSign = false) => {
    const sign = amount < 0 ? "-" : (showSign && amount > 0 ? "+" : "");
    return `${sign}$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleLinkBankAccount = () => {
    const balance = parseFloat(mockBankBalance);
    if (isNaN(balance) || balance < 0) {
        toast({
            title: "Invalid Balance",
            description: "Please enter a valid, non-negative bank balance.",
            variant: "destructive",
        });
        return;
    }
    setInitialWalletBalance(balance);
    setIsLinkBankModalOpen(false);
    setMockBankBalance(''); 
    toast({
      title: "Bank Balance Synced (Demo)",
      description: `Your wallet balance has been updated to ${formatCurrency(balance)}.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-brand-dark">Dashboard</h1>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="retro-card flex flex-col">
            <CardHeader className="retro-card-header">
                <CardTitle className="text-sm text-muted-foreground">Current Wallet</CardTitle>
                 <div className="retro-window-controls"><span></span><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content pt-2 flex-1">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(walletBalance)}</p>
            </CardContent>
        </Card>
         <Card className="retro-card flex flex-col">
            <CardHeader className="retro-card-header">
                <CardTitle className="text-sm text-muted-foreground">Funds Locked</CardTitle>
                 <div className="retro-window-controls"><span></span><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content pt-2 flex-1">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalLockedFunds)}</p>
            </CardContent>
        </Card>
        <Card className="retro-card flex flex-col">
            <CardHeader className="retro-card-header">
                <CardTitle className="text-sm text-muted-foreground">Net Worth (Est.)</CardTitle>
                 <div className="retro-window-controls"><span></span><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content pt-2 flex-1">
                <p className="text-2xl font-bold text-foreground">{formatCurrency(netWorth)}</p>
            </CardContent>
        </Card>
         <Card className="retro-card flex flex-col">
            <CardHeader className="retro-card-header">
                <CardTitle className="text-sm text-muted-foreground">Financial Health</CardTitle>
                 <div className="retro-window-controls"><span></span><span></span><span></span></div>
            </CardHeader>
            <CardContent className="retro-card-content pt-2 flex-1">
                <p className="text-2xl font-bold text-green-500">Good</p> 
                 <Progress value={75} className="h-1.5 mt-1 retro-progress" indicatorClassName="!bg-green-500" />
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="retro-card xl:col-span-1 md:col-span-2 flex flex-col">
          <CardHeader className="retro-card-header !bg-dashboard-pink-header !text-dashboard-pink-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <CardTitle>Quick Actions</CardTitle>
              </div>
              <div className="retro-window-controls">
                <span className="!border-dashboard-pink-foreground"></span>
                <span className="!border-dashboard-pink-foreground"></span>
                <span className="!border-dashboard-pink-foreground"></span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="retro-card-content !border-t-0 space-y-3 pt-4 flex-1">
            <Button variant="outline" className="w-full retro-button justify-start" onClick={() => router.push('/expenses')}><Receipt className="mr-2 h-4 w-4" />Log Expense</Button>
            <Button variant="outline" className="w-full retro-button justify-start" onClick={() => router.push('/budget')}><CreditCard className="mr-2 h-4 w-4" />View/Edit Budget</Button>
            <Button variant="outline" className="w-full retro-button justify-start" onClick={() => router.push('/savings-goals')}><TargetIcon className="mr-2 h-4 w-4" />Set New Goal</Button>
            <Button variant="outline" className="w-full retro-button justify-start" onClick={() => router.push('/investments')}><Briefcase className="mr-2 h-4 w-4" />Manage Investments</Button>
            <Button variant="outline" className="w-full retro-button justify-start" onClick={() => setIsLinkBankModalOpen(true)}>
              <Landmark className="mr-2 h-4 w-4" /> Link Bank Account
            </Button>
             <Button variant="primary" className="w-full retro-button justify-start !bg-brand-yellow !text-black hover:!bg-brand-yellow/90">
              <Star className="mr-2 h-4 w-4" /> Upgrade to Premium
            </Button>
          </CardContent>
        </Card>

        <Card className="retro-card flex flex-col">
          <CardHeader className="retro-card-header !bg-dashboard-purple-header !text-dashboard-purple-foreground">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TargetIcon className="h-5 w-5" />
                    <CardTitle>Savings Goals</CardTitle>
                </div>
                <div className="retro-window-controls">
                    <span className="!border-dashboard-purple-foreground"></span>
                    <span className="!border-dashboard-purple-foreground"></span>
                    <span className="!border-dashboard-purple-foreground"></span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="retro-card-content !border-t-0 space-y-3 pt-4 max-h-[250px] overflow-y-auto flex-1">
            {Object.values(allocations).filter(a => a.id !== 'emergencyFund' && a.target && a.target > 0).slice(0,3).map((goal) => (
              <div key={goal.id} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground/90">{goal.name}</span>
                  <span className="text-xs text-muted-foreground">{formatCurrency(goal.amount)} / {formatCurrency(goal.target || 0)}</span>
                </div>
                <Progress value={goal.target ? (goal.amount / goal.target) * 100 : 0} className="h-2.5 retro-progress" indicatorClassName="!bg-purple-500" />
              </div>
            ))}
             {Object.values(allocations).filter(a => a.id !== 'emergencyFund' && a.target && a.target > 0).length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No active savings goals.</p>}
          </CardContent>
          <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
            <Button variant="outline" className="w-full retro-button" onClick={() => router.push('/savings-goals')}>
              <ListChecks className="mr-2 h-4 w-4" /> View All Savings Goals
            </Button>
          </CardFooter>
        </Card>

        <Card className="retro-card flex flex-col">
          <CardHeader className="retro-card-header !bg-dashboard-blue-header !text-dashboard-blue-foreground">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" />
                    <CardTitle>Emergency Fund</CardTitle>
                </div>
                <div className="retro-window-controls">
                    <span className="!border-dashboard-blue-foreground"></span>
                    <span className="!border-dashboard-blue-foreground"></span>
                    <span className="!border-dashboard-blue-foreground"></span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="retro-card-content !border-t-0 text-center pt-4 flex-1">
            <p className="text-3xl font-bold text-foreground">{formatCurrency(emergencyFundCurrent)}</p>
            <p className="text-xs text-muted-foreground mb-2">Target: {formatCurrency(emergencyFundTarget)}</p>
            <Progress value={emergencyFundTarget > 0 ? (emergencyFundCurrent / emergencyFundTarget) * 100 : 0} className="h-3.5 retro-progress" indicatorClassName="!bg-blue-500" />
             {emergencyFundTarget > 0 && emergencyFundCurrent < emergencyFundTarget && (
                <div className="text-xs text-center mt-2 text-destructive flex items-center justify-center gap-1">
                    <AlertTriangle className="h-3 w-3"/>
                    <span>Needs attention!</span>
                </div>
              )}
          </CardContent>
          <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
            <Button variant="outline" className="w-full retro-button" onClick={() => router.push('/emergency-fund')}>
              <DollarSign className="mr-2 h-4 w-4" /> Manage Fund
            </Button>
          </CardFooter>
        </Card>

        <Card className="retro-card md:col-span-2 xl:col-span-1 flex flex-col">
            <CardHeader className="retro-card-header !bg-dashboard-purple-header !text-dashboard-purple-foreground">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        <CardTitle>Budget Snapshot</CardTitle>
                    </div>
                    <div className="retro-window-controls">
                        <span className="!border-dashboard-purple-foreground"></span>
                        <span className="!border-dashboard-purple-foreground"></span>
                        <span className="!border-dashboard-purple-foreground"></span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 space-y-3 pt-4 flex-1">
                {budgetSnapshotData.slice(0, 4).map(item => (
                    <div key={item.category}>
                        <div className="flex justify-between text-xs mb-0.5">
                            <span className="text-foreground/80">{item.category}</span>
                            <span className="text-muted-foreground">{formatCurrency(item.spent)} / {formatCurrency(item.budget)}</span>
                        </div>
                        <div className="h-3 bg-muted rounded-sm overflow-hidden border border-foreground/20">
                            <div
                                className={cn("h-full", item.color)}
                                style={{ width: `${Math.min((item.spent / item.budget) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
                <Button variant="outline" className="w-full retro-button" onClick={() => router.push('/budget')}>
                   <Settings className="mr-2 h-4 w-4" /> Manage Full Budget
                </Button>
            </CardFooter>
        </Card>


        <Card className="retro-card md:col-span-2 flex flex-col">
          <CardHeader className="retro-card-header">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" />
                    <CardTitle className="text-foreground">Recent Transactions</CardTitle>
                </div>
                 <div className="retro-window-controls"><span></span><span></span><span></span></div>
            </div>
          </CardHeader>
          <CardContent className="retro-card-content !border-t-0 p-0 flex-1">
             <div className="space-y-0 max-h-[300px] overflow-y-auto">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                    <div>
                        <p className="font-medium text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.category} &bull; {tx.date}</p>
                    </div>
                    <span className={cn("text-sm font-semibold", tx.amount >= 0 ? 'text-brand-green' : 'text-destructive')}>
                        {formatCurrency(tx.amount, true)}
                    </span>
                  </div>
                ))}
                {recentTransactions.length === 0 && <p className="p-4 text-sm text-muted-foreground text-center">No transactions yet.</p>}
              </div>
          </CardContent>
           <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
                <Button variant="outline" className="w-full retro-button" onClick={() => router.push('/expenses')}>
                    <ArrowRight className="mr-2 h-4 w-4" /> View All Transactions
                </Button>
            </CardFooter>
        </Card>

        <Card className="retro-card flex flex-col">
          <CardHeader className="retro-card-header !bg-dashboard-blue-header !text-dashboard-blue-foreground">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <CardTitle>Investment Portfolio</CardTitle>
                </div>
                <div className="retro-window-controls">
                    <span className="!border-dashboard-blue-foreground"></span>
                    <span className="!border-dashboard-blue-foreground"></span>
                    <span className="!border-dashboard-blue-foreground"></span>
                </div>
            </div>
          </CardHeader>
          <CardContent className="retro-card-content !border-t-0 pt-4 h-[200px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={investmentPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {investmentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
           <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
                <Button variant="outline" className="w-full retro-button" onClick={() => router.push('/investments')}>
                    <TrendingUp className="mr-2 h-4 w-4" /> Manage Investments
                </Button>
            </CardFooter>
        </Card>

        <Card className="retro-card md:col-span-2 xl:col-span-3 flex flex-col">
            <CardHeader className="retro-card-header !bg-dashboard-pink-header !text-dashboard-pink-foreground">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        <CardTitle>AI Savings Helper</CardTitle>
                    </div>
                    <div className="retro-window-controls">
                        <span className="!border-dashboard-pink-foreground"></span>
                        <span className="!border-dashboard-pink-foreground"></span>
                        <span className="!border-dashboard-pink-foreground"></span>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="retro-card-content !border-t-0 pt-4 flex-1">
                <p className="text-sm text-foreground/90">
                    Unlock personalized insights to boost your savings. Our AI analyzes your spending patterns and goals to provide actionable recommendations.
                </p>
            </CardContent>
            <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
                <Button variant="outline" className="w-full retro-button" onClick={() => router.push('/ai-assistant')}>
                    <Lightbulb className="mr-2 h-4 w-4" /> Get AI Recommendations
                </Button>
            </CardFooter>
        </Card>


      </div>

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
          <div className="p-4 retro-window-content !border-t-0 space-y-3">
              <p className="text-muted-foreground text-sm">
              Securely connect your bank to automatically import transactions and balances.
              FinTrack Pro uses industry-standard encryption and partners with trusted aggregators.
            </p>
            <div className="space-y-2">
                <Label htmlFor="mock-balance" className="text-sm">Enter Mock Bank Balance ($)</Label>
                <Input 
                    id="mock-balance" 
                    type="number" 
                    placeholder="e.g., 50000" 
                    className="retro-input"
                    value={mockBankBalance}
                    onChange={(e) => setMockBankBalance(e.target.value)}
                />
            </div>
            <p className="text-xs text-muted-foreground/80">
              (This is a demo. No real bank connection will be made.)
            </p>
          </div>
          <DialogFooter className="retro-window-content !border-t-2 !pt-3 !pb-3 flex-col sm:flex-row sm:justify-between gap-2">
            <Button className="w-full sm:w-auto retro-button" variant="primary" onClick={handleLinkBankAccount}>
              <PlusCircle className="mr-2 h-4 w-4" /> Connect & Sync (Demo)
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

