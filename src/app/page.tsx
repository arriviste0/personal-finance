'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"; // Added CardFooter
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { HandCoins, PiggyBank, Target, Lightbulb } from "lucide-react";
import Link from "next/link";

const savingsGoals = [
  { name: "Dream Vacation", current: 750, target: 2000, icon: <PiggyBank className="h-6 w-6 text-primary" /> },
  { name: "Safety Net Fund", current: 3000, target: 5000, icon: <HandCoins className="h-6 w-6 text-destructive" /> },
  { name: "Next Gen Console", current: 200, target: 800, icon: <Target className="h-6 w-6 text-secondary" /> },
];

const budgetData = [
  { category: "Food", spent: 450, budget: 600 },
  { category: "Transport", spent: 150, budget: 200 },
  { category: "Fun Money", spent: 250, budget: 300 }, // Renamed label
  { category: "Utilities", spent: 180, budget: 200 },
  { category: "Shopping", spent: 300, budget: 400 }, // Added shopping
];

const chartConfig: ChartConfig = {
  spent: { label: "Spent", color: "hsl(var(--primary))" }, // Use primary color
  budget: { label: "Budget", color: "hsl(var(--muted))" },
};


export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Savings Goals Overview */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl"> {/* Larger Title */}
             <PiggyBank className="h-6 w-6" /> {/* Adjusted Icon Size */}
             Savings Goals
          </CardTitle>
          <CardDescription>Track your progress towards financial targets.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5"> {/* Increased spacing */}
          {savingsGoals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between text-base"> {/* Larger text */}
                 <div className="flex items-center gap-3"> {/* Increased gap */}
                    {goal.icon}
                    <span className="font-semibold">{goal.name}</span> {/* Bold name */}
                 </div>
                 <span className="text-muted-foreground text-sm">
                   ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                 </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="h-3" /> {/* Kept height */}
            </div>
          ))}
           <Link href="/savings-goals" passHref legacyBehavior>
              <Button variant="outline" className="w-full mt-6 text-primary border-primary hover:bg-primary/10"> {/* Outline primary */}
                 <a>View All Savings Goals</a>
              </Button>
           </Link>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <Card className="col-span-1">
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-xl">
             <HandCoins className="h-6 w-6" />
             Budget Snapshot
           </CardTitle>
           <CardDescription>This month's spending breakdown.</CardDescription>
         </CardHeader>
        <CardContent>
           {/* Use fixed height for chart consistency */}
          <div className="h-[250px] w-full"> {/* Increased height */}
             <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={budgetData} layout="vertical" margin={{ right: 10, left: 0, top: 5, bottom: 5 }}> {/* Adjusted margins */}
                   <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                   <XAxis type="number" hide />
                   <YAxis
                     dataKey="category"
                     type="category"
                     tickLine={false}
                     axisLine={false}
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }} // Adjusted font size
                     width={80} // Adjusted width
                    />
                    <ChartTooltip
                       cursor={{ fill: 'hsl(var(--accent)/0.1)' }} // Accent hover
                       content={<ChartTooltipContent indicator="dot" hideLabel />} // Dot indicator
                     />
                    <Bar dataKey="budget" stackId="a" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} barSize={14}/> {/* Rounded top corners */}
                   <Bar dataKey="spent" stackId="a" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={14}/> {/* Use primary color */}
                 </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
           </div>
            <Link href="/budget" passHref legacyBehavior>
               <Button variant="outline" className="w-full mt-6 text-secondary border-secondary hover:bg-secondary/10"> {/* Outline secondary */}
                  <a>Manage Full Budget</a>
               </Button>
            </Link>
        </CardContent>
      </Card>

       {/* AI Assistant Quick Access */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col"> {/* Flex col */}
         <CardHeader>
           <CardTitle className="flex items-center gap-2 text-xl">
             <Lightbulb className="h-6 w-6 text-accent" /> {/* Accent color */}
             AI Savings Helper
           </CardTitle>
           <CardDescription>Unlock personalized saving insights.</CardDescription>
         </CardHeader>
        <CardContent className="flex flex-col flex-1 items-center justify-center text-center space-y-4"> {/* Flex-1 and justify-center */}
          <p className="text-base text-card-foreground px-2">
             Let AI analyze your spending patterns and suggest smart ways to save more effectively.
          </p>
          <Link href="/ai-assistant" passHref legacyBehavior>
            <Button variant="solidAccent" className="w-full"> {/* Solid Accent */}
             <a>Get AI Recommendations</a>
           </Button>
          </Link>
        </CardContent>
         <CardFooter>
           <Link href="/tax-planner" passHref legacyBehavior>
             <Button variant="link" className="text-muted-foreground w-full"> {/* Muted link */}
               <a>Estimate Your Taxes</a>
            </Button>
           </Link>
         </CardFooter>
      </Card>
    </div>
  );
}

