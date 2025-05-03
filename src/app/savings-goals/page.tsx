'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, PiggyBank, HandCoins, Target, Edit, Trash2, Save, X, MinusCircle, DollarSign, CheckCircle } from "lucide-react"; // Added icons
import Link from "next/link"; // Keep using Next Link if needed, but not explicitly used here
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
  // Add more icons as needed
  DollarSign,
  CheckCircle,
};

const getIcon = (iconName: string, className?: string) => {
  const IconComponent = iconMap[iconName] || DollarSign; // Default icon
  return <IconComponent className={cn("h-6 w-6", className)} />; // Apply common styling
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
      id: Date.now().toString(), // Use timestamp for unique ID
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
    <div className="space-y-8"> {/* Increased spacing */}
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
         <h1 className="text-2xl font-semibold">Your Savings Goals</h1> {/* Modern heading */}
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="solid"> {/* Solid primary button */}
                   <PlusCircle className="mr-2 h-4 w-4" /> Create New Goal
                </Button>
            </DialogTrigger>
             {/* Standard Dialog Styling */}
            <GoalFormDialog
              title="Create New Savings Goal"
              description="Define your new financial target and give it a purpose."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
             />
         </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
            const percentage = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
            const isComplete = percentage >= 100;
            const iconColor = isComplete ? 'text-green-500' : (goal.iconName === 'HandCoins' ? 'text-destructive' : goal.iconName === 'Target' ? 'text-secondary' : 'text-primary');
            const IconComponent = getIcon(isComplete ? 'CheckCircle' : goal.iconName, cn("h-8 w-8", iconColor)); // Larger icon

            return (
              <Card key={goal.id} className="flex flex-col group relative overflow-hidden"> {/* Added group relative */}
                {/* Actions Overlay */}
                 <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <Dialog open={isEditDialogOpen && editingGoal?.id === goal.id} onOpenChange={(open) => {if (!open) setEditingGoal(null); setIsEditDialogOpen(open);}}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 bg-card/80 hover:bg-muted" onClick={() => openEditDialog(goal)}>
                               <Edit className="h-4 w-4 text-muted-foreground"/>
                               <span className="sr-only">Edit Goal</span>
                            </Button>
                        </DialogTrigger>
                        {editingGoal && <GoalFormDialog
                           key={`edit-${editingGoal.id}`} // Add key for re-mount
                           title="Edit Savings Goal"
                           description="Update your financial target details."
                           goal={editingGoal}
                           onSave={handleEditGoal}
                           onClose={() => {setIsEditDialogOpen(false); setEditingGoal(null);}}
                         />}
                     </Dialog>
                     <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-7 w-7 bg-card/80 hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive"/>
                            <span className="sr-only">Delete Goal</span>
                         </Button>
                       </AlertDialogTrigger>
                        {/* Standard AlertDialog Styling */}
                       <AlertDialogContent>
                          <AlertDialogHeader>
                             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                         </AlertDialogHeader>
                         <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the "{goal.name}" savings goal.
                         </AlertDialogDescription>
                         <AlertDialogFooter>
                           <AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel>
                           <AlertDialogAction asChild><Button variant="destructive" onClick={() => handleDeleteGoal(goal.id)}>Yes, Delete Goal</Button></AlertDialogAction>
                         </AlertDialogFooter>
                       </AlertDialogContent>
                     </AlertDialog>
                   </div>
                <CardHeader className="flex-row items-center gap-4 pb-2"> {/* Flex row header */}
                   {IconComponent}
                   <div className="flex-1">
                     <CardTitle className="text-lg">{goal.name}</CardTitle>
                     <CardDescription className="text-xs leading-tight">{goal.description}</CardDescription>
                   </div>
                 </CardHeader>
                <CardContent className="flex-1 space-y-3 pt-2">
                  <Progress value={percentage} className={cn("h-2.5", isComplete && "[&>div]:bg-green-500")} />
                  <div className="text-sm text-muted-foreground flex justify-between items-center">
                     <span className={cn("font-medium", isComplete && "text-green-600")}>
                        {isComplete ? "Goal Achieved!" : `${percentage}% Funded`}
                     </span>
                     <span>${goal.current.toLocaleString()} / <span className="font-medium text-foreground">${goal.target.toLocaleString()}</span></span>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                   {/* Manage Funds Button */}
                   <Button
                     variant="outline"
                     className="w-full text-primary border-primary hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
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
                 <button className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card hover:border-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer p-6 min-h-[200px] text-center group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <PlusCircle className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors duration-200 mb-3" />
                    <span className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary">Create New Goal</span>
                    <span className="text-sm text-muted-foreground">Click here to start saving for something new!</span>
                 </button>
            </DialogTrigger>
            {/* Re-use the GoalFormDialog for creation */}
            <GoalFormDialog
              key="create" // Add key for re-mount on open/close
              title="Create New Savings Goal"
              description="Define your new financial target and give it a purpose."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </Dialog>
      </div>

       {/* Add Funds Dialog - Separate */}
       <Dialog open={isAddFundsDialogOpen} onOpenChange={setIsAddFundsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
               <DialogTitle>Manage Funds: {currentFundsGoal?.name}</DialogTitle>
             </DialogHeader>
             <div className="space-y-4 py-4">
               <DialogDescription>
                 Current Progress: ${currentFundsGoal?.current.toLocaleString()} / ${currentFundsGoal?.target.toLocaleString()}
               </DialogDescription>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor={`modify-amount-${fundsGoalId}`} className="text-right">
                   Amount ($)
                 </Label>
                 <Input id={`modify-amount-${fundsGoalId}`} type="number" defaultValue="50" className="col-span-3" />
               </div>
                <p className="text-xs text-muted-foreground text-center px-4">Enter a positive value to add funds, or a negative value to remove funds.</p>
             </div>
             <DialogFooter className="flex sm:justify-end gap-2">
               <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
               </DialogClose>
               <Button type="submit" variant="solidAccent" onClick={() => {
                   const amountInput = document.getElementById(`modify-amount-${fundsGoalId}`) as HTMLInputElement;
                   const amount = parseFloat(amountInput?.value || '0');
                   if (fundsGoalId && !isNaN(amount)) { // Ensure amount is a number
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
  // Initialize state based on whether it's create or edit
  const [formData, setFormData] = useState({
    name: goal?.name || '',
    target: goal?.target || 1000, // Default target for new goals
    description: goal?.description || '',
    iconName: goal?.iconName || 'DollarSign', // Default icon for new goals
     // Current amount only relevant for editing, handled separately if needed
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue: string | number = value;
    if (name === 'target') {
       processedValue = parseFloat(value) || 0; // Allow 0 temporarily, validate on save
       if (processedValue < 0) processedValue = 0; // Prevent negative target input
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
     // Add more validation as needed (e.g., description length)
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

  const handleSave = () => {
    if (validateForm()) {
        if (goal) { // Editing existing goal
            onSave({ ...goal, ...formData }); // Merge existing goal data (like current amount) with form data
        } else { // Creating new goal
            onSave(formData); // Pass only the form data
        }
        onClose(); // Close dialog on successful save
    }
  };

   const availableIcons = Object.keys(iconMap);

  return (
    <DialogContent className="sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle className="text-lg">{title}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <DialogDescription>{description}</DialogDescription>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className={cn("col-span-3", errors.name && 'border-destructive')} />
           {errors.name && <p className="col-start-2 col-span-3 text-xs text-destructive -mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="target" className="text-right">Target ($)</Label>
          <Input id="target" name="target" type="number" min="0.01" step="0.01" value={formData.target} onChange={handleChange} className={cn("col-span-3", errors.target && 'border-destructive')} />
           {errors.target && <p className="col-start-2 col-span-3 text-xs text-destructive -mt-1">{errors.target}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3 h-20" placeholder="Optional: Add some details..." />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
           <Label htmlFor="iconName" className="text-right">Icon</Label>
           <Select name="iconName" value={formData.iconName} onValueChange={(value) => handleChange({ target: { name: 'iconName', value } } as any)}>
                <SelectTrigger id="iconName" className="col-span-3">
                    <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                    {availableIcons.map(iconKey => (
                       <SelectItem key={iconKey} value={iconKey}>
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
      <DialogFooter className="flex sm:justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="solidAccent" onClick={handleSave}>{goal ? 'Save Changes' : 'Create Goal'}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
