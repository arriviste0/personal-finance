
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, PiggyBank, HandCoins, Target, Edit, Trash2, DollarSign, CheckCircle, X } from "lucide-react";
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/hooks/use-toast';


interface SavingsGoalData {
  id: string;
  name: string;
  target: number;
  iconName: string;
  description: string;
}

const initialGoalDefinitions: SavingsGoalData[] = [
  { id: "1", name: "Dream Vacation Fund", target: 2000, iconName: "PiggyBank", description: "Sun, sand, and relaxation in Hawaii next summer!" },
  { id: "3", name: "Next-Gen Gaming Setup", target: 800, iconName: "Target", description: "Saving up for the latest console and accessories." },
];

const iconMap: { [key: string]: React.ElementType } = {
  PiggyBank,
  HandCoins,
  Target,
  DollarSign,
  CheckCircle,
};

const getIcon = (iconName: string, className?: string) => {
  const IconComponent = iconMap[iconName] || DollarSign;
  return <IconComponent className={cn("h-6 w-6", className)} />;
};

export default function SavingsGoalsPage() {
  const [goalDefinitions, setGoalDefinitions] = useState<SavingsGoalData[]>(initialGoalDefinitions);
  const { allocations, depositToAllocation, withdrawFromAllocation, walletBalance } = useWallet();
  const { toast } = useToast();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoalDef, setEditingGoalDef] = useState<SavingsGoalData | null>(null);

  const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
  const [fundsGoalId, setFundsGoalId] = useState<string | null>(null);
  const [transactionAmount, setTransactionAmount] = useState('');


  const handleCreateGoal = (newGoalData: Omit<SavingsGoalData, 'id'>) => {
    const newGoalDef: SavingsGoalData = {
      ...newGoalData,
      id: Date.now().toString(),
    };
    setGoalDefinitions([...goalDefinitions, newGoalDef]);
    depositToAllocation(newGoalDef.id, newGoalDef.name, 0, newGoalDef.target);
    setIsCreateDialogOpen(false);
    toast({ title: "Goal Created!", description: `"${newGoalDef.name}" has been added.`});
  };

  const handleEditGoal = (updatedGoalData: SavingsGoalData) => {
     if (!editingGoalDef) return;
    setGoalDefinitions(goalDefinitions.map(g => g.id === updatedGoalData.id ? updatedGoalData : g));
    const currentAllocation = allocations[updatedGoalData.id];
    depositToAllocation(updatedGoalData.id, updatedGoalData.name, 0, updatedGoalData.target);

    setIsEditDialogOpen(false);
    setEditingGoalDef(null);
    toast({ title: "Goal Updated!", description: `"${updatedGoalData.name}" has been updated.`});
  };

  const handleDeleteGoal = (goalId: string) => {
    const goalDefToDelete = goalDefinitions.find(g => g.id === goalId);
    const goalToReturnFundsFrom = allocations[goalId];
    if (goalToReturnFundsFrom && goalToReturnFundsFrom.amount > 0) {
        withdrawFromAllocation(goalId, goalToReturnFundsFrom.amount);
        toast({ title: "Funds Returned", description: `Funds from "${goalToReturnFundsFrom.name}" returned to main wallet.`});
    }
    setGoalDefinitions(goalDefinitions.filter(g => g.id !== goalId));
    toast({ title: "Goal Deleted", description: `"${goalDefToDelete?.name || 'The goal'}" has been removed.`, variant: "default" });
  };

   const handleModifyFundsSubmit = () => {
     const amountFloat = parseFloat(transactionAmount);
     if (!fundsGoalId || isNaN(amountFloat) || amountFloat === 0) {
         toast({ title: "Invalid Input", description: "Please select a goal and enter a valid, non-zero amount.", variant: "destructive"});
         return;
     }
     const goalDef = goalDefinitions.find(g => g.id === fundsGoalId);
     if(!goalDef) {
         toast({ title: "Error", description: "Goal definition not found.", variant: "destructive"});
         return;
     }

     let success = false;
     const absAmount = Math.abs(amountFloat);

     if (amountFloat > 0) { // Deposit
        if (walletBalance < absAmount) {
            toast({ title: "Insufficient Wallet Balance", description: `Cannot deposit ${formatCurrency(absAmount)}. Available: ${formatCurrency(walletBalance)}.`, variant: "destructive"});
            return;
        }
        success = depositToAllocation(fundsGoalId, goalDef.name, absAmount, goalDef.target);
        if (success) toast({title: "Funds Added", description: `${formatCurrency(absAmount)} added to "${goalDef.name}".`});
     } else { // Withdraw
        const currentAllocation = allocations[fundsGoalId];
        if (!currentAllocation || currentAllocation.amount < absAmount) {
             toast({title: "Withdrawal Failed", description: `Insufficient funds in "${goalDef.name}" to withdraw. Available: ${formatCurrency(currentAllocation?.amount || 0)}.`, variant: "destructive"});
             return;
        }
        if (currentAllocation.amount < goalDef.target) {
            toast({
                title: "Withdrawal Restricted",
                description: `Cannot withdraw from "${goalDef.name}" as the goal is not yet complete. Complete the goal or adjust target to withdraw.`,
                variant: "destructive",
                duration: 7000,
            });
            return;
        }
        success = withdrawFromAllocation(fundsGoalId, absAmount);
        if (success) toast({title: "Funds Withdrawn", description: `${formatCurrency(absAmount)} withdrawn from "${goalDef.name}".`});
     }
     if (success) {
        setIsAddFundsDialogOpen(false);
        setFundsGoalId(null);
        setTransactionAmount('');
     }
   };

   const openEditDialog = (goal: SavingsGoalData) => {
     setEditingGoalDef(goal);
     setIsEditDialogOpen(true);
   };

    const openAddFundsDialog = (goalId: string) => {
     setFundsGoalId(goalId);
     setIsAddFundsDialogOpen(true);
   };

   const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

   const currentFundsGoalDef = goalDefinitions.find(g => g.id === fundsGoalId);
   const currentFundsGoalAllocation = fundsGoalId ? allocations[fundsGoalId] : null;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-3xl font-semibold font-heading">Your Savings Goals</h1>
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="primary">
                   <PlusCircle className="mr-2 h-4 w-4" /> Create New Goal
                </Button>
            </DialogTrigger>
            <GoalFormDialog
              key="create-goal-dialog"
              title="Create New Savings Goal"
              description="Define your new financial target."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
             />
         </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goalDefinitions.map((goalDef) => {
            const currentAllocation = allocations[goalDef.id];
            const currentAmount = currentAllocation?.amount || 0;
            const targetAmount = goalDef.target;
            const percentage = targetAmount > 0 ? Math.min(Math.round((currentAmount / targetAmount) * 100), 100) : 0;
            const isComplete = currentAmount >= targetAmount && targetAmount > 0;
            const iconColor = isComplete ? 'text-green-500' : (goalDef.iconName === 'HandCoins' ? 'text-secondary' : goalDef.iconName === 'Target' ? 'text-blue-500' : 'text-primary');
            const IconComponent = getIcon(isComplete ? 'CheckCircle' : goalDef.iconName, cn("h-8 w-8", iconColor));

            return (
              <Card key={goalDef.id} className="retro-card flex flex-col group relative overflow-visible">
                 <div className="absolute top-2 right-2 flex space-x-1 z-10">
                      <Dialog open={isEditDialogOpen && editingGoalDef?.id === goalDef.id} onOpenChange={(open) => {if (!open) setEditingGoalDef(null); setIsEditDialogOpen(open);}}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="h-7 w-7 bg-background/80 hover:bg-muted">
                               <Edit className="h-4 w-4 text-primary"/>
                               <span className="sr-only">Edit Goal</span>
                            </Button>
                        </DialogTrigger>
                        {editingGoalDef && <GoalFormDialog
                           key={`edit-${editingGoalDef.id}`}
                           title="Edit Savings Goal"
                           description="Update your financial target details."
                           goal={editingGoalDef}
                           onSave={handleEditGoal}
                           onClose={() => {setIsEditDialogOpen(false); setEditingGoalDef(null);}}
                         />}
                     </Dialog>
                     <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button variant="outline" size="icon" className="h-7 w-7 bg-background/80 hover:bg-destructive/10 hover:border-destructive/50">
                            <Trash2 className="h-4 w-4 text-destructive"/>
                            <span className="sr-only">Delete Goal</span>
                         </Button>
                       </AlertDialogTrigger>
                       <AlertDialogContent className="retro-window">
                           <AlertDialogHeader className="retro-window-header !bg-destructive !text-destructive-foreground">
                             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <div className="retro-window-controls"><span></span><span></span></div>
                         </AlertDialogHeader>
                         <AlertDialogDescription className="retro-window-content !border-t-0 pt-2">
                              This action cannot be undone. This will permanently delete the "{goalDef.name}" savings goal. Any funds allocated will be returned to your main wallet.
                         </AlertDialogDescription>
                         <AlertDialogFooter className="retro-window-content !pt-4 !border-t-0 !flex sm:justify-end gap-2">
                           <AlertDialogCancel asChild><Button variant="secondary">Cancel</Button></AlertDialogCancel>
                           <AlertDialogAction asChild><Button variant="destructive" onClick={() => handleDeleteGoal(goalDef.id)}>Yes, Delete Goal</Button></AlertDialogAction>
                         </AlertDialogFooter>
                       </AlertDialogContent>
                     </AlertDialog>
                   </div>
                  <CardHeader className="retro-card-header flex-row items-center gap-4 pb-2">
                   {IconComponent}
                   <div className="flex-1">
                     <CardTitle className="text-base font-semibold font-heading">{goalDef.name}</CardTitle>
                      <CardDescription className="text-sm leading-tight !text-primary-foreground/80">{goalDef.description}</CardDescription>
                   </div>
                    <div className="retro-window-controls">
                        <span></span><span></span><span></span>
                    </div>
                 </CardHeader>
                <CardContent className="retro-card-content flex-1 space-y-3 pt-4">
                   <Progress value={percentage} className={cn("h-3 retro-progress", isComplete && "indicator:!bg-green-500")} indicatorClassName={cn("retro-progress-indicator", isComplete ? "!bg-green-500" : "!bg-primary")} />
                  <div className="text-sm text-muted-foreground flex justify-between items-center">
                     <span className={cn("font-medium", isComplete && "text-green-500")}>
                        {isComplete ? "Goal Achieved!" : `${percentage}% Funded`}
                     </span>
                     <span>${currentAmount.toLocaleString()} / <span className="font-semibold text-foreground">${targetAmount.toLocaleString()}</span></span>
                  </div>
                </CardContent>
                <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
                   <Button
                     variant="primary"
                     className="w-full"
                     onClick={() => openAddFundsDialog(goalDef.id)}
                    >
                     <DollarSign className="mr-2 h-4 w-4"/> Manage Funds
                   </Button>
                </CardFooter>
              </Card>
            )
        })}

         <Dialog open={isCreateDialogOpen && !editingGoalDef} onOpenChange={(open) => { if(!open) setIsCreateDialogOpen(false); else setIsCreateDialogOpen(true);}}>
            <DialogTrigger asChild>
                 <button className="retro-card flex flex-col items-center justify-center p-6 min-h-[240px] text-center group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:shadow-[4px_4px_0px_0px_hsl(var(--ring))] transition-shadow duration-200 hover:shadow-[6px_6px_0px_0px_hsl(var(--primary))]">
                    <div className="retro-card-header w-full !bg-muted">
                       <CardTitle className="text-base font-semibold font-heading">New Goal</CardTitle>
                       <div className="retro-window-controls">
                            <span></span><span></span><span></span>
                       </div>
                    </div>
                     <div className="retro-card-content flex-1 flex flex-col items-center justify-center w-full pt-4">
                       <PlusCircle className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-200 mb-3" />
                       <span className="text-base font-medium mb-1 text-foreground group-hover:text-primary">Create New Goal</span>
                       <span className="text-sm text-muted-foreground">Click here to start saving!</span>
                     </div>
                 </button>
            </DialogTrigger>
            <GoalFormDialog
              key="create-new-goal-dialog-from-card"
              title="Create New Savings Goal"
              description="Define your new financial target."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </Dialog>
      </div>

       {/* Add/Withdraw Funds Dialog */}
       <Dialog open={isAddFundsDialogOpen} onOpenChange={(open) => { if(!open) {setFundsGoalId(null); setTransactionAmount('');} setIsAddFundsDialogOpen(open);}}>
          <DialogContent className="retro-window sm:max-w-[425px]">
             <DialogHeader className="retro-window-header !bg-accent !text-accent-foreground">
               <DialogTitle>Manage Funds: {currentFundsGoalDef?.name}</DialogTitle>
               <DialogDescription className="!text-accent-foreground/90">
                 Current: {currentFundsGoalAllocation ? formatCurrency(currentFundsGoalAllocation.amount) : '$0.00'} / Target: {currentFundsGoalDef ? formatCurrency(currentFundsGoalDef.target) : '$0.00'}
                 <br/>
                 Available in Wallet: {formatCurrency(walletBalance)}
               </DialogDescription>
               <div className="retro-window-controls">
                   <span className="!bg-accent !border-accent-foreground"></span>
                   <span className="!bg-accent !border-accent-foreground"></span>
                    <DialogClose asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                           <X className="h-3 w-3"/>
                           <span className="sr-only">Close</span>
                       </Button>
                    </DialogClose>
               </div>
             </DialogHeader>
             <div className="space-y-4 p-4 retro-window-content">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor={`modify-amount-${fundsGoalId}`} className="text-right">
                   Amount ($)
                 </Label>
                 <Input
                    id={`modify-amount-${fundsGoalId}`}
                    type="number"
                    placeholder="e.g., 50 (deposit) or -20 (withdraw from completed goal)"
                    className="col-span-3 retro-input"
                    value={transactionAmount}
                    onChange={(e) => setTransactionAmount(e.target.value)}
                  />
               </div>
                <p className="text-xs text-muted-foreground text-center px-4">Enter a positive value to add funds. To withdraw funds (only from a completed goal), enter a negative value (e.g., -20).</p>
             </div>
             <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
               <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
               </DialogClose>
               <Button type="submit" variant="accent" onClick={handleModifyFundsSubmit}>
                 Update Funds
               </Button>
             </DialogFooter>
           </DialogContent>
       </Dialog>
    </div>
  );
}

interface GoalFormDialogProps {
  title: string;
  description: string;
  goal?: SavingsGoalData;
  onSave: (data: any) => void;
  onClose: () => void;
}

function GoalFormDialog({ title, description, goal, onSave, onClose }: GoalFormDialogProps) {
  const [formData, setFormData] = useState({
    name: goal?.name || '',
    target: goal?.target || 1000,
    description: goal?.description || '',
    iconName: goal?.iconName || 'DollarSign',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;
    if (name === 'target') {
       processedValue = parseFloat(value) || 0;
       if (processedValue < 0) processedValue = 0;
    }
    setFormData(prev => ({ ...prev, [name]: processedValue }));
     if (errors[name]) {
       setErrors(prev => ({ ...prev, [name]: '' }));
     }
  };

   const validateForm = (): boolean => {
     const newErrors: Record<string, string> = {};
     if (!formData.name.trim()) newErrors.name = "Goal name cannot be empty.";
     if (formData.target <= 0) newErrors.target = "Target amount must be greater than zero.";
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

  const handleSave = () => {
    if (validateForm()) {
        if (goal) {
            onSave({ ...goal, ...formData });
        } else {
            onSave(formData);
        }
    }
  };

   const availableIcons = Object.keys(iconMap);

  return (
    <DialogContent className="retro-window sm:max-w-[450px]">
      <DialogHeader className="retro-window-header">
        <DialogTitle className="font-heading">{title}</DialogTitle>
         <DialogDescription className="!text-primary-foreground/80">{description}</DialogDescription>
        <div className="retro-window-controls">
            <span></span><span></span>
             <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80" onClick={onClose}>
                   <X className="h-3 w-3"/>
                   <span className="sr-only">Close</span>
                </Button>
             </DialogClose>
        </div>
      </DialogHeader>
      <div className="grid gap-4 p-4 retro-window-content">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className={cn("col-span-3 retro-input", errors.name && 'border-destructive focus:border-destructive focus:ring-destructive')} />
           {errors.name && <p className="col-start-2 col-span-3 text-xs text-destructive -mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="target" className="text-right">Target ($)</Label>
          <Input id="target" name="target" type="number" min="0.01" step="0.01" value={formData.target} onChange={handleChange} className={cn("col-span-3 retro-input", errors.target && 'border-destructive focus:border-destructive focus:ring-destructive')} />
           {errors.target && <p className="col-start-2 col-span-3 text-xs text-destructive -mt-1">{errors.target}</p>}
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="description" className="text-right pt-2">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3 h-20 retro-textarea" placeholder="Optional: Add some details..." />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
           <Label htmlFor="iconName" className="text-right">Icon</Label>
           <Select name="iconName" value={formData.iconName} onValueChange={(value) => handleChange({ target: { name: 'iconName', value } } as any)}>
                <SelectTrigger id="iconName" className="col-span-3 retro-select-trigger">
                    <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent className="retro-select-content">
                    {availableIcons.map(iconKey => (
                       <SelectItem key={iconKey} value={iconKey} className="retro-select-item">
                            <div className="flex items-center gap-2">
                               {getIcon(iconKey, "h-4 w-4")}
                               {iconKey}
                            </div>
                       </SelectItem>
                    ))}
                </SelectContent>
           </Select>
         </div>
      </div>
      <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary" onClick={handleSave}>{goal ? 'Save Changes' : 'Create Goal'}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
