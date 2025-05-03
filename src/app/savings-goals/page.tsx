'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, PiggyBank, HandCoins, Target, Edit, Trash2, Save, X, MinusCircle } from "lucide-react"; // Added MinusCircle
import Link from "next/link";
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
import { cn } from '@/lib/utils'; // Import cn

interface SavingsGoal {
  id: string;
  name: string;
  current: number;
  target: number;
  iconName: string; // Store icon name instead of component
  description: string;
}

// Mock data for savings goals
const initialSavingsGoals: SavingsGoal[] = [
  { id: "1", name: "Vacation Fund", current: 750, target: 2000, iconName: "PiggyBank", description: "Trip to Hawaii next summer!" },
  { id: "2", name: "Emergency Fund", current: 3000, target: 5000, iconName: "HandCoins", description: "For unexpected expenses." },
  { id: "3", name: "New Gadget", current: 200, target: 800, iconName: "Target", description: "Latest smartphone." },
];

// Map icon names to Lucide components
const iconMap: { [key: string]: React.ElementType } = {
  PiggyBank,
  HandCoins,
  Target,
};

// Helper to get icon component
const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || PiggyBank; // Default icon
  return <IconComponent className="h-6 w-6" />; // Apply common styling here
};

export default function SavingsGoalsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialSavingsGoals);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [isAddFundsDialogOpen, setIsAddFundsDialogOpen] = useState(false);
  const [fundsGoalId, setFundsGoalId] = useState<string | null>(null);


  // --- CRUD Operations (Mock) ---

  const handleCreateGoal = (newGoalData: Omit<SavingsGoal, 'id' | 'current'>) => {
    const newGoal: SavingsGoal = {
      ...newGoalData,
      id: Math.random().toString(36).substring(2, 9), // simple unique ID
      current: 0, // New goals start at 0
    };
    setGoals([...goals, newGoal]);
    setIsCreateDialogOpen(false); // Close dialog
    console.log("Created goal:", newGoal);
  };

  const handleEditGoal = (updatedGoalData: SavingsGoal) => {
     if (!editingGoal) return;
    setGoals(goals.map(g => g.id === updatedGoalData.id ? updatedGoalData : g));
    setIsEditDialogOpen(false); // Close dialog
    setEditingGoal(null); // Reset editing state
    console.log("Updated goal:", updatedGoalData);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
    console.log("Deleted goal with ID:", goalId);
  };

   const handleAddFunds = (goalId: string, amount: number) => {
     if (amount === 0) return; // Do nothing if amount is zero
    setGoals(goals.map(g => g.id === goalId ? { ...g, current: Math.max(0, Math.min(g.current + amount, g.target)) } : g)); // Ensure current doesn't go below 0
    console.log(`Modified funds by $${amount} for goal ${goalId}`);
     setIsAddFundsDialogOpen(false); // Close dialog after adding/removing funds
     setFundsGoalId(null);
   };


  // --- Dialog Trigger Functions ---
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
       <div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-4">
         <h1 className="text-2xl font-medium uppercase">Savings Goals</h1> {/* Retro heading */}
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="solid"> {/* Use default retro button */}
                   <PlusCircle className="mr-2 h-4 w-4" /> New Goal
                </Button>
            </DialogTrigger>
             {/* Apply retro style to DialogContent */}
            <GoalFormDialog
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
            const IconComponent = getIcon(goal.iconName);
            const iconColor = goal.iconName === 'HandCoins' ? 'text-destructive' : goal.iconName === 'Target' ? 'text-secondary' : 'text-primary';

            return (
              <Card key={goal.id} className="flex flex-col"> {/* Base retro-window style */}
                 {/* Custom Header for Goals Card */}
                <div className="retro-window-header !bg-card !text-card-foreground border-b-2 border-foreground p-2 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     {React.cloneElement(IconComponent, { className: `h-6 w-6 ${iconColor}` })}
                     <span className="text-lg font-medium">{goal.name}</span>
                   </div>
                   <div className="flex space-x-1">
                      <Dialog open={isEditDialogOpen && editingGoal?.id === goal.id} onOpenChange={(open) => {if (!open) setEditingGoal(null); setIsEditDialogOpen(open);}}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground !border-transparent !shadow-none">
                               <Edit className="h-4 w-4"/>
                               <span className="sr-only">Edit Goal</span>
                            </Button>
                        </DialogTrigger>
                        {editingGoal && <GoalFormDialog
                           title="Edit Savings Goal"
                           description="Update your financial target details."
                           goal={editingGoal}
                           onSave={handleEditGoal}
                           onClose={() => {setIsEditDialogOpen(false); setEditingGoal(null);}}
                         />}
                     </Dialog>
                     <AlertDialog>
                       <AlertDialogTrigger asChild>
                         <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive !border-transparent !shadow-none">
                            <Trash2 className="h-4 w-4"/>
                            <span className="sr-only">Delete Goal</span>
                         </Button>
                       </AlertDialogTrigger>
                        {/* Apply retro style to AlertDialogContent */}
                       <AlertDialogContent className="retro-window !rounded-none">
                          <AlertDialogHeader className="retro-window-header !text-left !p-1 !px-2">
                             <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                              <div className="retro-window-controls">
                                 <span/><span/><span className="!bg-destructive !border-destructive-foreground"/>
                              </div>
                         </AlertDialogHeader>
                         <AlertDialogDescription className="retro-window-content !pt-2 text-card-foreground">
                            This action cannot be undone. Delete "{goal.name}"?
                         </AlertDialogDescription>
                         <AlertDialogFooter className="retro-window-content !pt-0">
                           <AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel>
                           <AlertDialogAction asChild><Button variant="destructive" onClick={() => handleDeleteGoal(goal.id)}>Delete</Button></AlertDialogAction>
                         </AlertDialogFooter>
                       </AlertDialogContent>
                     </AlertDialog>
                   </div>
                 </div>
                <CardContent className="flex-1 space-y-3 !pt-4"> {/* Add padding top */}
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                  <Progress value={percentage} className="h-3 [&>div]:bg-primary" />
                  <div className="text-sm text-muted-foreground flex justify-between">
                     <span>{percentage}% funded</span>
                     <span>${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                   {/* Trigger Add Funds Dialog */}
                   <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10" onClick={() => openAddFundsDialog(goal.id)}>Manage Funds</Button>
                </CardFooter>
              </Card>
            )
        })}

         {/* Placeholder for Add New Goal - clickable */}
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                 <button className="flex flex-col items-center justify-center border-2 border-dashed border-muted bg-transparent hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer p-6 min-h-[200px]">
                    <PlusCircle className="h-10 w-10 text-muted-foreground mb-3" />
                    <span className="text-lg font-medium mb-1 text-center">Create New Goal</span>
                    <span className="text-sm text-center text-muted-foreground">Start saving!</span>
                    {/* Button look without actual button */}
                     <span className="mt-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-base font-medium h-9 px-3 border-2 border-foreground bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))]">
                       Create Goal
                     </span>
                 </button>
            </DialogTrigger>
            {/* Re-use the GoalFormDialog for creation */}
            <GoalFormDialog
              title="Create New Savings Goal"
              description="Define your new financial target."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
            />
          </Dialog>
      </div>

       {/* Add Funds Dialog - Separate */}
       <Dialog open={isAddFundsDialogOpen} onOpenChange={setIsAddFundsDialogOpen}>
          <DialogContent className="retro-window !rounded-none sm:max-w-[425px]">
             <DialogHeader className="retro-window-header !text-left !p-1 !px-2">
               <DialogTitle>Manage Funds: {currentFundsGoal?.name}</DialogTitle>
                <div className="retro-window-controls">
                    <span/><span/><span className="!bg-destructive !border-destructive-foreground"/>
                </div>
             </DialogHeader>
             <div className="retro-window-content space-y-4 !pt-4">
               <DialogDescription>
                 Current: ${currentFundsGoal?.current.toLocaleString()} / Target: ${currentFundsGoal?.target.toLocaleString()}
               </DialogDescription>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor={`modify-amount-${fundsGoalId}`} className="text-right">
                   Amount ($)
                 </Label>
                 <Input id={`modify-amount-${fundsGoalId}`} type="number" defaultValue="50" className="col-span-3" />
               </div>
                <p className="text-xs text-muted-foreground text-center">Enter a positive value to add funds, or a negative value to remove funds.</p>
             </div>
             <DialogFooter className="retro-window-content !pt-0 flex sm:justify-between">
               <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
               </DialogClose>
               {/* Modify funds logic */}
               <Button type="submit" variant="solidAccent" onClick={() => {
                   const amountInput = document.getElementById(`modify-amount-${fundsGoalId}`) as HTMLInputElement;
                   const amount = parseFloat(amountInput?.value || '0');
                   if (fundsGoalId) {
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
  goal?: SavingsGoal; // Optional initial data for editing
  onSave: (data: any) => void; // Adjust 'any' to a specific form data type
  onClose: () => void;
}

function GoalFormDialog({ title, description, goal, onSave, onClose }: GoalFormDialogProps) {
  const [formData, setFormData] = useState({
    name: goal?.name || '',
    target: goal?.target || 0,
    description: goal?.description || '',
    iconName: goal?.iconName || 'PiggyBank', // Default icon
     // Include current amount only when editing
     ...(goal && { current: goal.current }),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { // Added HTMLSelectElement
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'target' || name === 'current' ? parseFloat(value) || 0 : value }));
     // Basic validation on change (optional)
     if (errors[name]) {
       setErrors(prev => ({ ...prev, [name]: '' }));
     }
  };

   // Basic Validation
   const validateForm = (): boolean => {
     const newErrors: Record<string, string> = {};
     if (!formData.name.trim()) newErrors.name = "Goal name is required.";
     if (formData.target <= 0) newErrors.target = "Target amount must be positive.";
     if (goal && formData.current < 0) newErrors.current = "Current amount cannot be negative."; // Validate current only if editing
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

  const handleSave = () => {
    if (validateForm()) {
        if (goal) { // If editing, include the id and potentially current amount
            onSave({ ...formData, id: goal.id });
        } else { // If creating, exclude id and current (set current to 0 in parent)
            const { current, ...createData } = formData;
            onSave(createData);
        }
    }
  };

  return (
     // Apply retro style to DialogContent
    <DialogContent className="retro-window !rounded-none sm:max-w-[425px]">
      <DialogHeader className="retro-window-header !text-left !p-1 !px-2">
        <DialogTitle>{title}</DialogTitle>
         <div className="retro-window-controls">
             <span/><span/><span className="!bg-destructive !border-destructive-foreground"/>
         </div>
      </DialogHeader>
      <div className="retro-window-content grid gap-4 py-4">
        <DialogDescription>{description}</DialogDescription>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className={cn("col-span-3", errors.name && 'border-destructive focus-visible:ring-destructive')} />
           {errors.name && <p className="col-span-4 text-right text-xs text-destructive -mt-1">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="target" className="text-right">Target ($)</Label>
          <Input id="target" name="target" type="number" value={formData.target} onChange={handleChange} className={cn("col-span-3", errors.target && 'border-destructive focus-visible:ring-destructive')} />
           {errors.target && <p className="col-span-4 text-right text-xs text-destructive -mt-1">{errors.target}</p>}
        </div>
         {goal && ( // Only show current amount field when editing
           <div className="grid grid-cols-4 items-center gap-4">
             <Label htmlFor="current" className="text-right">Current ($)</Label>
             <Input id="current" name="current" type="number" value={formData.current} onChange={handleChange} className={cn("col-span-3", errors.current && 'border-destructive focus-visible:ring-destructive')} />
              {errors.current && <p className="col-span-4 text-right text-xs text-destructive -mt-1">{errors.current}</p>}
           </div>
         )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Desc.</Label> {/* Shortened label */}
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3 h-16" /> {/* Adjusted height */}
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
           <Label htmlFor="iconName" className="text-right">Icon</Label>
           {/* Basic select for icon - styled retro */}
           <select
             id="iconName"
             name="iconName"
             value={formData.iconName}
             onChange={handleChange} // Use common handler
             className="col-span-3 h-10 rounded-none border-2 border-foreground bg-input px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
           >
             {Object.keys(iconMap).map(iconKey => (
               <option key={iconKey} value={iconKey}>{iconKey}</option>
             ))}
           </select>
         </div>
      </div>
      <DialogFooter className="retro-window-content !pt-0 flex sm:justify-between"> {/* Footer inside content area */}
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="solidAccent" onClick={handleSave}>{goal ? 'Save Changes' : 'Create Goal'}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
