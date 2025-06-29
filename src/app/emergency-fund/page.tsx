'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, DollarSign, ListChecks, Check, X, PlusCircle, MinusCircle, Loader2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { useEmergencyFund, useEmergencyFundTransactions, useUpdateEmergencyFund, useAddEmergencyFundTransaction } from '@/hooks/use-emergency-fund';
import { Skeleton } from '@/components/ui/skeleton';
import { useUndoRedo } from '@/hooks/use-undo-redo';
import { UndoRedoButtons } from '@/components/ui/undo-redo-buttons';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';

// Interface for emergency fund state in undo/redo
interface EmergencyFundState {
  fund: {
    currentAmount: number;
    targetAmount: number;
  };
  transactions: Array<{
    _id: string;
    type: 'deposit' | 'withdrawal';
    amount: number;
    notes?: string;
    date: string;
  }>;
}

export default function EmergencyFundPage() {
  const { data: fund, isLoading: isLoadingFund, error: fundError } = useEmergencyFund();
  const { data: transactions = [], isLoading: isLoadingTxs, error: txsError } = useEmergencyFundTransactions();
  const updateFundMutation = useUpdateEmergencyFund();
  const addTransactionMutation = useAddEmergencyFundTransaction();
  const { toast } = useToast();

  const [isModifyFundOpen, setIsModifyFundOpen] = useState(false);
  const [transactionAmountInput, setTransactionAmountInput] = useState<string>('');
  const [transactionNotes, setTransactionNotes] = useState<string>('');
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [editingTargetInput, setEditingTargetInput] = useState<string>('');
  
  // Initialize undo/redo with current emergency fund data
  const [emergencyFundState, undoRedoActions] = useUndoRedo<EmergencyFundState>(
    {
      fund: {
        currentAmount: fund?.currentAmount || 0,
        targetAmount: fund?.targetAmount || 0
      },
      transactions: transactions.map((tx) => ({
        _id: tx._id.toString(),
        type: tx.type,
        amount: tx.amount,
        notes: tx.notes || '',
        date: format(new Date(tx.date), 'yyyy-MM-dd')
      }))
    },
    20 // Max 20 history entries
  );

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: undoRedoActions.undo,
    onRedo: undoRedoActions.redo,
    canUndo: undoRedoActions.canUndo,
    canRedo: undoRedoActions.canRedo
  });

  React.useEffect(() => {
      if(fund?.targetAmount) {
          setEditingTargetInput(fund.targetAmount.toString());
      }
  }, [fund]);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions]);

  const currentFundAmount = fund?.currentAmount || 0;
  const targetAmount = fund?.targetAmount || 0;
  const progressPercentage = useMemo(() => {
      return targetAmount > 0 ? Math.min((currentFundAmount / targetAmount) * 100, 100) : 0;
  }, [currentFundAmount, targetAmount]);

   const saveTargetAmount = () => {
       const newTarget = parseFloat(editingTargetInput);
       if (!isNaN(newTarget) && newTarget >= 0) {
           updateFundMutation.mutate({ targetAmount: newTarget }, {
               onSuccess: () => {
                   toast({ title: "Target Updated" });
                   setIsEditingTarget(false);
                   // Update undo/redo state
                   const newState = {
                     ...emergencyFundState,
                     fund: {
                       ...emergencyFundState.fund,
                       targetAmount: newTarget
                     }
                   };
                   undoRedoActions.pushState(newState);
               },
               onError: (err) => toast({ title: "Update Failed", description: err.message, variant: "destructive" })
           })
       } else {
           toast({ title: "Invalid Target", description: "Please enter a valid number.", variant: "destructive" });
           setEditingTargetInput(targetAmount.toString());
       }
   };

  const handleTransaction = (type: 'deposit' | 'withdrawal') => {
      const amount = Math.abs(parseFloat(transactionAmountInput));
      if (isNaN(amount) || amount <= 0) {
           toast({ title: "Invalid Amount", variant: "destructive" });
           return;
      }
      
      addTransactionMutation.mutate({ amount, type, notes: transactionNotes.trim() }, {
          onSuccess: () => {
              toast({ title: `Funds ${type}` });
              setIsModifyFundOpen(false);
              setTransactionAmountInput('');
              setTransactionNotes('');
              // Update undo/redo state
              const newTransaction = {
                _id: Date.now().toString(), // Temporary ID for undo/redo
                type,
                amount,
                notes: transactionNotes.trim(),
                date: format(new Date(), 'yyyy-MM-dd')
              };
              const newState = {
                ...emergencyFundState,
                fund: {
                  ...emergencyFundState.fund,
                  currentAmount: type === 'deposit' 
                    ? emergencyFundState.fund.currentAmount + amount
                    : emergencyFundState.fund.currentAmount - amount
                },
                transactions: [newTransaction, ...emergencyFundState.transactions]
              };
              undoRedoActions.pushState(newState);
          },
          onError: (err) => toast({ title: `${type} failed`, description: err.message, variant: "destructive" })
      })
  };

  const formatCurrency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatDate = (dateString: string | Date) => format(parseISO(dateString.toString()), 'MMM dd, yyyy');

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pt-8">
         <h1 className="text-3xl font-semibold flex items-center gap-2 font-heading"><ShieldAlert className="h-7 w-7 text-primary" /> Emergency Fund Tracker</h1>
         <div className="flex items-center gap-2">
            {/* Undo/Redo buttons */}
            <UndoRedoButtons
              canUndo={undoRedoActions.canUndo}
              canRedo={undoRedoActions.canRedo}
              onUndo={undoRedoActions.undo}
              onRedo={undoRedoActions.redo}
              variant="outline"
              size="sm"
            />
           <Dialog open={isModifyFundOpen} onOpenChange={setIsModifyFundOpen}>
             <DialogTrigger asChild><Button variant="primary" disabled={isLoadingFund}><DollarSign className="mr-2 h-4 w-4" /> Modify Funds</Button></DialogTrigger>
              <DialogContent className="retro-window sm:max-w-[480px]">
                  <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground"><DialogTitle className="font-heading">Modify Emergency Fund</DialogTitle><div className="retro-window-controls"><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span><DialogClose asChild><Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80"><X className="h-3 w-3"/><span className="sr-only">Close</span></Button></DialogClose></div></DialogHeader>
                 <div className="space-y-4 p-4 retro-window-content !border-t-0">
                   <div className="grid grid-cols-4 items-center gap-3"><Label htmlFor="transactionAmountInput" className="text-right text-sm">Amount ($)</Label><Input id="transactionAmountInput" type="number" step="0.01" min="0" value={transactionAmountInput} onChange={(e) => setTransactionAmountInput(e.target.value)} placeholder="e.g., 200" className="col-span-3 retro-input"/></div>
                    <div className="grid grid-cols-4 items-start gap-3"><Label htmlFor="transactionNotes" className="text-right text-sm pt-2">Notes <span className="text-xs text-muted-foreground">(Opt.)</span></Label><Textarea id="transactionNotes" value={transactionNotes} onChange={(e) => setTransactionNotes(e.target.value)} placeholder="Reason for transaction..." className="col-span-3 retro-textarea h-20"/></div>
                 </div>
                 <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
                     <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                     <Button variant="destructive" onClick={() => handleTransaction('withdrawal')} disabled={addTransactionMutation.isPending}><MinusCircle className="mr-2 h-4 w-4"/> Withdraw</Button>
                     <Button variant="primary" onClick={() => handleTransaction('deposit')} disabled={addTransactionMutation.isPending}>{addTransactionMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}<PlusCircle className="mr-2 h-4 w-4"/> Deposit</Button>
                 </DialogFooter>
               </DialogContent>
            </Dialog>
          </div>
      </div>

        <Card className="retro-card">
           <CardHeader className="retro-card-header !bg-accent !text-accent-foreground"><CardTitle className="flex items-center gap-2 text-xl font-heading"><ShieldAlert className="h-5 w-5" />Fund Status</CardTitle><div className="retro-window-controls"><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span></div></CardHeader>
          <CardContent className="retro-card-content !border-t-0 space-y-4 pt-6">
             <div className="text-center">
                 <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                 {isLoadingFund ? <Skeleton className="h-10 w-48 mx-auto" /> : <p className="text-4xl font-bold text-foreground">{formatCurrency(currentFundAmount)}</p>}
             </div>
              <Progress value={progressPercentage} className="retro-progress h-4" indicatorClassName="!bg-accent" />
              <div className="flex justify-between items-center text-sm">
                 <span className="text-muted-foreground">Target:</span>
                 <div className="flex items-center gap-2">
                      {isEditingTarget ? (
                         <>
                             <Input type="number" value={editingTargetInput} onChange={(e) => setEditingTargetInput(e.target.value)} className="retro-input h-7 w-28 text-right !text-sm" onKeyDown={(e) => e.key === 'Enter' && saveTargetAmount()}/>
                              <Button variant="ghost" size="icon" className="h-6 w-6 text-green-500 hover:bg-green-500/10" onClick={saveTargetAmount} disabled={updateFundMutation.isPending}><Check className="h-4 w-4"/></Button>
                               <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-muted/50" onClick={() => setIsEditingTarget(false)}><X className="h-4 w-4"/></Button>
                         </>
                      ) : (
                         <>
                            <span className="font-semibold text-foreground">{isLoadingFund ? <Skeleton className="h-5 w-24"/> : formatCurrency(targetAmount)}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary" onClick={() => setIsEditingTarget(true)}><Edit className="h-4 w-4"/></Button>
                        </>
                      )}
                 </div>
              </div>
          </CardContent>
        </Card>

       <Card className="retro-card overflow-hidden">
         <CardHeader className="retro-card-header"><CardTitle className="text-xl flex items-center gap-2 font-heading"><ListChecks className="h-5 w-5"/> Transaction History</CardTitle><div className="retro-window-controls"><span></span><span></span><span></span></div></CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0">
          <div className="overflow-x-auto">
              <Table className="retro-table min-w-[600px]">
                 <TableHeader><TableRow><TableHead className="w-[120px]">Date</TableHead><TableHead className="w-[100px]">Type</TableHead><TableHead className="text-right w-[120px]">Amount</TableHead><TableHead>Notes</TableHead></TableRow></TableHeader>
                <TableBody>
                  {isLoadingTxs ? [...Array(3)].map((_, i) => <TableRow key={i}><TableCell colSpan={4}><Skeleton className="h-6 w-full"/></TableCell></TableRow>)
                   : txsError ? <TableRow><TableCell colSpan={4} className="h-24 text-center text-destructive">Error loading transactions.</TableCell></TableRow>
                   : sortedTransactions.length > 0 ? sortedTransactions.map((tx) => (
                      <TableRow key={tx._id.toString()}>
                         <TableCell className="text-sm">{formatDate(tx.date)}</TableCell>
                         <TableCell><Badge variant={tx.type === 'deposit' ? 'secondary' : 'destructive'} className="retro-badge capitalize">{tx.type}</Badge></TableCell>
                         <TableCell className={`text-right font-medium ${tx.type === 'deposit' ? 'text-green-500' : 'text-destructive'}`}>{tx.type === 'deposit' ? '+' : '-'} {formatCurrency(tx.amount)}</TableCell>
                         <TableCell className="text-sm text-muted-foreground italic">{tx.notes || 'N/A'}</TableCell>
                      </TableRow>
                    )) : (<TableRow><TableCell colSpan={4} className="h-24 text-center text-muted-foreground italic">No transactions recorded.</TableCell></TableRow>)}
                </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
