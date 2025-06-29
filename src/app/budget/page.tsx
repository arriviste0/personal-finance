'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { HandCoins, TrendingUp, PlusCircle, Edit, Save, X, DollarSign, AlertTriangle, Undo, Redo, Loader2 } from "lucide-react";
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
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useBudget, useUpdateBudget } from '@/hooks/use-budget';
import type { BudgetSchema, BudgetItemSchema } from '@/lib/db-schemas';
import { Skeleton } from '@/components/ui/skeleton';
import { useUndoRedo } from '@/hooks/use-undo-redo';
import { UndoRedoButtons } from '@/components/ui/undo-redo-buttons';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

// Interface for budget state in undo/redo (simplified version)
interface BudgetState {
  budgetItems: Array<{
    _id: string;
    category: string;
    budget: number;
    spent: number;
    color: string;
  }>;
  totalBudget: number;
  totalSpent: number;
}

export default function BudgetPage() {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const { data: budgetData, isLoading, error } = useBudget(selectedMonth);
  const updateBudgetMutation = useUpdateBudget();
  const { toast } = useToast();

  const [editingBudgets, setEditingBudgets] = useState<Record<string, number>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // Initialize undo/redo with current budget data
  const [budgetState, undoRedoActions] = useUndoRedo<BudgetState>(
    budgetData ? {
      budgetItems: budgetData.budgetItems.map((item: BudgetItemSchema) => ({
        ...item,
        _id: item._id.toString()
      })),
      totalBudget: budgetData.totalBudget,
      totalSpent: budgetData.totalSpent
    } : { budgetItems: [], totalBudget: 0, totalSpent: 0 },
    20 // Max 20 history entries
  );

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: undoRedoActions.undo,
    onRedo: undoRedoActions.redo,
    canUndo: undoRedoActions.canUndo,
    canRedo: undoRedoActions.canRedo
  });

  const budgetItems = budgetData?.budgetItems || [];

  const totalSpent = useMemo(() => budgetItems.reduce((sum: number, item: BudgetItemSchema) => sum + item.spent, 0), [budgetItems]);
  const totalBudget = useMemo(() => budgetItems.reduce((sum: number, item: BudgetItemSchema) => sum + item.budget, 0), [budgetItems]);
  const netSavings = useMemo(() => totalBudget - totalSpent, [totalBudget, totalSpent]);

  const barChartData = budgetItems.map((item: BudgetItemSchema) => ({
        category: item.category,
        budget: item.budget,
        spent: item.spent,
        remaining: item.budget - item.spent,
    }));

  const handleEditBudgetChange = (id: string, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setEditingBudgets(prev => ({ ...prev, [id]: numericValue }));
    
    // Update the undo/redo state with the new budget values
    const updatedItems = budgetItems.map((item: BudgetItemSchema) => ({
      ...item,
      budget: item._id.toString() === id ? numericValue : (editingBudgets[item._id.toString()] ?? item.budget),
      _id: item._id.toString()
    }));
    
    const updatedBudget = {
      budgetItems: updatedItems,
      totalBudget: updatedItems.reduce((sum: number, item: { budget: number }) => sum + item.budget, 0),
      totalSpent: totalSpent,
    };
    
    undoRedoActions.pushState(updatedBudget);
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      // Save logic
      const updatedItems = budgetItems.map((item: BudgetItemSchema) => ({
          ...item,
          budget: editingBudgets[item._id.toString()] ?? item.budget,
          _id: item._id.toString()
      }));
      
      if (!budgetData) return;
      
      const updatedBudget = {
          monthYear: selectedMonth,
          budgetItems: updatedItems,
          totalBudget: budgetData.totalBudget,
          totalSpent: budgetData.totalSpent,
          updatedAt: new Date(),
      };

      updateBudgetMutation.mutate(updatedBudget, {
          onSuccess: () => {
            toast({ title: "Budget Saved!" });
            undoRedoActions.clearHistory();
          },
          onError: () => toast({ title: "Save Failed", description: "Could not save budget.", variant: "destructive" })
      });
      
      setEditingBudgets({});
    } else {
      // Enter edit mode
      const currentBudgets = budgetItems.reduce((acc: Record<string, number>, item: BudgetItemSchema) => {
        acc[item._id.toString()] = item.budget;
        return acc;
      }, {} as Record<string, number>);
      setEditingBudgets(currentBudgets);
    }
    setIsEditMode(!isEditMode);
  };

  const cancelEditMode = () => {
     setEditingBudgets({});
     setIsEditMode(false);
     undoRedoActions.clearHistory();
  }

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

   const submitAddCategory = () => {
       if (newCategoryName.trim() && budgetData) {
           const newCategory = {
               category: newCategoryName,
               spent: 0,
               budget: 0,
               color: "hsl(var(--chart-6))",
           };
           const updatedBudget = {
               monthYear: selectedMonth,
               budgetItems: [...budgetItems, newCategory],
               totalBudget: budgetData.totalBudget,
               totalSpent: budgetData.totalSpent,
               updatedAt: new Date(),
           }
           updateBudgetMutation.mutate(updatedBudget, {
                onSuccess: () => {
                    toast({ title: "Category Added" });
                    setIsAddCategoryOpen(false);
                    setNewCategoryName('');
                },
                onError: () => toast({ title: "Failed to Add", variant: "destructive"})
           });
       }
   };
  
   if (isLoading) return <BudgetSkeleton />;

   if (error) return <div className='text-destructive'>Error loading budget data.</div>;

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pt-8">
         <h1 className="text-3xl font-semibold font-heading">BUDGET TRACKER</h1>
          <div className="flex gap-2">
            {/* Undo/Redo buttons */}
            {isEditMode && (
              <UndoRedoButtons
                canUndo={undoRedoActions.canUndo}
                canRedo={undoRedoActions.canRedo}
                onUndo={undoRedoActions.undo}
                onRedo={undoRedoActions.redo}
                variant="outline"
                size="sm"
              />
            )}
            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
              <DialogTrigger asChild>
                  <Button variant="outline" className="hover:bg-primary/10 hover:text-primary">
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
                         <Input id="new-category-input" type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="e.g., Travel" className="col-span-3 retro-input" />
                       </div>
                   </div>
                   <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
                       <DialogClose asChild>
                          <Button type="button" variant="secondary">Cancel</Button>
                       </DialogClose>
                      <Button type="submit" variant="primary" onClick={submitAddCategory} disabled={updateBudgetMutation.isPending}>
                        {updateBudgetMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
             <CardTitle className="flex items-center gap-2 text-xl font-heading">
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
               <p className="text-3xl font-semibold">{formatCurrency(totalSpent)}</p>
            </div>
              <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="retro-progress h-3.5" indicatorClassName={cn("retro-progress-indicator", netSavings >= 0 ? "!bg-accent" : "!bg-destructive")} />
             <div className="flex justify-between text-sm text-muted-foreground">
               <span>{formatCurrency(Math.max(0, totalBudget - totalSpent))} Left</span>
               <span>Budget: {formatCurrency(totalBudget)}</span>
             </div>
             <div className="flex gap-3 pt-3">
                 <Button variant={isEditMode ? "secondary" : "default"} className="flex-1" onClick={toggleEditMode} disabled={updateBudgetMutation.isPending}>
                    {isEditMode ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditMode ? (updateBudgetMutation.isPending ? 'Saving...' : 'Save Budgets') : 'Edit Budgets'}
                 </Button>
                 {isEditMode && (
                     <Button variant="ghost" size="icon" onClick={cancelEditMode} className="text-muted-foreground hover:text-destructive">
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
             <CardTitle className="flex items-center gap-2 text-xl font-heading">
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
           <CardTitle className="text-xl font-heading">Budget Details</CardTitle>
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
                  {budgetItems.map((item: BudgetItemSchema) => {
                     const percentage = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0;
                     const remaining = item.budget - item.spent;
                     const progressColor = remaining < 0 ? "!bg-destructive" : percentage > 85 ? "!bg-accent" : "!bg-primary";

                    return (
                      <TableRow key={item._id.toString()}>
                         <TableCell className="font-medium">{item.category}
                         {remaining < 0 && (
                           <AlertTriangle className="inline-block h-4 w-4 ml-1 text-destructive" />
                         )}
                         </TableCell>
                         <TableCell className="text-right">{formatCurrency(item.spent)}</TableCell>
                        <TableCell className="text-right">
                           {isEditMode ? (
                             <Input
                               type="number"
                               value={editingBudgets[item._id.toString()] ?? ''}
                               onChange={(e) => handleEditBudgetChange(item._id.toString(), e.target.value)}
                                className="retro-input h-8 !text-base w-24 sm:w-28"
                               />
                           ) : (
                             formatCurrency(item.budget)
                           )}
                        </TableCell>
                         <TableCell className="text-right">{formatCurrency(remaining)}</TableCell>
                         <TableCell>
                           <div className="flex items-center gap-2">
                             <Progress value={percentage} className="retro-progress h-2 flex-1" indicatorClassName={cn("retro-progress-indicator", progressColor)} />
                             <span className="text-xs text-muted-foreground w-12 text-right">{percentage.toFixed(0)}%</span>
                           </div>
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

const BudgetSkeleton = () => (
  <div className="space-y-6">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pt-8">
      <div className="h-8 w-48 bg-muted animate-pulse rounded" />
      <div className="h-10 w-32 bg-muted animate-pulse rounded" />
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr]">
      <div className="h-64 bg-muted animate-pulse rounded-lg" />
      <div className="h-64 bg-muted animate-pulse rounded-lg" />
    </div>
    <div className="h-96 bg-muted animate-pulse rounded-lg" />
  </div>
);
