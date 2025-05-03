'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { HandCoins, PiggyBank, Target, Lightbulb, ListChecks, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const savingsGoals = [
  { name: "Dream Vacation", current: 750, target: 2000, icon: <PiggyBank className="h-5 w-5 text-primary" /> },
  { name: "Safety Net Fund", current: 3000, target: 5000, icon: <HandCoins className="h-5 w-5 text-destructive" /> },
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

const chartConfig: ChartConfig = {
  spent: { label: "Spent", color: "hsl(var(--chart-1))" },
  budget: { label: "Budget", color: "hsl(var(--muted))" },
};


export default function Home() {
  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Adjusted grid columns */}

      {/* Savings Goals Overview */}
       <Card className="retro-card col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
        <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground">
          <CardTitle className="flex items-center gap-2 text-xl">
             <PiggyBank className="h-6 w-6" />
             Savings Goals
          </CardTitle>
          <CardDescription className="!text-secondary-foreground/80">Track your progress towards financial targets.</CardDescription>
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

      {/* Budget Summary */}
       <Card className="retro-card col-span-1 lg:col-span-1 xl:col-span-1">
         <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
           <CardTitle className="flex items-center gap-2 text-xl">
             <HandCoins className="h-6 w-6" />
             Budget Snapshot
           </CardTitle>
           <CardDescription className="!text-primary-foreground/80">This month's spending breakdown.</CardDescription>
            <div className="retro-window-controls">
                <span className="!bg-primary !border-primary-foreground"></span>
                <span className="!bg-primary !border-primary-foreground"></span>
                <span className="!bg-primary !border-primary-foreground"></span>
           </div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0">
          <div className="h-[250px] w-full"> {/* Adjusted height slightly */}
             <ChartContainer config={chartConfig}>
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
                     width={85} // Adjusted width slightly
                    />
                    <ChartTooltip
                       cursor={{ fill: 'hsl(var(--accent)/0.15)' }}
                       contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--border))', fontFamily: 'var(--font-sans)', fontSize: '12px', boxShadow: 'none' }}
                       itemStyle={{ color: 'hsl(var(--foreground))' }}
                       content={<ChartTooltipContent indicator="dot" hideLabel />}
                     />
                    <Bar dataKey="budget" stackId="a" fill="hsl(var(--muted))" radius={0} barSize={16}/> {/* Slightly thicker bars */}
                   <Bar dataKey="spent" stackId="a" fill="hsl(var(--primary))" radius={0} barSize={16}/>
                 </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
           </div>
            <Link href="/budget" passHref>
               <Button variant="primary" className="w-full mt-4 retro-button">
                  Manage Full Budget
               </Button>
            </Link>
        </CardContent>
      </Card>

       {/* Recent Transactions */}
       <Card className="retro-card col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1">
         <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
           <CardTitle className="flex items-center gap-2 text-xl">
             <ListChecks className="h-6 w-6" />
             Recent Transactions
           </CardTitle>
           <CardDescription className="!text-accent-foreground/80">Your latest spending activity.</CardDescription>
            <div className="retro-window-controls">
               <span className="!bg-accent !border-accent-foreground"></span>
               <span className="!bg-accent !border-accent-foreground"></span>
               <span className="!bg-accent !border-accent-foreground"></span>
           </div>
         </CardHeader>
         <CardContent className="retro-card-content !border-t-0 p-0">
           <div className="space-y-0 max-h-[250px] overflow-y-auto"> {/* Scrollable content */}
             {recentTransactions.map((tx) => (
               <div key={tx.id} className="flex items-center justify-between p-3 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
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
                 <Button variant="accent" className="w-full retro-button">
                   View All Expenses
                 </Button>
              </Link>
           </CardFooter>
       </Card>


       {/* AI Assistant Quick Access - Moved to last position for potentially better flow */}
       <Card className="retro-card col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 flex flex-col"> {/* Span across remaining columns */}
         <CardHeader className="retro-card-header !bg-muted"> {/* Default header */}
           <CardTitle className="flex items-center gap-2 text-xl">
             <Lightbulb className="h-6 w-6 text-primary" /> {/* Use primary color */}
             AI Savings Helper
           </CardTitle>
           <CardDescription>Unlock personalized saving insights.</CardDescription>
            <div className="retro-window-controls">
                <span></span><span></span><span></span>
           </div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 flex flex-col flex-1 items-center justify-center text-center space-y-4">
          <p className="text-base px-2">
             Let AI analyze your spending patterns and suggest smart ways to save more effectively.
          </p>
          <Link href="/ai-assistant" passHref>
            <Button variant="outline" className="w-full retro-button border-primary text-primary hover:text-primary hover:bg-primary/10">
             Get AI Recommendations
           </Button>
          </Link>
        </CardContent>
         <CardFooter className="retro-card-footer !border-t-0 !pt-0">
           <Link href="/tax-planner" passHref>
             <Button variant="link" className="text-muted-foreground w-full text-xs hover:text-primary">
               Estimate Your Taxes
            </Button>
           </Link>
         </CardFooter>
      </Card>
    </div>
  );
}
