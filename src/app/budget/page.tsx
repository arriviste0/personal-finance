'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { HandCoins, TrendingUp, PlusCircle, Edit } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn utility

// Mock data - replace with actual data fetching and state management
const budgetData = [
  { category: "Food & Groceries", spent: 450, budget: 600, color: "hsl(var(--chart-1))" },
  { category: "Transportation", spent: 150, budget: 200, color: "hsl(var(--chart-2))" },
  { category: "Entertainment", spent: 250, budget: 300, color: "hsl(var(--chart-3))" },
  { category: "Utilities", spent: 180, budget: 200, color: "hsl(var(--chart-4))" },
  { category: "Shopping", spent: 300, budget: 400, color: "hsl(var(--chart-5))" },
  { category: "Rent/Mortgage", spent: 1200, budget: 1200, color: "hsl(var(--muted))" },
];

const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
const totalBudget = budgetData.reduce((sum, item) => sum + item.budget, 0);

export default function BudgetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Budget Tracker</h1>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overall Budget Summary */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <HandCoins className="h-6 w-6 text-secondary" />
               Monthly Overview
            </CardTitle>
            <CardDescription>Your spending vs. your total budget this month.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
               <p className="text-sm text-muted-foreground">Total Spent</p>
               <p className="text-3xl font-bold">${totalSpent.toLocaleString()}</p>
            </div>
             <Progress value={(totalSpent / totalBudget) * 100} className="h-3" />
             <div className="flex justify-between text-sm text-muted-foreground">
               <span>${(totalBudget - totalSpent).toLocaleString()} left</span>
               <span>Total Budget: ${totalBudget.toLocaleString()}</span>
             </div>
             <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary">
                <Edit className="mr-2 h-4 w-4" /> Edit Budgets
             </Button>
          </CardContent>
        </Card>

         {/* Spending Categories Chart */}
        <Card className="glass">
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <TrendingUp className="h-6 w-6 text-primary" />
               Spending by Category
            </CardTitle>
             <CardDescription>How your spending breaks down.</CardDescription>
          </CardHeader>
           <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="spent"
                    nameKey="category"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                   >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Budget Table */}
       <Card className="glass">
        <CardHeader>
          <CardTitle>Budget Details</CardTitle>
          <CardDescription>Track spending across different categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
             <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Spent</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="w-[200px]">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map((item) => {
                 const percentage = item.budget > 0 ? (item.spent / item.budget) * 100 : 0;
                 const progressClassName = cn(
                    "h-2",
                    percentage > 90 && "[&>div]:bg-destructive", // Target indicator for destructive
                    percentage > 75 && percentage <= 90 && "[&>div]:bg-secondary", // Target indicator for secondary (warning)
                    percentage <= 75 && "[&>div]:bg-primary" // Target indicator for primary (default)
                 );
                return (
                  <TableRow key={item.category}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-right">${item.spent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">${item.budget.toLocaleString()}</TableCell>
                    <TableCell className={`text-right ${item.budget - item.spent < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                      ${(item.budget - item.spent).toLocaleString()}
                    </TableCell>
                    <TableCell>
                       <Progress value={percentage} className={progressClassName} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
