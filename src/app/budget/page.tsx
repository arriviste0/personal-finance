
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

export default function BudgetPage() {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const { data: budgetData, isLoading, error } = useBudget(selectedMonth);
  const updateBudgetMutation = useUpdateBudget();
  const { toast } = useToast();

  const [editingBudgets, setEditingBudgets] = useState<Record<string, number>>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  const budgetItems = budgetData?.budgetItems || [];

  const totalSpent = useMemo(() => budgetItems.reduce((sum, item) => sum + item.spent, 0), [budgetItems]);
  const totalBudget = useMemo(() => budgetItems.reduce((sum, item) => sum + item.budget, 0), [budgetItems]);
  const netSavings = useMemo(() => totalBudget - totalSpent, [totalBudget, totalSpent]);

  const barChartData = budgetItems.map(item => ({
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
      // Save logic
      const updatedItems = budgetItems.map(item => ({
          ...item,
          budget: editingBudgets[item.id.toString()] ?? item.budget,
      }));
      
      const updatedBudget = {
          ...budgetData,
          budgetItems: updatedItems,
          monthYear: selectedMonth,
      };

      updateBudgetMutation.mutate(updatedBudget as BudgetSchema, {
          onSuccess: () => toast({ title: "Budget Saved!" }),
          onError: () => toast({ title: "Save Failed", description: "Could not save budget.", variant: "destructive" })
      });
      
      setEditingBudgets({});
    } else {
      // Enter edit mode
      const currentBudgets = budgetItems.reduce((acc, item) => {
        acc[item.id.toString()] = item.budget;
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

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

   const submitAddCategory = () => {
       if (newCategoryName.trim() && budgetData) {
           const newCategory: BudgetItemSchema = {
               _id: new (require('mongodb').ObjectId)(),
               category: newCategoryName,
               spent: 0,
               budget: 0,
               color: "hsl(var(--chart-6))",
           };
           const updatedBudget = {
               ...budgetData,
               budgetItems: [...budgetData.budgetItems, newCategory],
               monthYear: selectedMonth,
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
         <h1 className="text-3xl font-semibold">BUDGET TRACKER</h1>
          <div className="flex gap-2">
            {/* Note: Undo/Redo is complex with server state, removed for now */}
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
                  {budgetItems.map((item) => {
                     const percentage = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0;
                     const remaining = item.budget - item.spent;
                     const progressColor = remaining < 0 ? "!bg-destructive" : percentage > 85 ? "!bg-accent" : "!bg-primary";

                    return (
                      <TableRow key={item.id.toString()}>
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
                               value={editingBudgets[item.id.toString()] ?? ''}
                               onChange={(e) => handleEditBudgetChange(item.id.toString(), e.target.value)}
                                className="retro-input h-8 !text-base w-24 sm:w-28"
                               />
                           ) : (
                             formatCurrency(item.budget)
                           )}
                        </TableCell>
                         <TableCell className={cn("text-right", remaining < 0 ? 'text-destructive font-medium' : 'text-muted-foreground')}>
                          {formatCurrency(remaining)}
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

const BudgetSkeleton = () => (
    <div className="space-y-6 pt-8">
        <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-10 w-36" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_1fr]">
            <Card className="retro-card">
                <CardHeader className="retro-card-header"><Skeleton className="h-6 w-40" /></CardHeader>
                <CardContent className="retro-card-content !border-t-0 space-y-4">
                    <Skeleton className="h-8 w-1/2 mx-auto" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between"><Skeleton className="h-4 w-1/4" /><Skeleton className="h-4 w-1/4" /></div>
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
            <Card className="retro-card">
                <CardHeader className="retro-card-header"><Skeleton className="h-6 w-48" /></CardHeader>
                <CardContent className="retro-card-content !border-t-0 h-[300px]"><Skeleton className="h-full w-full" /></CardContent>
            </Card>
        </div>
        <Card className="retro-card">
            <CardHeader className="retro-card-header"><Skeleton className="h-6 w-32" /></CardHeader>
            <CardContent className="retro-card-content !border-t-0 p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                            <TableHead><Skeleton className="h-5 w-20" /></TableHead>
                            <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
)
