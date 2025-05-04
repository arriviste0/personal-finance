'use client'; // Added 'use client' directive

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, PiggyBank, HandCoins, Target, Edit, Trash2, DollarSign, CheckCircle, X } from "lucide-react"; // Added X
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
} from "@/components/ui/select"; // Import Select components
import { cn } from '@/lib/utils';

interface SavingsGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  iconName: string;
  description: string;
}

// Mock data
const initialSavingsGoals: SavingsGoal[] = [
  { id: "1", name: "Dream Vacation Fund", current: 750, target: 2000, iconName: "PiggyBank", description: "Sun, sand, and relaxation in Hawaii next summer!" },
  { id: "2", name: "Emergency Safety Net", current: 3000, target: 5000, iconName: "HandCoins", description: "Buffer for unexpected life events and expenses." },
  { id: "3", name: "Next-Gen Gaming Setup", current: 200, target: 800, iconName: "Target", description: "Saving up for the latest console and accessories." },
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
  const [goals, setGoals] = useState<SavingsGoal[]>(initialSavingsGoals);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
  const [fundsGoalId, setFundsGoalId] = useState<string | null>(null);


  const handleCreateGoal = (newGoalData: Omit<SavingsGoal, 'id' | 'current'>) => {
    const newGoal: SavingsGoal = {
      ...newGoalData,
      id: Date.now().toString(),
      current: 0,
    };
    setGoals([...goals, newGoal]);
    setIsCreateDialogOpen(false);
    console.log("Created goal:", newGoal);
  };

  const handleEditGoal = (updatedGoalData: SavingsGoal) => {
     if (!editingGoal) return;
    setGoals(goals.map(g => g.id === updatedGoalData.id ? updatedGoalData : g));
    setIsEditDialogOpen(false);
    setEditingGoal(null);
    console.log("Updated goal:", updatedGoalData);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
    console.log("Deleted goal with ID:", goalId);
  };

   const handleAddFunds = (goalId: string, amount: number) => {
     if (amount === 0) return;
    setGoals(goals.map(g => g.id === goalId ? { ...g, current: Math.max(0, Math.min(g.current + amount, g.target)) } : g));
    console.log(`Modified funds by $${amount} for goal ${goalId}`);
     setIsAddFundsDialogOpen(false);
     setFundsGoalId(null);
   };


   const openEditDialog = (goal: SavingsGoal) => {
     setEditingGoal(goal);
     setIsEditDialogOpen(true);
   };

    const openAddFundsDialog = (goalId: string) => {
     setFundsGoalId(goalId);
     setIsAddFundsDialogOpen(true);
   };

   const currentFundsGoal = goals.find(g => g.id === fundsGoalId);

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between mb-6">
         <h1 className="text-3xl font-semibold">Your Savings Goals</h1>
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="primary" className="retro-button">
                   <PlusCircle className="mr-2 h-4 w-4" /> Create New Goal
                </Button>
            </DialogTrigger>
            <GoalFormDialog
              key="create-goal-dialog" // Added key for consistency
              title="Create New Savings Goal"
              description="Define your new financial target."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
             />
         </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
            const percentage = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
            const isComplete = percentage >= 100;
            const iconColor = isComplete ? 'text-green-500' : (goal.iconName === 'HandCoins' ? 'text-secondary' : goal.iconName === 'Target' ? 'text-blue-500' : 'text-primary'); // Use theme colors more directly
            const IconComponent = getIcon(isComplete ? 'CheckCircle' : goal.iconName, cn("h-8 w-8", iconColor));

            return (
              <Card key={goal.id} className="retro-card flex flex-col group relative overflow-visible"> {/* retro-card */}
                 <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <Dialog open={isEditDialogOpen && editingGoal?.id === goal.id} onOpenChange={(open) => {if (!open) setEditingGoal(null); setIsEditDialogOpen(open);}}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon" className="retro-button retro-button-icon h-7 w-7 bg-background/80 hover:bg-muted">
                               <Edit className="h-4 w-4 text-muted-foreground"/>
                               <span className="sr-only">Edit Goal</span>
                            </Button>
                        </DialogTrigger>
                        {editingGoal && <GoalFormDialog
                           key={`edit-${editingGoal.id}`}
                           title="Edit Savings Goal"
                           description="Update your financial target details."
                           goal={editingGoal}
                           onSave={handleEditGoal}
                           onClose={() => {setIsEditDialogOpen(false); setEditingGoal(null);}}
                         />}
                     </Dialog>
                     <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button variant="outline" size="icon" className="retro-button retro-button-icon h-7 w-7 bg-background/80 hover:bg-destructive/10 hover:border-destructive/50">
                            <Trash2 className="h-4 w-4 text-muted-foreground group-hover:text-destructive"/>
                            <span className="sr-only">Delete Goal</span>
                         </Button>
                       </AlertDialogTrigger>
                       <AlertDialogContent className="retro-window">
                           <AlertDialogHeader className="retro-window-header !bg-destructive !text-destructive-foreground">
                             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <div className="retro-window-controls"><span></span><span></span></div>
                         </AlertDialogHeader>
                         <AlertDialogDescription className="retro-window-content !border-t-0 pt-2">
                              This action cannot be undone. This will permanently delete the "{goal.name}" savings goal.
                         </AlertDialogDescription>
                         <AlertDialogFooter className="retro-window-content !pt-4 !border-t-0 !flex sm:justify-end gap-2">
                           <AlertDialogCancel asChild><Button variant="secondary" className="retro-button">Cancel</Button></AlertDialogCancel>
                           <AlertDialogAction asChild><Button variant="destructive" className="retro-button" onClick={() => handleDeleteGoal(goal.id)}>Yes, Delete Goal</Button></AlertDialogAction>
                         </AlertDialogFooter>
                       </AlertDialogContent>
                     </AlertDialog>
                   </div>
                  <CardHeader className="retro-card-header flex-row items-center gap-4 pb-2">
                   {IconComponent}
                   <div className="flex-1">
                     <CardTitle className="text-base font-semibold">{goal.name}</CardTitle>
                      <CardDescription className="text-sm leading-tight !text-primary-foreground/80">{goal.description}</CardDescription>
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
                     <span>${goal.current.toLocaleString()} / <span className="font-semibold text-foreground">${goal.target.toLocaleString()}</span></span>
                  </div>
                </CardContent>
                <CardFooter className="retro-card-content !border-t-2 !pt-3 !pb-3">
                   <Button
                     variant="primary" // Changed to primary
                     className="retro-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                     onClick={() => openAddFundsDialog(goal.id)}
                     disabled={isComplete}
                    >
                     <DollarSign className="mr-2 h-4 w-4"/> Manage Funds
                   </Button>
                </CardFooter>
              </Card>
            )
        })}

         {/* Add New Goal Card Placeholder */}
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                 <button className="retro-card flex flex-col items-center justify-center p-6 min-h-[240px] text-center group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:shadow-[4px_4px_0px_0px_hsl(var(--ring))] transition-shadow duration-200 hover:shadow-[6px_6px_0px_0px_hsl(var(--primary))]">
                    <div className="retro-card-header w-full !bg-muted"> {/* Use muted background */}
                       <CardTitle className="text-base font-semibold">New Goal</CardTitle>
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
              key="create-new-goal-dialog" // Added key
              title="Create New Savings Goal"
              description="Define your new financial target."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </Dialog>
      </div>

       {/* Add Funds Dialog */}
       <Dialog open={isAddFundsDialogOpen} onOpenChange={setIsAddFundsDialogOpen}>
          <DialogContent className="retro-window sm:max-w-[425px]">
             <DialogHeader className="retro-window-header !bg-accent !text-accent-foreground">
               <DialogTitle>Manage Funds: {currentFundsGoal?.name}</DialogTitle>
               <DialogDescription className="!text-accent-foreground/90">
                 Current: ${currentFundsGoal?.current.toLocaleString()} / Target: ${currentFundsGoal?.target.toLocaleString()}
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
                 <Input id={`modify-amount-${fundsGoalId}`} type="number" defaultValue="50" className="col-span-3 retro-input" />
               </div>
                <p className="text-xs text-muted-foreground text-center px-4">Enter a positive value to add funds, or a negative value to remove funds.</p>
             </div>
             <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-2 !p-4">
               <DialogClose asChild>
                    <Button type="button" variant="secondary" className="retro-button">Cancel</Button>
               </DialogClose>
               <Button type="submit" variant="accent" className="retro-button" onClick={() => {
                   const amountInput = document.getElementById(`modify-amount-${fundsGoalId}`) as HTMLInputElement;
                   const amount = parseFloat(amountInput?.value || '0');
                   if (fundsGoalId && !isNaN(amount)) {
                      handleAddFunds(fundsGoalId, amount);
                   }
               }}>
                 Update Funds
               </Button>
             </DialogFooter>
           </DialogContent>
       </Dialog>

    </div>
  );
}

// --- Reusable Goal Form Dialog Component ---
interface GoalFormDialogProps {
  title: string;
  description: string;
  goal?: SavingsGoal;
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
        onClose();
    }
  };

   const availableIcons = Object.keys(iconMap);

  return (
    <DialogContent className="retro-window sm:max-w-[450px]">
      <DialogHeader className="retro-window-header">
        <DialogTitle>{title}</DialogTitle>
         <DialogDescription className="!text-primary-foreground/80">{description}</DialogDescription>
        <div className="retro-window-controls">
            <span></span><span></span>
             <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
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
        <div className="grid grid-cols-4 items-start gap-4"> {/* Changed to items-start */}
          <Label htmlFor="description" className="text-right pt-2">Description</Label> {/* Added pt-2 */}
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
        <Button type="button" variant="secondary" className="retro-button" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary" className="retro-button" onClick={handleSave}>{goal ? 'Save Changes' : 'Create Goal'}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
