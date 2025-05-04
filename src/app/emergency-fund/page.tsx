'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, PlusCircle, MinusCircle, DollarSign, ListChecks, Check, Trash2, X } from "lucide-react";
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
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea

interface EmergencyFundTransaction {
    id: string;
    date: string; // ISO string format
    type: 'deposit' | 'withdrawal';
    amount: number;
    notes?: string;
}

interface EmergencyFundData {
    target: number;
    current: number;
    transactions: EmergencyFundTransaction[];
}

// Initial Mock data
const initialEmergencyFundData: EmergencyFundData = {
    target: 15000,
    current: 4500,
    transactions: [
        { id: "eft1", date: "2024-04-15", type: "deposit", amount: 500, notes: "Monthly savings transfer" },
        { id: "eft2", date: "2024-03-15", type: "deposit", amount: 500 },
        { id: "eft3", date: "2024-02-20", type: "withdrawal", amount: 1200, notes: "Unexpected car repair" },
        { id: "eft4", date: "2024-02-15", type: "deposit", amount: 500 },
        { id: "eft5", date: "2024-01-15", type: "deposit", amount: 500 },
        { id: "eft6", date: "2023-12-15", type: "deposit", amount: 2500, notes: "Initial seed funding" },
    ],
};

export default function EmergencyFundPage() {
  const [fundData, setFundData] = useState<EmergencyFundData>(initialEmergencyFundData);
  const [isModifyFundOpen, setIsModifyFundOpen] = useState(false);
  const [modifyType, setModifyType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [modifyAmount, setModifyAmount] = useState<string>('');
  const [modifyNotes, setModifyNotes] = useState<string>('');
  const [targetAmount, setTargetAmount] = useState<string>(fundData.target.toString());
  const [isEditingTarget, setIsEditingTarget] = useState(false);


  const sortedTransactions = useMemo(() => {
    return [...fundData.transactions].sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
  }, [fundData.transactions]);

  const progressPercentage = useMemo(() => {
      return fundData.target > 0 ? Math.min((fundData.current / fundData.target) * 100, 100) : 0;
  }, [fundData.current, fundData.target]);

  const monthsOfExpensesCovered = useMemo(() => {
      // Assuming average monthly expenses of $3000 for this example
      const averageMonthlyExpenses = 3000;
      return fundData.current > 0 ? (fundData.current / averageMonthlyExpenses).toFixed(1) : '0.0';
  }, [fundData.current]);

   const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setTargetAmount(e.target.value);
   };

   const saveTargetAmount = () => {
       const newTarget = parseFloat(targetAmount);
       if (!isNaN(newTarget) && newTarget >= 0) {
           setFundData(prev => ({ ...prev, target: newTarget }));
           setIsEditingTarget(false);
       } else {
           // Add error handling/feedback if needed
           setTargetAmount(fundData.target.toString()); // Revert if invalid
       }
   };

  const handleModifyFund = () => {
      const amount = parseFloat(modifyAmount);
      if (!isNaN(amount) && amount > 0) {
          const newTransaction: EmergencyFundTransaction = {
              id: Date.now().toString(),
              date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
              type: modifyType,
              amount: amount,
              notes: modifyNotes.trim() || undefined,
          };

          let newCurrentAmount = fundData.current;
          if (modifyType === 'deposit') {
              newCurrentAmount += amount;
          } else {
              newCurrentAmount -= amount;
          }

          setFundData(prev => ({
              ...prev,
              current: Math.max(0, newCurrentAmount), // Ensure current doesn't go below 0
              transactions: [newTransaction, ...prev.transactions],
          }));

          setIsModifyFundOpen(false);
          setModifyAmount('');
          setModifyNotes('');
      } else {
          // Handle invalid amount error (e.g., show a toast)
          console.error("Invalid amount entered.");
      }
  };

    const handleDeleteTransaction = (id: string) => {
        const transactionToDelete = fundData.transactions.find(tx => tx.id === id);
        if (!transactionToDelete) return;

        let newCurrentAmount = fundData.current;
        if (transactionToDelete.type === 'deposit') {
            newCurrentAmount -= transactionToDelete.amount;
        } else {
            newCurrentAmount += transactionToDelete.amount;
        }

        setFundData(prev => ({
            ...prev,
            current: Math.max(0, newCurrentAmount),
            transactions: prev.transactions.filter(tx => tx.id !== id)
        }));
        // TODO: Add confirmation dialog and success toast
    };


  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    try {
       return format(parseISO(dateString), 'MMM dd, yyyy');
    } catch (error) {
        console.error("Error parsing date:", dateString, error);
        return "Invalid Date";
    }
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
         <h1 className="text-3xl font-semibold flex items-center gap-2">
            <ShieldAlert className="h-7 w-7 text-primary" /> Emergency Fund Tracker
         </h1>
           <Dialog open={isModifyFundOpen} onOpenChange={setIsModifyFundOpen}>
             <DialogTrigger asChild>
                 <Button variant="primary" className="retro-button">
                    <DollarSign className="mr-2 h-4 w-4" /> Add/Remove Funds
                 </Button>
             </DialogTrigger>
              <DialogContent className="retro-window sm:max-w-[480px]">
                  <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
                   <DialogTitle>Modify Emergency Fund</DialogTitle>
                    <DialogDescription className="!text-primary-foreground/80">Record a deposit or withdrawal.</DialogDescription>
                    <div className="retro-window-controls">
                       <span className="!bg-primary !border-primary-foreground"></span>
                       <span className="!bg-primary !border-primary-foreground"></span>
                        <DialogClose asChild>
                           <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                               <X className="h-3 w-3"/>
                               <span className="sr-only">Close</span>
                           </Button>
                        </DialogClose>
                   </div>
                 </DialogHeader>
                 <div className="space-y-4 p-4 retro-window-content !border-t-0">
                     <div className="flex gap-4">
                        <Button
                            variant={modifyType === 'deposit' ? 'secondary' : 'outline'}
                            className="flex-1 retro-button"
                            onClick={() => setModifyType('deposit')}
                        >
                           <PlusCircle className="mr-2 h-4 w-4" /> Deposit
                        </Button>
                        <Button
                           variant={modifyType === 'withdrawal' ? 'destructive' : 'outline'}
                           className="flex-1 retro-button"
                           onClick={() => setModifyType('withdrawal')}
                        >
                          <MinusCircle className="mr-2 h-4 w-4" /> Withdrawal
                        </Button>
                     </div>

                   <div className="grid grid-cols-4 items-center gap-3">
                     <Label htmlFor="amount" className="text-right text-sm">Amount ($)</Label>
                     <Input id="amount" type="number" min="0.01" step="0.01" value={modifyAmount} onChange={(e) => setModifyAmount(e.target.value)} placeholder="e.g., 500.00" className="col-span-3 retro-input" />
                   </div>
                    <div className="grid grid-cols-4 items-start gap-3">
                     <Label htmlFor="notes" className="text-right text-sm pt-2">Notes <span className="text-xs text-muted-foreground">(Opt.)</span></Label>
                      <Textarea id="notes" value={modifyNotes} onChange={(e) => setModifyNotes(e.target.value)} placeholder="Reason for transaction..." className="col-span-3 retro-textarea h-20" />
                   </div>
                 </div>
                 <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
                     <DialogClose asChild>
                        <Button type="button" variant="secondary" className="retro-button">Cancel</Button>
                     </DialogClose>
                    <Button type="submit" variant="primary" className="retro-button" onClick={handleModifyFund}>
                      Record Transaction
                    </Button>
                 </DialogFooter>
               </DialogContent>
            </Dialog>
      </div>

        {/* Fund Overview Card */}
        <Card className="retro-card">
           <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
             <CardTitle className="flex items-center gap-2 text-xl">
                <ShieldAlert className="h-5 w-5" />
                Fund Status
             </CardTitle>
               <div className="retro-window-controls">
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                </div>
           </CardHeader>
          <CardContent className="retro-card-content !border-t-0 space-y-4 pt-6">
             <div className="text-center">
                 <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                 <p className="text-4xl font-bold text-foreground">{formatCurrency(fundData.current)}</p>
             </div>
              <Progress value={progressPercentage} className="retro-progress h-4" indicatorClassName="!bg-accent" />
              <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Target:</span>
                 <div className="flex items-center gap-2">
                      {isEditingTarget ? (
                         <>
                             <Input
                                 type="number"
                                 value={targetAmount}
                                 onChange={handleTargetChange}
                                 className="retro-input h-7 w-28 text-right !text-sm"
                                 onBlur={saveTargetAmount}
                                 onKeyDown={(e) => e.key === 'Enter' && saveTargetAmount()}
                             />
                              <Button variant="ghost" size="icon" className="h-6 w-6 retro-button-ghost text-green-500 hover:bg-green-500/10" onClick={saveTargetAmount}>
                                 <Check className="h-4 w-4"/>
                              </Button>
                               <Button variant="ghost" size="icon" className="h-6 w-6 retro-button-ghost text-muted-foreground hover:bg-muted/50" onClick={() => {setIsEditingTarget(false); setTargetAmount(fundData.target.toString());}}>
                                 <X className="h-4 w-4"/>
                              </Button>
                         </>
                      ) : (
                         <>
                            <span className="font-semibold text-foreground">{formatCurrency(fundData.target)}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 retro-button-ghost text-muted-foreground hover:text-primary" onClick={() => setIsEditingTarget(true)}>
                               <Edit className="h-4 w-4"/>
                                <span className="sr-only">Edit Target</span>
                            </Button>
                        </>
                      )}
                 </div>
              </div>
               <div className="text-center text-muted-foreground text-sm pt-2">
                   Covers approximately <span className="font-semibold text-foreground">{monthsOfExpensesCovered}</span> months of estimated expenses.
               </div>
          </CardContent>
        </Card>

      {/* Transaction History */}
       <Card className="retro-card overflow-hidden">
         <CardHeader className="retro-card-header">
           <CardTitle className="text-xl flex items-center gap-2">
              <ListChecks className="h-5 w-5"/> Transaction History
            </CardTitle>
            <div className="retro-window-controls"><span></span><span></span><span></span></div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0">
          <div className="overflow-x-auto">
              <Table className="retro-table min-w-[600px]">
                 <TableHeader>
                  <TableRow>
                     <TableHead className="w-[120px]">Date</TableHead>
                     <TableHead className="w-[100px]">Type</TableHead>
                     <TableHead className="text-right w-[120px]">Amount</TableHead>
                     <TableHead>Notes</TableHead>
                      <TableHead className="text-center w-[50px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedTransactions.length > 0 ? sortedTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                         <TableCell className="text-sm">{formatDate(tx.date)}</TableCell>
                         <TableCell>
                             <Badge
                                variant={tx.type === 'deposit' ? 'secondary' : 'destructive'}
                                className="retro-badge capitalize"
                              >
                                {tx.type}
                              </Badge>
                         </TableCell>
                         <TableCell className={`text-right font-medium ${tx.type === 'deposit' ? 'text-green-500' : 'text-destructive'}`}>
                           {tx.type === 'deposit' ? '+' : '-'} {formatCurrency(tx.amount)}
                         </TableCell>
                         <TableCell className="text-sm text-muted-foreground italic">{tx.notes || 'N/A'}</TableCell>
                          <TableCell className="text-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 retro-button-ghost text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteTransaction(tx.id)}
                                // Add confirmation later if needed
                            >
                                <Trash2 className="h-4 w-4"/>
                                <span className="sr-only">Delete</span>
                            </Button>
                         </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground italic">
                          No transactions recorded yet.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
          </div>
        </CardContent>
         {sortedTransactions.length > 8 && (
             <CardFooter className="retro-card-content !border-t-2 !py-2 text-xs text-muted-foreground">
                 Showing {sortedTransactions.length} transactions.
             </CardFooter>
        )}
      </Card>
    </div>
  );
}

