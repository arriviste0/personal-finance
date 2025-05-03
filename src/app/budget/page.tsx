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

// Initial Mock data with neon chart colors
const initialBudgetData: BudgetItem[] = [
  { id: "1", category: "Food & Groceries", spent: 450, budget: 600, color: "hsl(var(--chart-1))" }, // Cyan
  { id: "2", category: "Transportation", spent: 150, budget: 200, color: "hsl(var(--chart-2))" }, // Magenta
  { id: "3", category: "Entertainment", spent: 250, budget: 300, color: "hsl(var(--chart-3))" }, // Yellow
  { id: "4", category: "Utilities", spent: 180, budget: 200, color: "hsl(var(--chart-4))" }, // Green
  { id: "5", category: "Shopping", spent: 300, budget: 400, color: "hsl(var(--chart-5))" }, // Purple
  { id: "6", category: "Rent/Mortgage", spent: 1200, budget: 1200, color: "hsl(var(--muted))" }, // Dark Grey
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
      if (!isNaN(amount) && newTransaction.category && amount > 0) { // Only add positive amounts
          setBudgetData(prevData =>
              prevData.map(item =>
                  item.category === newTransaction.category
                      ? { ...item, spent: item.spent + amount } // Add to spent
                      : item
              )
          );
          console.log(`Added transaction: ${amount} to ${newTransaction.category}`);
          setIsAddTransactionOpen(false);
          setNewTransaction({ category: initialBudgetData[0]?.category || '', amount: '' });
      } else {
          console.error("Invalid transaction input (must be positive amount and have category)");
          // TODO: Add user feedback (e.g., toast)
      }
  };

  return (
    <div className="space-y-4"> {/* Reduced spacing */}
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
         <h1 className="text-2xl font-medium">BUDGET TRACKER</h1> {/* Retro heading */}
          <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
             <DialogTrigger asChild>
                <Button variant="primary"> {/* Use retro button */}
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
               </Button>
             </DialogTrigger>
             {/* Retro Dialog Styling */}
             <DialogContent className="retro-window sm:max-w-[450px]"> {/* Retro window style */}
                 <DialogHeader className="retro-window-header !bg-secondary !text-secondary-foreground"> {/* Use secondary color */}
                  <DialogTitle>Add New Transaction</DialogTitle>
                   <div className="retro-window-controls">
                      <span className="!bg-secondary !border-secondary-foreground"></span>
                      <span className="!bg-secondary !border-secondary-foreground"></span>
                       <DialogClose asChild>
                          <span className="!bg-destructive !border-destructive-foreground cursor-pointer"></span>
                       </DialogClose>
                  </div>
                </DialogHeader>
                <div className="space-y-3 p-3 retro-window-content !border-t-0"> {/* Retro content */}
                  <DialogDescription className="!text-foreground/80 text-sm"> {/* Adjust description style */}
                    Log an expense for a specific budget category.
                  </DialogDescription>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="category-select" className="text-right text-sm">
                      Category
                    </Label>
                     <Select value={newTransaction.category} onValueChange={handleTransactionCategoryChange}>
                       <SelectTrigger id="category-select" className="col-span-3 retro-select-trigger"> {/* Retro select */}
                         <SelectValue placeholder="Select category" />
                       </SelectTrigger>
                       <SelectContent className="retro-select-content"> {/* Retro content */}
                         {budgetData.map(item => (
                           <SelectItem key={item.id} value={item.category} className="retro-select-item">{item.category}</SelectItem>
                         ))}
                          {/* <SelectItem value="Other" className="retro-select-item">Other</SelectItem> */}
                       </SelectContent>
                     </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-2">
                    <Label htmlFor="amount-input" className="text-right text-sm">
                      Amount ($)
                    </Label>
                    <Input id="amount-input" type="number" value={newTransaction.amount} onChange={handleTransactionInputChange} placeholder="e.g., 25.50" className="col-span-3 retro-input" /> {/* Retro input */}
                  </div>
                </div>
                <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-3"> {/* Adjusted footer layout */}
                    <DialogClose asChild>
                       <Button type="button" variant="default">Cancel</Button> {/* Use retro button */}
                    </DialogClose>
                   <Button type="submit" variant="secondary" onClick={submitAddTransaction}> {/* Use retro button */}
                     Add Transaction
                   </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr]"> {/* Adjusted grid */}
        {/* Overall Budget Summary */}
        <Card className="retro-card"> {/* Use retro class */}
           <CardHeader className="retro-card-header !bg-accent !text-accent-foreground"> {/* Accent header */}
             <CardTitle className="flex items-center gap-2">
                <HandCoins className="h-5 w-5" />
                Monthly Overview
             </CardTitle>
               <div className="retro-window-controls">
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                </div>
           </CardHeader>
          <CardContent className="retro-card-content !border-t-0 space-y-3"> {/* Use retro class */}
            <div className="text-center">
               <p className="text-sm text-muted-foreground">Total Spent</p>
               <p className="text-2xl font-medium">${totalSpent.toLocaleString()}</p> {/* Adjusted size */}
            </div>
             <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="retro-progress h-3" indicatorClassName="retro-progress-indicator !bg-accent"/> {/* Retro progress, accent color */}
             <div className="flex justify-between text-xs text-muted-foreground">
               <span>${Math.max(0, totalBudget - totalSpent).toLocaleString()} Left</span>
               <span>Budget: ${totalBudget.toLocaleString()}</span>
             </div>
             <div className="flex gap-2 pt-2">
                 <Button variant={isEditMode ? "secondary" : "default"} className="flex-1" onClick={toggleEditMode}> {/* Use retro button */}
                    {isEditMode ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditMode ? 'Save Budgets' : 'Edit Budgets'}
                 </Button>
                 {isEditMode && (
                     <Button variant="ghost" size="icon" onClick={cancelEditMode} className="text-muted-foreground hover:text-destructive"> {/* Retro button */}
                        <X className="h-4 w-4"/>
                        <span className="sr-only">Cancel</span>
                     </Button>
                 )}
             </div>
          </CardContent>
        </Card>

         {/* Spending Categories Chart */}
        <Card className="retro-card"> {/* Use retro class */}
            <CardHeader className="retro-card-header !bg-primary !text-primary-foreground"> {/* Primary header */}
             <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Spending by Category
             </CardTitle>
               <div className="retro-window-controls">
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                </div>
           </CardHeader>
           <CardContent className="retro-card-content !border-t-0 h-[250px]"> {/* Adjusted height */}
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                   <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70} // Adjusted size
                    innerRadius={35} // Adjusted donut size
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                   >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke={"hsl(var(--background))"} strokeWidth={1} className="focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" /> // Add stroke for separation
                    ))}
                  </Pie>
                   <Tooltip
                     contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--foreground))', fontFamily: 'var(--font-press-start)', fontSize: '10px', boxShadow: 'none' }} // Retro tooltip
                     itemStyle={{ color: 'hsl(var(--foreground))' }}
                     formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                   />
                   <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px', fontFamily: 'var(--font-press-start)' }} /> {/* Retro legend */}
                </PieChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Budget Table */}
       <Card className="retro-card overflow-hidden"> {/* Use retro class */}
          <CardHeader className="retro-card-header"> {/* Use retro class */}
           <CardTitle>Budget Details</CardTitle>
            <div className="retro-window-controls">
                <span></span><span></span><span></span>
            </div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0"> {/* Remove padding */}
          <div className="overflow-x-auto">
              <Table className="retro-table"> {/* Use retro class */}
                 <TableHeader>
                  <TableRow>
                     <TableHead className="w-[150px] sm:w-[200px]">Category</TableHead> {/* Adjust width */}
                     <TableHead className="text-right">Spent</TableHead>
                     <TableHead className="text-right w-[100px] sm:w-[120px]">Budget</TableHead> {/* Adjust width */}
                     <TableHead className="text-right">Remaining</TableHead>
                     <TableHead className="w-[120px] sm:w-[150px]">Progress</TableHead> {/* Adjust width */}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetData.map((item) => {
                     const percentage = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0;
                     const remaining = item.budget - item.spent;
                     const progressColor = remaining < 0 ? "!bg-destructive" : percentage > 85 ? "!bg-accent" : "!bg-primary"; // Use !important if needed

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
                                className="retro-input h-7 !py-0 !text-sm w-20 sm:w-24" // Retro input, smaller
                               />
                           ) : (
                             `$${item.budget.toLocaleString()}`
                           )}
                        </TableCell>
                         <TableCell className={cn("text-right", remaining < 0 ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                          {remaining < 0 ? `-$${Math.abs(remaining).toLocaleString()}` : `$${remaining.toLocaleString()}`}
                        </TableCell>
                        <TableCell>
                           <Progress value={percentage} className={cn("retro-progress h-2.5", progressColor)} indicatorClassName={cn("retro-progress-indicator", progressColor)} /> {/* Retro progress */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Note: Progress indicator class modification might require direct style override or adjustments in the component itself if cn doesn't suffice.
// Remove the ProgressProps declaration extension if not needed/implemented in progress.tsx
// declare module '@/components/ui/progress' {
//   interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
//     indicatorClassName?: string;
//   }
// }
