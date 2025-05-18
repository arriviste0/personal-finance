
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, PlusCircle, MinusCircle, DollarSign, ListChecks, Check, Trash2, Edit, X } from "lucide-react";
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { useWallet } from '@/contexts/WalletContext'; // Import useWallet

const EMERGENCY_FUND_ALLOCATION_ID = "emergencyFund";

interface EmergencyFundTransaction { // This remains for local transaction history logging
    id: string;
    date: string;
    type: 'deposit' | 'withdrawal';
    amount: number;
    notes?: string;
}

// Local state for transaction history and target (definition)
const initialEmergencyFundTarget = 15000;
const initialTransactions: EmergencyFundTransaction[] = [
    { id: "eft1", date: "2024-04-15", type: "deposit", amount: 500, notes: "Monthly savings transfer" },
    // ... other mock transactions for display if needed
];

export default function EmergencyFundPage() {
  const { allocations, depositToAllocation, withdrawFromAllocation, walletBalance } = useWallet();
  const { toast } = useToast();

  const emergencyFundAllocation = allocations[EMERGENCY_FUND_ALLOCATION_ID];
  const currentFundAmount = emergencyFundAllocation?.amount || 0;
  const [targetAmount, setTargetAmount] = useState<number>(emergencyFundAllocation?.target || initialEmergencyFundTarget);

  const [transactions, setTransactions] = useState<EmergencyFundTransaction[]>(initialTransactions); // For displaying history
  const [isModifyFundOpen, setIsModifyFundOpen] = useState(false);
  const [modifyType, setModifyType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [modifyAmount, setModifyAmount] = useState<string>('');
  const [modifyNotes, setModifyNotes] = useState<string>('');
  const [editingTargetInput, setEditingTargetInput] = useState<string>(targetAmount.toString());
  const [isEditingTarget, setIsEditingTarget] = useState(false);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime());
  }, [transactions]);

  const progressPercentage = useMemo(() => {
      return targetAmount > 0 ? Math.min((currentFundAmount / targetAmount) * 100, 100) : 0;
  }, [currentFundAmount, targetAmount]);

  const monthsOfExpensesCovered = useMemo(() => {
      const averageMonthlyExpenses = 3000; // Example, should be configurable or derived
      return currentFundAmount > 0 ? (currentFundAmount / averageMonthlyExpenses).toFixed(1) : '0.0';
  }, [currentFundAmount]);

   const handleTargetInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setEditingTargetInput(e.target.value);
   };

   const saveTargetAmount = () => {
       const newTarget = parseFloat(editingTargetInput);
       if (!isNaN(newTarget) && newTarget >= 0) {
           setTargetAmount(newTarget);
           // Update target in WalletContext if allocation exists, or create/update
           depositToAllocation(EMERGENCY_FUND_ALLOCATION_ID, "Emergency Fund", 0, newTarget);
           setIsEditingTarget(false);
            toast({
                title: "Target Updated",
                description: "Emergency fund target has been successfully updated.",
            });
       } else {
           setEditingTargetInput(targetAmount.toString());
           toast({
               title: "Error",
               description: "Invalid target amount. Please enter a valid number.",
               variant: "destructive",
           });
       }
   };

  const handleModifyFundSubmit = () => {
      const amount = parseFloat(modifyAmount);
      if (isNaN(amount) || amount === 0) {
           toast({ title: "Error", description: "Please enter a valid amount.", variant: "destructive" });
           return;
      }

      let success = false;
      const transactionType = amount > 0 ? 'deposit' : 'withdrawal'; // Determine type from sign
      const absAmount = Math.abs(amount);

      if (transactionType === 'deposit') {
          success = depositToAllocation(EMERGENCY_FUND_ALLOCATION_ID, "Emergency Fund", absAmount, targetAmount);
      } else { // Withdrawal
          success = withdrawFromAllocation(EMERGENCY_FUND_ALLOCATION_ID, absAmount);
      }

      if (success) {
          const newTransaction: EmergencyFundTransaction = {
              id: Date.now().toString(),
              date: new Date().toISOString().split('T')[0],
              type: transactionType,
              amount: absAmount, // Store positive amount for transaction log
              notes: modifyNotes.trim() || undefined,
          };
          setTransactions(prev => [newTransaction, ...prev]);
          setIsModifyFundOpen(false);
          setModifyAmount('');
          setModifyNotes('');
          toast({
               title: `Funds ${transactionType === 'deposit' ? 'Added' : 'Withdrawn'}`,
               description: `$${absAmount} ${transactionType === 'deposit' ? 'added to' : 'withdrawn from'} emergency fund.`,
           });
      } else {
          toast({
               title: "Transaction Failed",
               description: `Could not ${transactionType} funds. Check available balance or allocated amount.`,
               variant: "destructive",
           });
      }
  };

    const handleDeleteTransaction = (id: string) => {
        // This only removes from local history; does not affect WalletContext balance
        setTransactions(prev => prev.filter(tx => tx.id !== id));
        toast({
            title: "Transaction Removed",
            description: "The transaction has been removed from local history.",
            variant: "default"
        });
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
                    <DialogDescription className="!text-primary-foreground/80">
                        Record a deposit or withdrawal. Current Wallet: {formatCurrency(walletBalance)}
                    </DialogDescription>
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
                   <div className="grid grid-cols-4 items-center gap-3">
                     <Label htmlFor="amount" className="text-right text-sm">Amount ($)</Label>
                     <Input id="amount" type="number" step="0.01" value={modifyAmount} onChange={(e) => setModifyAmount(e.target.value)} placeholder="e.g., 500 (deposit) or -200 (withdraw)" className="col-span-3 retro-input" />
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
                    <Button type="submit" variant="primary" className="retro-button" onClick={handleModifyFundSubmit}>
                      Record Transaction
                    </Button>
                 </DialogFooter>
               </DialogContent>
            </Dialog>
      </div>

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
                 <p className="text-4xl font-bold text-foreground">{formatCurrency(currentFundAmount)}</p>
             </div>
              <Progress value={progressPercentage} className="retro-progress h-4" indicatorClassName="!bg-accent" />
              <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Target:</span>
                 <div className="flex items-center gap-2">
                      {isEditingTarget ? (
                         <>
                             <Input
                                 type="number"
                                 value={editingTargetInput}
                                 onChange={handleTargetInputChange}
                                 className="retro-input h-7 w-28 text-right !text-sm"
                                 onBlur={saveTargetAmount}
                                 onKeyDown={(e) => e.key === 'Enter' && saveTargetAmount()}
                             />
                              <Button variant="ghost" size="icon" className="h-6 w-6 retro-button-ghost text-green-500 hover:bg-green-500/10" onClick={saveTargetAmount}>
                                 <Check className="h-4 w-4"/>
                              </Button>
                               <Button variant="ghost" size="icon" className="h-6 w-6 retro-button-ghost text-muted-foreground hover:bg-muted/50" onClick={() => {setIsEditingTarget(false); setEditingTargetInput(targetAmount.toString());}}>
                                 <X className="h-4 w-4"/>
                              </Button>
                         </>
                      ) : (
                         <>
                            <span className="font-semibold text-foreground">{formatCurrency(targetAmount)}</span>
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

       <Card className="retro-card overflow-hidden">
         <CardHeader className="retro-card-header">
           <CardTitle className="text-xl flex items-center gap-2">
              <ListChecks className="h-5 w-5"/> Transaction History (Local Log)
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
                            >
                                <Trash2 className="h-4 w-4"/>
                                <span className="sr-only">Delete</span>
                            </Button>
                         </TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-muted-foreground italic">
                          No local transactions recorded for the emergency fund.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
          </div>
        </CardContent>
         {sortedTransactions.length > 8 && (
             <CardFooter className="retro-card-content !border-t-2 !py-2 text-xs text-muted-foreground">
                 Showing {sortedTransactions.length} transactions from local log.
             </CardFooter>
        )}
      </Card>
    </div>
  );
}
