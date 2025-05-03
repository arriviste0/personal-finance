'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"; // Assuming chart components are okay with retro font
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { HandCoins, PiggyBank, Target, Lightbulb } from "lucide-react";
import Link from "next/link";

const savingsGoals = [
  { name: "Dream Vacation", current: 750, target: 2000, icon: <PiggyBank className="h-5 w-5 text-primary" /> },
  { name: "Safety Net Fund", current: 3000, target: 5000, icon: <HandCoins className="h-5 w-5 text-destructive" /> },
  { name: "Next Gen Console", current: 200, target: 800, icon: <Target className="h-5 w-5 text-secondary" /> },
];

const budgetData = [
  { category: "Food", spent: 450, budget: 600 },
  { category: "Transport", spent: 150, budget: 200 },
  { category: "Fun Money", spent: 250, budget: 300 }, // Renamed label
  { category: "Utilities", spent: 180, budget: 200 },
  { category: "Shopping", spent: 300, budget: 400 }, // Added shopping
];

// Adjust chart colors if needed to match neon theme better
const chartConfig: ChartConfig = {
  spent: { label: "Spent", color: "hsl(var(--primary))" }, // Neon Cyan
  budget: { label: "Budget", color: "hsl(var(--muted))" }, // Dark Grey
};


export default function Home() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Savings Goals Overview */}
      <Card className="retro-card col-span-1 md:col-span-2 lg:col-span-2"> {/* Use retro class */}
        <CardHeader className="retro-card-header"> {/* Use retro class */}
          <CardTitle className="flex items-center gap-2"> {/* Removed text size override */}
             <PiggyBank className="h-5 w-5" /> {/* Adjusted Icon Size */}
             Savings Goals
          </CardTitle>
          <CardDescription>Track your progress towards financial targets.</CardDescription>
        </CardHeader>
        <CardContent className="retro-card-content space-y-4 !border-t-0"> {/* Use retro class, adjust spacing, remove top border */}
          {savingsGoals.map((goal) => (
            <div key={goal.name} className="space-y-1.5"> {/* Smaller spacing */}
              <div className="flex items-center justify-between"> {/* Removed text size override */}
                 <div className="flex items-center gap-2"> {/* Smaller gap */}
                    {goal.icon}
                    <span className="font-medium">{goal.name}</span> {/* Keep font medium */}
                 </div>
                 <span className="text-muted-foreground text-xs sm:text-sm">
                   ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                 </span>
              </div>
              <Progress value={(goal.current / goal.target) * 100} className="retro-progress h-3" indicatorClassName="retro-progress-indicator" /> {/* Use retro progress */}
            </div>
          ))}
           <Link href="/savings-goals" passHref legacyBehavior>
              <Button variant="primary" className="w-full mt-4"> {/* Use retro button */}
                 <a>View All Savings Goals</a>
              </Button>
           </Link>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <Card className="retro-card col-span-1"> {/* Use retro class */}
         <CardHeader className="retro-card-header"> {/* Use retro class */}
           <CardTitle className="flex items-center gap-2">
             <HandCoins className="h-5 w-5" />
             Budget Snapshot
           </CardTitle>
           <CardDescription>This month's spending breakdown.</CardDescription>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0"> {/* Use retro class, remove top border */}
           {/* Use fixed height for chart consistency */}
          <div className="h-[200px] w-full"> {/* Adjusted height */}
             <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                 {/* Apply font family to chart explicitly if needed */}
                 <BarChart data={budgetData} layout="vertical" margin={{ right: 5, left: 0, top: 5, bottom: 5 }} style={{ fontFamily: 'var(--font-press-start)' }}>
                   <CartesianGrid horizontal={false} strokeDasharray="2 2" stroke="hsl(var(--border)/0.5)"/> {/* Dashed grid */}
                   <XAxis type="number" hide />
                   <YAxis
                     dataKey="category"
                     type="category"
                     tickLine={false}
                     axisLine={false}
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 10 }} // Smaller font size for pixel font
                     width={70} // Adjusted width
                    />
                    <ChartTooltip
                       cursor={{ fill: 'hsl(var(--accent)/0.2)' }} // Neon Yellow hover
                       contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--border))', fontFamily: 'var(--font-press-start)', fontSize: '10px' }} // Retro tooltip
                       itemStyle={{ color: 'hsl(var(--foreground))' }}
                       content={<ChartTooltipContent indicator="dot" hideLabel />} // Dot indicator
                     />
                    <Bar dataKey="budget" stackId="a" fill="hsl(var(--muted))" radius={0} barSize={12}/> {/* No radius */}
                   <Bar dataKey="spent" stackId="a" fill="hsl(var(--primary))" radius={0} barSize={12}/> {/* No radius */}
                 </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
           </div>
            <Link href="/budget" passHref legacyBehavior>
               <Button variant="secondary" className="w-full mt-4"> {/* Use retro button */}
                  <a>Manage Full Budget</a>
               </Button>
            </Link>
        </CardContent>
      </Card>

       {/* AI Assistant Quick Access */}
      <Card className="retro-card col-span-1 md:col-span-2 lg:col-span-1 flex flex-col"> {/* Use retro class */}
         <CardHeader className="retro-card-header"> {/* Use retro class */}
           <CardTitle className="flex items-center gap-2">
             <Lightbulb className="h-5 w-5 text-accent" /> {/* Accent color */}
             AI Savings Helper
           </CardTitle>
           <CardDescription>Unlock personalized saving insights.</CardDescription>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 flex flex-col flex-1 items-center justify-center text-center space-y-3"> {/* Use retro class, adjust spacing */}
          <p className="text-sm px-2">
             Let AI analyze your spending patterns and suggest smart ways to save more effectively.
          </p>
          <Link href="/ai-assistant" passHref legacyBehavior>
            <Button variant="accent" className="w-full"> {/* Use retro button */}
             <a>Get AI Recommendations</a>
           </Button>
          </Link>
        </CardContent>
         <CardFooter className="retro-card-footer !border-t-0"> {/* Use retro class */}
           <Link href="/tax-planner" passHref legacyBehavior>
             <Button variant="link" className="text-muted-foreground w-full text-xs"> {/* Use retro link, muted color */}
               <a>Estimate Your Taxes</a>
            </Button>
           </Link>
         </CardFooter>
      </Card>
    </div>
  );
}
