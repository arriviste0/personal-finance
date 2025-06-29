import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { BudgetSchema } from '@/lib/db-schemas';

// Fetch function for a specific budget
const fetchBudget = async (month: string): Promise<BudgetSchema> => {
    const response = await fetch(`/api/budget?month=${month}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Simple interface for budget updates
interface BudgetUpdate {
    monthYear: string;
    budgetItems: Array<{
        _id?: string;
        category: string;
        budget: number;
        spent: number;
        color: string;
    }>;
    totalBudget: number;
    totalSpent: number;
    updatedAt: Date;
}

// Update function for a budget
const updateBudget = async (budget: BudgetUpdate): Promise<BudgetSchema> => {
    const response = await fetch('/api/budget', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(budget),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update budget');
    }
    return response.json();
};


// Custom hook to get budget data
export function useBudget(month: string) {
    return useQuery<BudgetSchema, Error>({
        queryKey: ['budget', month],
        queryFn: () => fetchBudget(month),
    });
}

// Custom hook to update a budget
export function useUpdateBudget() {
    const queryClient = useQueryClient();
    return useMutation<BudgetSchema, Error, BudgetUpdate>({
        mutationFn: updateBudget,
        onSuccess: (data) => {
            // Invalidate and refetch the budget query for the specific month
            queryClient.invalidateQueries({ queryKey: ['budget', data.monthYear] });
        },
    });
} 