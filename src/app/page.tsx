'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { HandCoins, PiggyBank, Target, Lightbulb } from "lucide-react";
import Link from "next/link"; // Use Next.js Link

const savingsGoals = [
  { name: "Vacation Fund", current: 750, target: 2000, icon: <PiggyBank className="h-5 w-5 text-primary" /> },
  { name: "Emergency Fund", current: 3000, target: 5000, icon: <HandCoins className="h-5 w-5 text-destructive" /> },
  { name: "New Gadget", current: 200, target: 800, icon: <Target className="h-5 w-5 text-secondary" /> },
];

const budgetData = [
  { category: "Food", spent: 450, budget: 600 },
  { category: "Transport", spent: 150, budget: 200 },
  { category: "Entertain", spent: 250, budget: 300 }, // Shortened label
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
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg"> {/* Adjusted size */}
             <PiggyBank className="h-5 w-5" /> {/* Icon color from header text */}
             Goals Overview
          </CardTitle>
          <CardDescription>Your savings progress.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {savingsGoals.map((goal) => (
            <div key={goal.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm"> {/* Base text size */}
                 <div className="flex items-center gap-2">
                    {goal.icon}
                    <span className="font-medium">{goal.name}</span>
                 </div>
                 <span className="text-muted-foreground">
                   ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                 </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-3 [&>div]:bg-primary" />
            </div>
          ))}
           <Link href="/savings-goals" passHref legacyBehavior>
              <Button asChild variant="outline" className="w-full mt-4 border-accent text-accent hover:bg-accent/10">
                 <a>View All Goals</a>
              </Button>
           </Link>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <Card className="col-span-1">
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-lg">
             <HandCoins className="h-5 w-5" />
             Budget Summary
           </CardTitle>
           <CardDescription>Monthly spending.</CardDescription>
         </CardHeader>
        <CardContent>
           {/* Use fixed height for chart consistency */}
          <div className="h-[210px] w-full">
             <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={budgetData} layout="vertical" margin={{ right: 5, left: -10, top: 5, bottom: 5 }}> {/* Adjusted margins */}
                   <CartesianGrid horizontal={false} strokeDasharray="2 2" stroke="hsl(var(--border))"/>
                   <XAxis type="number" hide />
                   <YAxis
                     dataKey="category"
                     type="category"
                     tickLine={false}
                     axisLine={false}
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }} // Increased font size
                     width={70} // Adjusted width
                    />
                    <ChartTooltip cursor={{ fill: 'hsl(var(--card))' }} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="budget" stackId="a" fill="hsl(var(--muted))" radius={0} barSize={12}/> {/* No radius, adjusted size */}
                   <Bar dataKey="spent" stackId="a" fill="hsl(var(--secondary))" radius={0} barSize={12}/> {/* No radius, adjusted size */}
                 </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
           </div>
            <Link href="/budget" passHref legacyBehavior>
               <Button asChild variant="outline" className="w-full mt-4 border-secondary text-secondary hover:bg-secondary/10">
                  <a>Manage Budget</a>
               </Button>
            </Link>
        </CardContent>
      </Card>

       {/* AI Assistant Quick Access */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1">
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-lg">
             <Lightbulb className="h-5 w-5" />
             AI Assistant
           </CardTitle>
           <CardDescription>Get saving tips.</CardDescription>
         </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-3">
          <p className="text-center text-sm text-card-foreground px-2">
             Analyze spending & get tailored advice.
          </p>
          <Link href="/ai-assistant" passHref legacyBehavior>
            <Button asChild variant="solidAccent" className="w-full">
             <a>Get AI Tips</a>
           </Button>
          </Link>
           <Link href="/tax-planner" passHref legacyBehavior>
             <Button asChild variant="link" className="text-accent !border-transparent !shadow-none">
               <a>Tax Planner</a>
            </Button>
           </Link>
        </CardContent>
      </Card>
    </div>
  );
}
