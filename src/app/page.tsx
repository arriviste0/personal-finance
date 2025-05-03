'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { HandCoins, PiggyBank, Target, Lightbulb } from "lucide-react";
import Link from "next/link";

const savingsGoals = [
  { name: "Vacation Fund", current: 750, target: 2000, icon: <PiggyBank className="h-5 w-5 text-secondary" /> },
  { name: "Emergency Fund", current: 3000, target: 5000, icon: <HandCoins className="h-5 w-5 text-destructive" /> },
  { name: "New Gadget", current: 200, target: 800, icon: <Target className="h-5 w-5 text-primary" /> },
];

const budgetData = [
  { category: "Food", spent: 450, budget: 600 },
  { category: "Transport", spent: 150, budget: 200 },
  { category: "Entertainment", spent: 250, budget: 300 },
  { category: "Utilities", spent: 180, budget: 200 },
  { category: "Other", spent: 300, budget: 400 },
];

const chartConfig: ChartConfig = {
  spent: { label: "Spent", color: "hsl(var(--secondary))" },
  budget: { label: "Budget", color: "hsl(var(--muted))" },
};


export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Savings Goals Overview */}
      <Card className="col-span-1 lg:col-span-2 glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
             <PiggyBank className="h-6 w-6 text-primary" />
             Savings Goals Overview
          </CardTitle>
          <CardDescription>Track your progress towards your savings goals.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {savingsGoals.map((goal) => (
            <div key={goal.name} className="space-y-1">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    {goal.icon}
                    <span className="font-medium">{goal.name}</span>
                 </div>
                 <span className="text-sm text-muted-foreground">
                   ${goal.current} / ${goal.target}
                 </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-2" />
            </div>
          ))}
           <Button asChild variant="outline" className="w-full mt-4 border-accent text-accent hover:bg-accent/10 hover:text-accent">
              <Link href="/savings-goals">View All Goals</Link>
           </Button>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <Card className="col-span-1 glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
             <HandCoins className="h-6 w-6 text-secondary" />
             Budget Summary
          </CardTitle>
          <CardDescription>Monthly spending vs budget.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} layout="vertical" margin={{ right: 20 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="category"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  width={80}
                 />
                 <ChartTooltip cursor={{ fill: 'hsl(var(--background))' }} content={<ChartTooltipContent hideLabel />} />
                 <Bar dataKey="budget" stackId="a" fill="hsl(var(--muted))" radius={[0, 4, 4, 0]} barSize={15}/>
                <Bar dataKey="spent" stackId="a" fill="hsl(var(--secondary))" radius={[4, 0, 0, 4]} barSize={15}/>
              </BarChart>
             </ResponsiveContainer>
          </ChartContainer>
          <Button asChild variant="outline" className="w-full mt-4 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
              <Link href="/budget">Manage Budget</Link>
           </Button>
        </CardContent>
      </Card>

       {/* AI Assistant Quick Access */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1 glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-accent" />
             AI Savings Assistant
          </CardTitle>
          <CardDescription>Get personalized insights and tips.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Analyze your spending patterns and get tailored advice to reach your goals faster.
          </p>
           <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 w-full">
            <Link href="/ai-assistant">Get AI Tips</Link>
          </Button>
           <Button asChild variant="link" className="text-accent">
            <Link href="/tax-planner">Optimize Tax</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
