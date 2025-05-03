'use client';

import React, { useState } from 'react'; // Import useState
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from "recharts";
import { HandCoins, PiggyBank, Target, Lightbulb, ListChecks, TrendingDown, Landmark, ShieldAlert, Activity, PlusCircle, TrendingUp, Banknote, X } from "lucide-react"; // Added Banknote, X
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"; // Import Dialog components


const savingsGoals = [
  { name: "Dream Vacation", current: 750, target: 2000, icon: <PiggyBank className="h-5 w-5 text-primary" /> },
  { name: "Next Gen Console", current: 200, target: 800, icon: <Target className="h-5 w-5 text-secondary" /> },
];

const budgetData = [
  { category: "Food", spent: 450, budget: 600 },
  { category: "Transport", spent: 150, budget: 200 },
  { category: "Fun Money", spent: 250, budget: 300 },
  { category: "Utilities", spent: 180, budget: 200 },
  { category: "Shopping", spent: 300, budget: 400 },
];

const recentTransactions = [
    { id: "t1", date: "2024-05-02", description: "Grocery Store", category: "Food", amount: -75.50 },
    { id: "t2", date: "2024-05-01", description: "Coffee Shop", category: "Food", amount: -5.25 },
    { id: "t3", date: "2024-04-30", description: "Gas Station", category: "Transport", amount: -42.10 },
    { id: "t4", date: "2024-04-29", description: "Movie Tickets", category: "Fun Money", amount: -30.00 },
    { id: "t5", date: "2024-04-28", description: "Online Retailer", category: "Shopping", amount: -120.99 },
];

const budgetChartConfig: ChartConfig = {
  spent: { label: "Spent", color: "hsl(var(--primary))" },
  budget: { label: "Budget", color: "hsl(var(--muted))" },
};

const investmentData = [
    { name: 'Stocks', value: 12500, fill: 'hsl(var(--chart-1))' },
    { name: 'Bonds', value: 5000, fill: 'hsl(var(--chart-2))' },
    { name: 'Crypto', value: 2500, fill: 'hsl(var(--chart-4))' },
    { name: 'Other', value: 1000, fill: 'hsl(var(--chart-5))' },
];
const totalPortfolioValue = investmentData.reduce((sum, item) => sum + item.value, 0);
const emergencyFund = { current: 4500, target: 15000 }; // Mock emergency fund data


export default function DashboardPage() {
  const [bankLinkModalOpen, setBankLinkModalOpen] = useState(false); // State for bank linking modal

  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
     <> {/* Wrap with fragment to allow modal */}
     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Adjusted grid columns */}

        {/* Quick Actions */}
        <Card className="retro-card col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1">
            <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
             <CardTitle className="flex items-center gap-2 text-xl">
                <Activity className="h-6 w-6" />
                Quick Actions
             </CardTitle>
                <div className="retro-window-controls">
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                </div>
           </CardHeader>
           <CardContent className="retro-card-content !border-t-0 space-y-3 pt-4">
                <Link href="/expenses" passHref>
                   <Button variant="accent" className="w-full retro-button">
                       <PlusCircle className="mr-2 h-4 w-4"/> Log Expense
                    </Button>
                </Link>
                 <Link href="/budget" passHref>
                   <Button variant="accent" className="w-full retro-button">
                       <HandCoins className="mr-2 h-4 w-4"/> Adjust Budget
                    </Button>
                </Link>
                 <Link href="/savings-goals" passHref>
                   <Button variant="accent" className="w-full retro-button">
                      <PiggyBank className="mr-2 h-4 w-4"/> Add Savings Goal
                   </Button>
                </Link>
                 <Link href="/investments" passHref>
                   <Button variant="accent" className="w-full retro-button">
                       <TrendingUp className="mr-2 h-4 w-4"/> Log Investment
                    </Button>
                </Link>
                 {/* Add Bank Link Button */}
                 <Button variant="accent" className="w-full retro-button" onClick={() => setBankLinkModalOpen(true)}>
                     <Banknote className="mr-2 h-4 w-4"/> Link Bank Account
                 </Button>
           </CardContent>
        </Card>


      {/* Savings Goals Overview */}
       <Card className="retro-card col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
        <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground">
          <CardTitle className="flex items-center gap-2 text-xl">
             <PiggyBank className="h-6 w-6" />
             Savings Goals
          </CardTitle>
          <CardDescription className="!text-secondary-foreground/80">Track your progress.</CardDescription>
           <div className="retro-window-controls">
                <span className="!bg-secondary !border-secondary-foreground"></span>
                <span className="!bg-secondary !border-secondary-foreground"></span>
                <span className="!bg-secondary !border-secondary-foreground"></span>
           </div>
        </CardHeader>
        <CardContent className="retro-card-content space-y-4 !border-t-0">
          {savingsGoals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between text-base">
                 <div className="flex items-center gap-2">
                    {goal.icon}
                    <span className="font-medium">{goal.name}</span>
                 </div>
                 <span className="text-muted-foreground">
                   ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                 </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="retro-progress h-3" indicatorClassName="retro-progress-indicator !bg-secondary" />
            </div>
          ))}
           <Link href="/savings-goals" passHref>
              <Button variant="secondary" className="w-full mt-4 retro-button">
                 View All Savings Goals
              </Button>
           </Link>
        </CardContent>
      </Card>

        {/* Emergency Fund Status */}
        <Card className="retro-card col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
          <CardHeader className="retro-card-header !bg-primary !text-primary-foreground"> {/* Changed color to primary */}
            <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldAlert className="h-6 w-6" />
                Emergency Fund
            </CardTitle>
            <CardDescription className="!text-primary-foreground/80">Your safety net status.</CardDescription> {/* Adjusted text */}
             <div className="retro-window-controls">
                  <span className="!bg-primary !border-primary-foreground"></span>
                  <span className="!bg-primary !border-primary-foreground"></span>
                  <span className="!bg-primary !border-primary-foreground"></span>
             </div>
          </CardHeader>
          <CardContent className="retro-card-content space-y-3 !border-t-0">
             <div className="text-center pt-2">
                <p className="text-3xl font-bold">${emergencyFund.current.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">of ${emergencyFund.target.toLocaleString()} target</p>
             </div>
             <Progress value={(emergencyFund.current / emergencyFund.target) * 100} className="retro-progress h-3.5" indicatorClassName="retro-progress-indicator !bg-primary" /> {/* Adjusted color */}
             <Link href="/emergency-fund" passHref>
                 <Button variant="primary" className="w-full mt-3 retro-button"> {/* Adjusted color */}
                   Manage Fund
                 </Button>
             </Link>
          </CardContent>
        </Card>


      {/* Budget Summary */}
       <Card className="retro-card col-span-1 lg:col-span-1 xl:col-span-1">
         <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground"> {/* Changed color to secondary */}
           <CardTitle className="flex items-center gap-2 text-xl">
             <HandCoins className="h-6 w-6" />
             Budget Snapshot
           </CardTitle>
           <CardDescription className="!text-secondary-foreground/80">Monthly spending.</CardDescription> {/* Adjusted text */}
            <div className="retro-window-controls">
                <span className="!bg-secondary !border-secondary-foreground"></span>
                <span className="!bg-secondary !border-secondary-foreground"></span>
                <span className="!bg-secondary !border-secondary-foreground"></span>
           </div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0">
          <div className="h-[250px] w-full">
             <ChartContainer config={budgetChartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={budgetData} layout="vertical" margin={{ right: 5, left: 0, top: 5, bottom: 5 }} style={{ fontFamily: 'var(--font-sans)' }}>
                   <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.6)"/>
                   <XAxis type="number" hide />
                   <YAxis
                     dataKey="category"
                     type="category"
                     tickLine={false}
                     axisLine={false}
                     tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                     width={85}
                    />
                    <ChartTooltip
                       cursor={{ fill: 'hsl(var(--accent)/0.15)' }}
                       contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--border))', fontFamily: 'var(--font-sans)', fontSize: '12px', boxShadow: 'none' }}
                       itemStyle={{ color: 'hsl(var(--foreground))' }}
                       content={<ChartTooltipContent indicator="dot" hideLabel />}
                     />
                    <Bar dataKey="budget" stackId="a" fill="hsl(var(--muted))" radius={0} barSize={16}/>
                   <Bar dataKey="spent" stackId="a" fill="hsl(var(--secondary))" radius={0} barSize={16}/> {/* Adjusted color */}
                 </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
           </div>
            <Link href="/budget" passHref>
               <Button variant="secondary" className="w-full mt-4 retro-button"> {/* Adjusted color */}
                  Manage Full Budget
               </Button>
            </Link>
        </CardContent>
      </Card>

       {/* Recent Transactions */}
       <Card className="retro-card col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
         <CardHeader className="retro-card-header"> {/* Use default header */}
           <CardTitle className="flex items-center gap-2 text-xl">
             <ListChecks className="h-6 w-6 text-primary" /> {/* Use primary color */}
             Recent Transactions
           </CardTitle>
           <CardDescription>Latest spending activity.</CardDescription>
            <div className="retro-window-controls">
                <span></span><span></span><span></span>
           </div>
         </CardHeader>
         <CardContent className="retro-card-content !border-t-0 p-0">
           <div className="space-y-0 max-h-[250px] overflow-y-auto">
             {recentTransactions.map((tx) => (
               <div key={tx.id} className="flex items-center justify-between p-3 border-b border-border last:border-b-0 hover:bg-foreground/5 transition-colors">
                 <div className="flex items-center gap-3">
                    <TrendingDown className="h-5 w-5 text-destructive flex-shrink-0" />
                    <div>
                       <p className="font-medium text-sm">{tx.description}</p>
                       <p className="text-xs text-muted-foreground">{tx.category} &bull; {tx.date}</p>
                    </div>
                 </div>
                 <span className="text-sm font-medium text-destructive">{formatCurrency(tx.amount)}</span>
               </div>
             ))}
           </div>
         </CardContent>
          <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
              <Link href="/expenses" passHref>
                 <Button variant="default" className="w-full retro-button">
                   View All Expenses
                 </Button>
              </Link>
           </CardFooter>
       </Card>

        {/* Investment Overview */}
        <Card className="retro-card col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
            <CardHeader className="retro-card-header !bg-primary !text-primary-foreground"> {/* Changed color */}
             <CardTitle className="flex items-center gap-2 text-xl">
                <Landmark className="h-6 w-6" />
                Investment Portfolio
             </CardTitle>
             <CardDescription className="!text-primary-foreground/80">Asset allocation.</CardDescription>
                <div className="retro-window-controls">
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                </div>
           </CardHeader>
           <CardContent className="retro-card-content !border-t-0">
              <div className="h-[200px] w-full mb-3">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                           data={investmentData}
                           cx="50%"
                           cy="50%"
                           labelLine={false}
                           outerRadius={70}
                           innerRadius={35}
                           fill="#8884d8"
                           dataKey="value"
                           nameKey="name"
                        >
                           {investmentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} stroke={"hsl(var(--background))"} strokeWidth={1} />
                           ))}
                        </Pie>
                        <RechartsTooltip
                           contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--foreground))', fontFamily: 'var(--font-sans)', fontSize: '12px', boxShadow: 'none' }}
                           itemStyle={{ color: 'hsl(var(--foreground))' }}
                           formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                         />
                    </PieChart>
                 </ResponsiveContainer>
              </div>
               <div className="text-center text-sm mb-3">
                 Total Value: <span className="font-semibold">${totalPortfolioValue.toLocaleString()}</span>
               </div>
               <Link href="/investments" passHref>
                   <Button variant="primary" className="w-full retro-button"> {/* Changed color */}
                       View Portfolio Details
                   </Button>
               </Link>
           </CardContent>
        </Card>

       {/* AI Assistant Quick Access */}
       <Card className="retro-card col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 flex flex-col">
         <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
           <CardTitle className="flex items-center gap-2 text-xl">
             <Lightbulb className="h-6 w-6" />
             AI Savings Helper
           </CardTitle>
           <CardDescription className="!text-accent-foreground/80">Unlock personalized insights.</CardDescription>
            <div className="retro-window-controls">
               <span className="!bg-accent !border-accent-foreground"></span>
               <span className="!bg-accent !border-accent-foreground"></span>
               <span className="!bg-accent !border-accent-foreground"></span>
           </div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 flex flex-col flex-1 items-center justify-center text-center space-y-3">
          <p className="text-base px-2">
             Let AI analyze your finances and suggest smart ways to save more effectively.
          </p>
          <Link href="/ai-assistant" passHref>
            <Button variant="accent" className="w-full retro-button">
             Get AI Recommendations
           </Button>
          </Link>
        </CardContent>
         <CardFooter className="retro-card-footer !border-t-2 !pt-2 !pb-2">
           <Link href="/tax-planner" passHref>
             <Button variant="link" className="text-muted-foreground w-full text-xs hover:text-primary p-0 h-auto">
               Need Tax Help? Estimate Here
            </Button>
           </Link>
         </CardFooter>
      </Card>
    </div>

     {/* Placeholder Bank Linking Modal */}
      <Dialog open={bankLinkModalOpen} onOpenChange={setBankLinkModalOpen}>
         <DialogContent className="retro-window sm:max-w-md">
             <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
              <DialogTitle className="flex items-center gap-2"> <Banknote className="h-5 w-5"/> Link Your Bank Account</DialogTitle>
               <div className="retro-window-controls">
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <DialogClose asChild>
                       <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                           <X className="h-3 w-3"/>
                           <span className="sr-only">Close</span>
                       </Button>
                    </DialogClose>
               </div>
            </DialogHeader>
            <DialogContent className="retro-window-content !border-t-0 pt-6 pb-4 space-y-4">
              <DialogDescription className="text-muted-foreground text-sm">
                FinTrack Pro uses Plaid to securely connect to your bank accounts. This allows for automatic importing of transactions.
              </DialogDescription>
              <p className="text-xs text-muted-foreground/80">
                (This is a placeholder. In a real application, the Plaid Link flow would be initiated here.)
              </p>
              <Button
                  className="w-full retro-button"
                  variant="primary"
                  onClick={() => alert('Initiate Plaid Link flow... (placeholder)')}
              >
                <PlusCircle className="mr-2 h-4 w-4"/> Connect with Plaid
              </Button>
            </DialogContent>
             <DialogFooter className="retro-window-content !border-t-2 !pt-3 !pb-3 !flex !justify-end">
                 <DialogClose asChild>
                    <Button variant="secondary" className="retro-button">
                       Close
                    </Button>
                  </DialogClose>
             </DialogFooter>
          </DialogContent>
       </Dialog>
    </>
  );
}
