
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { PlusCircle, Filter, ListChecks, Trash2, X } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { addDays, format, parseISO } from 'date-fns';
import { Badge } from '@/components/ui/badge';
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

interface Transaction {
  id: string;
  date: string; // Store date as ISO string for easier sorting/filtering
  description: string;
  category: string;
  amount: number; // Negative for expenses, positive for income (though focusing on expenses here)
}

// Updated Mock data with dates around April/May 2025
const initialTransactions: Transaction[] = [
  { id: "t1", date: "2025-05-02", description: "Grocery Store Run", category: "Food", amount: -75.50 },
  { id: "t2", date: "2025-05-01", description: "Morning Coffee", category: "Food", amount: -5.25 },
  { id: "t3", date: "2025-04-30", description: "Gas Fill-up", category: "Transport", amount: -42.10 },
  { id: "t4", date: "2025-04-29", description: "Movie Night Tickets", category: "Fun Money", amount: -30.00 },
  { id: "t5", date: "2025-04-20", description: "Online Tech Gadget", category: "Shopping", amount: -120.99 },
  { id: "t6", date: "2025-04-15", description: "Dinner with Friends (Before Range)", category: "Food", amount: -65.00 },
  { id: "t7", date: "2025-05-20", description: "Monthly Subscription (After Range)", category: "Utilities", amount: -15.00 },
  { id: "t8", date: "2025-04-25", description: "Train Ticket", category: "Transport", amount: -22.50 },
];

const categories = ["Food", "Transport", "Fun Money", "Shopping", "Utilities", "Rent/Mortgage", "Other"];

export default function ExpensesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filteredCategory, setFilteredCategory] = useState<string>("all");
  // Set default date range to Apr 19, 2025 - May 19, 2025
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 3, 19), // Month is 0-indexed, so April is 3
    to: new Date(2025, 4, 19),   // May is 4
  });
   const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
   const [newExpense, setNewExpense] = useState({ description: '', category: categories[0], amount: '', date: format(new Date(), 'yyyy-MM-dd') });


  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(tx => {
        const txDate = parseISO(tx.date); // Use parseISO for reliable date parsing
        const categoryMatch = filteredCategory === 'all' || tx.category === filteredCategory;
        const dateMatch = !dateRange || (
          (!dateRange.from || txDate >= dateRange.from) &&
          // For 'to' date, ensure it includes the full day
          (!dateRange.to || txDate <= addDays(dateRange.to, 0)) // addDays(dateRange.to, 0) to ensure end of day is considered for 'to' date
        );
        return categoryMatch && dateMatch;
      })
      .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()); // Sort descending by date
  }, [transactions, filteredCategory, dateRange]);

   const handleAddExpenseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { id, value } = e.target;
       setNewExpense(prev => ({ ...prev, [id]: value }));
   };

    const handleAddExpenseCategoryChange = (value: string) => {
        setNewExpense(prev => ({ ...prev, category: value }));
    };

    const handleAddExpenseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewExpense(prev => ({ ...prev, date: e.target.value }));
    };

   const submitAddExpense = () => {
       const amount = parseFloat(newExpense.amount);
       if (newExpense.description && newExpense.category && !isNaN(amount) && amount > 0 && newExpense.date) {
           const newTx: Transaction = {
               id: Date.now().toString(),
               date: newExpense.date,
               description: newExpense.description,
               category: newExpense.category,
               amount: -amount, // Store expenses as negative
           };
           setTransactions(prev => [newTx, ...prev]);
           setIsAddExpenseOpen(false);
           setNewExpense({ description: '', category: categories[0], amount: '', date: format(new Date(), 'yyyy-MM-dd') });
           // TODO: Add success toast
       } else {
           // TODO: Add error feedback (e.g., toast or inline errors)
           console.error("Invalid expense input");
       }
   };

    const handleDeleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(tx => tx.id !== id));
        // TODO: Add confirmation dialog and success toast
    }


  const formatCurrency = (amount: number) => {
    const value = Math.abs(amount);
    const sign = amount < 0 ? '-' : '+';
    return `${sign}$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDateDisplay = (dateString: string) => { 
    try {
        return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
        console.error("Error formatting date:", dateString, error);
        return "Invalid Date";
    }
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
         <h1 className="text-3xl font-semibold flex items-center gap-2">
            <ListChecks className="h-7 w-7 text-primary" /> Expense Tracker
         </h1>
          <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
             <DialogTrigger asChild>
                 <Button variant="primary" className="retro-button">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
                 </Button>
             </DialogTrigger>
              <DialogContent className="retro-window sm:max-w-[450px]">
                  <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
                   <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription className="!text-primary-foreground/80">Log a new spending transaction.</DialogDescription>
                    <div className="retro-window-controls">
                       <span className="!bg-primary !border-primary-foreground"></span>
                       <span className="!bg-primary !border-primary-foreground"></span>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                                <X className="h-3 w-3"/>
                                <span className="sr-only">Close</span>
                            </Button>
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
                          <SelectTrigger id="category" className="col-span-3 retro-select-trigger">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent className="retro-select-content">
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat} className="retro-select-item">{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    </div>
                   <div className="grid grid-cols-4 items-center gap-3">
                     <Label htmlFor="amount" className="text-right text-sm">Amount ($)</Label>
                     <Input id="amount" type="number" value={newExpense.amount} onChange={handleAddExpenseInputChange} placeholder="e.g., 15.75" className="col-span-3 retro-input" />
                   </div>
                   <div className="grid grid-cols-4 items-center gap-3">
                     <Label htmlFor="date" className="text-right text-sm">Date</Label>
                     <Input id="date" type="date" value={newExpense.date} onChange={handleAddExpenseDateChange} className="col-span-3 retro-input" />
                   </div>
                 </div>
                 <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
                     <DialogClose asChild>
                        <Button type="button" variant="secondary" className="retro-button">Cancel</Button>
                     </DialogClose>
                    <Button type="submit" variant="primary" className="retro-button" onClick={submitAddExpense}>
                      Add Expense
                    </Button>
                 </DialogFooter>
               </DialogContent>
            </Dialog>
      </div>

      {/* Filters */}
       <Card className="retro-card">
          <CardHeader className="retro-card-header !py-3">
            <CardTitle className="text-base flex items-center gap-2">
                <Filter className="h-4 w-4"/> Filters
            </CardTitle>
             <div className="retro-window-controls"><span></span><span></span><span></span></div>
         </CardHeader>
         <CardContent className="retro-card-content !border-t-0 !pt-4 grid grid-cols-1 sm:grid-cols-2 items-end gap-4">
             <div className="space-y-1"> {/* Category Filter Container */}
               <Label htmlFor="category-filter" className="text-xs">Filter by Category</Label>
                <Select value={filteredCategory} onValueChange={setFilteredCategory}>
                    <SelectTrigger id="category-filter" className="retro-select-trigger h-9 w-full"> {/* Ensure w-full */}
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="retro-select-content">
                        <SelectItem value="all" className="retro-select-item">All Categories</SelectItem>
                        {categories.map(cat => (
                            <SelectItem key={cat} value={cat} className="retro-select-item">{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
             </div>
             <div className="space-y-1"> {/* Date Range Filter Container */}
               <Label className="text-xs block mb-1">Filter by Date Range</Label>
                <DatePickerWithRange
                    date={dateRange}
                    setDate={setDateRange}
                    buttonClassName="h-9 [&>span]:text-muted-foreground" // Simplified: retro-button is applied by variant, w-full by internal Button
                />
             </div>
         </CardContent>
       </Card>

      {/* Transactions Table */}
       <Card className="retro-card overflow-hidden">
         <CardHeader className="retro-card-header">
           <CardTitle className="text-xl">Transaction History</CardTitle>
            <div className="retro-window-controls"><span></span><span></span><span></span></div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0">
          <div className="overflow-x-auto">
              <Table className="retro-table min-w-[600px]">
                 <TableHeader>
                  <TableRow>
                     <TableHead className="w-[120px]">Date</TableHead>
                     <TableHead>Description</TableHead>
                     <TableHead className="w-[150px]">Category</TableHead>
                     <TableHead className="text-right w-[100px]">Amount</TableHead>
                     <TableHead className="text-center w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                         <TableCell className="text-sm">{formatDateDisplay(tx.date)}</TableCell>
                         <TableCell className="font-medium">{tx.description}</TableCell>
                         <TableCell><Badge variant="secondary" className="retro-badge">{tx.category}</Badge></TableCell>
                         <TableCell className={`text-right font-medium ${tx.amount < 0 ? 'text-destructive' : 'text-green-600'}`}>
                            {formatCurrency(tx.amount)}
                         </TableCell>
                         <TableCell className="text-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 retro-button-ghost text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteTransaction(tx.id)}
                            >
                                <Trash2 className="h-4 w-4"/>
                                <span className="sr-only">Delete</span>
                            </Button>
                         </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground italic">
                          No transactions found for the selected filters.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
          </div>
        </CardContent>
        {filteredTransactions.length > 5 && (
             <CardFooter className="retro-card-content !border-t-2 !py-2 text-xs text-muted-foreground">
                 Showing {filteredTransactions.length} transactions.
             </CardFooter>
        )}
      </Card>
    </div>
  );
}
