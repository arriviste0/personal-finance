import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, PiggyBank, HandCoins, Target, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

// Mock data for savings goals - replace with actual data fetching
const savingsGoals = [
  { id: "1", name: "Vacation Fund", current: 750, target: 2000, icon: <PiggyBank className="h-8 w-8 text-primary" />, description: "Trip to Hawaii next summer!" },
  { id: "2", name: "Emergency Fund", current: 3000, target: 5000, icon: <HandCoins className="h-8 w-8 text-destructive" />, description: "For unexpected expenses." },
  { id: "3", name: "New Gadget", current: 200, target: 800, icon: <Target className="h-8 w-8 text-secondary" />, description: "Latest smartphone." },
  { id: "4", name: "Education", current: 1200, target: 10000, icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6v6l4 2"/></svg>, description: "Master's Degree Fund." }, // Custom icon example
];

export default function SavingsGoalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Goal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {savingsGoals.map((goal) => (
          <Card key={goal.id} className="flex flex-col glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <div className="flex items-center gap-3">
                 {goal.icon}
                <CardTitle className="text-xl font-semibold">{goal.name}</CardTitle>
              </div>
               <div className="flex space-x-1">
                 <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                    <Edit className="h-4 w-4"/>
                    <span className="sr-only">Edit Goal</span>
                 </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4"/>
                     <span className="sr-only">Delete Goal</span>
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-3">
              <CardDescription>{goal.description}</CardDescription>
              <Progress value={(goal.current / goal.target) * 100} className="h-3" />
              <div className="text-sm text-muted-foreground flex justify-between">
                 <span>Progress: {Math.round((goal.current / goal.target) * 100)}%</span>
                 <span>Target: ${goal.target.toLocaleString()}</span>
              </div>
            </CardContent>
             <CardFooter className="pt-4">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">Add Funds</Button>
             </CardFooter>
          </Card>
        ))}

         {/* Placeholder for Add New Goal */}
         <Card className="flex flex-col items-center justify-center border-2 border-dashed border-muted bg-transparent hover:border-accent hover:bg-accent/5 transition-colors glass">
           <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <PlusCircle className="h-12 w-12 text-muted-foreground mb-4" />
             <CardTitle className="text-lg font-medium mb-1">Create New Goal</CardTitle>
             <CardDescription className="text-sm">Start saving for something new!</CardDescription>
              <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                 Create Goal
              </Button>
           </CardContent>
         </Card>
      </div>
    </div>
  );
}
