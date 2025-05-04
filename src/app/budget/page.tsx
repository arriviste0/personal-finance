'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { HandCoins, TrendingUp, PlusCircle, Edit, Save, X, DollarSign, AlertTriangle } from "lucide-react";
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
import { format, parseISO, add, sub } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface BudgetItem {
    id: string;
    category: string;
    spent: number;
    budget: number;
    color: string;
    subcategories?: SubcategoryItem[];
}

interface SubcategoryItem {
    id: string;
    name: string;
    spent: number;
    budget: number;
}

interface TransactionItem {
    id: string;
    date: string;
    amount: number;
    note: string;
    budgetItemId: string;
    isRecurring: boolean;
}

// Initial Mock data with neon chart colors
const initialBudgetData: BudgetItem[] = [
  { id: "1", category: "Food & Groceries", spent: 450, budget: 600, color: "hsl(var(--chart-1))", subcategories: [{ id: 's1', name: 'Groceries', spent: 300, budget: 400 }, { id: 's2', name: 'Dining Out', spent: 150, budget: 200 }] },
  { id: "2", category: "Transportation", spent: 150, budget: 200, color: "hsl(var(--chart-2))", subcategories: [{ id: 's3', name: 'Gas', spent: 100, budget: 150 }, { id: 's4', name: 'Public Transit', spent: 50, budget: 50 }] },
  { id: "3", category: "Entertainment", spent: 250, budget: 300, color: "hsl(var(--chart-3))", subcategories: [{ id: 's5', name: 'Movies', spent: 50, budget: 100 }, { id: 's6', name: 'Concerts', spent: 200, budget: 200 }] },
  { id: "4", category: "Utilities", spent: 180, budget: 200, color: "hsl(var(--chart-4))", subcategories: [{ id: 's7', name: 'Electricity', spent: 90, budget: 100 }, { id: 's8', name: 'Water', spent: 90, budget: 100 }] },
  { id: "5", category: "Shopping", spent: 300, budget: 400, color: "hsl(var(--chart-5))", subcategories: [{ id: 's9', name: 'Clothing', spent: 150, budget: 200 }, { id: 's10', name: 'Other', spent: 150, budget: 200 }] },
  { id: "6", category: "Rent/Mortgage", spent: 1200, budget: 1200, color: "hsl(var(--muted))" },
];

const initialTransactions: TransactionItem[] = [
    { id: 'tx1', date: format(sub(new Date(), { days: 2 }), 'yyyy-MM-dd'), amount: 50, note: 'Lunch with colleagues', budgetItemId: '1', isRecurring: false },
    { id: 'tx2', date: format(sub(new Date(), { days: 5 }), 'yyyy-MM-dd'), amount: 150, note: 'Weekly Groceries', budgetItemId: '1', isRecurring: true },
    { id: 'tx3', date: format(sub(new Date(), { days: 10 }), 'yyyy-MM-dd'), amount: 75, note: 'Train ticket', budgetItemId: '2', isRecurring: false },
];

export default function BudgetPage() {
  const [budgetData, setBudgetData] = useState<BudgetItem[]>(initialBudgetData);
  const [editingBudgets, setEditingBudgets] = useState<Record<string, number>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({ category: initialBudgetData[0]?.category || '', amount: '', note: '', isRecurring: false });
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const totalSpent = useMemo(() => budgetData.reduce((sum, item) => sum + item.spent, 0), [budgetData]);
  const totalBudget = useMemo(() => budgetData.reduce((sum, item) => sum + item.budget, 0), [budgetData]);
  const netSavings = useMemo(() => totalBudget - totalSpent, [totalBudget, totalSpent]);
  const savingsPercentage = useMemo(() => (totalBudget > 0 ? (netSavings / totalBudget) * 100 : 0), [totalBudget, netSavings]);

  const dailySpendingAverage = useMemo(() => {
      const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
      return totalSpent / daysInMonth;
  }, [totalSpent, selectedDate]);

  const pieChartData = useMemo(() => budgetData.filter(item => item.spent > 0).map(item => ({
    name: item.category,
    value: item.spent,
    fill: item.color,
  })), [budgetData]);

  const barChartData = budgetData.map(item => ({
        category: item.category,
        budget: item.budget,
        spent: item.spent,
        remaining: item.budget - item.spent,
    }));

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

   const handleTransactionInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
       const { id, value, type, checked } = e.target;

       setNewTransaction(prev => ({
           ...prev,
           [id]: type === 'checkbox' ? checked : value
       }));
   };

   const handleTransactionCategoryChange = (value: string) => {
       setNewTransaction(prev => ({ ...prev, category: value }));
   };

  const submitAddTransaction = () => {
       const amount = parseFloat(newTransaction.amount);
       if (!isNaN(amount) && newTransaction.category && amount > 0) {
           const budgetItem = budgetData.find(item => item.category === newTransaction.category);
           if (budgetItem) {
               const newTx: TransactionItem = {
                   id: Date.now().toString(),
                   date: format(selectedDate, 'yyyy-MM-dd'),
                   amount: amount,
                   note: newTransaction.note,
                   budgetItemId: budgetItem.id,
                   isRecurring: newTransaction.isRecurring || false,
               };

               setTransactions(prev => [newTx, ...prev]);
               setBudgetData(prevData =>
                   prevData.map(item =>
                       item.category === newTransaction.category
                           ? { ...item, spent: item.spent + amount }
                           : item
                   )
               );
               setIsAddTransactionOpen(false);
               setNewTransaction({ category: initialBudgetData[0]?.category || '', amount: '', note: '', isRecurring: false });
               setSelectedDate(new Date()); // Reset selected date to today
           } else {
               console.error("Invalid category selected");
           }
       } else {
           console.error("Invalid transaction input (must be positive amount and have category)");
           // TODO: Add user feedback (e.g., toast)
       }
   };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setNewCategoryName(e.target.value);
  };

   const submitAddCategory = () => {
       if (newCategoryName.trim()) {
           const newCategory: BudgetItem = {
               id: Date.now().toString(),
               category: newCategoryName,
               spent: 0,
               budget: 0,
               color: "hsl(var(--chart-6))",
           };
           setBudgetData(prev => [...prev, newCategory]);
           setIsAddCategoryOpen(false);
           setNewCategoryName('');
       }
   };

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
         <h1 className="text-3xl font-semibold">BUDGET TRACKER</h1>
          <div className="flex gap-2">
             <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
                 <DialogTrigger asChild>
                    <Button variant="primary" className="retro-button">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Transaction
                   </Button>
                 </DialogTrigger>
                 <DialogContent className="retro-window sm:max-w-[450px]">
                     <DialogHeader className="retro-window-header !bg-secondary !text-secondary-foreground">
                      <DialogTitle>Add New Transaction</DialogTitle>
                       <div className="retro-window-controls">
                          <span className="!bg-secondary !border-secondary-foreground"></span>
                          <span className="!bg-secondary !border-secondary-foreground"></span>
                           <DialogClose asChild>
                              <Button type="button" variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                                  <X className="h-3 w-3"/>
                                  <span className="sr-only">Close</span>
                              </Button>
                           </DialogClose>
                      </div>
                     </DialogHeader>
                     <div className="space-y-4 p-4 retro-window-content !border-t-0">
                        <DialogDescription className="text-foreground/80 text-sm">
                          Log an expense for a specific budget category.
                        </DialogDescription>
                         <div className="grid grid-cols-4 items-center gap-3">
                           <Label htmlFor="date-input" className="text-right text-sm">
                             Date
                           </Label>
                           <Input id="date-input" type="date" value={format(selectedDate, 'yyyy-MM-dd')} onChange={handleTransactionInputChange} className="col-span-3 retro-input" />
                         </div>
                         <div className="grid grid-cols-4 items-center gap-3">
                           <Label htmlFor="category-select" className="text-right text-sm">
                             Category
                           </Label>
                            <Select value={newTransaction.category} onValueChange={handleTransactionCategoryChange}>
                              <SelectTrigger id="category-select" className="col-span-3 retro-select-trigger">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent className="retro-select-content">
                                {budgetData.map(item => (
                                  <SelectItem key={item.id} value={item.category} className="retro-select-item">{item.category}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                         </div>
                         <div className="grid grid-cols-4 items-center gap-3">
                           <Label htmlFor="amount-input" className="text-right text-sm">
                             Amount ($)
                           </Label>
                           <Input id="amount" type="number" value={newTransaction.amount} onChange={handleTransactionInputChange} placeholder="e.g., 25.50" className="col-span-3 retro-input" />
                         </div>
                         <div className="grid grid-cols-4 items-start gap-3">
                           <Label htmlFor="notes" className="text-right text-sm pt-2">Notes <span className="text-xs text-muted-foreground">(Opt.)</span></Label>
                            <Textarea id="note" value={newTransaction.note} onChange={handleTransactionInputChange} placeholder="Add notes about this transaction" className="col-span-3 retro-textarea h-20" />
                         </div>
                          <div className="flex items-center justify-start gap-2">
                               <Label htmlFor="isRecurring" className="text-sm">Recurring?</Label>
                               <Switch id="isRecurring" checked={newTransaction.isRecurring} onCheckedChange={(checked) => setNewTransaction(prev => ({ ...prev, isRecurring: checked }))} className="ml-2 retro-checkbox" />
                           </div>
                     </div>
                     <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
                         <DialogClose asChild>
                            <Button type="button" variant="secondary" className="retro-button">Cancel</Button>
                         </DialogClose>
                        <Button type="submit" variant="primary" className="retro-button" onClick={submitAddTransaction}>
                          Add Transaction
                        </Button>
                     </DialogFooter>
                   </DialogContent>
                 </Dialog>

                {/* Add New Category Dialog */}
                <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                  <DialogTrigger asChild>
                      <Button variant="outline" className="retro-button">
                       <PlusCircle className="mr-2 h-4 w-4" /> Add Category
                     </Button>
                  </DialogTrigger>
                   <DialogContent className="retro-window sm:max-w-[450px]">
                       <DialogHeader className="retro-window-header !bg-secondary !text-secondary-foreground">
                         <DialogTitle>Add New Category</DialogTitle>
                          <div className="retro-window-controls">
                             <span className="!bg-secondary !border-secondary-foreground"></span>
                             <span className="!bg-secondary !border-secondary-foreground"></span>
                              <DialogClose asChild>
                                 <Button type="button" variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                                     <X className="h-3 w-3"/>
                                     <span className="sr-only">Close</span>
                                 </Button>
                              </DialogClose>
                         </div>
                       </DialogHeader>
                       <div className="space-y-4 p-4 retro-window-content !border-t-0">
                          <DialogDescription className="text-foreground/80 text-sm">
                            Create a new category to track your budget.
                          </DialogDescription>
                           <div className="grid grid-cols-4 items-center gap-3">
                             <Label htmlFor="new-category-input" className="text-right text-sm">
                               Category Name
                             </Label>
                             <Input id="new-category-input" type="text" value={newCategoryName} onChange={handleCategoryInputChange} placeholder="e.g., Travel" className="col-span-3 retro-input" />
                           </div>
                       </div>
                       <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
                           <DialogClose asChild>
                              <Button type="button" variant="secondary" className="retro-button">Cancel</Button>
                           </DialogClose>
                          <Button type="submit" variant="primary" className="retro-button" onClick={submitAddCategory}>
                            Add Category
                          </Button>
                       </DialogFooter>
                     </DialogContent>
                </Dialog>
          </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr]">
        {/* Overall Budget Summary */}
        <Card className="retro-card">
           <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
             <CardTitle className="flex items-center gap-2 text-xl">
                <HandCoins className="h-5 w-5" />
                Monthly Overview
             </CardTitle>
               <div className="retro-window-controls">
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                </div>
           </CardHeader>
          <CardContent className="retro-card-content !border-t-0 space-y-4">
            <div className="text-center">
               <p className="text-base text-muted-foreground">Total Spent</p>
               <p className="text-3xl font-semibold">${totalSpent.toLocaleString()}</p>
            </div>
              <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="retro-progress h-3.5" indicatorClassName={cn("retro-progress-indicator", savingsPercentage >= 0 ? "!bg-accent" : "!bg-destructive")} />
             <div className="flex justify-between text-sm text-muted-foreground">
               <span>${Math.max(0, totalBudget - totalSpent).toLocaleString()} Left</span>
               <span>Budget: ${totalBudget.toLocaleString()}</span>
             </div>
              <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">Net Savings</span>
                  <span className={cn("text-lg font-semibold", netSavings >= 0 ? 'text-green-500' : 'text-destructive')}>
                      {formatCurrency(netSavings)} ({savingsPercentage.toFixed(1)}%)
                  </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                 <span className="text-sm text-muted-foreground">Daily Spending Avg.</span>
                 <span className="text-lg font-semibold">{formatCurrency(dailySpendingAverage)}</span>
              </div>
             <div className="flex gap-3 pt-3">
                 <Button variant={isEditMode ? "secondary" : "default"} className="flex-1 retro-button" onClick={toggleEditMode}>
                    {isEditMode ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditMode ? 'Save Budgets' : 'Edit Budgets'}
                 </Button>
                 {isEditMode && (
                     <Button variant="ghost" size="icon" onClick={cancelEditMode} className="retro-button-ghost text-muted-foreground hover:text-destructive">
                        <X className="h-5 w-5"/>
                        <span className="sr-only">Cancel</span>
                     </Button>
                 )}
             </div>
          </CardContent>
        </Card>

         {/* Spending Categories Chart */}
        <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
             <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5" />
                Spending by Category
             </CardTitle>
               <div className="retro-window-controls">
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                </div>
           </CardHeader>
           <CardContent className="retro-card-content !border-t-0 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/0.6)" />
                        <XAxis dataKey="category" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                        <YAxis tickFormatter={formatCurrency} tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                        <RechartsTooltip formatter={(value: number) => formatCurrency(value)}
                            contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--foreground))', fontFamily: 'var(--font-sans)', fontSize: '12px', boxShadow: 'none' }}
                            itemStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '15px', fontFamily: 'var(--font-sans)' }} />
                        <Bar dataKey="budget" barSize={20} fill="hsl(var(--muted))" />
                        <Bar dataKey="spent" barSize={20} fill="hsl(var(--primary))" />
                    </BarChart>
                </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Budget Table */}
       <Card className="retro-card overflow-hidden">
          <CardHeader className="retro-card-header">
           <CardTitle className="text-xl">Budget Details</CardTitle>
            <div className="retro-window-controls">
                <span></span><span></span><span></span>
            </div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0">
          <div className="overflow-x-auto">
              <Table className="retro-table">
                 <TableHeader>
                  <TableRow>
                     <TableHead className="w-[200px] sm:w-[250px] text-base">Category</TableHead>
                     <TableHead className="text-right text-base">Spent</TableHead>
                     <TableHead className="text-right w-[120px] sm:w-[150px] text-base">Budget</TableHead>
                     <TableHead className="text-right text-base">Remaining</TableHead>
                     <TableHead className="w-[150px] sm:w-[180px] text-base">Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetData.map((item) => {
                     const percentage = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0;
                     const remaining = item.budget - item.spent;
                     const progressColor = remaining < 0 ? "!bg-destructive" : percentage > 85 ? "!bg-accent" : "!bg-primary";

                    return (
                      <TableRow key={item.id}>
                         <TableCell className="font-medium">{item.category}
                         {remaining < 0 && (
                           <AlertTriangle className="inline-block h-4 w-4 ml-1 text-destructive" />
                         )}
                         </TableCell>
                         <TableCell className="text-right">${item.spent.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                           {isEditMode ? (
                             <Input
                               type="number"
                               value={editingBudgets[item.id] ?? ''}
                               onChange={(e) => handleEditBudgetChange(item.id, e.target.value)}
                                className="retro-input h-8 !text-base w-24 sm:w-28"
                               />
                           ) : (
                             `$${item.budget.toLocaleString()}`
                           )}
                        </TableCell>
                         <TableCell className={cn("text-right", remaining < 0 ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                          {remaining < 0 ? `-$${Math.abs(remaining).toLocaleString()}` : `$${remaining.toLocaleString()}`}
                        </TableCell>
                        <TableCell>
                           <Progress value={percentage} className={cn("retro-progress h-3", progressColor)} indicatorClassName={cn("retro-progress-indicator", progressColor)} />
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
