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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Import Select

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
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ category: initialBudgetData[0]?.category || '', amount: '' });

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

  const handleTransactionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setNewTransaction(prev => ({ ...prev, [id]: value }));
  };

   const handleTransactionCategoryChange = (value: string) => {
       setNewTransaction(prev => ({ ...prev, category: value }));
   };


  const submitAddTransaction = () => {
      const amount = parseFloat(newTransaction.amount);
      if (!isNaN(amount) && amount !== 0 && newTransaction.category) {
          // In a real app, this would update backend data
          setBudgetData(prevData =>
              prevData.map(item =>
                  item.category === newTransaction.category
                      ? { ...item, spent: item.spent + amount } // Add or subtract based on amount sign
                      : item
              )
          );
          console.log(`Added transaction: ${amount} to ${newTransaction.category}`);
          setIsAddTransactionOpen(false); // Close dialog
          setNewTransaction({ category: initialBudgetData[0]?.category || '', amount: '' }); // Reset form
      } else {
          // Handle invalid input (optional: show error message)
          console.error("Invalid transaction input");
      }
  };

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-4">
         <h1 className="text-2xl font-medium uppercase">Budget Tracker</h1> {/* Retro heading */}
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
             <DialogTrigger asChild>
                <Button variant="solid"> {/* Default retro button */}
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
               </Button>
             </DialogTrigger>
              {/* Retro Dialog Styling */}
             <DialogContent className="retro-window !rounded-none sm:max-w-[425px]">
                <DialogHeader className="retro-window-header !text-left !p-1 !px-2">
                  <DialogTitle>Add Transaction</DialogTitle>
                   <div className="retro-window-controls">
                       <span/><span/><span className="!bg-destructive !border-destructive-foreground"/>
                   </div>
                </DialogHeader>
                <div className="retro-window-content space-y-4 !pt-4">
                  <DialogDescription>
                    Log a new expense or income (use negative for income/refunds).
                  </DialogDescription>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                     <Select value={newTransaction.category} onValueChange={handleTransactionCategoryChange}>
                       <SelectTrigger id="category" className="col-span-3">
                         <SelectValue placeholder="Select category" />
                       </SelectTrigger>
                       <SelectContent>
                         {budgetData.map(item => (
                           <SelectItem key={item.id} value={item.category}>{item.category}</SelectItem>
                         ))}
                          <SelectItem value="Income">Income</SelectItem> {/* Add Income Option */}
                          <SelectItem value="Other">Other</SelectItem>
                       </SelectContent>
                     </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount ($)
                    </Label>
                    <Input id="amount" type="number" value={newTransaction.amount} onChange={handleTransactionInputChange} placeholder="e.g., 25.50 or -50" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter className="retro-window-content !pt-0 flex sm:justify-between">
                    <DialogClose asChild>
                       <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                   <Button type="submit" variant="solidAccent" onClick={submitAddTransaction}>
                     Add
                   </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Overall Budget Summary */}
        <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-lg">
                <HandCoins className="h-5 w-5" />
                Monthly Overview
             </CardTitle>
             <CardDescription>Spending vs. Budget.</CardDescription>
           </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
               <p className="text-sm text-muted-foreground">Total Spent</p>
               <p className="text-2xl font-medium">${totalSpent.toLocaleString()}</p> {/* Adjusted size */}
            </div>
             <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="h-3 [&>div]:bg-secondary" />
             <div className="flex justify-between text-sm text-muted-foreground">
               <span>${(totalBudget - totalSpent).toLocaleString()} left</span>
               <span>Budget: ${totalBudget.toLocaleString()}</span>
             </div>
             <div className="flex gap-2">
                 <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10" onClick={toggleEditMode}>
                    {isEditMode ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditMode ? 'Save Budgets' : 'Edit Budgets'}
                 </Button>
                 {isEditMode && (
                     <Button variant="ghost" size="icon" onClick={cancelEditMode} className="!border-transparent !shadow-none text-muted-foreground hover:text-destructive">
                        <X className="h-4 w-4"/>
                        <span className="sr-only">Cancel</span>
                     </Button>
                 )}
             </div>
          </CardContent>
        </Card>

         {/* Spending Categories Chart */}
        <Card>
            <CardHeader>
             <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Spending by Category
             </CardTitle>
              <CardDescription>Spending breakdown.</CardDescription>
           </CardHeader>
           <CardContent className="h-[250px]"> {/* Adjusted height */}
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70} // Adjusted size
                    innerRadius={30} // Added inner radius for donut
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                   >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} /> // Added stroke for separation
                    ))}
                  </Pie>
                   <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--foreground))', borderRadius: '0px' }} itemStyle={{ color: 'hsl(var(--foreground))' }} formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]} />
                   <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Budget Table */}
       <Card>
          <CardHeader>
           <CardTitle className="text-lg">Budget Details</CardTitle>
           <CardDescription>Category spending tracker.</CardDescription>
         </CardHeader>
        <CardContent>
           {/* Apply retro table styling */}
          <Table className="border-2 border-foreground">
             <TableHeader className="border-b-2 border-foreground bg-muted">
              <TableRow>
                 <TableHead className="border-r-2 border-foreground">Category</TableHead>
                 <TableHead className="text-right border-r-2 border-foreground">Spent</TableHead>
                 <TableHead className="text-right w-[120px] border-r-2 border-foreground">Budget</TableHead> {/* Adjusted width */}
                 <TableHead className="text-right border-r-2 border-foreground">Remaining</TableHead>
                 <TableHead className="w-[120px]">Progress</TableHead> {/* Adjusted width */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map((item) => {
                 const percentage = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0;
                 const remaining = item.budget - item.spent;
                 const progressClassName = cn(
                    "h-3 rounded-none overflow-hidden border-2 border-foreground bg-muted", // Retro progress style
                    remaining < 0 ? "[&>div]:bg-destructive" :
                    percentage > 85 ? "[&>div]:bg-secondary" :
                    "[&>div]:bg-primary"
                 );
                return (
                  <TableRow key={item.id} className="border-b-2 border-foreground last:border-b-0">
                     <TableCell className="font-medium border-r-2 border-foreground">{item.category}</TableCell>
                     <TableCell className="text-right border-r-2 border-foreground">${item.spent.toLocaleString()}</TableCell>
                    <TableCell className="text-right border-r-2 border-foreground">
                       {isEditMode ? (
                         <Input
                           type="number"
                           value={editingBudgets[item.id] ?? ''}
                           onChange={(e) => handleEditBudgetChange(item.id, e.target.value)}
                            className="h-8 text-right !py-1 !text-sm" // Smaller input
                           />
                       ) : (
                         `$${item.budget.toLocaleString()}`
                       )}
                    </TableCell>
                     <TableCell className={cn("text-right border-r-2 border-foreground", remaining < 0 ? 'text-destructive font-medium' : 'text-muted-foreground')}>
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
