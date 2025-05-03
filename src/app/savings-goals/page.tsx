'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, PiggyBank, HandCoins, Target, Edit, Trash2, Save, X } from "lucide-react";
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
  // { id: "4", name: "Education", current: 1200, target: 10000, iconName: "GraduationCap", description: "Master's Degree Fund." }, // Use valid Lucide icon
];

// Map icon names to Lucide components
const iconMap: { [key: string]: React.ElementType } = {
  PiggyBank,
  HandCoins,
  Target,
  // GraduationCap, // Add other icons if needed
};

// Helper to get icon component
const getIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName] || PiggyBank; // Default icon
  return <IconComponent className="h-8 w-8" />; // Apply common styling here
};

export default function SavingsGoalsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialSavingsGoals);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);

  // --- CRUD Operations (Mock) ---

  const handleCreateGoal = (newGoalData: Omit<SavingsGoal, 'id' | 'current'>) => {
    // In a real app, send data to backend
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
    // In a real app, send data to backend
    setGoals(goals.map(g => g.id === updatedGoalData.id ? updatedGoalData : g));
    setIsEditDialogOpen(false); // Close dialog
    setEditingGoal(null); // Reset editing state
    console.log("Updated goal:", updatedGoalData);
  };

  const handleDeleteGoal = (goalId: string) => {
    // In a real app, send delete request to backend
    setGoals(goals.filter(g => g.id !== goalId));
    console.log("Deleted goal with ID:", goalId);
  };

   const handleAddFunds = (goalId: string, amount: number) => {
    setGoals(goals.map(g => g.id === goalId ? { ...g, current: Math.min(g.current + amount, g.target) } : g));
    console.log(`Added $${amount} to goal ${goalId}`);
    // In a real app, you'd likely close a dialog here if funds were added via one
  };

  // --- Dialog Trigger Functions ---
   const openEditDialog = (goal: SavingsGoal) => {
     setEditingGoal(goal);
     setIsEditDialogOpen(true);
   };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="solidAccent"> {/* Solid accent button */}
                   <PlusCircle className="mr-2 h-4 w-4" /> Create Goal
                </Button>
            </DialogTrigger>
            <GoalFormDialog
              title="Create New Savings Goal"
              description="Define your new financial target."
              onSave={handleCreateGoal}
              onClose={() => setIsCreateDialogOpen(false)}
             />
         </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => {
            const percentage = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
            const IconComponent = getIcon(goal.iconName); // Get the icon component
            const iconColor = goal.iconName === 'HandCoins' ? 'text-destructive' : goal.iconName === 'Target' ? 'text-secondary' : 'text-primary';

            return (
              <Card key={goal.id} className="flex flex-col"> {/* Removed glass */}
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    {React.cloneElement(IconComponent, { className: `h-8 w-8 ${iconColor}` })} {/* Apply color */}
                    <CardTitle className="text-xl font-semibold">{goal.name}</CardTitle>
                  </div>
                  <div className="flex space-x-1">
                      <Dialog open={isEditDialogOpen && editingGoal?.id === goal.id} onOpenChange={(open) => {if (!open) setEditingGoal(null); setIsEditDialogOpen(open);}}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground border-transparent" onClick={() => openEditDialog(goal)}>
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
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive border-transparent">
                           <Trash2 className="h-4 w-4"/>
                           <span className="sr-only">Delete Goal</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the "{goal.name}" savings goal.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteGoal(goal.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <CardDescription>{goal.description}</CardDescription>
                  <Progress value={percentage} className="h-3 [&>div]:bg-primary" /> {/* Ensure color */}
                  <div className="text-sm text-muted-foreground flex justify-between">
                     <span>{percentage}% funded</span>
                     <span>${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                   {/* Dialog for adding funds */}
                    <Dialog>
                      <DialogTrigger asChild>
                         <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">Add Funds</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Add Funds to "{goal.name}"</DialogTitle>
                          <DialogDescription>
                            Increase the saved amount for this goal. Current: ${goal.current.toLocaleString()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor={`add-amount-${goal.id}`} className="text-right">
                              Amount ($)
                            </Label>
                            <Input id={`add-amount-${goal.id}`} type="number" defaultValue="50" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                           <DialogClose asChild>
                               <Button type="button" variant="secondary">Cancel</Button>
                           </DialogClose>
                          {/* In a real app, you'd likely use form state here */}
                          <DialogClose asChild>
                              <Button type="submit" variant="solidAccent" onClick={() => {
                                  const amountInput = document.getElementById(`add-amount-${goal.id}`) as HTMLInputElement;
                                  const amount = parseFloat(amountInput?.value || '0');
                                  if (amount > 0) {
                                      handleAddFunds(goal.id, amount);
                                  }
                              }}>
                                Add Funds
                              </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </CardFooter>
              </Card>
            )
        })}

         {/* Placeholder for Add New Goal - clickable */}
         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
                 <Card className="flex flex-col items-center justify-center border-2 border-dashed border-muted bg-transparent hover:border-accent hover:bg-accent/5 transition-colors cursor-pointer">
                   <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
                     <CardTitle className="text-lg font-medium mb-1">Create New Goal</CardTitle>
                     <CardDescription className="text-sm">Start saving for something new!</CardDescription>
                       {/* Button is inside the trigger card */}
                        <Button variant="solidAccent" className="mt-4"> {/* Solid accent button */}
                           Create Goal
                        </Button>
                   </CardContent>
                 </Card>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className={`col-span-3 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
           {errors.name && <p className="col-span-4 text-right text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="target" className="text-right">Target ($)</Label>
          <Input id="target" name="target" type="number" value={formData.target} onChange={handleChange} className={`col-span-3 ${errors.target ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
           {errors.target && <p className="col-span-4 text-right text-xs text-destructive">{errors.target}</p>}
        </div>
         {goal && ( // Only show current amount field when editing
           <div className="grid grid-cols-4 items-center gap-4">
             <Label htmlFor="current" className="text-right">Current ($)</Label>
             <Input id="current" name="current" type="number" value={formData.current} onChange={handleChange} className={`col-span-3 ${errors.current ? 'border-destructive focus-visible:ring-destructive' : ''}`} />
              {errors.current && <p className="col-span-4 text-right text-xs text-destructive">{errors.current}</p>}
           </div>
         )}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} className="col-span-3" />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
           <Label htmlFor="iconName" className="text-right">Icon</Label>
           {/* Basic select for icon - could be improved visually */}
           <select
             id="iconName"
             name="iconName"
             value={formData.iconName}
             onChange={(e) => setFormData(prev => ({ ...prev, iconName: e.target.value }))}
             className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
           >
             {Object.keys(iconMap).map(iconKey => (
               <option key={iconKey} value={iconKey}>{iconKey}</option>
             ))}
           </select>
         </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="solidAccent" onClick={handleSave}>{goal ? 'Save Changes' : 'Create Goal'}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
