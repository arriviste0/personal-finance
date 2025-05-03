'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { HandCoins, TrendingUp, PlusCircle, Edit, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from '@/components/ui/input';
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
import { Label } from '@/components/ui/label';

interface BudgetItem {
  id: string;
  category: string;
  spent: number;
  budget: number;
  color: string;
}

// Initial Mock data
const initialBudgetData: BudgetItem[] = [
  { id: "1", category: "Food & Groceries", spent: 450, budget: 600, color: "hsl(var(--chart-1))" },
  { id: "2", category: "Transportation", spent: 150, budget: 200, color: "hsl(var(--chart-2))" },
  { id: "3", category: "Entertainment", spent: 250, budget: 300, color: "hsl(var(--chart-3))" },
  { id: "4", category: "Utilities", spent: 180, budget: 200, color: "hsl(var(--chart-4))" },
  { id: "5", category: "Shopping", spent: 300, budget: 400, color: "hsl(var(--chart-5))" },
  { id: "6", category: "Rent/Mortgage", spent: 1200, budget: 1200, color: "hsl(var(--muted))" },
];

export default function BudgetPage() {
  const [budgetData, setBudgetData] = useState<BudgetItem[]>(initialBudgetData);
  const [editingBudgets, setEditingBudgets] = useState<Record<string, number>>({});
  const [isEditMode, setIsEditMode] = useState(false);

  const totalSpent = useMemo(() => budgetData.reduce((sum, item) => sum + item.spent, 0), [budgetData]);
  const totalBudget = useMemo(() => budgetData.reduce((sum, item) => sum + item.budget, 0), [budgetData]);

  // Chart data prepared for Recharts Pie
  const pieChartData = useMemo(() => budgetData.map(item => ({
    name: item.category,
    value: item.spent,
    fill: item.color,
  })), [budgetData]);

  const handleEditBudgetChange = (id: string, value: string) => {
    const numericValue = parseFloat(value) || 0; // Handle NaN
    setEditingBudgets(prev => ({ ...prev, [id]: numericValue }));
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      // Save changes
      setBudgetData(prevData =>
        prevData.map(item => ({
          ...item,
          budget: editingBudgets[item.id] ?? item.budget, // Use edited value or fallback to original
        }))
      );
      setEditingBudgets({}); // Clear editing state
    } else {
      // Enter edit mode - populate editing state with current budgets
      const currentBudgets = budgetData.reduce((acc, item) => {
        acc[item.id] = item.budget;
        return acc;
      }, {} as Record<string, number>);
      setEditingBudgets(currentBudgets);
    }
    setIsEditMode(!isEditMode);
  };

  const cancelEditMode = () => {
     setEditingBudgets({}); // Clear editing state
     setIsEditMode(false);
  }

  // Mock function for adding a transaction
  const handleAddTransaction = (category: string, amount: number) => {
    // In a real app, this would update backend data and re-fetch or update state optimistically
    setBudgetData(prevData =>
      prevData.map(item =>
        item.category === category
          ? { ...item, spent: item.spent + amount }
          : item
      )
    );
    console.log(`Added transaction: ${amount} to ${category}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Budget Tracker</h1>
         <Dialog>
          <DialogTrigger asChild>
             <Button variant="solidAccent"> {/* Solid accent button */}
              <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
            </Button>
          </DialogTrigger>
           <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
               <DialogTitle>Add New Transaction</DialogTitle>
               <DialogDescription>
                 Log a new expense to track your spending.
               </DialogDescription>
             </DialogHeader>
             <div className="grid gap-4 py-4">
               {/* Simple form for demo */}
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="category" className="text-right">
                   Category
                 </Label>
                 {/* In a real app, use a Select component populated with budgetData categories */}
                  <Input id="category" defaultValue="Food & Groceries" className="col-span-3" />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="amount" className="text-right">
                   Amount ($)
                 </Label>
                 <Input id="amount" type="number" defaultValue="25.50" className="col-span-3" />
               </div>
             </div>
             <DialogFooter>
                <DialogClose asChild>
                   <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
               {/* Implement actual saving logic */}
               <Button type="submit" variant="solidAccent" onClick={() => {
                   const category = (document.getElementById('category') as HTMLInputElement)?.value || 'Other';
                   const amount = parseFloat((document.getElementById('amount') as HTMLInputElement)?.value || '0');
                   if (amount > 0) {
                       handleAddTransaction(category, amount);
                       // Add logic to close dialog after adding
                       console.log("Should close dialog here"); // Placeholder
                   }
               }}>
                 Add Expense
               </Button>
             </DialogFooter>
           </DialogContent>
         </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overall Budget Summary */}
        <Card> {/* Removed glass class */}
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
             <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="h-3 [&>div]:bg-secondary" /> {/* Ensured progress bar color */}
             <div className="flex justify-between text-sm text-muted-foreground">
               <span>${(totalBudget - totalSpent).toLocaleString()} left</span>
               <span>Total Budget: ${totalBudget.toLocaleString()}</span>
             </div>
             <div className="flex gap-2">
                 <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10" onClick={toggleEditMode}>
                    {isEditMode ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditMode ? 'Save Budgets' : 'Edit Budgets'}
                 </Button>
                 {isEditMode && (
                     <Button variant="ghost" size="icon" onClick={cancelEditMode} className="border-transparent text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4"/>
                        <span className="sr-only">Cancel Edits</span>
                     </Button>
                 )}
             </div>
          </CardContent>
        </Card>

         {/* Spending Categories Chart */}
        <Card> {/* Removed glass class */}
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
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8" // Default fill, overridden by Cell
                    dataKey="value" // Use 'value' as defined in pieChartData
                    nameKey="name"   // Use 'name' as defined in pieChartData
                    // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                   >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} /> // Use 'fill' from pieChartData
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]} />
                  <Legend />
                </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Budget Table */}
       <Card> {/* Removed glass class */}
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
                <TableHead className="text-right w-[150px]">Budget</TableHead> {/* Adjusted width */}
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="w-[150px]">Progress</TableHead> {/* Adjusted width */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map((item) => {
                 const percentage = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0; // Cap at 100%
                 const remaining = item.budget - item.spent;
                 const progressClassName = cn(
                    "h-2 rounded-full overflow-hidden", // Added rounded and overflow
                    "[&>div]:rounded-full", // Round indicator inside
                    remaining < 0 ? "[&>div]:bg-destructive" : // Destructive if over budget
                    percentage > 85 ? "[&>div]:bg-secondary" : // Secondary (warning) if close
                    "[&>div]:bg-primary" // Primary otherwise
                 );
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="text-right">${item.spent.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                       {isEditMode ? (
                         <Input
                           type="number"
                           value={editingBudgets[item.id] ?? ''}
                           onChange={(e) => handleEditBudgetChange(item.id, e.target.value)}
                           className="h-8 text-right"
                           />
                       ) : (
                         `$${item.budget.toLocaleString()}`
                       )}
                    </TableCell>
                    <TableCell className={cn("text-right", remaining < 0 ? 'text-destructive' : 'text-muted-foreground')}>
                      {remaining < 0 ? `-$${Math.abs(remaining).toLocaleString()}` : `$${remaining.toLocaleString()}`}
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
