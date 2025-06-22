'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import {
    DollarSign,
    CreditCard,
    Landmark,
    ShieldAlert,
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

const recentTransactions = [
    { id: "t1", date: "2024-07-28", description: "Grocery Shopping", amount: -75.50, category: "Food", icon: CreditCard },
    { id: "t2", date: "2024-07-27", description: "Salary Deposit", amount: 2500.00, category: "Income", icon: DollarSign },
    { id: "t3", date: "2024-07-26", description: "Restaurant - Dinner Out", amount: -42.10, category: "Food", icon: CreditCard },
    { id: "t4", date: "2024-07-25", description: "Online Course Subscription", amount: -29.99, category: "Education", icon: Briefcase },
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

  const SummaryCard = ({ title, value, icon: Icon, trend, footerText }: { title: string, value: string, icon: React.ElementType, trend?: string, footerText?: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
      </CardContent>
      {footerText && (
        <CardFooter className="text-xs text-muted-foreground pt-4 pb-4">
            {footerText}
        </CardFooter>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back!</h1>
          <p className="text-sm text-muted-foreground">Here’s your financial overview for today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/expenses')}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Button>
          <Button variant="primary" onClick={() => router.push('/savings-goals')}>
            Create Goal
          </Button>
        </div>
      </div>

      {/* Top summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Net Worth (Est.)" value={formatCurrency(netWorth)} icon={TrendingUp} trend="+2.1% from last month" />
        <SummaryCard title="Wallet Balance" value={formatCurrency(walletBalance)} icon={Wallet} footerText="Available to spend" />
        <SummaryCard title="Funds Locked" value={formatCurrency(totalLockedFunds)} icon={Lock} footerText="In goals & emergency fund" />
        <SummaryCard title="Financial Health" value="Good" icon={ShieldCheck} footerText="Based on your activity" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest income and expenses.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((tx) => {
                  const Icon = tx.icon;
                  return (
                    <div key={tx.id} className="flex items-center">
                      <div className="p-2 bg-muted rounded-full">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium leading-none">{tx.description}</p>
                        <p className="text-sm text-muted-foreground">{tx.category}</p>
                      </div>
                      <div className={cn("ml-auto font-medium", tx.amount > 0 ? 'text-green-500' : 'text-foreground')}>
                        {formatCurrency(tx.amount, true)}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push('/expenses')}>
                <ArrowRight className="mr-2 h-4 w-4" /> View All Transactions
              </Button>
            </CardFooter>
          </Card>

           {/* Investment Portfolio */}
          <Card>
              <CardHeader>
                <CardTitle>Investment Portfolio</CardTitle>
                <CardDescription>Your asset allocation at a glance.</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie dataKey="value" nameKey="name" data={investmentPieData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={2}>
                      {investmentPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill}/>
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} 
                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}
                        itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '15px', fontFamily: 'var(--font-sans)' }}/>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => router.push('/investments')}>
                  <Briefcase className="mr-2 h-4 w-4" /> Manage Investments
                </Button>
              </CardFooter>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2 text-sm">
                <Button variant="ghost" className="justify-start" onClick={() => router.push('/budget')}><CreditCard className="mr-2 h-4 w-4" />Budget</Button>
                <Button variant="ghost" className="justify-start" onClick={() => router.push('/savings-goals')}><TargetIcon className="mr-2 h-4 w-4" />Goals</Button>
                <Button variant="ghost" className="justify-start" onClick={() => setIsLinkBankModalOpen(true)}><Landmark className="mr-2 h-4 w-4" />Link Bank</Button>
                <Button variant="ghost" className="justify-start" onClick={() => router.push('/ai-assistant')}><Lightbulb className="mr-2 h-4 w-4" />AI Helper</Button>
            </CardContent>
          </Card>
          
          {/* Savings Goals */}
          <Card>
            <CardHeader>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Your progress towards your goals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.values(allocations).filter(a => a.id !== 'emergencyFund' && a.target && a.target > 0).slice(0, 3).map((goal) => (
                <div key={goal.id} className="space-y-1">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="font-medium text-foreground/90">{goal.name}</span>
                    <span className="text-xs text-muted-foreground">{formatCurrency(goal.amount)} / {formatCurrency(goal.target || 0)}</span>
                  </div>
                  <Progress value={goal.target ? (goal.amount / goal.target) * 100 : 0} className="h-2" />
                </div>
              ))}
              {Object.values(allocations).filter(a => a.id !== 'emergencyFund' && a.target && a.target > 0).length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No active savings goals.</p>}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push('/savings-goals')}>
                <ListChecks className="mr-2 h-4 w-4" /> View All Goals
              </Button>
            </CardFooter>
          </Card>
          
          {/* Emergency Fund */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldAlert className="h-5 w-5 text-blue-500" />Emergency Fund</CardTitle>
              <CardDescription>Your financial safety net.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center space-y-1">
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(emergencyFundCurrent)}</p>
                  <p className="text-xs text-muted-foreground mb-2">Target: {formatCurrency(emergencyFundTarget)}</p>
                </div>
                <Progress value={emergencyFundTarget > 0 ? (emergencyFundCurrent / emergencyFundTarget) * 100 : 0} className="h-2 mt-2" indicatorClassName="!bg-blue-500" />
                {emergencyFundTarget > 0 && emergencyFundCurrent < emergencyFundTarget && (
                  <div className="text-xs text-center mt-2 text-destructive flex items-center justify-center gap-1">
                      <AlertTriangle className="h-3 w-3"/>
                      <span>Needs attention!</span>
                  </div>
                )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => router.push('/emergency-fund')}>
                Manage Fund
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

       {/* Link Bank Modal */}
      <Dialog open={isLinkBankModalOpen} onOpenChange={setIsLinkBankModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />Link Bank Account</DialogTitle>
             <DialogDescription>
              This is a demo. No real bank connection will be made. Enter a mock balance to update your wallet.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-2">
                <Label htmlFor="mock-balance">Mock Bank Balance ($)</Label>
                <Input
                    id="mock-balance"
                    type="number"
                    placeholder="e.g., 50000"
                    value={mockBankBalance}
                    onChange={(e) => setMockBankBalance(e.target.value)}
                />
            </div>
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
             <DialogClose asChild>
              <Button variant="secondary" className="w-full sm:w-auto">Cancel</Button>
             </DialogClose>
            <Button className="w-full sm:w-auto" variant="primary" onClick={handleLinkBankAccount}>
              <PlusCircle className="mr-2 h-4 w-4" /> Connect & Sync (Demo)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
