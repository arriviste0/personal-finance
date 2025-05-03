'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { HandCoins, TrendingUp, PlusCircle, Edit, Save, X, DollarSign } from "lucide-react"; // Added DollarSign
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BudgetItem {
  id: string;
  category: string;
  spent: number;
  budget: number;
  color: string;
}

// Initial Mock data with more pastel colors
const initialBudgetData: BudgetItem[] = [
  { id: "1", category: "Food & Groceries", spent: 450, budget: 600, color: "hsl(var(--chart-1))" },
  { id: "2", category: "Transportation", spent: 150, budget: 200, color: "hsl(var(--chart-2))" },
  { id: "3", category: "Entertainment", spent: 250, budget: 300, color: "hsl(var(--chart-3))" },
  { id: "4", category: "Utilities", spent: 180, budget: 200, color: "hsl(var(--chart-4))" },
  { id: "5", category: "Shopping", spent: 300, budget: 400, color: "hsl(var(--chart-5))" },
  { id: "6", category: "Rent/Mortgage", spent: 1200, budget: 1200, color: "hsl(var(--muted))" }, // Muted for fixed expenses
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
  const pieChartData = useMemo(() => budgetData.filter(item => item.spent > 0).map(item => ({ // Filter out 0 spent for cleaner chart
    name: item.category,
    value: item.spent,
    fill: item.color,
  })), [budgetData]);

  const handleEditBudgetChange = (id: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setEditingBudgets(prev => ({ ...prev, [id]: numericValue }));
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      setBudgetData(prevData =>
        prevData.map(item => ({
          ...item,
          budget: editingBudgets[item.id] ?? item.budget,
        }))
      );
      setEditingBudgets({});
    } else {
      const currentBudgets = budgetData.reduce((acc, item) => {
        acc[item.id] = item.budget;
        return acc;
      }, {} as Record<string, number>);
      setEditingBudgets(currentBudgets);
    }
    setIsEditMode(!isEditMode);
  };

  const cancelEditMode = () => {
     setEditingBudgets({});
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
      if (!isNaN(amount) && newTransaction.category) { // Allow 0 amount for corrections? Maybe not.
          setBudgetData(prevData =>
              prevData.map(item =>
                  item.category === newTransaction.category
                      ? { ...item, spent: Math.max(0, item.spent + amount) } // Ensure spent doesn't go below 0
                      : item
              )
          );
          console.log(`Added transaction: ${amount} to ${newTransaction.category}`);
          setIsAddTransactionOpen(false);
          setNewTransaction({ category: initialBudgetData[0]?.category || '', amount: '' });
      } else {
          console.error("Invalid transaction input");
      }
  };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
         <h1 className="text-2xl font-semibold">Budget Tracker</h1> {/* Modern heading */}
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
             <DialogTrigger asChild>
                <Button variant="solid"> {/* Solid button */}
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
               </Button>
             </DialogTrigger>
             {/* Standard Dialog Styling */}
             <DialogContent className="sm:max-w-[450px]"> {/* Slightly wider */}
                <DialogHeader>
                  <DialogTitle className="text-lg">Add New Transaction</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <DialogDescription>
                    Log an expense for a specific budget category.
                  </DialogDescription>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category-select" className="text-right">
                      Category
                    </Label>
                     <Select value={newTransaction.category} onValueChange={handleTransactionCategoryChange}>
                       <SelectTrigger id="category-select" className="col-span-3">
                         <SelectValue placeholder="Select category" />
                       </SelectTrigger>
                       <SelectContent>
                         {budgetData.map(item => (
                           <SelectItem key={item.id} value={item.category}>{item.category}</SelectItem>
                         ))}
                          {/* Consider if Income/Other should be handled differently */}
                          {/* <SelectItem value="Income">Income</SelectItem> */}
                          <SelectItem value="Other">Other</SelectItem>
                       </SelectContent>
                     </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount-input" className="text-right">
                      Amount ($)
                    </Label>
                    <Input id="amount-input" type="number" value={newTransaction.amount} onChange={handleTransactionInputChange} placeholder="e.g., 25.50" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter className="flex sm:justify-end gap-2"> {/* Adjusted footer layout */}
                    <DialogClose asChild>
                       <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                   <Button type="submit" variant="solidAccent" onClick={submitAddTransaction}>
                     Add Transaction
                   </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr]"> {/* Adjusted grid */}
        {/* Overall Budget Summary */}
        <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-lg">
                <HandCoins className="h-5 w-5 text-primary" /> {/* Use primary color */}
                Monthly Overview
             </CardTitle>
             <CardDescription>Your spending vs. total budget.</CardDescription>
           </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
               <p className="text-sm text-muted-foreground">Total Spent This Month</p>
               <p className="text-3xl font-semibold">${totalSpent.toLocaleString()}</p> {/* Larger font */}
            </div>
             <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="h-2.5" /> {/* Adjusted height */}
             <div className="flex justify-between text-sm text-muted-foreground">
               <span>${Math.max(0, totalBudget - totalSpent).toLocaleString()} remaining</span>
               <span>Total Budget: ${totalBudget.toLocaleString()}</span>
             </div>
             <div className="flex gap-2 pt-2">
                 <Button variant="outline" className="flex-1" onClick={toggleEditMode}>
                    {isEditMode ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditMode ? 'Save Budgets' : 'Edit Budgets'}
                 </Button>
                 {isEditMode && (
                     <Button variant="ghost" size="icon" onClick={cancelEditMode} className="text-muted-foreground hover:text-destructive">
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
                <TrendingUp className="h-5 w-5 text-secondary" /> {/* Use secondary color */}
                Spending by Category
             </CardTitle>
              <CardDescription>Visual breakdown of your expenses.</CardDescription>
           </CardHeader>
           <CardContent className="h-[280px]"> {/* Increased height */}
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80} // Adjusted size
                    innerRadius={40} // Adjusted donut size
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                   >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" /> // Add focus style
                    ))}
                  </Pie>
                   <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', boxShadow: 'hsl(var(--shadow))' }} itemStyle={{ color: 'hsl(var(--popover-foreground))' }} formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]} />
                   <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Budget Table */}
       <Card className="overflow-hidden"> {/* Prevent shadow clipping */}
          <CardHeader>
           <CardTitle className="text-lg">Budget Details</CardTitle>
           <CardDescription>Track spending for each category against its budget.</CardDescription>
         </CardHeader>
        <CardContent className="p-0"> {/* Remove padding to allow table full width */}
           {/* Modern table styling */}
          <Table>
             <TableHeader>
              <TableRow>
                 <TableHead className="w-[200px]">Category</TableHead>
                 <TableHead className="text-right">Spent</TableHead>
                 <TableHead className="text-right w-[120px]">Budget</TableHead>
                 <TableHead className="text-right">Remaining</TableHead>
                 <TableHead className="w-[150px]">Progress</TableHead> {/* Adjusted width */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetData.map((item) => {
                 const percentage = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0;
                 const remaining = item.budget - item.spent;
                 const progressColor = remaining < 0 ? "bg-destructive" : percentage > 85 ? "bg-accent" : "bg-primary";

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
                            className="h-8 text-right !py-1 !text-sm w-24" // Smaller input, fixed width
                           />
                       ) : (
                         `$${item.budget.toLocaleString()}`
                       )}
                    </TableCell>
                     <TableCell className={cn("text-right", remaining < 0 ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                      {remaining < 0 ? `-$${Math.abs(remaining).toLocaleString()}` : `$${remaining.toLocaleString()}`}
                    </TableCell>
                    <TableCell>
                       <Progress value={percentage} className={cn("h-2", progressColor)} indicatorClassName={progressColor} />
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

// Extend Progress props to accept indicator class name
declare module '@/components/ui/progress' {
  interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    indicatorClassName?: string;
  }
}
