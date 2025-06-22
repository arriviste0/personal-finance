
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, PiggyBank, HandCoins, Target, Edit, Trash2, DollarSign, CheckCircle, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useGoals, useAddGoal, useUpdateGoal, useDeleteGoal, useModifyGoalFunds } from '@/hooks/use-goals';
import type { SavingsGoalSchema } from '@/lib/db-schemas';
import { Skeleton } from '@/components/ui/skeleton';

const iconMap: { [key: string]: React.ElementType } = { PiggyBank, HandCoins, Target, DollarSign, CheckCircle };
const getIcon = (iconName: string, className?: string) => {
  const IconComponent = iconMap[iconName] || DollarSign;
  return <IconComponent className={cn("h-6 w-6", className)} />;
};

export default function SavingsGoalsPage() {
  const { data: goals = [], isLoading, error } = useGoals();
  const addGoalMutation = useAddGoal();
  const updateGoalMutation = useUpdateGoal();
  const deleteGoalMutation = useDeleteGoal();
  const modifyFundsMutation = useModifyGoalFunds();

  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoalSchema | null>(null);
  
  const [isFundsDialogOpen, setIsFundsDialogOpen] = useState(false);
  const [fundsGoal, setFundsGoal] = useState<SavingsGoalSchema | null>(null);
  const [transactionAmount, setTransactionAmount] = useState('');

  const handleSaveGoal = (goalData: Omit<SavingsGoalSchema, '_id'> | SavingsGoalSchema) => {
    if ('_id' in goalData) { // Editing
        updateGoalMutation.mutate(goalData as SavingsGoalSchema, {
            onSuccess: () => { toast({ title: "Goal Updated" }); setIsFormOpen(false); setEditingGoal(null); },
            onError: (err) => toast({ title: "Update Failed", description: err.message, variant: "destructive" })
        });
    } else { // Creating
        addGoalMutation.mutate(goalData as any, {
            onSuccess: () => { toast({ title: "Goal Created" }); setIsFormOpen(false); },
            onError: (err) => toast({ title: "Creation Failed", description: err.message, variant: "destructive" })
        });
    }
  };

  const handleDeleteGoal = (goalId: string) => {
    deleteGoalMutation.mutate(goalId, {
        onSuccess: () => toast({ title: "Goal Deleted" }),
        onError: (err) => toast({ title: "Delete Failed", description: err.message, variant: "destructive" })
    });
  };
  
  const handleModifyFundsSubmit = () => {
     const amountFloat = parseFloat(transactionAmount);
     if (!fundsGoal || isNaN(amountFloat) || amountFloat === 0) {
         toast({ title: "Invalid Input", variant: "destructive"});
         return;
     }
     const type = amountFloat > 0 ? 'deposit' : 'withdraw';
     const payload = { goalId: fundsGoal._id.toString(), amount: Math.abs(amountFloat), type };
     
     modifyFundsMutation.mutate(payload, {
         onSuccess: () => {
             toast({ title: "Funds Updated" });
             setIsFundsDialogOpen(false);
             setTransactionAmount('');
         },
         onError: (err) => toast({ title: "Update Failed", description: err.message, variant: "destructive" })
     });
   };

   const formatCurrency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between mb-6 pt-8">
         <h1 className="text-3xl font-semibold font-heading">Your Savings Goals</h1>
         <div className="flex items-center gap-2">
            <Dialog open={isFormOpen} onOpenChange={(open) => { if (!open) setEditingGoal(null); setIsFormOpen(open); }}>
                <DialogTrigger asChild><Button variant="primary"><PlusCircle className="mr-2 h-4 w-4" /> Create New Goal</Button></DialogTrigger>
                <GoalFormDialog key={editingGoal?._id.toString() || 'create'} title={editingGoal ? "Edit Goal" : "Create New Goal"} description={editingGoal ? "Update your target." : "Define your new target."} goal={editingGoal} onSave={handleSaveGoal} onClose={() => setIsFormOpen(false)} isPending={addGoalMutation.isPending || updateGoalMutation.isPending}/>
             </Dialog>
         </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? [...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)
         : error ? <p className="text-destructive col-span-3">Error loading goals.</p>
         : goals.map((goal) => {
            const percentage = goal.targetAmount > 0 ? Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100) : 0;
            const isComplete = goal.currentAmount >= goal.targetAmount && goal.targetAmount > 0;
            const iconColor = isComplete ? 'text-green-500' : (goal.iconName === 'HandCoins' ? 'text-secondary' : 'text-primary');
            const IconComponent = getIcon(isComplete ? 'CheckCircle' : goal.iconName, cn("h-8 w-8", iconColor));

            return (
              <Card key={goal._id.toString()} className="retro-card flex flex-col group relative overflow-visible">
                 <div className="absolute top-2 right-2 flex space-x-1 z-10">
                      <Button variant="outline" size="icon" className="h-7 w-7 bg-background/80 hover:bg-muted" onClick={() => { setEditingGoal(goal); setIsFormOpen(true); }}><Edit className="h-4 w-4 text-primary"/><span className="sr-only">Edit</span></Button>
                     <AlertDialog>
                       <AlertDialogTrigger asChild><Button variant="outline" size="icon" className="h-7 w-7 bg-background/80 hover:bg-destructive/10 hover:border-destructive/50"><Trash2 className="h-4 w-4 text-destructive"/><span className="sr-only">Delete</span></Button></AlertDialogTrigger>
                       <AlertDialogContent className="retro-window"><AlertDialogHeader className="retro-window-header !bg-destructive !text-destructive-foreground"><AlertDialogTitle>Are you sure?</AlertDialogTitle><div className="retro-window-controls"><span></span><span></span></div></AlertDialogHeader><AlertDialogDescription className="retro-window-content !border-t-0 pt-2">This will permanently delete "{goal.name}".</AlertDialogDescription><AlertDialogFooter className="retro-window-content !pt-4 !border-t-0 !flex sm:justify-end gap-2"><AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel><AlertDialogAction asChild><Button variant="destructive" onClick={() => handleDeleteGoal(goal._id.toString())}>Delete</Button></AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                     </AlertDialog>
                   </div>
                  <CardHeader className="retro-card-header flex-row items-center gap-4 pb-2">{IconComponent}<div className="flex-1"><CardTitle className="text-base font-semibold font-heading">{goal.name}</CardTitle><CardDescription className="text-sm leading-tight !text-primary-foreground/80">{goal.description}</CardDescription></div><div className="retro-window-controls"><span></span><span></span><span></span></div></CardHeader>
                <CardContent className="retro-card-content flex-1 space-y-3 pt-4"><Progress value={percentage} className={cn("h-3 retro-progress", isComplete && "indicator:!bg-green-500")} indicatorClassName={cn("retro-progress-indicator", isComplete ? "!bg-green-500" : "!bg-primary")} /><div className="text-sm text-muted-foreground flex justify-between items-center"><span className={cn("font-medium", isComplete && "text-green-500")}>{isComplete ? "Goal Achieved!" : `${percentage}% Funded`}</span><span>{formatCurrency(goal.currentAmount)} / <span className="font-semibold text-foreground">{formatCurrency(goal.targetAmount)}</span></span></div></CardContent>
                <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3"><Button variant="primary" className="w-full" onClick={() => { setFundsGoal(goal); setIsFundsDialogOpen(true); }}><DollarSign className="mr-2 h-4 w-4"/> Manage Funds</Button></CardFooter>
              </Card>
            )
        })}
      </div>

       <Dialog open={isFundsDialogOpen} onOpenChange={(open) => { if(!open) setFundsGoal(null); setIsFundsDialogOpen(open);}}>
          <DialogContent className="retro-window sm:max-w-[425px]">
             <DialogHeader className="retro-window-header !bg-accent !text-accent-foreground"><DialogTitle>Manage Funds: {fundsGoal?.name}</DialogTitle><DialogDescription className="!text-accent-foreground/90">Current: {formatCurrency(fundsGoal?.currentAmount || 0)} / Target: {formatCurrency(fundsGoal?.targetAmount || 0)}</DialogDescription><div className="retro-window-controls"><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span><DialogClose asChild><Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80"><X className="h-3 w-3"/><span className="sr-only">Close</span></Button></DialogClose></div></DialogHeader>
             <div className="space-y-4 p-4 retro-window-content">
               <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor={`modify-amount-${fundsGoal?._id}`} className="text-right">Amount ($)</Label><Input id={`modify-amount-${fundsGoal?._id}`} type="number" placeholder="50 or -20" className="col-span-3 retro-input" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)}/></div>
                <p className="text-xs text-muted-foreground text-center px-4">Positive to deposit, negative to withdraw.</p>
             </div>
             <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
               <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
               <Button type="submit" variant="accent" onClick={handleModifyFundsSubmit} disabled={modifyFundsMutation.isPending}>{modifyFundsMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}Update Funds</Button>
             </DialogFooter>
           </DialogContent>
       </Dialog>
    </div>
  );
}

interface GoalFormDialogProps { title: string; description: string; goal?: SavingsGoalSchema | null; onSave: (data: any) => void; onClose: () => void; isPending: boolean; }
function GoalFormDialog({ title, description, goal, onSave, onClose, isPending }: GoalFormDialogProps) {
  const [formData, setFormData] = useState({ name: goal?.name || '', targetAmount: goal?.targetAmount || 1000, description: goal?.description || '', iconName: goal?.iconName || 'DollarSign' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'targetAmount' ? parseFloat(value) || 0 : value }));
  };
  const handleIconChange = (value: string) => setFormData(prev => ({...prev, iconName: value}));

  const handleSave = () => {
    if (!formData.name.trim() || formData.targetAmount <= 0) {
        setErrors({ name: !formData.name.trim() ? "Name required." : "", targetAmount: formData.targetAmount <= 0 ? "Target must be > 0." : ""});
        return;
    }
    setErrors({});
    onSave(goal ? { ...goal, ...formData } : formData);
  };

  return (
    <DialogContent className="retro-window sm:max-w-[450px]">
      <DialogHeader className="retro-window-header"><DialogTitle className="font-heading">{title}</DialogTitle><DialogDescription className="!text-primary-foreground/80">{description}</DialogDescription><div className="retro-window-controls"><span></span><span></span><DialogClose asChild><Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80" onClick={onClose}><X className="h-3 w-3"/><span className="sr-only">Close</span></Button></DialogClose></div></DialogHeader>
      <div className="grid gap-4 p-4 retro-window-content">
        <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">Name</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} className={cn("col-span-3 retro-input", errors.name && 'border-destructive')} />{errors.name && <p className="col-start-2 col-span-3 text-xs text-destructive">{errors.name}</p>}</div>
        <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="targetAmount" className="text-right">Target ($)</Label><Input id="targetAmount" name="targetAmount" type="number" min="1" step="0.01" value={formData.targetAmount} onChange={handleChange} className={cn("col-span-3 retro-input", errors.targetAmount && 'border-destructive')} />{errors.targetAmount && <p className="col-start-2 col-span-3 text-xs text-destructive">{errors.targetAmount}</p>}</div>
        <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="description" className="text-right pt-2">Description</Label><Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3 h-20 retro-textarea" placeholder="Optional..." /></div>
        <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="iconName" className="text-right">Icon</Label><Select name="iconName" value={formData.iconName} onValueChange={handleIconChange}><SelectTrigger id="iconName" className="col-span-3 retro-select-trigger"><SelectValue /></SelectTrigger><SelectContent className="retro-select-content">{Object.keys(iconMap).map(key => (<SelectItem key={key} value={key} className="retro-select-item"><div className="flex items-center gap-2">{getIcon(key, "h-4 w-4")}{key}</div></SelectItem>))}</SelectContent></Select></div>
      </div>
      <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary" onClick={handleSave} disabled={isPending}>{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}{goal ? 'Save Changes' : 'Create Goal'}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
