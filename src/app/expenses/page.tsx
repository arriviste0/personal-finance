
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { PlusCircle, Filter, ListChecks, Trash2, X, Edit, Loader2 } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { addDays, format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { useExpenses, useAddExpense, useUpdateExpense, useDeleteExpense } from '@/hooks/use-expenses';
import type { TransactionSchema } from '@/lib/db-schemas';
import { Skeleton } from '@/components/ui/skeleton';

const categories = ["Food", "Transport", "Fun Money", "Shopping", "Utilities", "Rent/Mortgage", "Other"];

const defaultNewExpenseState = { description: '', category: categories[0], amount: '', date: format(new Date(), 'yyyy-MM-dd') };

export default function ExpensesPage() {
  const { data: transactions = [], isLoading, error } = useExpenses();
  const addExpenseMutation = useAddExpense();
  const updateExpenseMutation = useUpdateExpense();
  const deleteExpenseMutation = useDeleteExpense();
  
  const [filteredCategory, setFilteredCategory] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
   const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
   const [editingTransaction, setEditingTransaction] = useState<TransactionSchema | null>(null);
   const [newExpense, setNewExpense] = useState(defaultNewExpenseState);
   const { toast } = useToast();

    useEffect(() => {
        if (editingTransaction) {
            setNewExpense({
                description: editingTransaction.description,
                category: editingTransaction.category,
                amount: String(Math.abs(editingTransaction.amount)),
                date: format(new Date(editingTransaction.date), 'yyyy-MM-dd'),
            });
        } else {
            setNewExpense(defaultNewExpenseState);
        }
    }, [editingTransaction, isFormDialogOpen]);


  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(tx => {
        const txDate = new Date(tx.date);
        const categoryMatch = filteredCategory === 'all' || tx.category === filteredCategory;
        const dateMatch = !dateRange || (
          (!dateRange.from || txDate >= dateRange.from) &&
          (!dateRange.to || txDate <= addDays(dateRange.to, 1)) // Add 1 day to include the 'to' date
        );
        return categoryMatch && dateMatch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filteredCategory, dateRange]);

   const handleAddExpenseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setNewExpense(prev => ({ ...prev, [e.target.id]: e.target.value }));
   };
    const handleAddExpenseCategoryChange = (value: string) => setNewExpense(prev => ({ ...prev, category: value }));
    const handleAddExpenseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewExpense(prev => ({ ...prev, date: e.target.value }));

   const handleFormSubmit = () => {
       const amount = parseFloat(newExpense.amount);
       if (!newExpense.description || !newExpense.category || isNaN(amount) || amount <= 0 || !newExpense.date) {
           toast({ title: "Invalid Input", description: "Please fill out all fields.", variant: "destructive" });
           return;
       }

       const payload = {
          description: newExpense.description,
          category: newExpense.category,
          amount: -amount,
          date: new Date(newExpense.date),
       };

       if (editingTransaction) {
           updateExpenseMutation.mutate({ ...payload, _id: editingTransaction._id }, {
               onSuccess: () => {
                   toast({ title: "Transaction Updated" });
                   setIsFormDialogOpen(false);
               },
               onError: (err) => toast({ title: "Update Failed", description: err.message, variant: "destructive"})
           });
       } else {
           addExpenseMutation.mutate(payload as any, {
               onSuccess: () => {
                   toast({ title: "Transaction Added" });
                   setIsFormDialogOpen(false);
               },
               onError: (err) => toast({ title: "Add Failed", description: err.message, variant: "destructive"})
           });
       }
   };

    const handleDeleteTransaction = (id: string) => {
        deleteExpenseMutation.mutate(id, {
            onSuccess: () => toast({ title: "Transaction Deleted" }),
            onError: (err) => toast({ title: "Delete Failed", description: err.message, variant: "destructive" })
        });
    }
    
    const openEditDialog = (tx: TransactionSchema) => {
        setEditingTransaction(tx);
        setIsFormDialogOpen(true);
    }
    const openAddDialog = () => {
        setEditingTransaction(null);
        setIsFormDialogOpen(true);
    }
    const onDialogClose = (open: boolean) => {
        if (!open) setEditingTransaction(null);
        setIsFormDialogOpen(open);
    }

  const formatCurrency = (amount: number) => {
    const value = Math.abs(amount);
    const sign = amount < 0 ? '-' : '+';
    return `${sign}$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  const formatDateDisplay = (date: Date | string) => format(new Date(date), 'MMM dd, yyyy');

  const isMutating = addExpenseMutation.isPending || updateExpenseMutation.isPending;

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pt-8">
         <h1 className="text-3xl font-semibold flex items-center gap-2"><ListChecks className="h-7 w-7 text-primary" /> Expense Tracker</h1>
         <div className="flex items-center gap-2">
            {/* Undo/Redo removed for DB state */}
            <Dialog open={isFormDialogOpen} onOpenChange={onDialogClose}>
               <DialogTrigger asChild>
                   <Button variant="primary" onClick={openAddDialog}><PlusCircle className="mr-2 h-4 w-4" /> Add Expense</Button>
               </DialogTrigger>
                <DialogContent className="retro-window sm:max-w-[450px]">
                    <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
                     <DialogTitle>{editingTransaction ? 'Edit Expense' : 'Add New Expense'}</DialogTitle>
                      <DialogDescription className="!text-primary-foreground/80">{editingTransaction ? 'Update the details.' : 'Log a new transaction.'}</DialogDescription>
                      <div className="retro-window-controls">
                         <span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span>
                          <DialogClose asChild>
                              <Button type="button" variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80"><X className="h-3 w-3"/><span className="sr-only">Close</span></Button>
                          </DialogClose>
                     </div>
                   </DialogHeader>
                   <div className="space-y-4 p-4 retro-window-content !border-t-0">
                      <div className="grid grid-cols-4 items-center gap-3">
                         <Label htmlFor="description" className="text-right text-sm">Description</Label>
                         <Input id="description" value={newExpense.description} onChange={handleAddExpenseInputChange} placeholder="e.g., Lunch meeting" className="col-span-3 retro-input" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-3">
                         <Label htmlFor="category" className="text-right text-sm">Category</Label>
                          <Select value={newExpense.category} onValueChange={handleAddExpenseCategoryChange}>
                            <SelectTrigger id="category" className="col-span-3 retro-select-trigger"><SelectValue placeholder="Select category" /></SelectTrigger>
                            <SelectContent className="retro-select-content">{categories.map(cat => (<SelectItem key={cat} value={cat} className="retro-select-item">{cat}</SelectItem>))}</SelectContent>
                          </Select>
                      </div>
                     <div className="grid grid-cols-4 items-center gap-3">
                       <Label htmlFor="amount" className="text-right text-sm">Amount ($)</Label>
                       <Input id="amount" type="number" min="0" step="0.01" value={newExpense.amount} onChange={handleAddExpenseInputChange} placeholder="e.g., 15.75" className="col-span-3 retro-input" />
                     </div>
                     <div className="grid grid-cols-4 items-center gap-3">
                       <Label htmlFor="date" className="text-right text-sm">Date</Label>
                       <Input id="date" type="date" value={newExpense.date} onChange={handleAddExpenseDateChange} className="col-span-3 retro-input" />
                     </div>
                   </div>
                   <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
                       <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                      <Button type="submit" variant="primary" onClick={handleFormSubmit} disabled={isMutating}>
                        {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {editingTransaction ? 'Save Changes' : 'Add Expense'}
                      </Button>
                   </DialogFooter>
                 </DialogContent>
              </Dialog>
            </div>
      </div>

       <Card className="retro-card">
          <CardHeader className="retro-card-header !py-3"><CardTitle className="text-base flex items-center gap-2"><Filter className="h-4 w-4"/> Filters</CardTitle><div className="retro-window-controls"><span></span><span></span><span></span></div></CardHeader>
         <CardContent className="retro-card-content !border-t-0 !pt-4 grid grid-cols-1 sm:grid-cols-2 items-end gap-4">
             <div className="space-y-1"><Label htmlFor="category-filter" className="text-xs">Filter by Category</Label>
                <Select value={filteredCategory} onValueChange={setFilteredCategory}><SelectTrigger id="category-filter" className="retro-select-trigger h-9 w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent className="retro-select-content"><SelectItem value="all" className="retro-select-item">All Categories</SelectItem>{categories.map(cat => (<SelectItem key={cat} value={cat} className="retro-select-item">{cat}</SelectItem>))}</SelectContent>
                </Select>
             </div>
             <div className="space-y-1"><Label className="text-xs block mb-1">Filter by Date Range</Label><DatePickerWithRange date={dateRange} setDate={setDateRange} buttonClassName="h-9 [&>span]:text-muted-foreground"/></div>
         </CardContent>
       </Card>

       <Card className="retro-card overflow-hidden">
         <CardHeader className="retro-card-header"><CardTitle className="text-xl">Transaction History</CardTitle><div className="retro-window-controls"><span></span><span></span><span></span></div></CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0">
          <div className="overflow-x-auto">
              <Table className="retro-table min-w-[600px]">
                 <TableHeader><TableRow><TableHead className="w-[120px]">Date</TableHead><TableHead>Description</TableHead><TableHead className="w-[150px]">Category</TableHead><TableHead className="text-right w-[100px]">Amount</TableHead><TableHead className="text-center w-[100px]">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {isLoading ? (
                      [...Array(5)].map((_, i) => (
                          <TableRow key={i}><TableCell colSpan={5}><Skeleton className="h-6 w-full" /></TableCell></TableRow>
                      ))
                  ) : error ? (
                      <TableRow><TableCell colSpan={5} className="h-24 text-center text-destructive">Error loading transactions: {error.message}</TableCell></TableRow>
                  ) : filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
                      <TableRow key={tx._id.toString()}>
                         <TableCell className="text-sm">{formatDateDisplay(tx.date)}</TableCell>
                         <TableCell className="font-medium">{tx.description}</TableCell>
                         <TableCell><Badge variant="secondary" className="retro-badge">{tx.category}</Badge></TableCell>
                         <TableCell className={`text-right font-medium ${tx.amount < 0 ? 'text-destructive' : 'text-green-600'}`}>{formatCurrency(tx.amount)}</TableCell>
                         <TableCell className="text-center">
                            <div className="flex justify-center items-center gap-1">
                               <Button variant="ghost" size="icon" className="h-8 w-8 group" onClick={() => openEditDialog(tx)}><Edit className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" /><span className="sr-only">Edit</span></Button>
                               <AlertDialog>
                                   <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8 group"><Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors"/><span className="sr-only">Delete</span></Button></AlertDialogTrigger>
                                   <AlertDialogContent className="retro-window">
                                     <AlertDialogHeader className="retro-window-header !bg-destructive !text-destructive-foreground"><AlertDialogTitle>Are you sure?</AlertDialogTitle><div className="retro-window-controls"><span></span><span></span></div></AlertDialogHeader>
                                     <AlertDialogDescription className="retro-window-content !border-t-0 !pt-2">This will permanently delete the transaction for "{tx.description}".</AlertDialogDescription>
                                     <AlertDialogFooter className="retro-window-content !pt-4 !border-t-0 !flex sm:justify-end gap-2">
                                       <AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel>
                                       <AlertDialogAction asChild><Button variant="destructive" onClick={() => handleDeleteTransaction(tx._id.toString())}>Delete</Button></AlertDialogAction>
                                     </AlertDialogFooter>
                                   </AlertDialogContent>
                                </AlertDialog>
                            </div>
                         </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow><TableCell colSpan={5} className="h-24 text-center text-muted-foreground italic">No transactions found for the selected filters.</TableCell></TableRow>
                    )}
                </TableBody>
              </Table>
          </div>
        </CardContent>
        {filteredTransactions.length > 5 && (<CardFooter className="retro-card-content !border-t-2 !py-2 text-xs text-muted-foreground">Showing {filteredTransactions.length} transactions.</CardFooter>)}
      </Card>
    </div>
  );
}
